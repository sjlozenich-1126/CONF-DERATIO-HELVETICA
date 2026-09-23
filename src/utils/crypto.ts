/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cryptographic & Financial Math Utilities for Fiducia Centrale
 */

import { AtlasLevel, AtlasStratum } from '../types/fiducia';

// Asynchronously compute real SHA-256 hash using Web Crypto API
export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Synchronous fast fallback / display generator when needed
export function quickHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}${str.length.toString(16).padStart(4, '0')}7f4c919d3e8a12bc90a4df7e`;
}

// Compute Merkle Root of an array of string hashes
export async function computeMerkleRoot(hashes: string[]): Promise<string> {
  if (hashes.length === 0) return '0x0000000000000000000000000000000000000000000000000000000000000000';
  if (hashes.length === 1) return hashes[0];

  let currentLevel = [...hashes];
  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      if (i + 1 < currentLevel.length) {
        const combined = await sha256(currentLevel[i] + currentLevel[i + 1]);
        nextLevel.push(combined);
      } else {
        // Duplicate odd element as standard in bitcoin/merkle trees
        const combined = await sha256(currentLevel[i] + currentLevel[i]);
        nextLevel.push(combined);
      }
    }
    currentLevel = nextLevel;
  }
  return currentLevel[0];
}

// Fixed Stratum Weights based on Psychrosphere Atlas Section 12 & 13
export const STRATA_WEIGHTS: Record<AtlasStratum, { name: string; weight: number }> = {
  S01: { name: 'Identity & Evidence Inputs', weight: 1.0 },
  S02: { name: 'Constitutional / Treaty Authority', weight: 5.0 },
  S03: { name: 'Statutory Authority', weight: 4.0 },
  S04: { name: 'Administrative Authority', weight: 3.0 },
  S05: { name: 'Certification / Authentication', weight: 3.5 },
  S06: { name: 'Provenance / Custody', weight: 4.5 },
  S07: { name: 'Private Succession / Estate', weight: 2.5 },
  S08: { name: 'Procedural Legal Authority', weight: 3.0 },
};

// Fixed Level Multipliers based on Five Levels (L1-L5)
export const LEVEL_MULTIPLIERS: Record<AtlasLevel, { name: string; operator: string; multiplier: number }> = {
  L1: { name: 'Ground Axioms & Inputs', operator: 'Will & Way', multiplier: 1.0 },
  L2: { name: 'Philosophy & Ideology', operator: 'Ego', multiplier: 1.5 },
  L3: { name: 'Policy, Law & Governance', operator: 'Can', multiplier: 2.2 },
  L4: { name: 'Methodology & Systems', operator: 'Able', multiplier: 3.0 },
  L5: { name: 'Concrete Execution', operator: 'Must / Does', multiplier: 4.0 },
};

/**
 * Psychrosphere Power Formula:
 * P_effective ≈ BaseWeight(Stratum) × LevelMultiplier(Level) × SealFactor
 * SealFactor: 1.0 standard, 1.25 for Swiss Seal / FINMA Verified, 1.50 for Multi-Sig 3/5
 */
export function calculatePowerMetric(
  stratum: AtlasStratum,
  level: AtlasLevel,
  sealFactor = 1.25
): number {
  const base = STRATA_WEIGHTS[stratum]?.weight || 2.0;
  const mult = LEVEL_MULTIPLIERS[level]?.multiplier || 1.0;
  return Number((base * mult * sealFactor).toFixed(2));
}

// Currency format in CHF
export function formatCHF(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Compact hash display e.g. 0x8f2a...91ce
export function truncateHash(hash: string, front = 8, back = 6): string {
  if (!hash || hash.length <= front + back) return hash;
  return `${hash.slice(0, front)}...${hash.slice(-back)}`;
}
