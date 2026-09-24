import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, UserCheck, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Project, Insight, DecisionReference } from '../../../types';
import { StorageService } from '../../../db/storage';

interface InsightsTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ project, onUpdateProject }) => {
  const [decisionInput, setDecisionInput] = useState('');
  const [activeDecisionId, setActiveDecisionId] = useState<string | null>(null);

  const handleRecordHumanDecision = (refId: string) => {
    if (!decisionInput.trim()) return;
    const updatedRefs = project.decisionReferences.map(ref => {
      if (ref.id === refId) {
        return {
          ...ref,
          humanDecisionRecorded: decisionInput,
          decisionStatus: 'Approved' as const,
          updatedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return ref;
    });

    const updated: Project = {
      ...project,
      decisionReferences: updatedRefs
    };
    onUpdateProject(updated);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: 'Human Decision recorded',
      objectType: 'Decision Reference',
      details: `Decision: "${decisionInput}"`
    });

    setDecisionInput('');
    setActiveDecisionId(null);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif text-zinc-950 font-normal">Synthesized Insights & Decision References</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Actionable synthesis grounded in audited evidence chains. AI proposes, human decides.
        </p>
      </div>

      {/* Insights Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-900">Synthesized Insights</h2>
        {project.insights.map((insight) => (
          <div 
            key={insight.id}
            className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">{insight.title}</h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {insight.claimStatus}
              </span>
            </div>

            <p className="text-xs text-zinc-800 leading-relaxed font-serif text-[13px] bg-zinc-50/60 p-4 rounded-2xl border border-zinc-100">
              "{insight.statement}"
            </p>

            <div className="text-xs bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 space-y-1">
              <p className="font-semibold text-amber-950 text-[11px] uppercase">Strategic Recommendation</p>
              <p className="text-zinc-700">{insight.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Human Decision Reference Section */}
      <div className="space-y-4 pt-4 border-t border-zinc-200">
        <h2 className="text-sm font-semibold text-zinc-900">Decision References (Human-in-the-Loop)</h2>
        
        {project.decisionReferences.map((ref) => (
          <div 
            key={ref.id}
            className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-zinc-900">{ref.decisionTitle}</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {ref.decisionStatus}
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {ref.strategicRationale}
            </p>

            {ref.humanDecisionRecorded ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-semibold text-emerald-900">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Human Decision Recorded</span>
                </div>
                <p className="text-emerald-950 font-medium">{ref.humanDecisionRecorded}</p>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-zinc-700">
                  Record Final Human Decision / Action Plan:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter decision rationale or action approved..."
                    value={activeDecisionId === ref.id ? decisionInput : ''}
                    onFocus={() => setActiveDecisionId(ref.id)}
                    onChange={(e) => {
                      setActiveDecisionId(ref.id);
                      setDecisionInput(e.target.value);
                    }}
                    className="flex-1 p-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-amber-400/50"
                  />
                  <button
                    onClick={() => handleRecordHumanDecision(ref.id)}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shrink-0 shadow-xs"
                  >
                    Commit Decision
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
