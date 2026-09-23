/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Seed data for Fiducia Centrale & Psychrosphere Atlas Integration
 */

import {
  SystemLifecycleEntity,
  ProvenanceBlock,
  MultiSigSigner,
  MultiSigProposal,
  CreditFacility,
  CurrencyReserve,
  EconomicAsset,
  SettlementTransaction
} from '../types/fiducia';

export const INITIAL_ENTITIES: SystemLifecycleEntity[] = [
  {
    id: 'FC-CH-001',
    title: 'Fiducia Centrale Founding Charter & Swiss DLT Custody Verein',
    targetType: 'Charter',
    holder: 'Fiducia Centrale Presidium & Board of Trustees',
    issuingBody: 'Federal Department of Finance (FDF) / Swiss Commercial Register Zurich',
    stratum: 'S02',
    level: 'L3',
    branch: 'Swiss Sovereign & Verein Registry',
    vault: 'Charter Repository',
    status: 'ACTIVE',
    powerMetric: 13.75, // 5.0 * 2.2 * 1.25
    parentGrant: 'Swiss Code of Obligations Art. 60-79 & Swiss DLT Act Art. 973d-973i',
    effectiveDate: '2026-01-15',
    jurisdiction: 'Zurich / Switzerland (CHE-492.888.349)',
    cryptographicSeal: '0x7e8b91a0c4f2e519280d8329ab0f62d854ce82910fa487b32c04e8912ef114a8',
    signatories: ['Shane Jonathan Lozenich', 'Securosys Primus HSM v3'],
    complianceNotes: 'Full compliance verified under FINMA Circular 2019/2 and AMLA/GwG.',
    hdiScore: 98,
    sdgTags: ['SDG 16: Peace, Justice & Strong Institutions', 'SDG 17: Partnerships'],
    historyLog: [
      {
        id: 'HL-01',
        timestamp: '2026-01-15 08:30 CET',
        verb: 'Create',
        operator: 'Shane Jonathan Lozenich (Archivist-in-Chief)',
        notes: 'Initial institutional charter drafted under Swiss Verein law',
        hash: '0x19a0f44b912cde87123908ff9012'
      },
      {
        id: 'HL-02',
        timestamp: '2026-01-16 11:15 CET',
        verb: 'Approve/Deny',
        operator: 'Shane Jonathan Lozenich (FINMA Delegate)',
        notes: 'Charter ratified and approved under DLT uncertificated securities framework',
        hash: '0x88fca91129b0487cd9e4198230aa'
      },
      {
        id: 'HL-03',
        timestamp: '2026-01-18 14:00 CET',
        verb: 'Issue',
        operator: 'Shane Jonathan Lozenich (Keeper of the Great Seal)',
        notes: 'Constitutive seal affixed and anchored to S06 ledger block #10480',
        hash: '0x7e8b91a0c4f2e519280d8329ab0f'
      }
    ]
  },
  {
    id: 'FC-CH-002',
    title: 'Gotthard Sovereign Gold Depository & Uncertificated Reserve',
    targetType: 'Asset',
    holder: 'Fiducia Centrale Custodial Trust AG',
    issuingBody: 'Swiss Vault Security & Precious Metals Assayers Board',
    stratum: 'S06',
    level: 'L5',
    branch: 'Regenerative Capital & Global Reserves',
    vault: 'Seal & Attestation Archive',
    status: 'ACTIVE',
    powerMetric: 22.50, // 4.5 * 4.0 * 1.25
    parentGrant: 'Precious Metals Control Act (PMCA) & DLT Act Art. 973d',
    effectiveDate: '2026-02-01',
    jurisdiction: 'Uri / Ticino Deep Bunker Vault, Switzerland',
    cryptographicSeal: '0x99a2c41870ef45b230198cd491aaef021890cfb238914028ea5590cba1192873',
    signatories: ['Shane Jonathan Lozenich', 'Securosys Primus HSM v3'],
    complianceNotes: '12,500 Fine Gold Ingots (999.9 purity) verified by physical acoustic ultrasound scan and zero-knowledge proof.',
    valuationCHF: 1250000000,
    historyLog: [
      {
        id: 'HL-04',
        timestamp: '2026-02-01 09:00 CET',
        verb: 'Classify',
        operator: 'Shane Jonathan Lozenich (Vault Controller)',
        notes: 'Placed in Stratum S06 (Provenance/Custody) and Level L5 (Execution)',
        hash: '0x43ca0981dfbc9871109923847aef'
      },
      {
        id: 'HL-05',
        timestamp: '2026-02-03 16:30 CET',
        verb: 'Balance',
        operator: 'Shane Jonathan Lozenich (Archivist-in-Chief)',
        notes: 'Harmonized with 100% full-reserve requirement for FCHF stable minting',
        hash: '0x99a2c41870ef45b230198cd491aa'
      }
    ]
  },
  {
    id: 'FC-CH-003',
    title: 'Rhône Basin Clean Hydroelectric Regenerative Credit Facility',
    targetType: 'Credit Facility',
    holder: 'Cantonal Energy Stewardship Consortium (Valais)',
    issuingBody: 'Fiducia Centrale Credit Allocation Committee',
    stratum: 'S04',
    level: 'L4',
    branch: 'Regenerative Capital & Global Reserves',
    vault: 'Charter Repository',
    status: 'ACTIVE',
    powerMetric: 11.25, // 3.0 * 3.0 * 1.25
    parentGrant: 'Swiss Energy Strategy 2050 Mandate & Cantonal Concession Decree',
    effectiveDate: '2026-03-10',
    jurisdiction: 'Canton of Valais / Bern, Switzerland',
    cryptographicSeal: '0x55d8120fa94bc21893c501198fba00293847291aebcd091189401928374a5819',
    signatories: ['Shane Jonathan Lozenich', 'Securosys Primus HSM v3'],
    complianceNotes: 'SDG-7 & SDG-13 verified. Collateral ratio: 154% real infrastructure equity.',
    hdiScore: 94,
    sdgTags: ['SDG 7: Clean Energy', 'SDG 13: Climate Action', 'SDG 9: Industry & Infrastructure'],
    valuationCHF: 180000000,
    historyLog: [
      {
        id: 'HL-06',
        timestamp: '2026-03-08 10:00 CET',
        verb: 'Appoint',
        operator: 'Shane Jonathan Lozenich',
        notes: 'Designated Consortium as primary trustee and operating concessionaire',
        hash: '0x88910ac2bfda390118320491'
      },
      {
        id: 'HL-07',
        timestamp: '2026-03-10 14:00 CET',
        verb: 'Issue',
        operator: 'Shane Jonathan Lozenich',
        notes: 'Executed 180,000,000 CHF credit facility under 3/5 multi-sig consensus',
        hash: '0x55d8120fa94bc21893c50119'
      }
    ]
  },
  {
    id: 'FC-CH-004',
    title: 'Aerogate Geneva International Custodial Logistics Hub',
    targetType: 'Asset',
    holder: 'Aerogate Infrastructure Authority SA',
    issuingBody: 'Federal Office of Civil Aviation (FOCA) & Geneva State Council',
    stratum: 'S03',
    level: 'L5',
    branch: 'Maritime & Aerogate Infrastructure',
    vault: 'Treaty Vault',
    status: 'ACTIVE',
    powerMetric: 20.00, // 4.0 * 4.0 * 1.25
    parentGrant: 'Bilateral Aviation Accord & Cantonal Special Concession #GVA-2025-09',
    effectiveDate: '2026-04-12',
    jurisdiction: 'Geneva International Airport Freezone, Switzerland',
    cryptographicSeal: '0x3310fa29bc0192847aef982001928bfa9821800293847291aebcd09118940192',
    signatories: ['Shane Jonathan Lozenich', 'Securosys Primus HSM v3'],
    complianceNotes: 'Secured bonded corridor for diplomatic, precious metals, and archival transit.',
    valuationCHF: 420000000,
    historyLog: [
      {
        id: 'HL-08',
        timestamp: '2026-04-12 11:30 CET',
        verb: 'Categorize',
        operator: 'Shane Jonathan Lozenich',
        notes: 'Mapped into Maritime & Aerogate Infrastructure branch',
        hash: '0x22901a884fe09128374a5819'
      }
    ]
  },
  {
    id: 'FC-CH-005',
    title: 'Psychrosphere European Integration Lineage Index',
    targetType: 'Instrument',
    holder: 'The Collective & International Archive Presidium',
    issuingBody: 'Archivist Lifecycle Engine Council',
    stratum: 'S01',
    level: 'L2',
    branch: 'International Archive & Provenance',
    vault: 'Lineage Index',
    status: 'ACTIVE',
    powerMetric: 1.88, // 1.0 * 1.5 * 1.25
    parentGrant: 'International Archive Covenant 2026 & Four-Question Separation Doctrine',
    effectiveDate: '2026-05-01',
    jurisdiction: 'Zurich / International Neutral Archive',
    cryptographicSeal: '0x1290cfba89120487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854c',
    signatories: ['Shane Jonathan Lozenich', 'Securosys Primus HSM v3'],
    complianceNotes: 'Genetic, genealogical, and archaeological artifacts held as L1/S01 source inputs. Strict rule: evidence is not title.',
    historyLog: [
      {
        id: 'HL-09',
        timestamp: '2026-05-01 09:00 CET',
        verb: 'Classify',
        operator: 'Shane Jonathan Lozenich',
        notes: 'Enforcing separation: evidence is not title; historical influence is not present authority.',
        hash: '0x77ba1192873491aaef021890'
      }
    ]
  }
];

export const INITIAL_BLOCKS: ProvenanceBlock[] = [
  {
    blockNumber: 10492,
    timestamp: '2026-09-23T06:12:44Z',
    hash: '0x8f2a91b40c21e582910fa487b32c04e8912ef114a87e8b91a0c4f2e519280d83',
    previousHash: '0x6e7d81a93b10d47180f9376a21b93d801e928fa01928bcde82910fa487b32c04',
    merkleRoot: '0x43ca0981dfbc9871109923847aef99a2c41870ef45b230198cd491aaef021890',
    stratum: 'S06',
    level: 'L5',
    vault: 'Seal & Attestation Archive',
    domain: 'Regenerative Capital & Global Reserves',
    action: 'MINT_RESERVE_CURRENCY (FCHF)',
    entityId: 'FC-CH-002',
    entityTitle: 'Gotthard Sovereign Gold Depository',
    custodian: 'SECUROSYS-HSM-ZUG-01',
    multiSigStatus: '3/5',
    legalParentReference: 'Swiss DLT Act Art. 973d & FINMA Circ. 2019/2',
    verified: true,
    complianceCert: 'FINMA-DLT-VASP-2026-9921',
    payloadData: {
      amount: '50,000,000 FCHF',
      collateralAllocation: '12,500 Fine Gold Bars (Gotthard Deep Depository)',
      backingRatio: '142.8%'
    }
  },
  {
    blockNumber: 10493,
    timestamp: '2026-09-23T07:45:10Z',
    hash: '0x3c99a01f9284bc710293847291aebcd091189401928374a58197e8b91a0c4f2e',
    previousHash: '0x8f2a91b40c21e582910fa487b32c04e8912ef114a87e8b91a0c4f2e519280d83',
    merkleRoot: '0x19a0f44b912cde87123908ff901288fca91129b0487cd9e4198230aa7e8b91a0',
    stratum: 'S04',
    level: 'L4',
    vault: 'Charter Repository',
    domain: 'Regenerative Capital & Global Reserves',
    action: 'CREDIT_FACILITY_DISBURSEMENT',
    entityId: 'FC-CH-003',
    entityTitle: 'Rhône Basin Clean Hydroelectric Credit Facility',
    custodian: 'CH-ARCHIVIST-01',
    multiSigStatus: '3/5',
    legalParentReference: 'Swiss Energy Strategy 2050 Mandate',
    verified: true,
    complianceCert: 'SDG-13-IMPACT-AUDIT-CHE',
    payloadData: {
      trancheAmount: '25,000,000 FCHF',
      beneficiary: 'Cantonal Energy Stewardship Consortium',
      hdiImpactScore: 94
    }
  },
  {
    blockNumber: 10494,
    timestamp: '2026-09-23T08:20:05Z',
    hash: '0x71290cfba89120487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854',
    previousHash: '0x3c99a01f9284bc710293847291aebcd091189401928374a58197e8b91a0c4f2e',
    merkleRoot: '0x55d8120fa94bc21893c501198fba00293847291aebcd091189401928374a5819',
    stratum: 'S03',
    level: 'L5',
    vault: 'Treaty Vault',
    domain: 'Maritime & Aerogate Infrastructure',
    action: 'ASSET_CUSTODY_ATTESTATION',
    entityId: 'FC-CH-004',
    entityTitle: 'Aerogate Geneva International Custodial Logistics Hub',
    custodian: 'GENEVA-NOTARY-02',
    multiSigStatus: '3/5',
    legalParentReference: 'Cantonal Special Concession #GVA-2025-09',
    verified: true,
    complianceCert: 'FOCA-FREEZONE-SEC-882',
    payloadData: {
      bondedAreaM2: '142,000 sqm',
      custodyClearanceLevel: 'Class-IV Sovereign Archival Transit'
    }
  },
  {
    blockNumber: 10495,
    timestamp: '2026-09-23T09:05:33Z',
    hash: '0x99201984bc0192847aef982001928bfa9821800293847291aebcd09118940192',
    previousHash: '0x71290cfba89120487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854',
    merkleRoot: '0x88910ac2bfda39011832049177ba1192873491aaef021890cfb238914028ea55',
    stratum: 'S06',
    level: 'L5',
    vault: 'Seal & Attestation Archive',
    domain: 'Swiss Sovereign & Verein Registry',
    action: 'CROSS_BORDER_SETTLEMENT_PvP',
    entityId: 'FC-CH-001',
    entityTitle: 'Fiducia Centrale Clearing Hub',
    custodian: 'FINMA-COMPLIANCE-DELEGATE',
    multiSigStatus: 'EXECUTED',
    legalParentReference: 'FATF Recommendation 16 (Travel Rule) & BIS Agora Protocol',
    verified: true,
    complianceCert: 'FATF-IVMS101-CLEARED',
    payloadData: {
      corridor: 'Zurich (SIC/Helvetia) ⇄ Frankfurt (Eurosystem TARGET)',
      grossVolume: '15,400,000 FCHF ⇄ 16,350,000 EUR',
      settlementTimeMs: 340
    }
  }
];

export const INITIAL_SIGNERS: MultiSigSigner[] = [
  {
    id: 'SIG-01',
    name: 'Shane Jonathan Lozenich',
    role: 'Archivist-in-Chief & Keeper of the Great Seal',
    location: 'Zurich Hauptsitz, Switzerland',
    keyFingerprint: 'CH-ZH-8821-4A9B-ED10-33FC',
    type: 'Hardware Key (YubiKey)',
    status: 'ACTIVE'
  },
  {
    id: 'SIG-02',
    name: 'Shane Jonathan Lozenich',
    role: 'Chief Fiduciary Trustee & Sovereign Notary',
    location: 'Geneva Office, Switzerland',
    keyFingerprint: 'CH-GE-1904-7C2A-BB09-41DA',
    type: 'Biometric Passkey',
    status: 'ACTIVE'
  },
  {
    id: 'SIG-03',
    name: 'Shane Jonathan Lozenich',
    role: 'FINMA Regulatory Compliance Delegate',
    location: 'Bern Headquarters, Switzerland',
    keyFingerprint: 'CH-BE-5512-99EA-02C1-77BA',
    type: 'Fiduciary Seal',
    status: 'ACTIVE'
  },
  {
    id: 'SIG-04',
    name: 'Shane Jonathan Lozenich',
    role: 'Independent Custodian & Vault Controller',
    location: 'Basel Precious Metals Depository, Switzerland',
    keyFingerprint: 'CH-BS-3390-11DC-87F0-99E1',
    type: 'Hardware Key (YubiKey)',
    status: 'ACTIVE'
  },
  {
    id: 'SIG-05',
    name: 'Securosys Primus HSM v3',
    role: 'Autonomous ZK Cryptographic Enclave (Presidium Shane Jonathan Lozenich)',
    location: 'Zug Crypto Valley Datacenter, Switzerland',
    keyFingerprint: 'CH-ZG-9000-HSM3-ZK01-SEC9',
    type: 'Securosys HSM',
    status: 'ACTIVE'
  }
];

export const INITIAL_PROPOSALS: MultiSigProposal[] = [
  {
    id: 'PROP-2026-08',
    title: 'Mint 10,000,000 FCHF against Allocated Gotthard Gold Bar Series #992',
    type: 'CURRENCY_MINT',
    requestedAmount: 10000000,
    currency: 'FCHF',
    targetEntityId: 'FC-CH-002',
    createdAt: '2026-09-23T01:15:00Z',
    requiredSignatures: 3,
    signatures: [
      {
        signerId: 'SIG-01',
        signedAt: '2026-09-23T01:30:00Z',
        keyHash: '0x88fca91129b0487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854ce'
      },
      {
        signerId: 'SIG-04',
        signedAt: '2026-09-23T02:05:00Z',
        keyHash: '0x43ca0981dfbc9871109923847aef99a2c41870ef45b230198cd491aaef021890'
      }
    ],
    status: 'PENDING',
    details: 'Full reserve verification completed by physical ultrasonic acoustic test. Awaiting 3rd institutional signature from Shane Jonathan Lozenich (Bern Office or Geneva Passkey) to execute atomic block commit.',
    hash: '0x99201984bc0192847aef982001928bfa9821800293847291aebcd09118940192'
  },
  {
    id: 'PROP-2026-09',
    title: 'Approve Tranche B (35,000,000 CHF) Credit Line for Alpine Hydropower Modernization',
    type: 'CREDIT_ISSUANCE',
    requestedAmount: 35000000,
    currency: 'CHF',
    targetEntityId: 'FC-CH-003',
    createdAt: '2026-09-23T02:00:00Z',
    requiredSignatures: 3,
    signatures: [
      {
        signerId: 'SIG-02',
        signedAt: '2026-09-23T02:15:00Z',
        keyHash: '0x55d8120fa94bc21893c501198fba00293847291aebcd091189401928374a5819'
      }
    ],
    status: 'PENDING',
    details: 'Regenerative loan facility with 148% collateral ratio. SDG-7 clean energy criteria verified. Awaiting 2 more signatures from Shane Jonathan Lozenich seats.',
    hash: '0x3c99a01f9284bc710293847291aebcd091189401928374a58197e8b91a0c4f2e'
  }
];

export const INITIAL_CREDIT_FACILITIES: CreditFacility[] = [
  {
    id: 'CRED-VALAIS-01',
    borrower: 'Cantonal Clean Hydro Consortium (Valais)',
    counterpartyType: 'Infrastructure Authority',
    facilityAmountCHF: 180000000,
    drawnAmountCHF: 110000000,
    interestRate: 1.65,
    maturityDate: '2036-12-31',
    collateralType: 'Hydroelectric Basin Concessions & Turbine Assets',
    collateralValueCHF: 275000000,
    collateralRatio: 152.7,
    hdiAlignmentScore: 95,
    sdgGoals: [7, 9, 13],
    status: 'ACTIVE',
    ultraViresAuditStatus: 'CLEARED',
    governingLaw: 'Swiss Code of Obligations & Cantonal Concession Law'
  },
  {
    id: 'CRED-GENEVA-AERO',
    borrower: 'Aerogate Geneva Bonded Logistics SA',
    counterpartyType: 'Infrastructure Authority',
    facilityAmountCHF: 95000000,
    drawnAmountCHF: 60000000,
    interestRate: 1.85,
    maturityDate: '2032-06-30',
    collateralType: 'Special Bonded Warehousing & Robotic Cold-Vaults',
    collateralValueCHF: 140000000,
    collateralRatio: 147.3,
    hdiAlignmentScore: 89,
    sdgGoals: [8, 9, 11],
    status: 'ACTIVE',
    ultraViresAuditStatus: 'CLEARED',
    governingLaw: 'Swiss DLT Act Art. 973d & Geneva Cantonal Law'
  },
  {
    id: 'CRED-REGEN-SOIL',
    borrower: 'Swiss Alpine Regenerative Agriculture Foundation',
    counterpartyType: 'Regenerative Trust',
    facilityAmountCHF: 45000000,
    drawnAmountCHF: 28000000,
    interestRate: 1.25,
    maturityDate: '2035-09-15',
    collateralType: 'Perpetual Conservation Land Deeds (Engadine Valley)',
    collateralValueCHF: 72000000,
    collateralRatio: 160.0,
    hdiAlignmentScore: 98,
    sdgGoals: [2, 12, 15],
    status: 'ACTIVE',
    ultraViresAuditStatus: 'CLEARED',
    governingLaw: 'Swiss Civil Code (ZGB) & Swiss Forest & Land Protection Act'
  }
];

export const INITIAL_RESERVES: CurrencyReserve[] = [
  {
    assetCode: 'FCHF',
    name: 'Fiducia Swiss Franc (Digital Reserve Unit)',
    type: 'Digital Fiat',
    circulatingUnits: 385000000,
    unitValueCHF: 1.00,
    backingRatio: 104.2,
    custodianDepository: 'Swiss National Bank (SNB) Clearing Account & Gotthard Deep Vault',
    lastAuditTimestamp: '2026-09-23T06:00:00Z',
    merkleProofHash: '0x8f2a91b40c21e582910fa487b32c04e8912ef114a87e8b91a0c4f2e519280d83'
  },
  {
    assetCode: 'FRU',
    name: 'Fiducia Reserve Unit (Synthetic Global Basket)',
    type: 'Reserve Unit',
    circulatingUnits: 120000000,
    unitValueCHF: 1.34,
    backingRatio: 107.5,
    custodianDepository: 'BIS Multi-Asset Tripartite Escrow (Basel)',
    lastAuditTimestamp: '2026-09-23T05:30:00Z',
    merkleProofHash: '0x3c99a01f9284bc710293847291aebcd091189401928374a58197e8b91a0c4f2e'
  },
  {
    assetCode: 'XAU_VAULT',
    name: 'Physical Allocated Swiss Gold Bullion (999.9)',
    type: 'Physical Gold',
    circulatingUnits: 15400, // kg
    unitValueCHF: 78500, // per kg
    backingRatio: 100.0,
    custodianDepository: 'Gotthard Sovereign Mountain Bunker Vault #3',
    lastAuditTimestamp: '2026-09-22T18:00:00Z',
    merkleProofHash: '0x99a2c41870ef45b230198cd491aaef021890cfb238914028ea5590cba1192873'
  },
  {
    assetCode: 'SNB_RESERVE',
    name: 'Swiss National Bank Cash & Sight Deposits',
    type: 'Central Bank Cash',
    circulatingUnits: 250000000,
    unitValueCHF: 1.00,
    backingRatio: 100.0,
    custodianDepository: 'Swiss National Bank (SNB) Zurich/Bern',
    lastAuditTimestamp: '2026-09-23T07:00:00Z',
    merkleProofHash: '0x71290cfba89120487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854'
  }
];

export const INITIAL_ECONOMIC_ASSETS: EconomicAsset[] = [
  {
    id: 'ASSET-GTT-01',
    name: 'Gotthard Sovereign Gold & Strategic Specie Vault',
    category: 'Alpine Depository',
    location: 'Gotthard Massif, Canton Uri, Switzerland',
    coordinates: [46.5583, 8.5614],
    valuationCHF: 1250000000,
    tokenContractId: '0x7e8b...91a0',
    custodian: 'Fiducia Vault Security AG / Swiss Armed Forces Reserve Corridor',
    jurisdiction: 'Swiss Confederation / Military Hardened Zone',
    status: 'AUDITED & ACTIVE',
    blockchainProof: '0x8f2a91b40c21e582910fa487b32c04e8912ef114a87e8b91a0c4f2e519280d83',
    lastInspection: '2026-09-18 (Ultrasonic Acoustic Scan Clean)',
    legalFramework: 'Swiss Precious Metals Control Act & DLT Act Art. 973d'
  },
  {
    id: 'ASSET-RDM-02',
    name: 'Port of Rotterdam Green Hydrogen & Archival Bonded Depot',
    category: 'Maritime & Port',
    location: 'Maasvlakte 2, Rotterdam, Netherlands',
    coordinates: [51.9567, 4.0416],
    valuationCHF: 340000000,
    tokenContractId: '0x3c99...4f2e',
    custodian: 'Rotterdam Custodial Logistics NV / Fiducia Trustee',
    jurisdiction: 'Kingdom of the Netherlands / EU Maritime Corridor',
    status: 'AUDITED & ACTIVE',
    blockchainProof: '0x19a0f44b912cde87123908ff901288fca91129b0487cd9e4198230aa7e8b91a0',
    lastInspection: '2026-08-29 (Lloyds Register Audit Satisfied)',
    legalFramework: 'EU Port Regulation & Dutch Civil Code Book 8'
  },
  {
    id: 'ASSET-GVA-03',
    name: 'Aerogate Geneva International Custodial Logistics Hub',
    category: 'Aerogate Hub',
    location: 'Geneva Cointrin International Airport Freezone',
    coordinates: [46.2370, 6.1092],
    valuationCHF: 420000000,
    tokenContractId: '0x7129...d854',
    custodian: 'Aerogate Infrastructure Authority SA',
    jurisdiction: 'Canton of Geneva / Swiss Confederation',
    status: 'AUDITED & ACTIVE',
    blockchainProof: '0x3310fa29bc0192847aef982001928bfa9821800293847291aebcd09118940192',
    lastInspection: '2026-09-02 (FOCA & Swiss Customs Inspection Passed)',
    legalFramework: 'Swiss Aviation Act & Geneva Special Freezone Statute'
  },
  {
    id: 'ASSET-VAL-04',
    name: 'Rhône Glacial Catchment & Hydropower Hydro-Grid',
    category: 'Regenerative Land',
    location: 'Upper Rhône Valley, Canton Valais, Switzerland',
    coordinates: [46.4312, 8.1256],
    valuationCHF: 510000000,
    tokenContractId: '0x55d8...5819',
    custodian: 'Cantonal Energy Stewardship Consortium (Valais)',
    jurisdiction: 'Canton of Valais / Swiss Federal Water Rights Act',
    status: 'AUDITED & ACTIVE',
    blockchainProof: '0x88910ac2bfda39011832049177ba1192873491aaef021890cfb238914028ea55',
    lastInspection: '2026-09-12 (Swiss Federal Office of Energy SFOE Certified)',
    legalFramework: 'Swiss Water Rights Act & Swiss DLT Uncertificated Securities'
  },
  {
    id: 'ASSET-ZUR-05',
    name: 'Paradeplatz Financial Heritage Sanctuary & Vault',
    category: 'Private Heritage Trust',
    location: 'Paradeplatz 8, 8001 Zurich, Switzerland',
    coordinates: [47.3698, 8.5393],
    valuationCHF: 295000000,
    tokenContractId: '0x9920...0192',
    custodian: 'Fiducia Heritage Trust AG & Swiss Notary Chamber',
    jurisdiction: 'Canton of Zurich / Swiss Commercial Registry',
    status: 'AUDITED & ACTIVE',
    blockchainProof: '0x99201984bc0192847aef982001928bfa9821800293847291aebcd09118940192',
    lastInspection: '2026-09-01 (Cantonal Monument & Vault Audit Compliant)',
    legalFramework: 'Swiss Civil Code (ZGB) & Swiss Monument Protection'
  }
];

export const INITIAL_SETTLEMENTS: SettlementTransaction[] = [
  {
    id: 'SETTL-CH-EU-9901',
    txType: 'DvP',
    senderJurisdiction: 'Switzerland (Zurich / SIC)',
    senderEntity: 'Fiducia Centrale Reserve Pool',
    receiverJurisdiction: 'Germany (Frankfurt / Deutsche Bundesbank)',
    receiverEntity: 'European Central Bank Collateral Desk',
    settlementCorridor: 'Project Agora Corridor (Swiss Helvetia ⇄ Eurosystem TIPS)',
    deliverAmount: '25,000,000 FCHF',
    receiveAmount: '26,540,000 EUR Sovereign Green Bunds',
    timestamp: '2026-09-23T07:15:22Z',
    status: 'COMPLETED',
    travelRuleIVMS101: true,
    clearingHash: '0x1290cfba89120487cd9e4198230aa7e8b91a0c4f2e519280d8329ab0f62d854ce'
  },
  {
    id: 'SETTL-CH-UK-9902',
    txType: 'PvP',
    senderJurisdiction: 'Switzerland (Geneva Fiduciary)',
    senderEntity: 'Cantonal Energy Stewardship Pool',
    receiverJurisdiction: 'United Kingdom (London / CHAPS)',
    receiverEntity: 'Barclays Sustainable Capital Syndicate',
    settlementCorridor: 'Swiss-UK Berne Financial Services Agreement Rail',
    deliverAmount: '14,200,000 FCHF',
    receiveAmount: '12,850,000 GBP',
    timestamp: '2026-09-23T08:33:10Z',
    status: 'SETTLED_RTGS',
    travelRuleIVMS101: true,
    clearingHash: '0x3c99a01f9284bc710293847291aebcd091189401928374a58197e8b91a0c4f2e'
  },
  {
    id: 'SETTL-CH-SG-9903',
    txType: 'DvP',
    senderJurisdiction: 'Singapore (MAS MEPS+)',
    senderEntity: 'Temasek Maritime Infrastructure Fund',
    receiverJurisdiction: 'Switzerland (Zurich / DLT Vault)',
    receiverEntity: 'Fiducia Global Logistics Custody Trust',
    settlementCorridor: 'Swiss-Singapore Project Ubin-Helvetia Corridor',
    deliverAmount: '45,000,000 SGD',
    receiveAmount: '30,800,000 FCHF Tokenized Asset Shares',
    timestamp: '2026-09-23T08:58:44Z',
    status: 'COMPLETED',
    travelRuleIVMS101: true,
    clearingHash: '0x8f2a91b40c21e582910fa487b32c04e8912ef114a87e8b91a0c4f2e519280d83'
  }
];
