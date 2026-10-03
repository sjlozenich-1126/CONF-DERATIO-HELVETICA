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
    <header className="border-b border-slate-800/90 bg-[#0e1118]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Sovereign Swiss Banner */}
      <div className="border-b border-slate-800/60 px-4 py-1.5 bg-[#0b0e14] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium text-slate-300">
            {/* Swiss Federal Cross Insignia */}
            <span className="inline-flex items-center justify-center w-4 h-4 bg-red-600 rounded-[2px] text-white font-bold text-[10px] leading-none">
              +
            </span>
            <span className="tracking-wide text-slate-200">CONFŒDERATIO HELVETICA</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-mono text-[11px]">SWISS DLT LEDGER ACT (ART. 973d OR)</span>
          </div>
          <span className="hidden md:inline-flex items-center text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            CONSENSUS NODE VERIFIED
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-[11px]">
            <span>Custody: <strong className="text-slate-200 font-mono">CHF {(totalAssetsCHF / 1e9).toFixed(2)}B</strong></span>
            <span className="text-slate-700">•</span>
            <span>Reserve FCHF: <strong className="text-slate-200 font-mono">{(circulatingFCHF / 1e6).toFixed(0)}M</strong></span>
            <span className="text-slate-700">•</span>
            <span>Block Height: <strong className="text-emerald-400 font-mono">#{blockHeight}</strong></span>
          </div>

          {/* Active Institutional Signer Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
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
                <option key={s.id} value={s.id} className="bg-[#12151e] text-slate-100">
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
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 shadow-sm">
            <Shield className="w-5 h-5 text-slate-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-corporate text-lg md:text-xl font-bold tracking-tight text-slate-100 flex items-center">
                FIDUCIA CENTRALE
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                PROVENANCE LEDGER
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              International Archive • Central Reserve of Trust • Swiss DLT Infrastructure
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'ledger'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>S06 Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('archivist')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'archivist'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Archivist (9 Verbs)</span>
          </button>

          <button
            onClick={() => setActiveTab('credit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'credit'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Credit & Risk</span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'currency'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Currency & Mint</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'assets'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global Assets</span>
          </button>

          <button
            onClick={() => setActiveTab('multisig')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              activeTab === 'multisig'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Multi-Sig (3/5)</span>
            {pendingProposalsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">
                {pendingProposalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settlement')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'settlement'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Cross-Border</span>
          </button>

          <button
            onClick={() => setActiveTab('regulatory')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'regulatory'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Swiss FINMA Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'manual'
                ? 'bg-slate-100 text-slate-900 border border-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-semibold">Codex & Manual</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
