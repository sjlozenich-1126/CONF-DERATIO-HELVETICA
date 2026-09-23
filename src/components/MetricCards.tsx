/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Database, TrendingUp, Vault, Link2, CheckCircle2 } from 'lucide-react';
import { formatCHF } from '../utils/crypto';

interface MetricCardsProps {
  totalAssetsCHF: number;
  circulatingFCHF: number;
  circulatingFRU: number;
  totalCreditActiveCHF: number;
  blockHeight: number;
  latestBlockHash: string;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalAssetsCHF,
  circulatingFCHF,
  circulatingFRU,
  totalCreditActiveCHF,
  blockHeight,
  latestBlockHash
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {/* Card 1: Total Global Assets Tracked */}
      <div className="bg-[#0b1329]/80 border border-slate-800 rounded-lg p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-sm">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all" />
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Assets Under Custody</span>
          <Vault className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-xl font-bold font-cinzel text-slate-100">
          {formatCHF(totalAssetsCHF)}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
          <span>Swiss DLT Art. 973d</span>
          <span className="text-emerald-400 font-medium">100% Segregated</span>
        </div>
      </div>

      {/* Card 2: Reserve Currency (FCHF & FRU) */}
      <div className="bg-[#0b1329]/80 border border-slate-800 rounded-lg p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-sm">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Circulating Currency</span>
          <Database className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-xl font-bold font-mono text-slate-100 flex items-baseline gap-1.5">
          <span>{(circulatingFCHF / 1e6).toFixed(1)}M</span>
          <span className="text-xs text-amber-400 font-sans font-normal">FCHF</span>
          <span className="text-xs text-slate-500 font-sans">/</span>
          <span className="text-sm text-slate-300 font-mono">{(circulatingFRU / 1e6).toFixed(0)}M</span>
          <span className="text-xs text-slate-400 font-sans font-normal">FRU</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
          <span>Backing Ratio</span>
          <span className="text-emerald-400 font-medium font-mono">104.2% (Audited)</span>
        </div>
      </div>

      {/* Card 3: Active Credit & Regenerative Facilities */}
      <div className="bg-[#0b1329]/80 border border-slate-800 rounded-lg p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-sm">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Regenerative Credit</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-xl font-bold font-cinzel text-slate-100">
          {formatCHF(totalCreditActiveCHF)}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
          <span>Avg. Collateralization</span>
          <span className="text-emerald-400 font-mono font-medium">153.3% Over-Collateralized</span>
        </div>
      </div>

      {/* Card 4: S06 Cryptographic Chain Status */}
      <div className="bg-[#0b1329]/80 border border-slate-800 rounded-lg p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-sm">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all" />
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">S06 Ledger Height</span>
          <Link2 className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-2">
          <span>#{blockHeight}</span>
          <span className="text-[11px] text-slate-400 font-mono truncate max-w-[120px]">
            {latestBlockHash.slice(0, 10)}...
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
          <span>FINMA Compliance</span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            100% Invariants Clear
          </span>
        </div>
      </div>
    </div>
  );
};
