import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Shield, X, Bot } from 'lucide-react';
import { Project, ResearchQuestion } from '../../types';
import { GeminiService } from '../../services/geminiService';
import { StorageService } from '../../db/storage';

interface NewResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export const NewResearchModal: React.FC<NewResearchModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [objective, setObjective] = useState('');
  const [geography, setGeography] = useState('Selected countries (US, EU, China, India)');
  const [timePeriod, setTimePeriod] = useState('2020 - 2025');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleCreateAndPropose = async () => {
    if (!title || !question) return;
    setIsGenerating(true);

    const questionData: ResearchQuestion = {
      objective: objective || `To systematically evaluate ${question}`,
      question,
      scope: {
        geography,
        timePeriod
      }
    };

    try {
      const proposal = await GeminiService.generateMethodologyProposal(questionData);
      
      const newProjectId = `proj_${Date.now()}`;
      const nowStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
                     new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      const newProject: Project = {
        id: newProjectId,
        workspaceId: 'ws_001',
        userId: 'usr_001',
        title,
        summary: objective || question,
        state: 'Planning',
        stateStatusText: 'Planning',
        keyInfo: {
          question,
          period: timePeriod,
          geographicScope: geography
        },
        stats: {
          validatedSources: 0,
          dataCollections: 0,
          evidenceGroups: 0,
          analysisComplete: 0
        },
        questionData,
        methodology: proposal,
        sources: [],
        dataPoints: [],
        evidenceList: [],
        gatekeeperChecks: [
          { id: 'g1', name: 'Research Validity', gateNumber: 1, passed: true, details: 'Research inquiry is clearly bounded.', notes: 'Clarity verified.' },
          { id: 'g2', name: 'Methodology Fit', gateNumber: 2, passed: true, details: 'Proposed methodology matches empirical inquiry.', notes: 'Conforms to research question.' },
          { id: 'g3', name: 'Source Validity', gateNumber: 3, passed: false, details: 'Requires discovery and ingestion of authoritative sources.', notes: 'Pending source addition.' },
          { id: 'g4', name: 'Data Quality', gateNumber: 4, passed: false, details: 'Requires data extraction.', notes: 'Pending data.' },
          { id: 'g5', name: 'Evidence Sufficiency', gateNumber: 5, passed: false, details: 'Requires cross-corroboration.', notes: 'Pending evidence.' },
          { id: 'g6', name: 'Inference Check', gateNumber: 6, passed: true, details: 'Pre-flight check passed.', notes: 'Standard.' },
          { id: 'g7', name: 'Bias Check', gateNumber: 7, passed: true, details: 'Initial scope balance checked.', notes: 'Standard.' }
        ],
        insights: [],
        decisionReferences: [],
        ledger: [
          { id: `led_${Date.now()}_1`, projectId: newProjectId, timestamp: nowStr, actor: 'Alexandra Putri', action: 'Project created', objectType: 'Project', details: `Created project "${title}"` },
          { id: `led_${Date.now()}_2`, projectId: newProjectId, timestamp: nowStr, actor: 'AI Assistant', action: 'Methodology proposed', objectType: 'Protocol', details: 'Generated initial research methodology proposal.' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      StorageService.saveProject(newProject);
      onProjectCreated(newProject);
      onClose();
      // Reset form
      setTitle('');
      setQuestion('');
      setObjective('');
      setStep(1);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-7 shadow-xl border border-zinc-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-bold">
              ✨
            </div>
            <div>
              <h2 className="font-serif font-semibold text-zinc-900 text-lg">Initialize Research Project</h2>
              <p className="text-xs text-zinc-400">Step 1 of Research Orchestration</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs Form */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-900 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Impact of Artificial Intelligence on Radiologist Productivity"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 font-medium text-zinc-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-900 mb-1">
              Primary Research Question *
            </label>
            <input
              type="text"
              placeholder="e.g. Does AI triage assistance reduce diagnostic turnaround time without increasing error rates?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 font-medium text-zinc-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-900 mb-1">
              Research Objective & Context
            </label>
            <textarea
              placeholder="Describe the desired outcome or strategic policy decision to inform..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 text-zinc-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Geographic Scope</label>
              <input
                type="text"
                value={geography}
                onChange={(e) => setGeography(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Time Horizon</label>
              <input
                type="text"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!title || !question || isGenerating}
            onClick={handleCreateAndPropose}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : 'fill-zinc-950'}`} />
            <span>{isGenerating ? 'Synthesizing Methodology...' : 'Generate Methodology & Start'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
