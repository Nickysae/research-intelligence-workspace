import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Project, MethodologyProposal } from '../../../types';
import { GeminiService } from '../../../services/geminiService';
import { StorageService } from '../../../db/storage';

interface MethodologyTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const MethodologyTab: React.FC<MethodologyTabProps> = ({ project, onUpdateProject }) => {
  const [activeSubTab, setActiveSubTab] = useState<'proposal' | 'details' | 'history'>('proposal');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showFullProposal, setShowFullProposal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMethod, setEditMethod] = useState(project.methodology.recommendedMethod);
  const [editWhy, setEditWhy] = useState(project.methodology.why);

  const handleApprove = () => {
    const updated: Project = {
      ...project,
      methodology: {
        ...project.methodology,
        status: 'Approved',
        approvedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
                    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      }
    };
    onUpdateProject(updated);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: 'Methodology approved',
      objectType: 'Protocol',
      details: 'User validated and approved research methodology.'
    });
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const newProposal = await GeminiService.generateMethodologyProposal(project.questionData);
      const updated: Project = {
        ...project,
        methodology: newProposal
      };
      onUpdateProject(updated);
      StorageService.addLedgerEntry(project.id, {
        actor: 'AI Assistant',
        action: 'Methodology proposal regenerated',
        objectType: 'Protocol',
        details: 'Refreshed research methodology formulation using AI engine.'
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveEdit = () => {
    const updated: Project = {
      ...project,
      methodology: {
        ...project.methodology,
        status: 'Modified',
        recommendedMethod: editMethod,
        why: editWhy
      }
    };
    onUpdateProject(updated);
    setIsEditing(false);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: 'Methodology modified',
      objectType: 'Protocol',
      details: 'User adjusted methodology constraints and rationale.'
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header with Title & Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-serif text-zinc-950 font-normal">Methodology</h1>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
            project.methodology.status === 'Approved'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {project.methodology.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {project.methodology.status !== 'Approved' && (
            <button
              onClick={handleApprove}
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Approve Protocol</span>
            </button>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
          >
            {isEditing ? 'Cancel' : 'Modify'}
          </button>
        </div>
      </div>

      {/* Sub Tabs: Proposal | Details | History */}
      <div className="flex items-center gap-6 border-b border-zinc-200 text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('proposal')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeSubTab === 'proposal' ? 'text-zinc-950 border-b-2 border-amber-400' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Proposal
        </button>
        <button
          onClick={() => setActiveSubTab('details')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'details' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'history' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          History
        </button>
      </div>

      {/* Methodology Proposal Card (Exact visual replica of bottom-left mockup) */}
      {activeSubTab === 'proposal' && (
        <div className="bg-white p-7 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Methodology Proposal</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Generated by AI • {project.methodology.approvedAt || '12 Apr 2025, 10:24'}
              </p>
            </div>

            <button
              disabled={isRegenerating}
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-xs text-zinc-700 font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-amber-500' : 'text-zinc-500'}`} />
              <span>{isRegenerating ? 'Generating...' : 'Regenerate'}</span>
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Recommended Method</label>
                <textarea
                  value={editMethod}
                  onChange={(e) => setEditMethod(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-zinc-200 bg-white focus:ring-2 focus:ring-amber-400/50"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Why (Scientific Rationale)</label>
                <textarea
                  value={editWhy}
                  onChange={(e) => setEditWhy(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-zinc-200 bg-white focus:ring-2 focus:ring-amber-400/50"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 bg-zinc-200/60 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-500 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-xs">
              <div>
                <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Research Objective</p>
                <p className="text-zinc-600 mt-1 leading-relaxed">
                  {project.questionData.objective}
                </p>
              </div>

              <div>
                <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Recommended Method</p>
                <p className="text-zinc-800 font-medium mt-1 leading-relaxed">
                  {project.methodology.recommendedMethod}
                </p>
              </div>

              <div>
                <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Why</p>
                <p className="text-zinc-600 mt-1 leading-relaxed">
                  {project.methodology.why}
                </p>
              </div>

              <div>
                <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Required Data</p>
                <ul className="list-disc list-inside space-y-1 mt-1 text-zinc-600">
                  {project.methodology.requiredData.map((dataReq, idx) => (
                    <li key={idx}>{dataReq}</li>
                  ))}
                </ul>
              </div>

              {/* Expandable Section */}
              {showFullProposal && (
                <div className="pt-4 border-t border-zinc-100 space-y-4">
                  <div>
                    <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Source Requirements</p>
                    <ul className="list-disc list-inside space-y-1 mt-1 text-zinc-600">
                      {project.methodology.sourceRequirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Analysis Approach</p>
                    <p className="text-zinc-600 mt-1">{project.methodology.analysisMethod}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Potential Bias & Mitigation</p>
                    <ul className="list-disc list-inside space-y-1 mt-1 text-zinc-600">
                      {project.methodology.potentialBias.map((bias, idx) => (
                        <li key={idx}>{bias}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Methodological Limitations</p>
                    <ul className="list-disc list-inside space-y-1 mt-1 text-zinc-600">
                      {project.methodology.limitations.map((limit, idx) => (
                        <li key={idx}>{limit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowFullProposal(!showFullProposal)}
                className="w-full py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <span>{showFullProposal ? 'Hide full proposal' : 'View full proposal'}</span>
                {showFullProposal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Yellow CTA footer button matching mockup */}
          <button
            onClick={() => setActiveSubTab('details')}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            View Methodology Details
          </button>
        </div>
      )}

      {/* Details View */}
      {activeSubTab === 'details' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-2">Gatekeeper Conformity</h3>
            <p className="text-zinc-500">
              The approved methodology conforms to Gate 2 (Methodology Fit). The research inquiry requires causal inference between renewable investment and macroeconomic expansion, which is satisfied by econometric panel regression with country fixed effects.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="font-semibold text-amber-900">Alternative Evaluated</h4>
            <p className="text-amber-800 mt-1">
              {project.methodology.alternativeMethod || 'Difference-in-Differences (DiD) comparing pre/post renewable tariff implementation.'}
            </p>
          </div>
        </div>
      )}

      {/* History View */}
      {activeSubTab === 'history' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900">Protocol Revision History</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex justify-between font-medium text-zinc-900">
                <span>Version 1.0 (Approved)</span>
                <span className="text-zinc-400">{project.methodology.approvedAt || '12 Apr 2025'}</span>
              </div>
              <p className="text-zinc-500 mt-1">Initial AI proposal verified and locked by Alexandra Putri.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
