/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  SystemLifecycleEntity, 
  AtlasStratum, 
  AtlasLevel, 
  CoreVault, 
  AuthorityBranch,
  MultiSigSigner
} from '../types/fiducia';
import { STRATA_WEIGHTS, LEVEL_MULTIPLIERS, calculatePowerMetric } from '../utils/crypto';

interface CreateEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEntity: (entity: SystemLifecycleEntity) => void;
  currentSigner: MultiSigSigner;
}

export const CreateEntityModal: React.FC<CreateEntityModalProps> = ({
  isOpen,
  onClose,
  onCreateEntity,
  currentSigner
}) => {
  const [title, setTitle] = useState('');
  const [targetType, setTargetType] = useState<SystemLifecycleEntity['targetType']>('Instrument');
  const [stratum, setStratum] = useState<AtlasStratum>('S06');
  const [level, setLevel] = useState<AtlasLevel>('L4');
  const [vault, setVault] = useState<CoreVault>('Charter Repository');
  const [branch, setBranch] = useState<AuthorityBranch>('Swiss Sovereign & Verein Registry');
  const [holder, setHolder] = useState(currentSigner.name);
  const [issuingBody, setIssuingBody] = useState('Fiducia Centrale Sovereign Presidium');
  const [parentGrant, setParentGrant] = useState('Swiss Code of Obligations (Art. 973d OR)');

  if (!isOpen) return null;

  const provisionalPower = calculatePowerMetric(stratum, level, 1.25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newId = `FC-NODE-${Math.floor(100 + Math.random() * 900)}`;

    const newEntity: SystemLifecycleEntity = {
      id: newId,
      title,
      targetType,
      stratum,
      level,
      vault,
      branch,
      holder,
      issuingBody,
      parentGrant,
      status: 'ACTIVE',
      powerMetric: provisionalPower,
      effectiveDate: new Date().toISOString().split('T')[0],
      jurisdiction: 'Switzerland / DLT Art. 973d OR',
      cryptographicSeal: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      signatories: [currentSigner.name],
      historyLog: [
        {
          id: `HL-${Date.now()}`,
          timestamp: new Date().toISOString(),
          verb: 'Create',
          operator: currentSigner.name,
          notes: 'Instantiated under Lifecycle Verb 09 (Create) with provisional placement.',
          hash: `0x${Math.random().toString(16).slice(2, 10)}`
        }
      ]
    };

    onCreateEntity(newEntity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#121620] border border-slate-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Verb 09 — Create
            </span>
            <h3 className="text-base font-corporate font-bold text-slate-100 flex items-center gap-2">
              Instantiate New Institutional Node
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Node Title / Instrument Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alpine Biodiversity Perpetual Stewardship Trust"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Target Type</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Instrument">Instrument</option>
                <option value="Trust">Trust</option>
                <option value="Asset">Asset</option>
                <option value="Credit Facility">Credit Facility</option>
                <option value="Reserve Token">Reserve Token</option>
                <option value="Charter">Charter</option>
                <option value="Identity Node">Identity Node</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Core Vault</label>
              <select
                value={vault}
                onChange={(e) => setVault(e.target.value as any)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Charter Repository">Charter Repository</option>
                <option value="Treaty Vault">Treaty Vault</option>
                <option value="Ethos & Local Color">Ethos & Local Color</option>
                <option value="Truth & Media Log">Truth & Media Log</option>
                <option value="Lineage Index">Lineage Index</option>
                <option value="Seal & Attestation Archive">Seal & Attestation Archive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Stratum (S01–S08)</label>
              <select
                value={stratum}
                onChange={(e) => setStratum(e.target.value as any)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                {Object.entries(STRATA_WEIGHTS).map(([c, v]) => (
                  <option key={c} value={c}>{c} — {v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Level (L1–L5)</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                {Object.entries(LEVEL_MULTIPLIERS).map(([c, v]) => (
                  <option key={c} value={c}>{c} — {v.name} ({v.operator})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Authority Branch Shelf</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as any)}
              className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
            >
              <option value="Swiss Sovereign & Verein Registry">Swiss Sovereign & Verein Registry</option>
              <option value="European Legal Orders">European Legal Orders</option>
              <option value="Federal Reserve & Central Banking">Federal Reserve & Central Banking</option>
              <option value="International Archive & Provenance">International Archive & Provenance</option>
              <option value="Regenerative Capital & Global Reserves">Regenerative Capital & Global Reserves</option>
              <option value="Maritime & Aerogate Infrastructure">Maritime & Aerogate Infrastructure</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Designated Holder</label>
              <input
                type="text"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Issuing Authority</label>
              <input
                type="text"
                value={issuingBody}
                onChange={(e) => setIssuingBody(e.target.value)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Parent Enabling Grant / Statute</label>
            <input
              type="text"
              required
              placeholder="e.g. Swiss Code of Obligations Art. 60-79 or Cantonal Decree"
              value={parentGrant}
              onChange={(e) => setParentGrant(e.target.value)}
              className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
            />
          </div>

          {/* Provisional Power Preview */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400">Provisional Authority-Power Score:</span>
            <span className="font-mono font-bold text-slate-100 text-sm">
              {provisionalPower} P_eff
            </span>
          </div>

          <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs shadow-sm"
            >
              Instantiate Node & Anchor S06
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
