import React, { useState } from 'react';
import { HelpCircle, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project, ResearchQuestion } from '../../../types';
import { StorageService } from '../../../db/storage';

interface QuestionTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const QuestionTab: React.FC<QuestionTabProps> = ({ project, onUpdateProject }) => {
  const [questionData, setQuestionData] = useState<ResearchQuestion>(project.questionData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const updated: Project = {
      ...project,
      questionData,
      keyInfo: {
        ...project.keyInfo,
        question: questionData.question,
        period: questionData.scope.timePeriod || project.keyInfo.period,
        geographicScope: questionData.scope.geography || project.keyInfo.geographicScope
      }
    };
    onUpdateProject(updated);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: 'Research question & scope modified',
      objectType: 'Question',
      details: 'Updated inquiry parameters.'
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-zinc-950 font-normal">Research Question & Scope</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Saved' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="bg-white p-7 rounded-3xl border border-zinc-200/80 shadow-2xs space-y-5 text-xs">
        <div>
          <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
            Primary Research Question
          </label>
          <input
            type="text"
            value={questionData.question}
            onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
            className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 font-medium text-zinc-900"
          />
        </div>

        <div>
          <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
            Research Objective
          </label>
          <textarea
            value={questionData.objective}
            onChange={(e) => setQuestionData({ ...questionData, objective: e.target.value })}
            rows={2}
            className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 text-zinc-800 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
              Geographic Scope
            </label>
            <input
              type="text"
              value={questionData.scope.geography || ''}
              onChange={(e) => setQuestionData({
                ...questionData,
                scope: { ...questionData.scope, geography: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
              Time Period
            </label>
            <input
              type="text"
              value={questionData.scope.timePeriod || ''}
              onChange={(e) => setQuestionData({
                ...questionData,
                scope: { ...questionData.scope, timePeriod: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
              Target Population / Industry
            </label>
            <input
              type="text"
              value={questionData.scope.population || ''}
              onChange={(e) => setQuestionData({
                ...questionData,
                scope: { ...questionData.scope, population: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-1.5">
              Intended Decision / Policy Output
            </label>
            <input
              type="text"
              value={questionData.scope.intendedDecision || ''}
              onChange={(e) => setQuestionData({
                ...questionData,
                scope: { ...questionData.scope, intendedDecision: e.target.value }
              })}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
