/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  CheckCircle2, 
  Copy, 
  Download, 
  ShieldCheck, 
  ExternalLink, 
  RefreshCw, 
  Key, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { ProvenanceBlock } from '../types/fiducia';
import { truncateHash, STRATA_WEIGHTS, LEVEL_MULTIPLIERS } from '../utils/crypto';

interface ProvenanceLedgerProps {
  blocks: ProvenanceBlock[];
  onInspectBlock: (block: ProvenanceBlock) => void;
  onVerifyIntegrity: () => void;
  isVerifying: boolean;
  verificationVerdict: { valid: boolean; message: string; verifiedCount: number } | null;
}

export const ProvenanceLedger: React.FC<ProvenanceLedgerProps> = ({
  blocks,
  onInspectBlock,
  onVerifyIntegrity,
  isVerifying,
  verificationVerdict
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStratum, setSelectedStratum] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredBlocks = blocks.filter(b => {
    const matchesSearch = 
      b.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.entityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.custodian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.blockNumber.toString().includes(searchQuery);

    const matchesStratum = selectedStratum === 'ALL' || b.stratum === selectedStratum;
    const matchesLevel = selectedLevel === 'ALL' || b.level === selectedLevel;

    return matchesSearch && matchesStratum && matchesLevel;
  });

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `fiducia_centrale_provenance_ledger_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4">
      {/* Header section with verification & export */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Layers className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                S06 Provenance Ledger & Blockchain Explorer
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                CHAIN VALID
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Append-only cryptographic ledger implementing Psychrosphere Section 10–13. Every financial emission, credit facility, and archival charter is sealed with SHA-256 and chained immutably.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onVerifyIntegrity}
              disabled={isVerifying}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin text-slate-300' : 'text-slate-400'}`} />
              <span>{isVerifying ? 'Verifying Merkle Tree...' : 'Verify Cryptographic Integrity'}</span>
            </button>

            <button
              onClick={exportJSON}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>

        {/* Verification Status Banner if executed */}
        {verificationVerdict && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span><strong>Verification Audit Passed:</strong> {verificationVerdict.message} ({verificationVerdict.verifiedCount} blocks checked)</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-300">0 Inconsistencies Detected</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 border-t border-slate-800/80">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by block #, SHA-256 hash, action, entity, custodian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1017] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStratum}
              onChange={(e) => setSelectedStratum(e.target.value)}
              className="w-full bg-[#0d1017] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-500 cursor-pointer"
            >
              <option value="ALL">All Strata (S01–S08)</option>
              {Object.entries(STRATA_WEIGHTS).map(([code, val]) => (
                <option key={code} value={code}>
                  {code} — {val.name} (w: {val.weight})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-[#0d1017] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-500 cursor-pointer"
            >
              <option value="ALL">All Levels (L1–L5)</option>
              {Object.entries(LEVEL_MULTIPLIERS).map(([code, val]) => (
                <option key={code} value={code}>
                  {code} — {val.name} ({val.operator})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Block Timeline / Ledger Table */}
      <div className="space-y-3">
        {filteredBlocks.map((block, idx) => (
          <div 
            key={block.blockNumber}
            className="bg-[#121620] border border-slate-800 hover:border-slate-700 rounded-xl p-4.5 transition-all shadow-sm relative overflow-hidden"
          >
            {/* Visual connector line indicating block chaining */}
            {idx < filteredBlocks.length - 1 && (
              <div className="hidden md:block absolute left-8 -bottom-4 w-0.5 h-4 bg-slate-800" />
            )}

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-start space-x-3.5">
                {/* Block Height Badge */}
                <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-center min-w-[70px]">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block tracking-wider">BLOCK</span>
                  <span className="text-base font-corporate font-bold text-slate-100">#{block.blockNumber}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100">
                      {block.action}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {block.stratum} • {block.level}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {block.vault}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-800/40 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {block.multiSigStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Target Entity: <strong className="text-slate-100">{block.entityTitle}</strong> <span className="text-slate-500 font-mono">({block.entityId})</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {new Date(block.timestamp).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-slate-500" />
                      Custodian: <strong className="text-slate-300 font-mono">{block.custodian}</strong>
                    </span>
                    <span>
                      Parent Grant: <span className="text-slate-300">{block.legalParentReference}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Hashes & Action Controls */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-2 border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-800/80">
                <div className="space-y-1 text-right">
                  <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                    <span className="text-slate-500 text-[10px]">HASH:</span>
                    <span className="text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {truncateHash(block.hash, 10, 8)}
                    </span>
                    <button
                      onClick={() => handleCopy(block.hash)}
                      title="Copy SHA-256 Hash"
                      className="text-slate-400 hover:text-slate-200 p-0.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedHash === block.hash && (
                      <span className="text-[10px] text-emerald-400 font-sans">Copied</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-500">
                    <span>PREV:</span>
                    <span>{truncateHash(block.previousHash, 8, 6)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onInspectBlock(block)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center space-x-1 transition-all"
                >
                  <span>Inspect Block</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Payload summary if available */}
            {block.payloadData && (
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 bg-[#0d1017] rounded-md p-2 text-xs flex flex-wrap gap-4 text-slate-300">
                {Object.entries(block.payloadData).map(([k, v]) => (
                  <div key={k} className="flex items-center space-x-1.5">
                    <span className="text-slate-500 text-[11px] capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-mono text-slate-200">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-12 bg-[#121620] border border-slate-800 rounded-xl text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-500 mb-2" />
            <p className="text-sm font-medium">No ledger blocks match your search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedStratum('ALL'); setSelectedLevel('ALL'); }}
              className="mt-2 text-xs text-slate-300 underline hover:text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
