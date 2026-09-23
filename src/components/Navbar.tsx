/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Shield, 
  Layers, 
  Coins, 
  Globe, 
  Key, 
  Send, 
  Scale, 
  FileText, 
  CheckCircle2, 
  UserCheck,
  BookOpen
} from 'lucide-react';
import { MultiSigSigner } from '../types/fiducia';

export type NavTab = 
  | 'ledger'
  | 'archivist'
  | 'credit'
  | 'currency'
  | 'assets'
  | 'multisig'
  | 'settlement'
  | 'regulatory'
  | 'manual';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  blockHeight: number;
  signers: MultiSigSigner[];
  currentSigner: MultiSigSigner;
  setCurrentSigner: (signer: MultiSigSigner) => void;
  totalAssetsCHF: number;
  circulatingFCHF: number;
  pendingProposalsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  blockHeight,
  signers,
  currentSigner,
  setCurrentSigner,
  totalAssetsCHF,
  circulatingFCHF,
  pendingProposalsCount
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#060a14]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Sovereign Swiss Banner */}
      <div className="border-b border-slate-800/40 px-4 py-1.5 bg-[#091122]/90 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium text-slate-300">
            {/* Swiss Federal Cross Insignia */}
            <span className="inline-flex items-center justify-center w-4 h-4 bg-red-600 rounded-[2px] text-white font-bold text-[10px] leading-none">
              +
            </span>
            <span className="tracking-wide">CONFŒDERATIO HELVETICA</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400/90 font-mono text-[11px]">SWISS DLT LEDGER ACT (ART. 973d OR)</span>
          </div>
          <span className="hidden md:inline-flex items-center text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            CONSENSUS NODE VERIFIED
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-[11px]">
            <span>Custody: <strong className="text-slate-200 font-mono">CHF {(totalAssetsCHF / 1e9).toFixed(2)}B</strong></span>
            <span className="text-slate-700">•</span>
            <span>Reserve FCHF: <strong className="text-amber-400 font-mono">{(circulatingFCHF / 1e6).toFixed(0)}M</strong></span>
            <span className="text-slate-700">•</span>
            <span>Block Height: <strong className="text-emerald-400 font-mono">#{blockHeight}</strong></span>
          </div>

          {/* Active Institutional Signer Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-900/80 border border-slate-700/60 rounded px-2 py-1">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] text-slate-400">Signer:</span>
            <select 
              value={currentSigner.id}
              onChange={(e) => {
                const s = signers.find(item => item.id === e.target.value);
                if (s) setCurrentSigner(s);
              }}
              className="bg-transparent text-slate-200 text-[11px] font-medium focus:outline-none cursor-pointer"
            >
              {signers.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0B132B] text-slate-100">
                  {s.name} ({s.location.split(',')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between py-2.5 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 via-slate-800 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/5">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-slate-100 flex items-center">
                FIDUCIA CENTRALE
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                PROVENANCE LEDGER
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              International Archive • Central Reserve of Trust • Swiss DLT Infrastructure
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'ledger'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>S06 Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('archivist')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'archivist'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Archivist (9 Verbs)</span>
          </button>

          <button
            onClick={() => setActiveTab('credit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'credit'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Credit & Risk</span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'currency'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Currency & Mint</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'assets'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global Assets</span>
          </button>

          <button
            onClick={() => setActiveTab('multisig')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              activeTab === 'multisig'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Multi-Sig (3/5)</span>
            {pendingProposalsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {pendingProposalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settlement')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'settlement'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Cross-Border</span>
          </button>

          <button
            onClick={() => setActiveTab('regulatory')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'regulatory'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Swiss FINMA Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'manual'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Codex & Manual</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
