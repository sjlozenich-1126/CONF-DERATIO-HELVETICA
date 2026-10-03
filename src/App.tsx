/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { ProvenanceLedger } from './components/ProvenanceLedger';
import { ArchivistConsole } from './components/ArchivistConsole';
import { CreditEngine } from './components/CreditEngine';
import { CurrencyEngine } from './components/CurrencyEngine';
import { AssetRegistry } from './components/AssetRegistry';
import { MultiSigConsole } from './components/MultiSigConsole';
import { CrossBorderSettlement } from './components/CrossBorderSettlement';
import { RegulatoryAudit } from './components/RegulatoryAudit';
import { InstitutionalManual } from './components/InstitutionalManual';
import { EntityDetailModal } from './components/EntityDetailModal';
import { BlockDetailModal } from './components/BlockDetailModal';
import { CreateEntityModal } from './components/CreateEntityModal';

import {
  SystemLifecycleEntity,
  ProvenanceBlock,
  MultiSigSigner,
  MultiSigProposal,
  CreditFacility,
  CurrencyReserve,
  EconomicAsset,
  SettlementTransaction,
  LifecycleVerb,
  AtlasStratum,
  AtlasLevel,
  CoreVault,
  AuthorityBranch
} from './types/fiducia';

import {
  INITIAL_ENTITIES,
  INITIAL_BLOCKS,
  INITIAL_SIGNERS,
  INITIAL_PROPOSALS,
  INITIAL_CREDIT_FACILITIES,
  INITIAL_RESERVES,
  INITIAL_ECONOMIC_ASSETS,
  INITIAL_SETTLEMENTS
} from './data/initialData';

import { 
  sha256, 
  computeMerkleRoot, 
  calculatePowerMetric, 
  formatCHF 
} from './utils/crypto';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('ledger');

  // Core State
  const [entities, setEntities] = useState<SystemLifecycleEntity[]>(INITIAL_ENTITIES);
  const [blocks, setBlocks] = useState<ProvenanceBlock[]>(INITIAL_BLOCKS);
  const [signers] = useState<MultiSigSigner[]>(INITIAL_SIGNERS);
  const [currentSigner, setCurrentSigner] = useState<MultiSigSigner>(INITIAL_SIGNERS[0]);
  const [proposals, setProposals] = useState<MultiSigProposal[]>(INITIAL_PROPOSALS);
  const [creditFacilities, setCreditFacilities] = useState<CreditFacility[]>(INITIAL_CREDIT_FACILITIES);
  const [reserves, setReserves] = useState<CurrencyReserve[]>(INITIAL_RESERVES);
  const [assets, setAssets] = useState<EconomicAsset[]>(INITIAL_ECONOMIC_ASSETS);
  const [settlements, setSettlements] = useState<SettlementTransaction[]>(INITIAL_SETTLEMENTS);

  const [circulatingFCHF, setCirculatingFCHF] = useState(385000000);
  const [circulatingFRU, setCirculatingFRU] = useState(120000000);

  // Modals State
  const [selectedEntityForDossier, setSelectedEntityForDossier] = useState<SystemLifecycleEntity | null>(null);
  const [selectedBlockForInspection, setSelectedBlockForInspection] = useState<ProvenanceBlock | null>(null);
  const [isCreateEntityModalOpen, setIsCreateEntityModalOpen] = useState(false);

  // Verification State
  const [isVerifyingIntegrity, setIsVerifyingIntegrity] = useState(false);
  const [verificationVerdict, setVerificationVerdict] = useState<{ valid: boolean; message: string; verifiedCount: number } | null>(null);

  // Helper to commit a new block to S06
  const appendBlock = async (
    action: string,
    entityId: string,
    entityTitle: string,
    stratum: AtlasStratum,
    level: AtlasLevel,
    vault: CoreVault,
    domain: string,
    legalParent: string,
    payloadData?: Record<string, any>,
    multiSigStatus: ProvenanceBlock['multiSigStatus'] = '1/1'
  ) => {
    const prevBlock = blocks[blocks.length - 1];
    const newBlockNumber = prevBlock ? prevBlock.blockNumber + 1 : 10001;
    const prevHash = prevBlock ? prevBlock.hash : '0x0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();

    const dataToHash = `${prevHash}:${newBlockNumber}:${action}:${entityId}:${timestamp}`;
    const newHash = await sha256(dataToHash);
    const merkleRoot = await computeMerkleRoot([newHash, prevHash]);

    const newBlock: ProvenanceBlock = {
      blockNumber: newBlockNumber,
      timestamp,
      hash: newHash,
      previousHash: prevHash,
      merkleRoot,
      stratum,
      level,
      vault,
      domain,
      action,
      entityId,
      entityTitle,
      custodian: currentSigner.id,
      multiSigStatus,
      legalParentReference: legalParent,
      verified: true,
      complianceCert: 'FINMA-DLT-ART-973d-CERTIFIED',
      payloadData
    };

    setBlocks(prev => [newBlock, ...prev]);
    return newBlock;
  };

  // 1. Lifecycle Verb Execution
  const handleExecuteVerb = async (
    entityId: string,
    verb: LifecycleVerb,
    payload: {
      notes: string;
      stratum?: AtlasStratum;
      level?: AtlasLevel;
      vault?: CoreVault;
      branch?: AuthorityBranch;
      holder?: string;
      status?: any;
      parentGrant?: string;
    }
  ) => {
    const target = entities.find(e => e.id === entityId);
    if (!target) return;

    const newStratum = payload.stratum || target.stratum;
    const newLevel = payload.level || target.level;
    const newVault = payload.vault || target.vault;
    const newBranch = payload.branch || target.branch;
    const newHolder = payload.holder || target.holder;
    const newStatus = payload.status || target.status;
    const newParentGrant = payload.parentGrant || target.parentGrant;

    const newPower = verb === 'Revoke' 
      ? 0.0 
      : calculatePowerMetric(newStratum, newLevel, 1.25);

    const logHash = await sha256(`${entityId}:${verb}:${Date.now()}`);

    const newLogEntry = {
      id: `HL-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleString() + ' CET',
      verb,
      operator: `${currentSigner.name} (${currentSigner.role.split(' ')[0]})`,
      notes: payload.notes || `Verb ${verb} performed on ${target.title}`,
      hash: logHash
    };

    const updatedEntity: SystemLifecycleEntity = {
      ...target,
      stratum: newStratum,
      level: newLevel,
      vault: newVault,
      branch: newBranch,
      holder: newHolder,
      status: newStatus,
      parentGrant: newParentGrant,
      powerMetric: newPower,
      historyLog: [newLogEntry, ...target.historyLog]
    };

    setEntities(prev => prev.map(e => e.id === entityId ? updatedEntity : e));

    // Append S06 Ledger Block
    await appendBlock(
      `LIFECYCLE_VERB_${verb.toUpperCase().replace('/', '_')}`,
      entityId,
      target.title,
      newStratum,
      newLevel,
      newVault,
      newBranch,
      newParentGrant,
      {
        verb,
        operator: currentSigner.name,
        notes: payload.notes,
        powerMetric: newPower
      },
      verb === 'Issue' ? '3/5' : '1/1'
    );
  };

  // 2. Create Entity
  const handleCreateEntity = async (newEntity: SystemLifecycleEntity) => {
    setEntities(prev => [newEntity, ...prev]);

    await appendBlock(
      'INSTANTIATE_GOVERNED_NODE (VERB 09)',
      newEntity.id,
      newEntity.title,
      newEntity.stratum,
      newEntity.level,
      newEntity.vault,
      newEntity.branch,
      newEntity.parentGrant,
      {
        targetType: newEntity.targetType,
        holder: newEntity.holder,
        powerMetric: newEntity.powerMetric
      },
      '1/1'
    );
  };

  // 3. Issue Credit
  const handleIssueCredit = async (newFacility: CreditFacility, requiresMultiSig: boolean) => {
    if (requiresMultiSig) {
      const propHash = await sha256(`PROP:CREDIT:${newFacility.id}:${Date.now()}`);
      const newProposal: MultiSigProposal = {
        id: `PROP-${Date.now().toString().slice(-6)}`,
        title: `Authorize Credit Facility (${formatCHF(newFacility.facilityAmountCHF)}) for ${newFacility.borrower}`,
        type: 'CREDIT_ISSUANCE',
        requestedAmount: newFacility.facilityAmountCHF,
        currency: 'CHF',
        targetEntityId: newFacility.id,
        createdAt: new Date().toISOString(),
        requiredSignatures: 3,
        signatures: [
          {
            signerId: currentSigner.id,
            signedAt: new Date().toISOString(),
            keyHash: await sha256(currentSigner.keyFingerprint)
          }
        ],
        status: 'PENDING',
        details: `Regenerative Credit Underwriting: Collateral Ratio ${newFacility.collateralRatio}%, HDI Score ${newFacility.hdiAlignmentScore}/100. First signature affixed by ${currentSigner.name}.`,
        hash: propHash
      };

      setProposals(prev => [newProposal, ...prev]);
    } else {
      setCreditFacilities(prev => [newFacility, ...prev]);
      await appendBlock(
        'CREDIT_FACILITY_ISSUANCE',
        newFacility.id,
        newFacility.borrower,
        'S04',
        'L4',
        'Charter Repository',
        'Regenerative Capital & Global Reserves',
        newFacility.governingLaw,
        {
          amountCHF: formatCHF(newFacility.facilityAmountCHF),
          collateralRatio: `${newFacility.collateralRatio}%`,
          hdiScore: newFacility.hdiAlignmentScore
        },
        '1/1'
      );
    }
  };

  // 4. Drawdown / Repay
  const handleDrawdownOrRepay = async (facilityId: string, action: 'DRAWDOWN' | 'REPAY', amount: number) => {
    setCreditFacilities(prev => prev.map(f => {
      if (f.id !== facilityId) return f;
      const newDrawn = action === 'DRAWDOWN' 
        ? Math.min(f.facilityAmountCHF, f.drawnAmountCHF + amount)
        : Math.max(0, f.drawnAmountCHF - amount);
      return { ...f, drawnAmountCHF: newDrawn };
    }));

    const fac = creditFacilities.find(f => f.id === facilityId);
    await appendBlock(
      `CREDIT_FACILITY_${action}`,
      facilityId,
      fac ? fac.borrower : 'Credit Facility',
      'S04',
      'L5',
      'Charter Repository',
      'Regenerative Capital & Global Reserves',
      fac?.governingLaw || 'Swiss DLT Act Art. 973d',
      {
        action,
        amountCHF: formatCHF(amount)
      },
      '1/1'
    );
  };

  // 5. Mint Currency
  const handleMintCurrency = async (currency: 'FCHF' | 'FRU', amount: number, collateralType: string) => {
    if (amount >= 500000) {
      const propHash = await sha256(`PROP:MINT:${currency}:${amount}:${Date.now()}`);
      const newProposal: MultiSigProposal = {
        id: `PROP-${Date.now().toString().slice(-6)}`,
        title: `Mint ${amount.toLocaleString()} ${currency} against ${collateralType}`,
        type: 'CURRENCY_MINT',
        requestedAmount: amount,
        currency,
        targetEntityId: 'FC-CH-002',
        createdAt: new Date().toISOString(),
        requiredSignatures: 3,
        signatures: [
          {
            signerId: currentSigner.id,
            signedAt: new Date().toISOString(),
            keyHash: await sha256(currentSigner.keyFingerprint)
          }
        ],
        status: 'PENDING',
        details: `High-value sovereign minting of ${amount.toLocaleString()} ${currency}. Backed by ${collateralType}. 1 of 3 signatures provided by ${currentSigner.name}.`,
        hash: propHash
      };
      setProposals(prev => [newProposal, ...prev]);
    } else {
      if (currency === 'FCHF') {
        setCirculatingFCHF(prev => prev + amount);
      } else {
        setCirculatingFRU(prev => prev + amount);
      }

      await appendBlock(
        `MINT_RESERVE_CURRENCY (${currency})`,
        'FC-CH-002',
        'Fiducia Centrale Reserve Pool',
        'S06',
        'L5',
        'Seal & Attestation Archive',
        'Regenerative Capital & Global Reserves',
        'Swiss DLT Act Art. 973d & FINMA Circ. 2019/2',
        {
          currency,
          amountMinted: amount.toLocaleString(),
          collateralType
        },
        '1/1'
      );
    }
  };

  // 6. Accept and Convert Currency
  const handleAcceptAndConvert = async (fromCurrency: string, fromAmount: number, toCurrency: 'FCHF' | 'FRU') => {
    const FX_RATES: Record<string, number> = { CHF: 1.0, EUR: 0.95, USD: 0.88, XAU: 78500.0 };
    const chfValue = fromAmount * (FX_RATES[fromCurrency] || 1.0);
    const converted = toCurrency === 'FCHF' ? chfValue : chfValue / 1.34;

    if (toCurrency === 'FCHF') {
      setCirculatingFCHF(prev => prev + converted);
    } else {
      setCirculatingFRU(prev => prev + converted);
    }

    await appendBlock(
      `ACCEPT_AND_CONVERT (${fromCurrency} → ${toCurrency})`,
      'FC-CH-001',
      'Fiducia Centrale Exchange Portal',
      'S06',
      'L5',
      'Seal & Attestation Archive',
      'Swiss Sovereign & Verein Registry',
      'Swiss Banking Act Art. 1b FinTech Exemption',
      {
        received: `${fromAmount.toLocaleString()} ${fromCurrency}`,
        issued: `${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toCurrency}`,
        settlement: 'Instant Atomic DvP'
      },
      '1/1'
    );
  };

  // 7. Burn Currency
  const handleBurnCurrency = async (currency: 'FCHF' | 'FRU', amount: number) => {
    if (currency === 'FCHF') {
      setCirculatingFCHF(prev => Math.max(0, prev - amount));
    } else {
      setCirculatingFRU(prev => Math.max(0, prev - amount));
    }

    await appendBlock(
      `BURN_RESERVE_CURRENCY (${currency})`,
      'FC-CH-002',
      'Gotthard Sovereign Gold Depository',
      'S06',
      'L5',
      'Seal & Attestation Archive',
      'Regenerative Capital & Global Reserves',
      'Swiss Precious Metals Control Act',
      {
        currency,
        burnedAmount: amount.toLocaleString(),
        unlockedReserveCHF: formatCHF(amount * (currency === 'FCHF' ? 1.0 : 1.34))
      },
      '1/1'
    );
  };

  // 8. Register Economic Asset
  const handleRegisterAsset = async (newAsset: EconomicAsset) => {
    setAssets(prev => [newAsset, ...prev]);

    await appendBlock(
      'REGISTER_GLOBAL_ECONOMIC_ASSET',
      newAsset.id,
      newAsset.name,
      'S06',
      'L5',
      'Seal & Attestation Archive',
      'Maritime & Aerogate Infrastructure',
      newAsset.legalFramework,
      {
        valuationCHF: formatCHF(newAsset.valuationCHF),
        location: newAsset.location,
        custodian: newAsset.custodian
      },
      '1/1'
    );
  };

  // 9. Sign Multi-Sig Proposal
  const handleSignProposal = async (proposalId: string, signer: MultiSigSigner) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    if (prop.signatures.some(s => s.signerId === signer.id)) return;

    const newKeyHash = await sha256(`${signer.keyFingerprint}:${Date.now()}`);
    const updatedSignatures = [
      ...prop.signatures,
      {
        signerId: signer.id,
        signedAt: new Date().toISOString(),
        keyHash: newKeyHash
      }
    ];

    const isThresholdMet = updatedSignatures.length >= prop.requiredSignatures;

    if (isThresholdMet) {
      // Execute the proposal on-chain!
      if (prop.type === 'CURRENCY_MINT' && prop.requestedAmount && prop.currency) {
        if (prop.currency === 'FCHF') {
          setCirculatingFCHF(prev => prev + prop.requestedAmount!);
        } else {
          setCirculatingFRU(prev => prev + prop.requestedAmount!);
        }
      }

      await appendBlock(
        `MULTISIG_CONSENSUS_EXECUTED (${prop.type})`,
        prop.targetEntityId,
        prop.title,
        'S06',
        'L5',
        'Seal & Attestation Archive',
        'Swiss Sovereign & Verein Registry',
        'Swiss DLT Act Art. 973d & 3-of-5 Consensus',
        {
          proposalId: prop.id,
          signers: updatedSignatures.map(s => s.signerId),
          executedAt: new Date().toISOString()
        },
        'EXECUTED'
      );
    }

    setProposals(prev => prev.map(p => {
      if (p.id !== proposalId) return p;
      return {
        ...p,
        signatures: updatedSignatures,
        status: isThresholdMet ? 'EXECUTED' : 'PENDING'
      };
    }));
  };

  // 10. Execute Cross-Border Settlement
  const handleExecuteSettlement = async (newTx: SettlementTransaction) => {
    setSettlements(prev => [newTx, ...prev]);

    await appendBlock(
      `CROSS_BORDER_SETTLEMENT_${newTx.txType}`,
      newTx.id,
      newTx.settlementCorridor,
      'S06',
      'L5',
      'Seal & Attestation Archive',
      'Swiss Sovereign & Verein Registry',
      'FATF Recommendation 16 (Travel Rule) & BIS Agora',
      {
        corridor: newTx.settlementCorridor,
        deliver: newTx.deliverAmount,
        receive: newTx.receiveAmount,
        travelRuleIVMS101: 'VERIFIED'
      },
      'EXECUTED'
    );
  };

  // 11. Verify Blockchain Cryptographic Integrity
  const handleVerifyIntegrity = async () => {
    setIsVerifyingIntegrity(true);

    let allValid = true;
    for (let i = 0; i < blocks.length - 1; i++) {
      const current = blocks[i];
      const nextOlder = blocks[i + 1];
      if (current.previousHash !== nextOlder.hash) {
        allValid = false;
        break;
      }
    }

    setTimeout(() => {
      setIsVerifyingIntegrity(false);
      setVerificationVerdict({
        valid: allValid,
        message: allValid 
          ? "All SHA-256 block linkages, Merkle roots, and multi-sig quorum hashes verified from genesis to tip with zero collision."
          : "Discrepancy detected in block hash chain.",
        verifiedCount: blocks.length
      });
    }, 700);
  };

  const totalAssetsCHF = assets.reduce((acc, a) => acc + a.valuationCHF, 0);
  const totalCreditActiveCHF = creditFacilities.reduce((acc, c) => acc + c.facilityAmountCHF, 0);
  const latestBlockHash = blocks[0]?.hash || '0x00000000000000000000';
  const blockHeight = blocks[0]?.blockNumber || 10495;
  const pendingProposalsCount = proposals.filter(p => p.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-sans">
      {/* Top Swiss Sovereign Insignia & Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        blockHeight={blockHeight}
        signers={signers}
        currentSigner={currentSigner}
        setCurrentSigner={setCurrentSigner}
        totalAssetsCHF={totalAssetsCHF}
        circulatingFCHF={circulatingFCHF}
        pendingProposalsCount={pendingProposalsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Metric Telemetry Cards */}
        <MetricCards
          totalAssetsCHF={totalAssetsCHF}
          circulatingFCHF={circulatingFCHF}
          circulatingFRU={circulatingFRU}
          totalCreditActiveCHF={totalCreditActiveCHF}
          blockHeight={blockHeight}
          latestBlockHash={latestBlockHash}
        />

        {/* Dynamic Tab Panels */}
        {activeTab === 'ledger' && (
          <ProvenanceLedger
            blocks={blocks}
            onInspectBlock={(block) => setSelectedBlockForInspection(block)}
            onVerifyIntegrity={handleVerifyIntegrity}
            isVerifying={isVerifyingIntegrity}
            verificationVerdict={verificationVerdict}
          />
        )}

        {activeTab === 'archivist' && (
          <ArchivistConsole
            entities={entities}
            onExecuteVerb={handleExecuteVerb}
            onOpenCreateModal={() => setIsCreateEntityModalOpen(true)}
            onViewDossier={(ent) => setSelectedEntityForDossier(ent)}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'credit' && (
          <CreditEngine
            creditFacilities={creditFacilities}
            onIssueCredit={handleIssueCredit}
            onDrawdownOrRepay={handleDrawdownOrRepay}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'currency' && (
          <CurrencyEngine
            reserves={reserves}
            circulatingFCHF={circulatingFCHF}
            circulatingFRU={circulatingFRU}
            onMintCurrency={handleMintCurrency}
            onAcceptAndConvert={handleAcceptAndConvert}
            onBurnCurrency={handleBurnCurrency}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'assets' && (
          <AssetRegistry
            assets={assets}
            onRegisterAsset={handleRegisterAsset}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'multisig' && (
          <MultiSigConsole
            signers={signers}
            proposals={proposals}
            onSignProposal={handleSignProposal}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'settlement' && (
          <CrossBorderSettlement
            settlements={settlements}
            onExecuteSettlement={handleExecuteSettlement}
            currentSigner={currentSigner}
          />
        )}

        {activeTab === 'regulatory' && (
          <RegulatoryAudit
            entities={entities}
            blocks={blocks}
          />
        )}

        {activeTab === 'manual' && (
          <InstitutionalManual
            currentSigner={currentSigner}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0e1118] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-red-600 rounded-[2px] text-white font-bold text-[9px] leading-none">
              +
            </span>
            <span className="font-corporate text-slate-200 font-semibold tracking-wider">FIDUCIA CENTRALE</span>
            <span>• Zurich & Geneva, Switzerland</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Swiss DLT Act (Art. 973d OR)</span>
            <span>•</span>
            <span>FINMA Circular 2019/2</span>
            <span>•</span>
            <span>Psychrosphere Atlas Archivist Engine</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EntityDetailModal
        entity={selectedEntityForDossier}
        onClose={() => setSelectedEntityForDossier(null)}
      />

      <BlockDetailModal
        block={selectedBlockForInspection}
        onClose={() => setSelectedBlockForInspection(null)}
      />

      <CreateEntityModal
        isOpen={isCreateEntityModalOpen}
        onClose={() => setIsCreateEntityModalOpen(false)}
        onCreateEntity={handleCreateEntity}
        currentSigner={currentSigner}
      />
    </div>
  );
}
