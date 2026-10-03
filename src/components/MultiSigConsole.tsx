/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Check, 
  Lock, 
  Fingerprint 
} from 'lucide-react';
import { MultiSigProposal, MultiSigSigner } from '../types/fiducia';
import { truncateHash } from '../utils/crypto';

interface MultiSigConsoleProps {
  signers: MultiSigSigner[];
  proposals: MultiSigProposal[];
  onSignProposal: (proposalId: string, signer: MultiSigSigner) => void;
  currentSigner: MultiSigSigner;
}

export const MultiSigConsole: React.FC<MultiSigConsoleProps> = ({
  signers,
  proposals,
  onSignProposal,
  currentSigner
}) => {
  const [signingProposalId, setSigningProposalId] = useState<string | null>(null);

  const handleSign = (proposal: MultiSigProposal) => {
    // Check if already signed
    if (proposal.signatures.some(s => s.signerId === currentSigner.id)) {
      return;
    }

    setSigningProposalId(proposal.id);
    setTimeout(() => {
      onSignProposal(proposal.id, currentSigner);
      setSigningProposalId(null);
    }, 600);
  };

  const pendingProposals = proposals.filter(p => p.status === 'PENDING');
  const executedProposals = proposals.filter(p => p.status === 'EXECUTED');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Key className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                Multi-Signature Custody Protocol (3-of-5 M-of-N)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                HARDWARE HSM ATTESTED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Safeguards high-value credit tranches, currency minting, and archival charter amendments. Requires quorum of 3 institutional Swiss keys across cantons (Zurich, Geneva, Bern, Basel, and Zug HSM).
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs">
            <Fingerprint className="w-4 h-4 text-slate-300" />
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Your Active Key</span>
              <span className="font-semibold text-slate-200">{currentSigner.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Institutional Signers Cards */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-slate-300" />
          Institutional Swiss Signatories & Cryptographic Enclaves (5 Registered Seats)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {signers.map(signer => {
            const isCurrentUser = signer.id === currentSigner.id;
            return (
              <div
                key={signer.id}
                className={`bg-[#121620] border rounded-xl p-3.5 flex flex-col justify-between transition-all ${
                  isCurrentUser
                    ? 'border-slate-500 shadow-sm bg-slate-800/60'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500">{signer.id}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${
                      signer.type.includes('HSM')
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                    }`}>
                      {signer.type.split(' ')[0]}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                    {signer.name}
                    {isCurrentUser && (
                      <span className="w-2 h-2 rounded-full bg-slate-200" title="Current Active Signer" />
                    )}
                  </h4>

                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                    {signer.role}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono">
                  <div className="text-slate-400 truncate">{signer.location}</div>
                  <div className="text-slate-300 truncate">{signer.keyFingerprint}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Proposals Queue */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-slate-300" />
            <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
              Pending Multi-Sig Proposals Queue (Awaiting Quorum)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {pendingProposals.length} Action{pendingProposals.length !== 1 ? 's' : ''} Pending
          </span>
        </div>

        {pendingProposals.length > 0 ? (
          <div className="divide-y divide-slate-800/70">
            {pendingProposals.map(proposal => {
              const signatureCount = proposal.signatures.length;
              const hasCurrentSignerSigned = proposal.signatures.some(s => s.signerId === currentSigner.id);
              const isThresholdMet = signatureCount >= proposal.requiredSignatures;

              return (
                <div key={proposal.id} className="p-5 hover:bg-slate-800/20 transition-colors space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {proposal.type}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{proposal.id}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {new Date(proposal.createdAt).toLocaleTimeString()} CET
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-100">{proposal.title}</h4>
                      <p className="text-xs text-slate-300 max-w-3xl">{proposal.details}</p>
                    </div>

                    {/* Threshold Signer Action Button */}
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-slate-300">
                          Quorum: <strong className="text-slate-100">{signatureCount}</strong> / {proposal.requiredSignatures}
                        </span>
                        <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${isThresholdMet ? 'bg-emerald-400' : 'bg-slate-300'}`}
                            style={{ width: `${Math.min(100, (signatureCount / proposal.requiredSignatures) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {hasCurrentSignerSigned ? (
                        <span className="px-3 py-1.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 text-xs font-medium flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          Signed by {currentSigner.name}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSign(proposal)}
                          disabled={signingProposalId === proposal.id}
                          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Key className={`w-3.5 h-3.5 ${signingProposalId === proposal.id ? 'animate-spin' : ''}`} />
                          <span>
                            {signingProposalId === proposal.id
                              ? 'Attesting Hardware Key...'
                              : `Authorize as ${currentSigner.name} (${currentSigner.location.split(' ')[0]})`}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Signatures Timeline */}
                  <div className="bg-[#0d1017] border border-slate-800/80 rounded-lg p-3">
                    <div className="text-[10px] uppercase font-mono text-slate-400 mb-2">
                      Cryptographic Signatures Collected ({signatureCount}/{proposal.requiredSignatures})
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {proposal.signatures.map((sig, sIdx) => {
                        const sInfo = signers.find(s => s.id === sig.signerId);
                        return (
                          <div key={sIdx} className="bg-slate-900 border border-slate-800 rounded p-2 text-xs flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div className="truncate">
                              <div className="font-medium text-slate-200 truncate">{sInfo?.name || sig.signerId}</div>
                              <div className="text-[10px] text-slate-500 font-mono truncate">
                                Hash: {truncateHash(sig.keyHash, 6, 6)}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {Array.from({ length: Math.max(0, proposal.requiredSignatures - signatureCount) }).map((_, emptyIdx) => (
                        <div key={emptyIdx} className="bg-slate-950/40 border border-dashed border-slate-800 rounded p-2 text-xs flex items-center space-x-2 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Awaiting Key Signature #{signatureCount + emptyIdx + 1}...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400/80 mb-2" />
            <p className="text-sm font-medium">All multi-sig proposals have been executed. Queue is clear.</p>
          </div>
        )}
      </div>

      {/* Executed Proposals History */}
      {executedProposals.length > 0 && (
        <div className="bg-[#121620] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
                Executed Multi-Sig Consensus Log
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{executedProposals.length} Completed</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {executedProposals.map(exec => (
              <div key={exec.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/30">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-200">{exec.title}</span>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="font-mono text-emerald-400">{exec.id}</span>
                    <span>•</span>
                    <span>{exec.signatures.length} Keys Affixed</span>
                  </div>
                </div>

                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 font-mono text-[10px]">
                  COMMITTED TO BLOCKCHAIN
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
