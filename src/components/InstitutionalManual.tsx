/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Key, 
  Coins, 
  Layers, 
  Globe, 
  Send, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Download, 
  ExternalLink,
  Lock,
  Sparkles,
  Cpu,
  ChevronRight,
  Scale
} from 'lucide-react';
import { MultiSigSigner } from '../types/fiducia';

interface InstitutionalManualProps {
  currentSigner: MultiSigSigner;
}

export const InstitutionalManual: React.FC<InstitutionalManualProps> = ({ currentSigner }) => {
  const [activeChapter, setActiveChapter] = useState('genesis');

  const chapters = [
    { id: 'genesis', title: '1. Genesis & Institutional Mandate', icon: Award },
    { id: 'ledger', title: '2. S06 Provenance Ledger Architecture', icon: Layers },
    { id: 'verbs', title: '3. The Nine Lifecycle Verbs & Formula', icon: Sparkles },
    { id: 'separations', title: '4. The Four Non-Negotiable Separations', icon: Scale },
    { id: 'credit', title: '5. Credit & Regenerative Risk Underwriting', icon: ShieldCheck },
    { id: 'currency', title: '6. Currency Minting & Proof-of-Reserves', icon: Coins },
    { id: 'assets', title: '7. Global Economic Asset Tracking (DLT Act)', icon: Globe },
    { id: 'multisig', title: '8. 3-of-5 Multi-Sig Protocol & HSM Enclaves', icon: Key },
    { id: 'settlement', title: '9. Cross-Border Settlement (IVMS 101)', icon: Send },
    { id: 'playbook', title: '10. Shane Jonathan Lozenich Operator Playbook', icon: BookOpen },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b1329]/90 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-cinzel font-bold text-slate-100">
                Fiducia Centrale — Institutional Operating Manual & Sovereign Codex
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/40">
                OFFICIAL CODEX • CHE-492.888.349
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Complete institutional specification, mathematical formulation, legal doctrine, and operating instructions for Archivist-in-Chief & Fiduciary Trustee <strong>Shane Jonathan Lozenich</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Codex</span>
            </button>
            <div className="bg-[#080d1c] border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400">
              Authority: Shane Jonathan Lozenich
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Navigation Sidebar + Reading View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 bg-[#0b1329]/90 border border-slate-800 rounded-xl p-4 shadow-sm space-y-1.5 h-fit">
          <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold px-2 mb-2">
            Table of Contents
          </div>
          {chapters.map(ch => {
            const Icon = ch.icon;
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="truncate">{ch.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-600'}`} />
              </button>
            );
          })}

          <div className="mt-4 pt-3 border-t border-slate-800/80 px-2 space-y-2 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Jurisdiction:</span>
              <span className="font-mono text-slate-200">Switzerland (ZH/GE)</span>
            </div>
            <div className="flex justify-between">
              <span>Governance:</span>
              <span className="font-mono text-slate-200">Swiss DLT Act Art. 973d</span>
            </div>
            <div className="flex justify-between">
              <span>Presidium:</span>
              <span className="font-mono text-amber-400 truncate">Shane Jonathan Lozenich</span>
            </div>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-8 bg-[#0b1329]/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6 text-slate-300 leading-relaxed text-xs">
          {/* Chapter 1: Genesis & Institutional Mandate */}
          {activeChapter === 'genesis' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 01</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Genesis & Institutional Mandate of Fiducia Centrale
                </h3>
              </div>

              <p>
                <strong>Fiducia Centrale</strong> represents the institutional sovereign evolution from the International Archive established in the <em>Psychrosphere Atlas</em> (<code>https://psychrosphereatlas.vercel.app/</code>). While the Atlas mapped the genealogical, archaeological, and infrastructural lineage across Europe and the transatlantic space, Fiducia Centrale transforms those archival coordinates into an immutable, active financial and custodial reality.
              </p>

              <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 text-xs">Core Institutional Tenets:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li><strong>The Central Reserve of Trust:</strong> Anchoring intangible heritage and tangible infrastructure to cryptographic ledger-based uncertificated securities (Registerwertrechte).</li>
                  <li><strong>Full Reserve Backing:</strong> No maturity transformation, fractional reserves, or hyper-financialized rehypothecation. 100% backed by Gotthard physical gold ingots and central bank deposits.</li>
                  <li><strong>Presidium Leadership:</strong> Governed by <strong>Shane Jonathan Lozenich</strong> as Archivist-in-Chief, Keeper of the Great Seal, and Chief Fiduciary Trustee.</li>
                  <li><strong>Swiss Sovereign Legal Base:</strong> Operating under Swiss private and public law: Swiss Code of Obligations (Art. 60–79 & 973d–973i OR), Banking Act Art. 1b FinTech framework, and AMLA/GwG.</li>
                </ul>
              </div>

              <p>
                By linking the <strong>S06 Provenance Ledger</strong> directly to physical infrastructure (Gotthard gold depositories, Alpine hydroelectric generation, Port of Rotterdam logistical hubs, and Aerogate bonded air corridors), Fiducia Centrale achieves true permanence and transparent auditability without counterparty fragility.
              </p>
            </div>
          )}

          {/* Chapter 2: S06 Provenance Ledger Architecture */}
          {activeChapter === 'ledger' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 02</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  S06 Provenance Ledger Architecture & Cryptographic Hash Chaining
                </h3>
              </div>

              <p>
                Stratum 06 (<strong>S06 — Provenance & Ledger Custody</strong>) is the cryptographic spine of Fiducia Centrale. Every transaction, asset tokenization, credit draw, or charter amendment produces an immutable block appended to the chain.
              </p>

              <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-[11px]">
                <div className="text-amber-400 font-bold">Cryptographic Block Linkage Formula:</div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800 text-slate-200">
                  H_n = SHA-256( H_{'{n-1}'} || BlockNumber || Action || EntityID || Timestamp || MerkleRoot )
                </div>
                <p className="text-slate-400 text-[10px] font-sans">
                  Where each block hash cryptographically binds to the preceding block's digest $H_{'{n-1}'}$. Any retrospective alteration in past blocks causes immediate cascade invalidation across all subsequent hashes.
                </p>
              </div>

              <h4 className="font-bold text-slate-200 pt-2">The WebCrypto Live Integrity Verification Subsystem</h4>
              <p>
                The ledger features an in-browser audit engine utilizing the native WebCrypto API (<code>crypto.subtle.digest</code>). When clicking <em>"Verify Cryptographic Integrity"</em>, the engine parses every block from genesis to the active block height, recalculating digests and Merkle trees to certify zero data corruption or unauthorized tampering.
              </p>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <strong className="text-amber-300 block mb-1">Merkle Tree Aggregation</strong>
                  <span>Transactions inside each block are paired into two-leaf Merkle roots, ensuring instant $O(\log n)$ inclusion proofs.</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <strong className="text-amber-300 block mb-1">FINMA Compliance Stamp</strong>
                  <span>Every block embeds an automated Swiss FinTech attestation token (e.g. <code>FINMA-DLT-ART-973d-CERTIFIED</code>).</span>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3: The Nine Lifecycle Verbs */}
          {activeChapter === 'verbs' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 03</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  The Nine Lifecycle Verbs & Power Placement Formulation
                </h3>
              </div>

              <p>
                Derived from the Archivist Lifecycle Engine, all state transitions within Fiducia Centrale are strictly governed by the <strong>Nine Closed Lifecycle Operations</strong>:
              </p>

              <div className="space-y-2">
                {[
                  { num: '01', verb: 'Classify', desc: 'Assigns an entity to its primary Stratum (S01–S08). Sets ontological base.' },
                  { num: '02', verb: 'Categorize', desc: 'Sorts entity into appropriate operational domain, branch shelf, and core vault.' },
                  { num: '03', verb: 'Appoint / Determine', desc: 'Designates individuals, institutional holders, or consorita to legal fiduciary roles.' },
                  { num: '04', verb: 'Approve / Deny', desc: 'Official administrative confirmation or rejection against statutory parent enabling grants.' },
                  { num: '05', verb: 'Balance', desc: 'Reconciles assets, liabilities, collateral ratios, and inter-strata power scores.' },
                  { num: '06', verb: 'Issue', desc: 'Affixes cryptographic seals and transitions node to ACTIVE status under multi-sig consensus.' },
                  { num: '07', verb: 'Revoke (Void Ab Initio)', desc: 'Extinguishes invalid or ultra-vires claims, reducing power metric strictly to 0.00 P_eff.' },
                  { num: '08', verb: 'Reorganize', desc: 'Restructures sub-nodes, updates Level (L1–L5), or transfers jurisdictional shelf.' },
                  { num: '09', verb: 'Create', desc: 'Instantiates a brand new governed node into the institutional archive.' },
                ].map(v => (
                  <div key={v.num} className="p-2.5 bg-[#080d1c] border border-slate-800 rounded-lg flex items-start space-x-3">
                    <span className="font-mono font-bold text-amber-400 shrink-0 text-xs mt-0.5">{v.num}</span>
                    <div>
                      <strong className="text-slate-200 block text-xs">{v.verb}</strong>
                      <span className="text-slate-400 text-[11px]">{v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-slate-200 pt-2">The Placement Power Formula:</h4>
              <div className="bg-[#080d1c] p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">
                P_effective = BaseWeight(Stratum) × LevelMultiplier(Level) × SealFactor
              </div>
              <p className="text-slate-400 text-[11px]">
                Where Strata weights scale from S01 (1.0) to S02 Constitutive (5.0), Level multipliers scale from L1 Observation (1.0) to L5 Execution (4.0), and active multi-sig cryptographic seals provide a 1.25 multiplier bonus.
              </p>
            </div>
          )}

          {/* Chapter 4: The Four Non-Negotiable Separations */}
          {activeChapter === 'separations' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 04</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  The Four Non-Negotiable Epistemological Separations
                </h3>
              </div>

              <p>
                To safeguard the institution from arbitrary sovereignty claims, aristocratic over-reach, or historical conflation, Shane Jonathan Lozenich enforces four non-negotiable boundaries:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-300">1. Historical Origin vs Present Authority</strong>
                    <span className="text-[10px] font-mono text-emerald-400">STRICTLY SEPARATED</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Past dynasties, ancient charters, and historical lineage provide valuable cultural and genealogical context (held in S01/S07), but they do not automatically grant modern public authority without an active, recognized statutory instrument.
                  </p>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-300">2. Evidence is Not Title</strong>
                    <span className="text-[10px] font-mono text-emerald-400">STRICTLY SEPARATED</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Archaeological artifacts, family trees, or genetic evidence are classified as L1 source inputs. Mere possession of documentary evidence never constitutes lawful legal title without notarial and constitutive ratifications.
                  </p>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-300">3. Practical Capacity vs Legal Competence</strong>
                    <span className="text-[10px] font-mono text-emerald-400">STRICTLY SEPARATED</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Possessing the cryptographic private keys or technical infrastructure to issue a currency, credit facility, or seal does not inherently grant the legal right to do so. Every issuance requires a parent grant verified by the Ultra-Vires Watchdog.
                  </p>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-300">4. European Multi-Order Distinctions</strong>
                    <span className="text-[10px] font-mono text-emerald-400">STRICTLY SEPARATED</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Europe is not a single uniform entity. Swiss federal law, EU community treaties, Eurosystem monetary rails, ECHR human rights jurisprudence, and national constitutional courts occupy distinct legal shelves.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: Credit & Regenerative Risk Underwriting */}
          {activeChapter === 'credit' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 05</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Credit Issuance & Regenerative Capital Underwriting
                </h3>
              </div>

              <p>
                The <strong>Credit Engine</strong> provides liquidity to productive, regenerative economic projects rather than speculative debt bubbles. Underwriting evaluates three core criteria:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <strong className="text-amber-300 block mb-1">1. Over-Collateralization</strong>
                  <span className="text-slate-400 text-[11px]">Minimum 120% to 160% in physical Gotthard gold, cantonal hydroelectric concessions, or Swiss Confederation sovereign bonds.</span>
                </div>
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <strong className="text-amber-300 block mb-1">2. HDI Alignment Score</strong>
                  <span className="text-slate-400 text-[11px]">Human Development Index impact score (minimum 75/100 required) assessing community health, longevity, and education.</span>
                </div>
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <strong className="text-amber-300 block mb-1">3. UN SDG Verification</strong>
                  <span className="text-slate-400 text-[11px]">Certified alignment with UN Sustainable Development Goals (SDG 7 Clean Energy, SDG 13 Climate, SDG 16 Governance).</span>
                </div>
              </div>

              <h4 className="font-bold text-slate-200 pt-2">Multi-Sig Automatic Routing Rule:</h4>
              <p>
                Any credit facility of <strong>CHF 20,000,000 or greater</strong> automatically bypasses unilateral issuance and is queued into the <strong>3-of-5 Multi-Signature Governance Queue</strong>, requiring institutional ratification across the cantonal enclaves.
              </p>
            </div>
          )}

          {/* Chapter 6: Currency Minting & Proof-of-Reserves */}
          {activeChapter === 'currency' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 06</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Currency Minting, Acceptance & Proof-of-Reserves (FCHF & FRU)
                </h3>
              </div>

              <p>
                Fiducia Centrale emits two distinct institutional cryptographic reserve currencies:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="font-mono font-bold text-amber-400 text-sm">FCHF</span>
                    <span className="text-slate-400 font-semibold">— Fiducia Swiss Franc</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Fixed 1:1 parity with the Swiss Franc (CHF). 100% backed by segregated physical gold ingots in the Gotthard Alpine Bunker and sight deposits held at the Swiss National Bank (SNB).
                  </p>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="font-mono font-bold text-blue-400 text-sm">FRU</span>
                    <span className="text-slate-400 font-semibold">— Fiducia Reserve Unit</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Synthetic global SDR-basket reserve unit (~1.34 CHF value), weighted against physical bullion, Swiss sovereign green bonds, and international trade claims.
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-slate-200 pt-2">Full-Reserve Backing Guarantee & Basel III Metrics</h4>
              <p>
                Every token in circulation is matched by verifiable assets held in segregated depositories. Under Basel III prudential standards, Fiducia Centrale maintains:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                <li><strong>Liquidity Coverage Ratio (LCR):</strong> 168.4% (Regulatory requirement: &gt; 100%)</li>
                <li><strong>Net Stable Funding Ratio (NSFR):</strong> 142.0% (Regulatory requirement: &gt; 100%)</li>
                <li><strong>Leverage Ratio:</strong> 24.8% Tier-1 Common Equity equivalent</li>
              </ul>
            </div>
          )}

          {/* Chapter 7: Global Economic Asset Tracking */}
          {activeChapter === 'assets' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 07</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Global Economic Asset Tracking & Swiss DLT Act (Art. 973d OR)
                </h3>
              </div>

              <p>
                Under the landmark <em>Swiss Federal Act on the Adaptation of Federal Law to Developments in Distributed Ledger Technology (DLT Act)</em>, Swiss Code of Obligations Art. 973d–973i enables the issuance of <strong>Registerwertrechte</strong> (uncertificated ledger-based securities).
              </p>

              <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 text-xs">Primary Tracked Economic Infrastructure:</h4>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong>Gotthard Sovereign Specie Bunker:</strong> 15,400 kg allocated fine gold bullion (999.9 purity) held in Cantons Uri and Ticino.</li>
                  <li>• <strong>Aerogate Geneva Airport Freezone:</strong> Bonded customs corridor for international diplomatic and precious metals transport.</li>
                  <li>• <strong>Rhône Glacial Hydroelectric Catchment:</strong> 440 MW renewable Alpine clean power concession.</li>
                  <li>• <strong>Port of Rotterdam Logistics Corridor:</strong> Deepwater hydrogen terminal and custodial warehouse facility.</li>
                  <li>• <strong>Paradeplatz Heritage Vault:</strong> Zurich archival sanctuary for foundational constitutive instruments.</li>
                </ul>
              </div>

              <p>
                Each asset record is cryptographically bound to physical inspection certificates, geographic GPS coordinates, and notarial affidavits on the S06 blockchain.
              </p>
            </div>
          )}

          {/* Chapter 8: Multi-Sig Protocol & HSM Enclaves */}
          {activeChapter === 'multisig' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 08</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  3-of-5 Multi-Signature Protocol & HSM Hardware Enclaves
                </h3>
              </div>

              <p>
                Security against unilateral compromise or unauthorized coercion is guaranteed by a <strong>3-of-5 M-of-N threshold signature protocol</strong> distributed across distinct Swiss cantons and hardware enclaves under the presidium of <strong>Shane Jonathan Lozenich</strong>:
              </p>

              <div className="space-y-2">
                {[
                  { id: 'SIG-01', name: 'Shane Jonathan Lozenich', role: 'Archivist-in-Chief & Keeper of the Great Seal', loc: 'Zurich Hauptsitz', type: 'Hardware Key (YubiKey)' },
                  { id: 'SIG-02', name: 'Shane Jonathan Lozenich', role: 'Chief Fiduciary Trustee & Sovereign Notary', loc: 'Geneva Office', type: 'Biometric Passkey' },
                  { id: 'SIG-03', name: 'Shane Jonathan Lozenich', role: 'FINMA Regulatory Compliance Delegate', loc: 'Bern Headquarters', type: 'Fiduciary Seal' },
                  { id: 'SIG-04', name: 'Shane Jonathan Lozenich', role: 'Independent Custodian & Vault Controller', loc: 'Basel Depository', type: 'Hardware Key (YubiKey)' },
                  { id: 'SIG-05', name: 'Securosys Primus HSM v3', role: 'Autonomous Zero-Knowledge Enclave', loc: 'Zug Crypto Valley', type: 'FIPS 140-2 Level 3 HSM' },
                ].map(s => (
                  <div key={s.id} className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-amber-400 font-bold text-xs">{s.id}</span>
                        <span className="text-slate-200 font-semibold">{s.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{s.role} • {s.loc}</div>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-800">
                      {s.type}
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-slate-200 pt-2">Autonomous Execution Trigger:</h4>
              <p>
                When a pending proposal receives its 3rd valid cryptographic signature, the smart custody logic immediately executes the on-chain commit, mints currency or disburses credit, and permanently seals the transaction into block history.
              </p>
            </div>
          )}

          {/* Chapter 9: Cross-Border Settlement (IVMS 101) */}
          {activeChapter === 'settlement' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 09</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Cross-Border Settlement & FATF Travel Rule (IVMS 101)
                </h3>
              </div>

              <p>
                To enable real-time institutional cross-border liquidity without counterparty settlement risk, Fiducia Centrale implements atomic <strong>Delivery vs Payment (DvP)</strong> and <strong>Payment vs Payment (PvP)</strong> rails aligned with the <em>Bank for International Settlements (BIS) Project Agora</em> and <em>Project Helvetia</em>.
              </p>

              <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 text-xs">Active Settlement Corridors:</h4>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  <li>• <strong>Project Agora Corridor:</strong> Swiss SIC / Helvetia wCBDC ⇄ Eurosystem TARGET / TIPS</li>
                  <li>• <strong>Swiss-UK Berne Agreement Rail:</strong> Zurich Vault ⇄ Bank of England CHAPS</li>
                  <li>• <strong>Project Ubin-Helvetia:</strong> Zurich ⇄ Monetary Authority of Singapore (MAS MEPS+)</li>
                  <li>• <strong>Fedwire Sovereign Custody:</strong> Zurich ⇄ US DTCC / Fedwire</li>
                </ul>
              </div>

              <h4 className="font-bold text-slate-200 pt-2">FATF Recommendation 16 (Travel Rule):</h4>
              <p>
                All inter-institutional transactions carry an encrypted <strong>IVMS 101 (interVASP Messaging Standard)</strong> payload containing hashed originator and beneficiary identifiers, ensuring strict compliance with FINMA Circular 2019/2 and international anti-money laundering (AMLA/GwG) regulations.
              </p>
            </div>
          )}

          {/* Chapter 10: Shane Jonathan Lozenich Operator Playbook */}
          {activeChapter === 'playbook' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">Chapter 10</span>
                <h3 className="text-base font-cinzel font-bold text-slate-100">
                  Master Operator Playbook for Shane Jonathan Lozenich
                </h3>
              </div>

              <p>
                As <strong>Archivist-in-Chief & Fiduciary Trustee</strong>, Shane Jonathan Lozenich possesses administrative custody and operational authority across all modules. Below are the standard operating protocols:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Workflow 1: Executing a Lifecycle Verb on an Archival Node</span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-400 text-[11px] space-y-1 pl-1">
                    <li>Navigate to the <strong>Archivist Lifecycle</strong> tab.</li>
                    <li>Select the target entity (e.g. <code>FC-CH-001</code>).</li>
                    <li>Choose the appropriate operation from the 9-verb palette (e.g. <em>06 — Issue</em>).</li>
                    <li>Verify the parent statutory grant is entered and valid under Swiss law.</li>
                    <li>Click <strong>Execute Lifecycle State Transition</strong>. The system recalculates P_effective power score and writes a new block to S06.</li>
                  </ol>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Workflow 2: Authorizing a Multi-Sig Proposal</span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-400 text-[11px] space-y-1 pl-1">
                    <li>Use the header dropdown to switch between your designated signatory seats (Zurich, Geneva, Bern, or Basel).</li>
                    <li>Navigate to the <strong>Multi-Sig Protocol</strong> tab.</li>
                    <li>Inspect the proposal details, amount, collateral audit, and collected signatures.</li>
                    <li>Click <strong>Authorize as Shane Jonathan Lozenich</strong> to affix your cryptographic key signature.</li>
                    <li>Upon the 3rd signature, the proposal executes automatically on the blockchain.</li>
                  </ol>
                </div>

                <div className="p-3 bg-[#080d1c] border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Workflow 3: Verifying Cryptographic Chain Integrity</span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-400 text-[11px] space-y-1 pl-1">
                    <li>Navigate to the <strong>S06 Provenance Ledger</strong> tab.</li>
                    <li>Click <strong>Verify Cryptographic Integrity</strong>.</li>
                    <li>Inspect the real-time SHA-256 traversal verification across all blocks from genesis to tip.</li>
                  </ol>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-xs">
                <strong>Sole Custodial Attestation:</strong> This codex is signed, attested, and maintained by <strong>Shane Jonathan Lozenich</strong> in accordance with the Swiss Code of Obligations and the International Archive Covenant.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
