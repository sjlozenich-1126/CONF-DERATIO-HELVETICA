/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  PlusCircle, 
  Sliders, 
  FolderTree, 
  AlertTriangle
} from 'lucide-react';
import { 
  SystemLifecycleEntity, 
  LifecycleVerb, 
  AtlasStratum, 
  AtlasLevel, 
  CoreVault, 
  AuthorityBranch,
  MultiSigSigner
} from '../types/fiducia';
import { 
  STRATA_WEIGHTS, 
  LEVEL_MULTIPLIERS
} from '../utils/crypto';

interface ArchivistConsoleProps {
  entities: SystemLifecycleEntity[];
  onExecuteVerb: (
    entityId: string, 
    verb: LifecycleVerb, 
    payload: {
      notes: string;
      stratum?: AtlasStratum;
      level?: AtlasLevel;
      vault?: CoreVault;
      branch?: AuthorityBranch;
      holder?: string;
      status?: any;
      parentGrant?: string;
    }
  ) => void;
  onOpenCreateModal: () => void;
  onViewDossier: (entity: SystemLifecycleEntity) => void;
  currentSigner: MultiSigSigner;
}

const LIFECYCLE_VERBS_INFO: {
  verb: LifecycleVerb;
  num: string;
  name: string;
  atlasMapping: string;
  description: string;
  badgeColor: string;
}[] = [
  {
    verb: 'Classify',
    num: '01',
    name: 'Classify',
    atlasMapping: 'Strata (S01–S08) & Levels (L1–L5)',
    description: 'Assigns stratum, level, and Core Vault. Calculates effective power metric P_effective.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Categorize',
    num: '02',
    name: 'Categorize',
    atlasMapping: 'Authority Branches & Systems of Power',
    description: 'Places classified object onto institutional shelf (Swiss Verein, European Legal Orders, Central Banking).',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Appoint',
    num: '03',
    name: 'Appoint / Determine',
    atlasMapping: 'L3 Governance / S07 Succession',
    description: 'Designates holder, office, title, or standing and records claimed parent grant.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Approve/Deny',
    num: '04',
    name: 'Approve / Deny',
    atlasMapping: 'L3 Policy & Law Precedence',
    description: 'Ultra vires review against constitutional hierarchy. Issues controlled approval or denial.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Balance',
    num: '05',
    name: 'Balance',
    atlasMapping: 'Constitutional Bedrock (S01/S02)',
    description: 'Harmonizes standing against higher constitutive instruments and mitigates tension.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Issue',
    num: '06',
    name: 'Issue',
    atlasMapping: 'L5 Concrete Execution / S05 Certification',
    description: 'Grants mandate, charter, seal, credit tranche, or currency token under multi-sig to S06 ledger.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Revoke',
    num: '07',
    name: 'Revoke',
    atlasMapping: 'S04 / S08 Procedural Authority',
    description: 'Procedural nullification (void ab initio) when underlying capacity lapses or violations occur.',
    badgeColor: 'border-red-800/60 text-red-300 bg-red-950/40'
  },
  {
    verb: 'Reorganize',
    num: '08',
    name: 'Reorganize',
    atlasMapping: 'System of Power Transformation',
    description: 'Sovereign restructure across strata. Updates hierarchy references and succession chain.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  },
  {
    verb: 'Create',
    num: '09',
    name: 'Create',
    atlasMapping: 'S01 Axiomatic Genesis',
    description: 'Primary genesis of sovereign institutional entity or financial baseline instrument.',
    badgeColor: 'border-slate-600 text-slate-200 bg-slate-800'
  }
];

export const ArchivistConsole: React.FC<ArchivistConsoleProps> = ({
  entities,
  onExecuteVerb,
  onOpenCreateModal,
  onViewDossier,
  currentSigner
}) => {
  const [selectedEntity, setSelectedEntity] = useState<SystemLifecycleEntity | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<LifecycleVerb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Verb Executions
  const [verbNotes, setVerbNotes] = useState('');
  const [editStratum, setEditStratum] = useState<AtlasStratum>('S06');
  const [editLevel, setEditLevel] = useState<AtlasLevel>('L4');
  const [editVault, setEditVault] = useState<CoreVault>('Charter Repository');
  const [editBranch, setEditBranch] = useState<AuthorityBranch>('Swiss Sovereign & Verein Registry');
  const [editHolder, setEditHolder] = useState('');
  const [editParentGrant, setEditParentGrant] = useState('');

  const openVerbModal = (entity: SystemLifecycleEntity, verb: LifecycleVerb) => {
    setSelectedEntity(entity);
    setSelectedVerb(verb);
    setVerbNotes('');
    setEditStratum(entity.stratum);
    setEditLevel(entity.level);
    setEditVault(entity.vault);
    setEditBranch(entity.branch);
    setEditHolder(entity.holder);
    setEditParentGrant(entity.parentGrant);
    setIsModalOpen(true);
  };

  const handleCommitVerb = () => {
    if (!selectedEntity || !selectedVerb) return;

    onExecuteVerb(selectedEntity.id, selectedVerb, {
      notes: verbNotes || `Executed ${selectedVerb} on ${selectedEntity.title}`,
      stratum: selectedVerb === 'Classify' ? editStratum : undefined,
      level: selectedVerb === 'Classify' ? editLevel : undefined,
      vault: selectedVerb === 'Classify' ? editVault : undefined,
      branch: selectedVerb === 'Categorize' ? editBranch : undefined,
      holder: selectedVerb === 'Appoint' ? editHolder : undefined,
      parentGrant: selectedVerb === 'Appoint' ? editParentGrant : undefined,
      status: selectedVerb === 'Revoke' 
        ? 'REVOKED' 
        : selectedVerb === 'Approve/Deny' 
        ? 'APPROVED' 
        : selectedEntity.status
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <FileText className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                Archivist Lifecycle Engine Console
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                PSYCHROSPHERE L1–L5 ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              The Engine translates the Psychrosphere Atlas into nine constrained state-transition verbs. Every action respects the four non-negotiable separations: (1) Origin vs Authority, (2) Evidence vs Title, (3) Capacity vs Competence, and (4) Sovereign distinctions.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-900 text-xs font-semibold transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Entity (Verb 09)</span>
            </button>
          </div>
        </div>

        {/* 9 Lifecycle Verbs Ribbon */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2.5 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-300" />
            The Nine Lifecycle Operations (Closed Institutional Loop)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {LIFECYCLE_VERBS_INFO.map(v => (
              <div
                key={v.verb}
                className="bg-[#0d1017] border border-slate-800 hover:border-slate-700 rounded-lg p-2.5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">{v.num}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded border font-mono ${v.badgeColor}`}>
                      {v.verb}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {v.name}
                  </h4>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Governed Entities Registry */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderTree className="w-4 h-4 text-slate-300" />
            <h3 className="text-sm font-corporate font-bold text-slate-100 uppercase tracking-wide">
              Permanent Registry of Governed Nodes & Instruments
            </h3>
            <span className="text-xs font-mono text-slate-400">({entities.length} Active Nodes)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Signed by: <strong className="text-slate-200">{currentSigner.name}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0d1017] text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Node & Title</th>
                <th className="px-3 py-3">Target Type</th>
                <th className="px-3 py-3">Stratum & Level</th>
                <th className="px-3 py-3">Core Vault</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Power (P_eff)</th>
                <th className="px-4 py-3 text-right">Lifecycle Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {entities.map(entity => (
                <tr key={entity.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                      <span>{entity.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-slate-300">{entity.id}</span>
                      <span>•</span>
                      <span>Holder: {entity.holder}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-sm">
                      Parent Grant: {entity.parentGrant}
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700 text-[11px]">
                      {entity.targetType}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="space-y-1">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[10px]">
                        {entity.stratum} ({STRATA_WEIGHTS[entity.stratum]?.weight}x)
                      </span>
                      <div className="text-[10px] font-mono text-slate-400">
                        {entity.level} ({LEVEL_MULTIPLIERS[entity.level]?.operator})
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[11px] text-slate-300 font-medium block">
                      {entity.vault}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-[150px]">
                      {entity.branch}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${
                      entity.status === 'ACTIVE' || entity.status === 'ISSUED'
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                        : entity.status === 'REVOKED'
                        ? 'bg-red-950/60 text-red-300 border-red-800/50'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {entity.status}
                    </span>
                  </td>

                  <td className="px-3 py-3.5 font-mono">
                    <div className="text-slate-100 font-bold text-sm">
                      {entity.powerMetric}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      Score: {STRATA_WEIGHTS[entity.stratum]?.weight} × {LEVEL_MULTIPLIERS[entity.level]?.multiplier} × 1.25
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onViewDossier(entity)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-all"
                      >
                        Dossier
                      </button>

                      {/* Dropdown or Verb Trigger */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            openVerbModal(entity, e.target.value as LifecycleVerb);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="" disabled>Execute Verb ▾</option>
                        <option value="Classify" className="bg-[#121620]">01 — Classify</option>
                        <option value="Categorize" className="bg-[#121620]">02 — Categorize</option>
                        <option value="Appoint" className="bg-[#121620]">03 — Appoint / Determine</option>
                        <option value="Approve/Deny" className="bg-[#121620]">04 — Approve / Deny</option>
                        <option value="Balance" className="bg-[#121620]">05 — Balance</option>
                        <option value="Issue" className="bg-[#121620]">06 — Issue (Multi-Sig)</option>
                        <option value="Revoke" className="bg-[#121620]">07 — Revoke (Void Ab Initio)</option>
                        <option value="Reorganize" className="bg-[#121620]">08 — Reorganize</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Executing Lifecycle Verb */}
      {isModalOpen && selectedEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121620] border border-slate-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Archivist State Transition
                </span>
                <h3 className="text-base font-corporate font-bold text-slate-100 flex items-center gap-2">
                  Execute Verb: <span className="text-slate-200">{selectedVerb}</span>
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 bg-[#0d1017] p-3 rounded-lg border border-slate-800">
              Target Entity: <strong className="text-slate-100">{selectedEntity.title}</strong>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {selectedEntity.id}</div>
            </div>

            {/* Verb Specific Fields */}
            {selectedVerb === 'Classify' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Stratum (S01–S08)</label>
                  <select 
                    value={editStratum} 
                    onChange={(e) => setEditStratum(e.target.value as AtlasStratum)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
                  >
                    {Object.entries(STRATA_WEIGHTS).map(([code, item]) => (
                      <option key={code} value={code}>{code} — {item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Level (L1–L5)</label>
                  <select 
                    value={editLevel} 
                    onChange={(e) => setEditLevel(e.target.value as AtlasLevel)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
                  >
                    {Object.entries(LEVEL_MULTIPLIERS).map(([code, item]) => (
                      <option key={code} value={code}>{code} — {item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1">Core Vault</label>
                  <select 
                    value={editVault} 
                    onChange={(e) => setEditVault(e.target.value as CoreVault)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
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
            )}

            {selectedVerb === 'Categorize' && (
              <div className="text-xs">
                <label className="block text-slate-400 mb-1">Authority Branch Shelf</label>
                <select 
                  value={editBranch} 
                  onChange={(e) => setEditBranch(e.target.value as AuthorityBranch)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
                >
                  <option value="Swiss Sovereign & Verein Registry">Swiss Sovereign & Verein Registry</option>
                  <option value="European Legal Orders">European Legal Orders (TEU/TFEU/Eurosystem)</option>
                  <option value="Federal Reserve & Central Banking">Federal Reserve & Central Banking</option>
                  <option value="International Archive & Provenance">International Archive & Provenance</option>
                  <option value="Regenerative Capital & Global Reserves">Regenerative Capital & Global Reserves</option>
                  <option value="Maritime & Aerogate Infrastructure">Maritime & Aerogate Infrastructure</option>
                </select>
              </div>
            )}

            {selectedVerb === 'Appoint' && (
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Designated Holder / Office</label>
                  <input 
                    type="text" 
                    value={editHolder} 
                    onChange={(e) => setEditHolder(e.target.value)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Claimed Parent Grant / Charter</label>
                  <input 
                    type="text" 
                    value={editParentGrant} 
                    onChange={(e) => setEditParentGrant(e.target.value)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>
              </div>
            )}

            {selectedVerb === 'Revoke' && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="block">Ultra-Vires Nullification (Void Ab Initio):</strong>
                  Revoking this node marks it null and void ab initio on the blockchain. Power metric will be nullified and a nullification block appended to S06.
                </div>
              </div>
            )}

            {/* General Log Notes */}
            <div className="text-xs">
              <label className="block text-slate-400 mb-1">Archival Log & Justification</label>
              <textarea 
                rows={3}
                value={verbNotes}
                onChange={(e) => setVerbNotes(e.target.value)}
                placeholder="Enter regulatory justification, statutory citations, or multi-sig approval context..."
                className="w-full bg-[#0d1017] border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-slate-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Operator: {currentSigner.name}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCommitVerb}
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs shadow-sm"
                >
                  Commit to S06 Ledger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
