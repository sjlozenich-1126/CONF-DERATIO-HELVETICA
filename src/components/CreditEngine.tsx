/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Landmark, 
  ShieldCheck, 
  Coins 
} from 'lucide-react';
import { CreditFacility, MultiSigSigner } from '../types/fiducia';
import { formatCHF } from '../utils/crypto';

interface CreditEngineProps {
  creditFacilities: CreditFacility[];
  onIssueCredit: (newFacility: CreditFacility, requiresMultiSig: boolean) => void;
  onDrawdownOrRepay: (facilityId: string, type: 'DRAWDOWN' | 'REPAY', amount: number) => void;
  currentSigner: MultiSigSigner;
}

export const CreditEngine: React.FC<CreditEngineProps> = ({
  creditFacilities,
  onIssueCredit,
  onDrawdownOrRepay,
  currentSigner
}) => {
  // Form State
  const [borrower, setBorrower] = useState('');
  const [counterpartyType, setCounterpartyType] = useState<CreditFacility['counterpartyType']>('Regenerative Trust');
  const [facilityAmount, setFacilityAmount] = useState<number>(25000000);
  const [interestRate, setInterestRate] = useState<number>(2.15);
  const [tenorYears, setTenorYears] = useState<number>(10);
  const [collateralType, setCollateralType] = useState('Allocated Gotthard Gold Bullion');
  const [collateralValue, setCollateralValue] = useState<number>(37500000);
  const [hdiScore, setHdiScore] = useState<number>(91);
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([7, 9, 13]);

  // Modal State for Drawdown or Repayment
  const [activeFacilityAction, setActiveFacilityAction] = useState<{ id: string; type: 'DRAWDOWN' | 'REPAY' } | null>(null);
  const [actionAmount, setActionAmount] = useState<number>(5000000);

  const toggleSdg = (num: number) => {
    if (selectedSdgs.includes(num)) {
      setSelectedSdgs(selectedSdgs.filter(n => n !== num));
    } else {
      setSelectedSdgs([...selectedSdgs, num]);
    }
  };

  const collateralRatio = facilityAmount > 0 
    ? ((collateralValue / facilityAmount) * 100).toFixed(1) 
    : '0';

  const ultraViresCleared = Number(collateralRatio) >= 120;

  const handleCreateFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrower) return;

    const maturityYear = new Date().getFullYear() + tenorYears;
    const maturityDate = `${maturityYear}-12-31`;

    const newFac: CreditFacility = {
      id: `CR-FAC-${Math.floor(100 + Math.random() * 900)}`,
      borrower,
      counterpartyType,
      facilityAmountCHF: facilityAmount,
      drawnAmountCHF: 0,
      interestRate,
      collateralType,
      collateralValueCHF: collateralValue,
      collateralRatio: Number(((collateralValue / facilityAmount) * 100).toFixed(1)),
      hdiAlignmentScore: hdiScore,
      sdgGoals: selectedSdgs,
      maturityDate,
      status: 'ACTIVE',
      ultraViresAuditStatus: ultraViresCleared ? 'CLEARED' : 'CONDITIONAL',
      governingLaw: 'Swiss Code of Obligations (DLT Act Art. 973d)'
    };

    onIssueCredit(newFac, facilityAmount >= 20000000);
    setBorrower('');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Scale className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                Regenerative Credit & Capital Risk Engine
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                STAGE 1 EXPANSION (L3 + L4)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Issues credit against verified real-world collateral (Swiss Gold, hydro concessions, and infrastructure) scored against Human Development Index (HDI) and UN Sustainable Development Goals.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs bg-slate-900 border border-slate-800 rounded-lg p-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Credit Outstanding</span>
              <span className="text-sm font-corporate font-bold text-slate-100">
                {formatCHF(creditFacilities.reduce((acc, c) => acc + c.drawnAmountCHF, 0))}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Avg Collateral Ratio</span>
              <span className="text-sm font-mono font-bold text-emerald-400">
                {(creditFacilities.reduce((acc, c) => acc + c.collateralRatio, 0) / (creditFacilities.length || 1)).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Issuance Form & Active Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Credit Underwriting Form */}
        <div className="lg:col-span-5 bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-slate-300" />
              <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
                Underwrite Credit Facility
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Swiss DLT Rail</span>
          </div>

          <form onSubmit={handleCreateFacility} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Borrower / Beneficiary Entity</label>
              <input
                type="text"
                required
                placeholder="e.g. Cantonal Alpine Hydro Grid Consortium"
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Counterparty Type</label>
                <select
                  value={counterpartyType}
                  onChange={(e) => setCounterpartyType(e.target.value as any)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                >
                  <option value="Regenerative Trust">Regenerative Trust</option>
                  <option value="Infrastructure Authority">Infrastructure Authority</option>
                  <option value="Sovereign Fund">Sovereign Fund</option>
                  <option value="Multilateral Bank">Multilateral Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Tenor (Years)</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={tenorYears}
                  onChange={(e) => setTenorYears(Number(e.target.value))}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Facility Limit (CHF)</label>
                <input
                  type="number"
                  step={1000000}
                  min={1000000}
                  value={facilityAmount}
                  onChange={(e) => setFacilityAmount(Number(e.target.value))}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
                />
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                  {formatCHF(facilityAmount)}
                </span>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Interest Rate (Fixed p.a.)</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    min={0.5}
                    max={10.0}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Collateral Instrument</label>
                <select
                  value={collateralType}
                  onChange={(e) => setCollateralType(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-[11px]"
                >
                  <option value="Allocated Gotthard Gold Bullion">Allocated Gotthard Gold Bullion</option>
                  <option value="Alpine Hydroelectric Concession Deeds">Alpine Hydroelectric Concession Deeds</option>
                  <option value="Bonded Freezone Logistics Real Estate">Bonded Freezone Logistics Real Estate</option>
                  <option value="Swiss Confederation AAA Sovereign Debt">Swiss Confederation AAA Debt</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Collateral Value (CHF)</label>
                <input
                  type="number"
                  step={1000000}
                  value={collateralValue}
                  onChange={(e) => setCollateralValue(Number(e.target.value))}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
                />
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                  {formatCHF(collateralValue)}
                </span>
              </div>
            </div>

            {/* Collateral & Ultra-Vires Metrics Banner */}
            <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
              ultraViresCleared 
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                : 'bg-slate-800/60 border-slate-700 text-slate-300'
            }`}>
              <div>
                <span className="text-[10px] uppercase font-mono block text-slate-400">Coverage Ratio</span>
                <span className="text-base font-bold font-mono">
                  {collateralRatio}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono block text-slate-400">Ultra-Vires Audit</span>
                <span className="font-semibold flex items-center gap-1 justify-end">
                  {ultraViresCleared ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      CLEARED (Compliant)
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                      Requires Subordination
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* HDI Alignment & SDG Criteria */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Human Development Index (HDI) Alignment:</span>
                <span className="text-slate-200 font-mono font-bold">{hdiScore} / 100</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={hdiScore}
                onChange={(e) => setHdiScore(Number(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">SDG Criteria Integration</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { num: 7, label: 'Affordable & Clean Energy' },
                  { num: 9, label: 'Industry & Infrastructure' },
                  { num: 11, label: 'Sustainable Cities' },
                  { num: 13, label: 'Climate Action' },
                  { num: 15, label: 'Life on Land' },
                  { num: 16, label: 'Peace & Strong Institutions' }
                ].map(sdg => (
                  <button
                    type="button"
                    key={sdg.num}
                    onClick={() => toggleSdg(sdg.num)}
                    className={`px-2 py-1 rounded text-[10px] font-mono border transition-all ${
                      selectedSdgs.includes(sdg.num)
                        ? 'bg-slate-100 text-slate-900 border-white font-semibold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    SDG {sdg.num}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {facilityAmount >= 20000000 
                  ? 'Submit for 3-of-5 Multi-Sig Approval (≥ 20M CHF)' 
                  : 'Execute Credit Issuance & Anchor S06'}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Active Credit Facilities */}
        <div className="lg:col-span-7 bg-[#121620] border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Landmark className="w-4 h-4 text-slate-300" />
                <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
                  Active Credit Facilities & Regenerative Portfolios
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{creditFacilities.length} Facilities</span>
            </div>

            <div className="divide-y divide-slate-800/70">
              {creditFacilities.map(fac => (
                <div key={fac.id} className="p-4 hover:bg-slate-800/40 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">{fac.borrower}</h4>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span className="font-mono text-slate-300">{fac.id}</span>
                        <span>•</span>
                        <span>{fac.counterpartyType}</span>
                        <span>•</span>
                        <span>Matures: {fac.maturityDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-corporate font-bold text-slate-100">
                        {formatCHF(fac.drawnAmountCHF)} <span className="text-xs font-sans text-slate-400">/ {formatCHF(fac.facilityAmountCHF)}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {fac.interestRate}% p.a. • Collateral: {fac.collateralRatio}%
                      </span>
                    </div>
                  </div>

                  {/* Utilization Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-slate-300 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, (fac.drawnAmountCHF / fac.facilityAmountCHF) * 100)}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                        HDI: {fac.hdiAlignmentScore}/100
                      </span>
                      <span>Collateral: <strong className="text-slate-300">{fac.collateralType}</strong></span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveFacilityAction({ id: fac.id, type: 'DRAWDOWN' })}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700"
                      >
                        + Drawdown
                      </button>
                      <button
                        onClick={() => setActiveFacilityAction({ id: fac.id, type: 'REPAY' })}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] border border-slate-700"
                      >
                        Repay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footnote on Swiss Banking Act Compliance */}
          <div className="p-3 bg-[#0d1017] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Swiss Banking Act Art. 1b FinTech Exemption & Basel III Capital Buffers Active
            </span>
            <span className="font-mono text-slate-500">Tier 1 Capital: 24.8%</span>
          </div>
        </div>
      </div>

      {/* Drawdown / Repay Action Modal */}
      {activeFacilityAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121620] border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-corporate font-bold text-slate-100">
                {activeFacilityAction.type === 'DRAWDOWN' ? 'Execute Tranche Drawdown' : 'Record Facility Repayment'}
              </h3>
              <button 
                onClick={() => setActiveFacilityAction(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Facility ID: <span className="font-mono text-slate-200">{activeFacilityAction.id}</span>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Amount (CHF)</label>
              <input
                type="number"
                step={500000}
                value={actionAmount}
                onChange={(e) => setActionAmount(Number(e.target.value))}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-sm"
              />
              <div className="text-[11px] text-slate-300 font-mono mt-1">
                {formatCHF(actionAmount)}
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
              <button
                onClick={() => setActiveFacilityAction(null)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDrawdownOrRepay(activeFacilityAction.id, activeFacilityAction.type, actionAmount);
                  setActiveFacilityAction(null);
                }}
                className="px-4 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs shadow-sm"
              >
                Confirm & Anchor to S06
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
