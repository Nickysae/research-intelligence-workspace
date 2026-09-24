import React, { useState } from 'react';
import { Layers, ArrowDown, FileText, Database, Globe, CheckCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Project, EvidenceNode, ClaimStatus } from '../../../types';

interface EvidenceTabProps {
  project: Project;
}

export const EvidenceTab: React.FC<EvidenceTabProps> = ({ project }) => {
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'claims' | 'contradictions'>('map');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceNode>(project.evidenceList[0] || null);
  const [showFullProvenanceModal, setShowFullProvenanceModal] = useState(false);

  const getClaimBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Supported</span>;
      case 'LIMITED EVIDENCE':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">Limited Evidence</span>;
      case 'CONFLICTING EVIDENCE':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">Conflicting Evidence</span>;
      case 'INSUFFICIENT EVIDENCE':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">Insufficient</span>;
      default:
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">Unsupported</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <h1 className="text-2xl font-serif text-zinc-950 font-normal">Evidence</h1>

      {/* Sub Tabs: Evidence Map | Claims | Contradictions */}
      <div className="flex items-center gap-6 border-b border-zinc-200 text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('map')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeSubTab === 'map' ? 'text-zinc-950 border-b-2 border-amber-400' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Evidence Map
        </button>
        <button
          onClick={() => setActiveSubTab('claims')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'claims' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Claims ({project.evidenceList.length})
        </button>
        <button
          onClick={() => setActiveSubTab('contradictions')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'contradictions' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Contradictions (0)
        </button>
      </div>

      {/* Provenance Tree Map (Exact visual replica of bottom-middle-right screenshot) */}
      {activeSubTab === 'map' && selectedEvidence && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-2xs space-y-6">
            {/* Level 1: Claim Box */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 max-w-xl mx-auto text-center space-y-1.5 shadow-2xs">
              <p className="text-xs font-semibold text-zinc-900 leading-snug">
                {selectedEvidence.claim}
              </p>
              <span className="inline-block text-[10px] font-semibold text-amber-900 uppercase tracking-wider">
                Claim
              </span>
            </div>

            {/* Connecting Vertical Stem 1 */}
            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-zinc-200" />
            </div>

            {/* Level 2: Analysis Box */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 max-w-xl mx-auto space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-900">Analysis</span>
                </div>
                {getClaimBadge(selectedEvidence.status)}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {selectedEvidence.analysisSummary}
              </p>
            </div>

            {/* Connecting Vertical Stem 2 */}
            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-zinc-200" />
            </div>

            {/* Level 3: Evidence Box */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 max-w-xl mx-auto space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-900">Evidence</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Strong</span>
              </div>
              <p className="text-xs text-zinc-600">
                12 studies, 8 show positive correlation
              </p>
            </div>

            {/* Connecting Vertical Stem 3 (Branching) */}
            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-zinc-200" />
            </div>

            {/* Level 4: 2 Columns - Data & Source */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              {/* Data Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="text-[11px] font-semibold text-zinc-900 uppercase">Data</span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">
                  {selectedEvidence.dataSummary}
                </p>
              </div>

              {/* Source Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="text-[11px] font-semibold text-zinc-900 uppercase">Source</span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">
                  {selectedEvidence.sourceNames.join(', ')}
                </p>
              </div>
            </div>

            {/* View Full Provenance Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setShowFullProvenanceModal(true)}
                className="px-6 py-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl transition-colors"
              >
                View full provenance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provenance Traceability Modal */}
      {showFullProvenanceModal && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-xl border border-zinc-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-zinc-900 text-base">Provenance Audit Chain</h3>
              <button 
                onClick={() => setShowFullProvenanceModal(false)}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-3 text-xs font-mono">
              <div className="text-emerald-700 font-bold">1. INSIGHT (Derived)</div>
              <div className="pl-4 border-l-2 border-emerald-400 text-zinc-800">
                "{project.insights[0]?.statement || 'Renewable capacity positively accelerates macroeconomic GDP growth.'}"
              </div>

              <div className="text-blue-700 font-bold">2. ANALYSIS (Methodology Enforced)</div>
              <div className="pl-4 border-l-2 border-blue-400 text-zinc-800">
                {selectedEvidence.analysisMethod} (p &lt; 0.01)
              </div>

              <div className="text-amber-700 font-bold">3. EVIDENCE (Cross-Corroborated)</div>
              <div className="pl-4 border-l-2 border-amber-400 text-zinc-800">
                {selectedEvidence.claim} ({selectedEvidence.status})
              </div>

              <div className="text-purple-700 font-bold">4. IMMUTABLE DATA POINTS</div>
              <div className="pl-4 border-l-2 border-purple-400 text-zinc-800">
                {project.dataPoints.map(dp => `${dp.metricName}: ${dp.value} (${dp.year})`).join(' | ')}
              </div>

              <div className="text-zinc-900 font-bold">5. AUDITED SOURCE CITATIONS</div>
              <div className="pl-4 border-l-2 border-zinc-400 text-zinc-800">
                {selectedEvidence.sourceNames.join(' | ')}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowFullProvenanceModal(false)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
