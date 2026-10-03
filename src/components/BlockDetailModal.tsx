/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Copy, 
  FileCode, 
  RefreshCw 
} from 'lucide-react';
import { ProvenanceBlock } from '../types/fiducia';
import { truncateHash, sha256 } from '../utils/crypto';

interface BlockDetailModalProps {
  block: ProvenanceBlock | null;
  onClose: () => void;
}

export const BlockDetailModal: React.FC<BlockDetailModalProps> = ({
  block,
  onClose
}) => {
  if (!block) return null;

  const [copiedHash, setCopiedHash] = useState(false);
  const [liveRecalculatedHash, setLiveRecalculatedHash] = useState<string | null>(null);
  const [isVerifyingBlock, setIsVerifyingBlock] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const verifyThisBlock = async () => {
    setIsVerifyingBlock(true);
    const dataToHash = `${block.previousHash}:${block.blockNumber}:${block.action}:${block.entityId}:${block.timestamp}`;
    const hash = await sha256(dataToHash);
    setLiveRecalculatedHash(hash);
    setIsVerifyingBlock(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#121620] border border-slate-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                PROVENANCE BLOCK #{block.blockNumber}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                {block.action}
              </span>
            </div>
            <h3 className="text-base font-corporate font-bold text-slate-100 mt-1">
              Cryptographic Block Inspection
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-lg leading-none p-1"
          >
            ✕
          </button>
        </div>

        {/* Hashes & Linkage */}
        <div className="space-y-3 bg-[#0d1017] p-3.5 rounded-lg border border-slate-800 text-xs font-mono">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
              <span>BLOCK HASH (SHA-256):</span>
              <button
                onClick={() => handleCopy(block.hash)}
                className="text-slate-300 hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedHash ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-200 break-all text-[11px]">
              {block.hash}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px] mb-1">PREVIOUS BLOCK HASH (PARENT LINK):</div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 break-all text-[11px]">
              {block.previousHash}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px] mb-1">MERKLE ROOT TREE:</div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400 break-all text-[11px]">
              {block.merkleRoot}
            </div>
          </div>
        </div>

        {/* Live Re-calculation verification */}
        <div className="bg-[#0d1017] p-3 rounded-lg border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-200 block">Recalculate WebCrypto SHA-256</span>
            <span className="text-slate-400 text-[11px]">Validates block payload against local cryptographic subsystem.</span>
          </div>

          <button
            onClick={verifyThisBlock}
            disabled={isVerifyingBlock}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingBlock ? 'animate-spin' : ''}`} />
            <span>Verify Locally</span>
          </button>
        </div>

        {liveRecalculatedHash && (
          <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <span>Local SHA-256 Digest Confirmed: </span>
              <strong className="font-mono text-emerald-300">{truncateHash(liveRecalculatedHash, 12, 10)}</strong>
            </div>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Timestamp</span>
            <span className="text-slate-200 font-medium">{new Date(block.timestamp).toLocaleString()} CET</span>
          </div>

          <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Custodian Delegated</span>
            <span className="text-slate-200 font-mono font-medium">{block.custodian}</span>
          </div>

          <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Stratum & Level</span>
            <span className="text-slate-200 font-mono font-medium">{block.stratum} • {block.level}</span>
          </div>

          <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Multi-Sig Consensus</span>
            <span className="text-emerald-400 font-mono font-medium">{block.multiSigStatus}</span>
          </div>
        </div>

        {/* Raw Payload JSON */}
        {block.payloadData && (
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400 mb-1 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              Raw Block Payload Data
            </div>
            <pre className="bg-[#0d1017] p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
              {JSON.stringify(block.payloadData, null, 2)}
            </pre>
          </div>
        )}

        <div className="pt-2 flex justify-end border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
