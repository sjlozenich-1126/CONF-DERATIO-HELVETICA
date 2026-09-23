/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRightLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Vault, 
  Sparkles, 
  Copy, 
  RefreshCw,
  ExternalLink,
  Lock
} from 'lucide-react';
import { CurrencyReserve, MultiSigSigner } from '../types/fiducia';
import { formatCHF, truncateHash } from '../utils/crypto';

interface CurrencyEngineProps {
  reserves: CurrencyReserve[];
  circulatingFCHF: number;
  circulatingFRU: number;
  onMintCurrency: (currency: 'FCHF' | 'FRU', amount: number, collateralType: string) => void;
  onAcceptAndConvert: (fromCurrency: string, fromAmount: number, toCurrency: 'FCHF' | 'FRU') => void;
  onBurnCurrency: (currency: 'FCHF' | 'FRU', amount: number) => void;
  currentSigner: MultiSigSigner;
}

export const CurrencyEngine: React.FC<CurrencyEngineProps> = ({
  reserves,
  circulatingFCHF,
  circulatingFRU,
  onMintCurrency,
  onAcceptAndConvert,
  onBurnCurrency,
  currentSigner
}) => {
  // Minting State
  const [mintCurrency, setMintCurrency] = useState<'FCHF' | 'FRU'>('FCHF');
  const [mintAmount, setMintAmount] = useState(5000000);
  const [mintCollateral, setMintCollateral] = useState('Allocated Gotthard Physical Gold (999.9)');
  const [mintSuccessMsg, setMintSuccessMsg] = useState<string | null>(null);

  // Conversion / Acceptance State
  const [acceptCurrency, setAcceptCurrency] = useState<'CHF' | 'EUR' | 'USD' | 'XAU'>('EUR');
  const [acceptAmount, setAcceptAmount] = useState(100000);
  const [targetToken, setTargetToken] = useState<'FCHF' | 'FRU'>('FCHF');
  const [convertSuccessMsg, setConvertSuccessMsg] = useState<string | null>(null);

  // Burn State
  const [burnCurrency, setBurnCurrency] = useState<'FCHF' | 'FRU'>('FCHF');
  const [burnAmount, setBurnAmount] = useState(1000000);
  const [burnSuccessMsg, setBurnSuccessMsg] = useState<string | null>(null);

  // FX Rates relative to CHF
  const FX_RATES: Record<string, number> = {
    CHF: 1.0,
    EUR: 0.95,
    USD: 0.88,
    XAU: 78500.0, // 1 kg Gold in CHF
  };

  const calculateConvertedAmount = () => {
    const chfValue = acceptAmount * (FX_RATES[acceptCurrency] || 1.0);
    if (targetToken === 'FCHF') {
      return chfValue; // 1:1
    } else {
      return chfValue / 1.34; // FRU value ~ 1.34 CHF
    }
  };

  const handleMintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMintCurrency(mintCurrency, mintAmount, mintCollateral);
    if (mintAmount >= 500000) {
      setMintSuccessMsg(`Minting proposal for ${mintAmount.toLocaleString()} ${mintCurrency} queued for 3-of-5 Multi-Sig ratification.`);
    } else {
      setMintSuccessMsg(`Successfully minted ${mintAmount.toLocaleString()} ${mintCurrency} and anchored to S06 ledger!`);
    }
    setTimeout(() => setMintSuccessMsg(null), 6000);
  };

  const handleConvertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAcceptAndConvert(acceptCurrency, acceptAmount, targetToken);
    const converted = calculateConvertedAmount();
    setConvertSuccessMsg(`Accepted ${acceptAmount.toLocaleString()} ${acceptCurrency} and issued ${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${targetToken} under Swiss DLT uncertificated rights.`);
    setTimeout(() => setConvertSuccessMsg(null), 6000);
  };

  const handleBurnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBurnCurrency(burnCurrency, burnAmount);
    setBurnSuccessMsg(`Successfully burned ${burnAmount.toLocaleString()} ${burnCurrency}. Reserve collateral unlocked and anchored.`);
    setTimeout(() => setBurnSuccessMsg(null), 6000);
  };

  const totalReserveValueCHF = reserves.reduce((acc, r) => {
    if (r.assetCode === 'XAU_VAULT') {
      return acc + (r.circulatingUnits * r.unitValueCHF);
    }
    return acc + (r.circulatingUnits * r.unitValueCHF);
  }, 0);

  const totalCirculatingLiabilitiesCHF = (circulatingFCHF * 1.0) + (circulatingFRU * 1.34);
  const overallBackingRatio = Number(((totalReserveValueCHF / (totalCirculatingLiabilitiesCHF || 1)) * 100).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0b1329]/90 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-cinzel font-bold text-slate-100">
                Currency Minting, Acceptance & Reserve Engine
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/40">
                SWISS FINTECH DLT REGULATION
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Issue and accept cryptographic sovereign-grade digital reserve units (FCHF & FRU) fully backed by Swiss physical gold, central bank deposits, and uncertificated ledger-based securities under Swiss CO Art. 973d.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs bg-slate-900/80 border border-slate-800 rounded-lg p-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Reserve Assets</span>
              <span className="text-sm font-cinzel font-bold text-emerald-400">
                {formatCHF(totalReserveValueCHF)}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Overall Backing Ratio</span>
              <span className="text-sm font-mono font-bold text-amber-300">
                {overallBackingRatio}% (Full Reserve)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 1. Minting & Generation, 2. Currency Acceptance & Swap, 3. Token Redemption/Burn */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module 1: Mint / Generate Currency */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wide">
                Mint Reserve Currency
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40">
              Multi-Sig Protected
            </span>
          </div>

          {mintSuccessMsg && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{mintSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleMintSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Currency to Mint</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMintCurrency('FCHF')}
                  className={`py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                    mintCurrency === 'FCHF'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm">FCHF</div>
                  <div className="text-[10px] text-slate-400">Swiss Franc Digital (1:1)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMintCurrency('FRU')}
                  className={`py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                    mintCurrency === 'FRU'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm">FRU</div>
                  <div className="text-[10px] text-slate-400">Reserve Unit (1.34 CHF)</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Amount to Mint</label>
              <input
                type="number"
                step={100000}
                min={10000}
                value={mintAmount}
                onChange={(e) => setMintAmount(Number(e.target.value))}
                className="w-full bg-[#080d1c] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
              <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">
                {mintAmount.toLocaleString()} {mintCurrency} (Approx. {formatCHF(mintAmount * (mintCurrency === 'FCHF' ? 1.0 : 1.34))})
              </span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Backing Reserve Collateral</label>
              <select
                value={mintCollateral}
                onChange={(e) => setMintCollateral(e.target.value)}
                className="w-full bg-[#080d1c] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-[11px]"
              >
                <option value="Allocated Gotthard Physical Gold (999.9)">Allocated Gotthard Physical Gold (999.9)</option>
                <option value="Swiss National Bank (SNB) Sight Deposit">Swiss National Bank (SNB) Sight Deposit</option>
                <option value="Swiss Confederation AAA Sovereign Green Debt">Swiss Confederation AAA Debt</option>
              </select>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Regulatory Exemption:</span>
                <span className="text-slate-200 font-mono">FINMA BankG Art. 1b</span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Sig Threshold:</span>
                <span className="text-amber-300 font-mono">3/5 Signatures Required</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-amber-500/10 transition-all"
            >
              <Coins className="w-4 h-4" />
              <span>
                {mintAmount >= 500000 
                  ? 'Queue for 3/5 Multi-Sig Approval' 
                  : 'Mint & Anchor to S06 Ledger'}
              </span>
            </button>
          </form>
        </div>

        {/* Module 2: Accept Currency & Real-Time Conversion */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wide">
                Accept Currency & Exchange
              </h3>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-1.5 py-0.5 rounded border border-blue-800/40">
              Instant Settlement
            </span>
          </div>

          {convertSuccessMsg && (
            <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800/60 text-blue-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{convertSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleConvertSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Accept External Currency</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['CHF', 'EUR', 'USD', 'XAU'] as const).map(curr => (
                  <button
                    type="button"
                    key={curr}
                    onClick={() => setAcceptCurrency(curr)}
                    className={`py-1.5 rounded border text-center font-mono text-xs transition-all ${
                      acceptCurrency === curr
                        ? 'bg-blue-500/20 border-blue-500/60 text-blue-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Received Amount ({acceptCurrency === 'XAU' ? 'kg Gold' : acceptCurrency})
              </label>
              <input
                type="number"
                step={acceptCurrency === 'XAU' ? 1 : 1000}
                min={1}
                value={acceptAmount}
                onChange={(e) => setAcceptAmount(Number(e.target.value))}
                className="w-full bg-[#080d1c] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Issue Target Token</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetToken('FCHF')}
                  className={`py-1.5 rounded border text-center font-mono text-xs transition-all ${
                    targetToken === 'FCHF'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  FCHF (1:1 CHF)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetToken('FRU')}
                  className={`py-1.5 rounded border text-center font-mono text-xs transition-all ${
                    targetToken === 'FRU'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  FRU (SDR Unit)
                </button>
              </div>
            </div>

            {/* Live Exchange Calculation */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>FX Benchmark Rate:</span>
                <span className="font-mono text-slate-200">
                  1 {acceptCurrency} = {FX_RATES[acceptCurrency]} CHF
                </span>
              </div>
              <div className="flex justify-between text-slate-300 font-medium pt-1 border-t border-slate-800">
                <span>Emitted Balance:</span>
                <span className="font-mono text-amber-400 text-sm font-bold">
                  {calculateConvertedAmount().toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetToken}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/10 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Accept & Issue Tokens (DvP)</span>
            </button>
          </form>
        </div>

        {/* Module 3: Burn & Redeem */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wide">
                Redeem & Burn Tokens
              </h3>
            </div>
            <span className="text-[10px] font-mono text-red-400 bg-red-950/50 px-1.5 py-0.5 rounded border border-red-800/40">
              Reserve Release
            </span>
          </div>

          {burnSuccessMsg && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>{burnSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleBurnSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Token to Burn</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBurnCurrency('FCHF')}
                  className={`py-1.5 rounded border text-center font-mono text-xs transition-all ${
                    burnCurrency === 'FCHF'
                      ? 'bg-red-500/20 border-red-500/60 text-red-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  FCHF
                </button>
                <button
                  type="button"
                  onClick={() => setBurnCurrency('FRU')}
                  className={`py-1.5 rounded border text-center font-mono text-xs transition-all ${
                    burnCurrency === 'FRU'
                      ? 'bg-red-500/20 border-red-500/60 text-red-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  FRU
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Amount to Redeem / Burn</label>
              <input
                type="number"
                step={100000}
                min={10000}
                value={burnAmount}
                onChange={(e) => setBurnAmount(Number(e.target.value))}
                className="w-full bg-[#080d1c] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                Equivalent Reserve Payout: {formatCHF(burnAmount * (burnCurrency === 'FCHF' ? 1.0 : 1.34))}
              </span>
            </div>

            <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-[11px] text-slate-300 space-y-1">
              <p>Redeemed tokens are irrevocably burned on-chain. Corresponding reserve bullion or SNB cash is remitted to verified custodian depository.</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-red-700/10 transition-all"
            >
              <Flame className="w-4 h-4" />
              <span>Burn & Release Reserve Collateral</span>
            </button>
          </form>
        </div>
      </div>

      {/* Proof of Reserves Table */}
      <div className="bg-[#0b1329]/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vault className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wide">
              Proof of Reserves & Depository Audit (Basel III / FINMA Compliant)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Full Reserve Validated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080d1c] text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Asset Code & Name</th>
                <th className="px-3 py-3">Asset Type</th>
                <th className="px-3 py-3">Holding Quantity</th>
                <th className="px-3 py-3">Total Valuation (CHF)</th>
                <th className="px-3 py-3">Backing Ratio</th>
                <th className="px-3 py-3">Custodian Depository</th>
                <th className="px-4 py-3 text-right">Merkle Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {reserves.map(res => {
                const totalVal = res.assetCode === 'XAU_VAULT'
                  ? res.circulatingUnits * res.unitValueCHF
                  : res.circulatingUnits * res.unitValueCHF;

                return (
                  <tr key={res.assetCode} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-amber-300">{res.assetCode}</span>
                        <span>•</span>
                        <span>{res.name}</span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {res.type}
                      </span>
                    </td>

                    <td className="px-3 py-3 font-mono">
                      {res.circulatingUnits.toLocaleString()} {res.assetCode === 'XAU_VAULT' ? 'kg' : 'units'}
                    </td>

                    <td className="px-3 py-3 font-mono font-semibold text-emerald-400">
                      {formatCHF(totalVal)}
                    </td>

                    <td className="px-3 py-3 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[10px]">
                        {res.backingRatio}%
                      </span>
                    </td>

                    <td className="px-3 py-3 text-slate-400 text-[11px]">
                      {res.custodianDepository}
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-[10px] text-slate-400">
                      <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-amber-400/90">
                        {truncateHash(res.merkleProofHash, 6, 6)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
