/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Fiducia Centrale & Psychrosphere Atlas Data Types
 */

export type AtlasLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface AtlasLevelInfo {
  code: AtlasLevel;
  name: string;
  operator: string;
  domain: string;
  multiplier: number;
}

export type AtlasStratum = 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08';

export interface AtlasStratumInfo {
  code: AtlasStratum;
  name: string;
  description: string;
  baseWeight: number;
}

export type CoreVault = 
  | 'Charter Repository'
  | 'Treaty Vault'
  | 'Ethos & Local Color'
  | 'Truth & Media Log'
  | 'Lineage Index'
  | 'Seal & Attestation Archive';

export type AuthorityBranch = 
  | 'Swiss Sovereign & Verein Registry'
  | 'European Legal Orders'
  | 'Federal Reserve & Central Banking'
  | 'International Archive & Provenance'
  | 'Regenerative Capital & Global Reserves'
  | 'Maritime & Aerogate Infrastructure';

export type LifecycleVerb = 
  | 'Classify'
  | 'Categorize'
  | 'Appoint'
  | 'Approve/Deny'
  | 'Balance'
  | 'Issue'
  | 'Revoke'
  | 'Reorganize'
  | 'Create';

export type EntityStatus = 
  | 'DRAFT'
  | 'PROVISIONAL'
  | 'PENDING_APPROVAL'
  | 'CONDITIONALLY_APPOINTED'
  | 'APPROVED'
  | 'ISSUED'
  | 'ACTIVE'
  | 'REVOKED'
  | 'SUSPENDED';

export interface HistoryLogEntry {
  id: string;
  timestamp: string;
  verb: LifecycleVerb | string;
  operator: string;
  notes: string;
  hash: string;
}

export interface SystemLifecycleEntity {
  id: string;
  title: string;
  targetType: 'Instrument' | 'Trust' | 'Asset' | 'Credit Facility' | 'Reserve Token' | 'Charter' | 'Identity Node';
  holder: string;
  issuingBody: string;
  stratum: AtlasStratum;
  level: AtlasLevel;
  branch: AuthorityBranch;
  vault: CoreVault;
  status: EntityStatus;
  powerMetric: number;
  parentGrant: string;
  effectiveDate: string;
  jurisdiction: string;
  cryptographicSeal: string;
  signatories: string[];
  historyLog: HistoryLogEntry[];
  complianceNotes?: string;
  hdiScore?: number;
  sdgTags?: string[];
  valuationCHF?: number;
}

export interface ProvenanceBlock {
  blockNumber: number;
  timestamp: string;
  hash: string;
  previousHash: string;
  merkleRoot: string;
  stratum: AtlasStratum;
  level: AtlasLevel;
  vault: CoreVault;
  domain: string;
  action: string;
  entityId: string;
  entityTitle: string;
  custodian: string;
  multiSigStatus: '1/1' | '3/5' | 'PENDING' | 'EXECUTED';
  legalParentReference: string;
  verified: boolean;
  complianceCert: string;
  payloadData?: Record<string, any>;
}

export interface MultiSigSigner {
  id: string;
  name: string;
  role: string;
  location: string;
  keyFingerprint: string;
  type: 'Hardware Key (YubiKey)' | 'Biometric Passkey' | 'Securosys HSM' | 'Fiduciary Seal';
  avatarUrl?: string;
  status: 'ACTIVE' | 'IDLE';
}

export interface MultiSigProposal {
  id: string;
  title: string;
  type: 'CREDIT_ISSUANCE' | 'CURRENCY_MINT' | 'ASSET_REGISTRATION' | 'ULTRA_VIRES_REVOCATION' | 'CHARTER_AMENDMENT';
  requestedAmount?: number;
  currency?: string;
  targetEntityId: string;
  createdAt: string;
  requiredSignatures: number;
  signatures: {
    signerId: string;
    signedAt: string;
    keyHash: string;
  }[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
  details: string;
  hash: string;
}

export interface CreditFacility {
  id: string;
  borrower: string;
  counterpartyType: 'Sovereign Fund' | 'Regenerative Trust' | 'Infrastructure Authority' | 'Multilateral Bank';
  facilityAmountCHF: number;
  drawnAmountCHF: number;
  interestRate: number; // percentage
  maturityDate: string;
  collateralType: string;
  collateralValueCHF: number;
  collateralRatio: number; // e.g. 145%
  hdiAlignmentScore: number; // 0 - 100
  sdgGoals: number[];
  status: 'ACTIVE' | 'COMMITTED' | 'REPAID' | 'UNDER_REVIEW';
  ultraViresAuditStatus: 'CLEARED' | 'CONDITIONAL' | 'FLAGGED';
  governingLaw: string;
}

export interface CurrencyReserve {
  assetCode: 'FCHF' | 'FRU' | 'XAU_VAULT' | 'SNB_RESERVE' | 'EU_BONDS';
  name: string;
  type: 'Digital Fiat' | 'Reserve Unit' | 'Physical Gold' | 'Central Bank Cash' | 'Sovereign Debt';
  circulatingUnits: number;
  unitValueCHF: number;
  backingRatio: number; // e.g. 102.5%
  custodianDepository: string;
  lastAuditTimestamp: string;
  merkleProofHash: string;
}

export interface EconomicAsset {
  id: string;
  name: string;
  category: 'Maritime & Port' | 'Aerogate Hub' | 'Alpine Depository' | 'Regenerative Land' | 'Sovereign Energy Grid' | 'Private Heritage Trust';
  location: string;
  coordinates: [number, number]; // lat, lng
  valuationCHF: number;
  tokenContractId: string;
  custodian: string;
  jurisdiction: string;
  status: 'AUDITED & ACTIVE' | 'IN_TRANSIT' | 'RESERVE_LOCKED';
  blockchainProof: string;
  lastInspection: string;
  legalFramework: string;
}

export interface SettlementTransaction {
  id: string;
  txType: 'DvP' | 'PvP' | 'Cross-Border Clearing';
  senderJurisdiction: string;
  senderEntity: string;
  receiverJurisdiction: string;
  receiverEntity: string;
  settlementCorridor: string;
  deliverAmount: string;
  receiveAmount: string;
  timestamp: string;
  status: 'COMPLETED' | 'SETTLED_RTGS' | 'PROCESSING' | 'PENDING_TRAVEL_RULE';
  travelRuleIVMS101: boolean;
  clearingHash: string;
}
