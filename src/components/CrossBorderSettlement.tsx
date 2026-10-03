/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, 
  ArrowRightLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Globe2, 
  FileCheck2 
} from 'lucide-react';
import { SettlementTransaction, MultiSigSigner } from '../types/fiducia';
import { truncateHash } from '../utils/crypto';

interface CrossBorderSettlementProps {
  settlements: SettlementTransaction[];
  onExecuteSettlement: (tx: SettlementTransaction) => void;
  currentSigner: MultiSigSigner;
}

export const CrossBorderSettlement: React.FC<CrossBorderSettlementProps> = ({
  settlements,
  onExecuteSettlement,
  currentSigner
}) => {
  const [corridor, setCorridor] = useState('Project Agora Corridor (Swiss Helvetia ⇄ Eurosystem TIPS)');
  const [txType, setTxType] = useState<SettlementTransaction['txType']>('PvP');
  const [deliverAmount, setDeliverAmount] = useState('10,000,000 FCHF');
  const [receiveAmount, setReceiveAmount] = useState('9,400,000 EUR');
  const [senderEntity, setSenderEntity] = useState('Fiducia Centrale Settlement Trust');
  const [receiverEntity, setReceiverEntity] = useState('Banque de France / Target2 Participant');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newTx: SettlementTransaction = {
        id: `TX-SETTLE-${Math.floor(1000 + Math.random() * 9000)}`,
        settlementCorridor: corridor,
        txType,
        senderJurisdiction: 'Switzerland (FINMA)',
        senderEntity,
        receiverJurisdiction: 'Foreign Central Bank / Interbank Rail',
        receiverEntity,
        deliverAmount,
        receiveAmount,
        timestamp: new Date().toISOString(),
        status: 'SETTLED_RTGS',
        travelRuleIVMS101: true,
        clearingHash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`
      };

      onExecuteSettlement(newTx);

      setIsProcessing(false);
      setSuccessMessage(`Cross-border settlement finalized under Swiss-International treaty protocol.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Send className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                Cross-Border Settlement & DvP / PvP Clearing Rail
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                FATF TRAVEL RULE & BIS AGORA ALIGNED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Atomic Delivery vs Payment (DvP) and Payment vs Payment (PvP) settlement bridging Swiss SIC / Helvetia rails with Eurosystem (TARGET/TIPS), Bank of England (CHAPS), and Monetary Authority of Singapore (MAS).
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-2.5 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Counterparty Risk (Atomic Hashlock)</span>
          </div>
        </div>
      </div>

      {/* Grid: Settlement Execution Form + Corridors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Settlement Simulator */}
        <div className="lg:col-span-5 bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-slate-300" />
              <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
                Initiate Cross-Border Transfer
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Swiss RTGS</span>
          </div>

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleInitiate} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Settlement Corridor</label>
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200 text-[11px]"
              >
                <option value="Project Agora Corridor (Swiss Helvetia ⇄ Eurosystem TIPS)">
                  Project Agora Corridor (Swiss Helvetia ⇄ Eurosystem TIPS)
                </option>
                <option value="Swiss-UK Berne Financial Services Agreement Rail">
                  Swiss-UK Berne Financial Services Agreement Rail (BoE CHAPS)
                </option>
                <option value="Swiss-Singapore Project Ubin-Helvetia Corridor">
                  Swiss-Singapore Project Ubin-Helvetia Corridor (MAS MEPS+)
                </option>
                <option value="Swiss-US Fedwire Sovereign Custody Rail">
                  Swiss-US Fedwire Sovereign Custody Rail (Fedwire / DTCC)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Protocol Mechanism</label>
                <select
                  value={txType}
                  onChange={(e) => setTxType(e.target.value as any)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
                >
                  <option value="PvP">Payment vs Payment (PvP)</option>
                  <option value="DvP">Delivery vs Payment (DvP)</option>
                  <option value="Cross-Border Clearing">Inter-bank RTGS Clearing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Travel Rule Packet</label>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  IVMS 101 Standard
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Delivered Asset & Amount</label>
                <input
                  type="text"
                  value={deliverAmount}
                  onChange={(e) => setDeliverAmount(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Received Asset & Amount</label>
                <input
                  type="text"
                  value={receiveAmount}
                  onChange={(e) => setReceiveAmount(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1 border-t border-slate-800">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Originating Swiss Entity</label>
                <input
                  type="text"
                  value={senderEntity}
                  onChange={(e) => setSenderEntity(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200 text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Foreign Counterparty Entity</label>
                <input
                  type="text"
                  value={receiverEntity}
                  onChange={(e) => setReceiverEntity(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200 text-[11px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
                  <span>Transmitting Encrypted IVMS 101 Packet...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Execute Atomic Cross-Border Settlement</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Settlement History Table */}
        <div className="lg:col-span-7 bg-[#121620] border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-slate-300" />
                <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
                  Cross-Border Settlement Log & Clearing Proofs
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{settlements.length} Completed Settlements</span>
            </div>

            <div className="divide-y divide-slate-800/70">
              {settlements.map(s => (
                <div key={s.id} className="p-4 hover:bg-slate-800/40 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {s.txType}
                        </span>
                        <span className="font-mono text-slate-200 text-xs font-semibold">{s.id}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {new Date(s.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 mt-1">{s.settlementCorridor}</h4>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                        {s.status}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0d1017] p-2 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row justify-between gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">DELIVERED:</span>
                      <strong className="text-slate-200 font-mono">{s.deliverAmount}</strong>
                      <span className="text-slate-400 block text-[10px]">{s.senderEntity}</span>
                    </div>
                    <div className="hidden sm:block text-slate-600 self-center">⇄</div>
                    <div className="sm:text-right">
                      <span className="text-slate-500 block text-[10px]">RECEIVED:</span>
                      <strong className="text-emerald-400 font-mono">{s.receiveAmount}</strong>
                      <span className="text-slate-400 block text-[10px]">{s.receiverEntity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <FileCheck2 className="w-3 h-3" />
                      FATF IVMS-101 Cleared
                    </span>
                    <span className="text-slate-500">
                      Clearing Hash: <strong className="text-slate-400">{truncateHash(s.clearingHash, 8, 6)}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#0d1017] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Swiss Helvetia wCBDC & Eurosystem TIPS Interoperability Engine
            </span>
            <span className="font-mono text-emerald-400">Atomic DvP RTGS Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
