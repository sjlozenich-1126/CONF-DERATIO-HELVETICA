/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Key, 
  Printer, 
  Copy, 
  ExternalLink,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { SystemLifecycleEntity, ProvenanceBlock } from '../types/fiducia';
import { truncateHash, STRATA_WEIGHTS, LEVEL_MULTIPLIERS, formatCHF } from '../utils/crypto';

interface EntityDetailModalProps {
  entity: SystemLifecycleEntity | null;
  onClose: () => void;
  onSelectBlock?: (blockHash: string) => void;
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({
  entity,
  onClose,
  onSelectBlock
}) => {
  if (!entity) return null;

  const [copiedSeal, setCopiedSeal] = useState(false);

  const handleCopySeal = () => {
    navigator.clipboard.writeText(entity.cryptographicSeal);
    setCopiedSeal(true);
    setTimeout(() => setCopiedSeal(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b1329] border border-slate-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                CASE-FILE DOSSIER #{entity.id}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                {entity.status}
              </span>
            </div>
            <h3 className="text-base font-cinzel font-bold text-slate-100 mt-1">
              {entity.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              title="Print Case-File Dossier"
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 text-lg leading-none p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Primary Placement Coordinates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#080d1c] border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Stratum</span>
            <span className="font-bold text-slate-200 font-mono">{entity.stratum}</span>
            <span className="text-[10px] text-slate-400 block truncate">{STRATA_WEIGHTS[entity.stratum]?.name}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080d1c] border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Level</span>
            <span className="font-bold text-slate-200 font-mono">{entity.level}</span>
            <span className="text-[10px] text-amber-300 block">{LEVEL_MULTIPLIERS[entity.level]?.operator}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080d1c] border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Core Vault</span>
            <span className="font-bold text-slate-200 truncate block">{entity.vault}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080d1c] border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Effective Power</span>
            <span className="font-bold text-amber-400 font-mono text-sm">{entity.powerMetric} P_eff</span>
          </div>
        </div>

        {/* Legal Authority & Parent Grant */}
        <div className="space-y-3 text-xs bg-[#080d1c] p-3.5 rounded-lg border border-slate-800">
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">Parent Enabling Grant / Statute:</span>
            <span className="text-slate-200 font-mono mt-0.5 block">{entity.parentGrant}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-slate-400 text-[11px] block">Designated Holder / Office:</span>
              <span className="text-slate-200 font-medium">{entity.holder}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Issuing Authority / Body:</span>
              <span className="text-slate-200 font-medium">{entity.issuingBody}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Legal Jurisdiction:</span>
              <span className="text-slate-200 font-medium">{entity.jurisdiction}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Effective Registration Date:</span>
              <span className="text-slate-200 font-medium">{entity.effectiveDate}</span>
            </div>
          </div>
        </div>

        {/* Four-Question Separation Checklist */}
        <div className="p-3.5 rounded-lg bg-[#080d1c] border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Atlas Four-Question Separation Checklist
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>(1) Origin vs Authority: Tested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>(2) Evidence vs Title: Strictly Disjoint</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>(3) Capacity vs Competence: Ratified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>(4) Sovereign Multiplicity: Bound</span>
            </div>
          </div>
        </div>

        {/* Cryptographic Seal & Signatures */}
        <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] font-mono">CRYPTOGRAPHIC SEAL (SHA-256):</span>
            <button
              onClick={handleCopySeal}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedSeal ? 'Copied' : 'Copy Seal'}</span>
            </button>
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-800 font-mono text-[10px] text-amber-300/90 break-all">
            {entity.cryptographicSeal}
          </div>

          <div className="pt-1 flex flex-wrap gap-2 items-center text-[11px] text-slate-400">
            <span className="text-slate-500">Signatories:</span>
            {entity.signatories.map((sig, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                {sig}
              </span>
            ))}
          </div>
        </div>

        {/* Lifecycle Verb History Log */}
        <div>
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Immutable History Log (State Transitions)
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {entity.historyLog.map(h => (
              <div key={h.id} className="p-2 bg-[#080d1c] rounded border border-slate-800 text-xs flex justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-300">{h.verb}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{h.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{h.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium block">{h.operator}</span>
                  <span className="text-[9px] font-mono text-slate-600">{truncateHash(h.hash, 6, 4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
