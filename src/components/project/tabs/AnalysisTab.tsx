import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Play, Sparkles } from 'lucide-react';
import { Project, GatekeeperCheck } from '../../../types';
import { GeminiService } from '../../../services/geminiService';
import { StorageService } from '../../../db/storage';

interface AnalysisTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const AnalysisTab: React.FC<AnalysisTabProps> = ({ project, onUpdateProject }) => {
  const [isRunningCheck, setIsRunningCheck] = useState(false);

  const handleRunAllGates = async () => {
    setIsRunningCheck(true);
    try {
      const results = await GeminiService.runGatekeeperEvaluation(
        project.questionData.question,
        project.methodology.recommendedMethod,
        project.sources.filter(s => s.validationStatus === 'Validated').length
      );

      const updated: Project = {
        ...project,
        gatekeeperChecks: results
      };
      onUpdateProject(updated);
      StorageService.addLedgerEntry(project.id, {
        actor: 'AI Assistant',
        action: '7-Gate Methodology Audit executed',
        objectType: 'Gatekeeper',
        details: 'Verified validity, inference bounds, and source sufficiency.'
      });
    } finally {
      setIsRunningCheck(false);
    }
  };

  const allPassed = project.gatekeeperChecks.every(g => g.passed);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-zinc-950 font-normal">Methodology & Evidence Gatekeeper</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Strict 7-gate control layer to prevent ungrounded AI conclusions and correlation vs causation errors.
          </p>
        </div>

        <button
          disabled={isRunningCheck}
          onClick={handleRunAllGates}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isRunningCheck ? 'animate-spin' : 'fill-zinc-950'}`} />
          <span>{isRunningCheck ? 'Evaluating Gates...' : 'Run 7-Gate Audit'}</span>
        </button>
      </div>

      {/* Overall Gatekeeper Summary Box */}
      <div className={`p-6 rounded-2xl border flex items-center justify-between ${
        allPassed 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
          : 'bg-amber-50/70 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            allPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {allPassed ? 'All 7 Research Gates Cleared' : 'Gatekeeper Audit In Progress / Pending Actions'}
            </h3>
            <p className="text-xs opacity-80 mt-0.5">
              {allPassed 
                ? 'The research protocol and data meet the rigorous requirements for evidence-backed synthesis.' 
                : 'Review the gatekeeper notes below to ensure methodology alignment.'}
            </p>
          </div>
        </div>
      </div>

      {/* 7 Minimal Gates List */}
      <div className="space-y-3">
        {project.gatekeeperChecks.map((gate) => (
          <div 
            key={gate.id}
            className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-start gap-4 hover:border-zinc-300 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              gate.passed ? 'bg-emerald-100/70 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {gate.passed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-zinc-900">
                  Gate {gate.gateNumber} — {gate.name}
                </h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  gate.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {gate.passed ? 'PASSED' : 'ACTION REQUIRED'}
                </span>
              </div>
              <p className="text-zinc-600 mt-1 leading-relaxed">
                {gate.details}
              </p>
              {gate.notes && (
                <div className="mt-2 text-[11px] text-zinc-500 bg-zinc-50 p-2 rounded-lg border border-zinc-100 font-mono">
                  Audit Notes: {gate.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
