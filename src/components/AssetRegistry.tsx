/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  PlusCircle, 
  ShieldCheck, 
  Anchor, 
  Plane, 
  Building2, 
  Mountain, 
  Search, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { EconomicAsset, MultiSigSigner } from '../types/fiducia';
import { formatCHF } from '../utils/crypto';

interface AssetRegistryProps {
  assets: EconomicAsset[];
  onRegisterAsset: (asset: EconomicAsset) => void;
  currentSigner: MultiSigSigner;
}

export const AssetRegistry: React.FC<AssetRegistryProps> = ({
  assets,
  onRegisterAsset,
  currentSigner
}) => {
  const [selectedAsset, setSelectedAsset] = useState<EconomicAsset | null>(assets[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // New Asset Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<EconomicAsset['category']>('Maritime & Port');
  const [newLocation, setNewLocation] = useState('');
  const [newValuation, setNewValuation] = useState(150000000);
  const [newCustodian, setNewCustodian] = useState('Fiducia Global Logistics Custody SA');
  const [newJurisdiction, setNewJurisdiction] = useState('Switzerland / DLT Art. 973d OR');
  const [newLegalFramework, setNewLegalFramework] = useState('Swiss DLT Act Art. 973d Ledger-based Securities');

  const getCategoryIcon = (category: EconomicAsset['category']) => {
    switch (category) {
      case 'Maritime & Port':
        return <Anchor className="w-4 h-4 text-slate-300" />;
      case 'Aerogate Hub':
        return <Plane className="w-4 h-4 text-slate-300" />;
      case 'Alpine Depository':
        return <Mountain className="w-4 h-4 text-slate-300" />;
      case 'Regenerative Land':
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'Private Heritage Trust':
      default:
        return <Building2 className="w-4 h-4 text-slate-300" />;
    }
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.custodian.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;

    const newAsset: EconomicAsset = {
      id: `ASSET-CH-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      category: newCategory,
      location: newLocation,
      coordinates: [46.8182, 8.2275], // Standard Swiss datum
      valuationCHF: newValuation,
      tokenContractId: `0x${Math.random().toString(16).slice(2, 12)}`,
      custodian: newCustodian,
      jurisdiction: newJurisdiction,
      status: 'AUDITED & ACTIVE',
      blockchainProof: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      lastInspection: new Date().toISOString().split('T')[0],
      legalFramework: newLegalFramework
    };

    onRegisterAsset(newAsset);
    setIsRegisterModalOpen(false);
    setNewName('');
    setNewLocation('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Globe className="w-5 h-5 text-slate-300" />
              <h2 className="text-lg font-corporate font-bold text-slate-100 tracking-tight">
                Global Economic Asset Registry & Spatial Atlas
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                STAGE 5 SPATIAL ATLAS (L1–L5)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Immutably tracks physical and digital economic assets on the blockchain network: ports, bonded aerogate hubs, alpine gold depositories, and regenerative land under Swiss DLT uncertificated securities (Art. 973d OR).
            </p>
          </div>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-900 text-xs font-semibold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tokenize & Register Global Asset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Spatial Interactive Explorer + Asset Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Asset List & Filters */}
        <div className="lg:col-span-7 bg-[#121620] border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search asset, location, custodian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1017] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#0d1017] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Alpine Depository">Alpine Depository</option>
              <option value="Maritime & Port">Maritime & Port</option>
              <option value="Aerogate Hub">Aerogate Hub</option>
              <option value="Regenerative Land">Regenerative Land</option>
              <option value="Private Heritage Trust">Private Heritage Trust</option>
            </select>
          </div>

          {/* Asset List Cards */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredAssets.map(asset => {
              const isSelected = selectedAsset?.id === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/80 border-slate-600 shadow-sm'
                      : 'bg-[#0d1017] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mt-0.5">
                        {getCategoryIcon(asset.category)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          <span>{asset.name}</span>
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{asset.location}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          ID: {asset.id} • Custodian: {asset.custodian.split('/')[0]}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-corporate font-bold text-slate-100 block">
                        {formatCHF(asset.valuationCHF)}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        {asset.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Asset Full Dossier & Blockchain Attestation */}
        <div className="lg:col-span-5 bg-[#121620] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          {selectedAsset ? (
            <>
              <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded bg-slate-900 border border-slate-800">
                      {getCategoryIcon(selectedAsset.category)}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400">{selectedAsset.category}</span>
                      <h3 className="text-sm font-corporate font-bold text-slate-100">{selectedAsset.name}</h3>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                  ON-CHAIN
                </span>
              </div>

              {/* Asset Details Key-Value Cards */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg flex justify-between items-center">
                  <span className="text-slate-400">Appraised Valuation:</span>
                  <span className="font-corporate font-bold text-slate-100 text-sm">{formatCHF(selectedAsset.valuationCHF)}</span>
                </div>

                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1">
                  <div className="text-slate-400 text-[11px]">Physical Location & Geographic Coordinates:</div>
                  <div className="text-slate-200 font-medium">{selectedAsset.location}</div>
                  <div className="text-[10px] font-mono text-slate-300">
                    LAT: {selectedAsset.coordinates[0]}° N, LNG: {selectedAsset.coordinates[1]}° E
                  </div>
                </div>

                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1">
                  <div className="text-slate-400 text-[11px]">Designated Custodian:</div>
                  <div className="text-slate-200 font-medium">{selectedAsset.custodian}</div>
                </div>

                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1">
                  <div className="text-slate-400 text-[11px]">Governing Legal Framework:</div>
                  <div className="text-slate-300">{selectedAsset.legalFramework}</div>
                  <div className="text-[10px] text-slate-500">Jurisdiction: {selectedAsset.jurisdiction}</div>
                </div>

                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1">
                  <div className="text-slate-400 text-[11px]">Last Physical / Remote Audit:</div>
                  <div className="text-slate-200 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {selectedAsset.lastInspection}
                  </div>
                </div>

                {/* Blockchain Proof */}
                <div className="p-2.5 bg-[#0d1017] border border-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
                  <div className="text-slate-400 text-[10px]">Cryptographic S06 Ledger Proof:</div>
                  <div className="text-slate-300 break-all bg-slate-900 p-1.5 rounded border border-slate-800 text-[10px]">
                    {selectedAsset.blockchainProof}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Swiss Uncertificated Securities (Art. 973d OR)
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Select an asset from the left to view detailed ledger coordinates.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Register / Tokenize Global Asset */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121620] border border-slate-700 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-slate-300" />
                <h3 className="text-sm font-corporate font-bold text-slate-100">
                  Register & Tokenize Economic Asset
                </h3>
              </div>
              <button 
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurich Alpine Data Sanctuary & Bullion Annex"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Alpine Depository">Alpine Depository</option>
                    <option value="Maritime & Port">Maritime & Port</option>
                    <option value="Aerogate Hub">Aerogate Hub</option>
                    <option value="Regenerative Land">Regenerative Land</option>
                    <option value="Private Heritage Trust">Private Heritage Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Valuation (CHF)</label>
                  <input
                    type="number"
                    step={5000000}
                    value={newValuation}
                    onChange={(e) => setNewValuation(Number(e.target.value))}
                    className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gotthard Massif, Canton Uri, Switzerland"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Designated Custodian</label>
                <input
                  type="text"
                  value={newCustodian}
                  onChange={(e) => setNewCustodian(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Legal Framework</label>
                <input
                  type="text"
                  value={newLegalFramework}
                  onChange={(e) => setNewLegalFramework(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-700 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-900 font-semibold text-xs shadow-sm"
                >
                  Tokenize & Anchor to S06 Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
