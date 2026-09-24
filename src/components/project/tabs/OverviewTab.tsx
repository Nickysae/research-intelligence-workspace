import React from 'react';
import { Check, Clock, CheckCircle2, FileText, Database, Layers, BarChart2 } from 'lucide-react';
import { Project, ResearchState } from '../../../types';

interface OverviewTabProps {
  project: Project;
  onNavigateTab: (tabKey: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project, onNavigateTab }) => {
  const steps: { name: ResearchState; label: string }[] = [
    { name: 'Planning', label: 'Planning' },
    { name: 'Searching', label: 'Searching' },
    { name: 'Screening', label: 'Screening' },
    { name: 'Validating', label: 'Validating' },
    { name: 'Extracting', label: 'Extracting' },
    { name: 'Analyzing', label: 'Analyzing' },
    { name: 'Synthesizing', label: 'Synthesizing' },
    { name: 'Review', label: 'Review' },
    { name: 'Finalized', label: 'Finalized' }
  ];

  const currentStepIndex = steps.findIndex(s => s.name === project.state);

  return (
    <div className="space-y-8">
      {/* Research Progress Stepper */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
        <h2 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-6">
          Research Progress
        </h2>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-zinc-100 -z-0" />
          
          {/* Steps */}
          <div className="grid grid-cols-9 gap-1 relative z-10 text-center">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isFuture = idx > currentStepIndex;

              return (
                <div key={step.name} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-amber-400 text-zinc-950 ring-4 ring-amber-50'
                        : isCurrent
                        ? 'bg-amber-400 text-zinc-950 ring-4 ring-amber-100/80 animate-pulse'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className={`text-[11px] mt-2 font-medium ${isCurrent ? 'text-zinc-950 font-semibold' : 'text-zinc-500'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-Column Section: Latest Activity & Key Info / Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Latest Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900">Latest Activity</h2>
          
          <div className="space-y-3">
            {project.ledger.slice(0, 4).map((entry) => (
              <div 
                key={entry.id}
                className="bg-white p-4 rounded-2xl border border-zinc-200/80 flex items-start gap-4 hover:border-zinc-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-900">{entry.action}</p>
                    <span className="text-[11px] text-zinc-400">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{entry.details || `Recorded by ${entry.actor}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Key Information & Quick Stats */}
        <div className="space-y-6">
          {/* Key Information */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-4">
            <h2 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Key Information
            </h2>
            
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase">Research Question</p>
                <p className="text-zinc-800 font-medium mt-0.5 leading-relaxed">
                  {project.keyInfo.question}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase">Research Period</p>
                <p className="text-zinc-800 font-medium mt-0.5">
                  {project.keyInfo.period}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase">Geographic Scope</p>
                <p className="text-zinc-800 font-medium mt-0.5">
                  {project.keyInfo.geographicScope}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-4">
            <h2 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Quick Stats
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => onNavigateTab('sources')}
                className="p-3 rounded-xl bg-zinc-50 hover:bg-amber-50/60 border border-zinc-100 hover:border-amber-200 cursor-pointer transition-colors"
              >
                <p className="text-lg font-serif font-semibold text-zinc-950">{project.sources.filter(s => s.validationStatus === 'Validated').length}</p>
                <p className="text-[11px] text-zinc-500 font-medium">Validated Sources</p>
              </div>

              <div 
                onClick={() => onNavigateTab('data')}
                className="p-3 rounded-xl bg-zinc-50 hover:bg-amber-50/60 border border-zinc-100 hover:border-amber-200 cursor-pointer transition-colors"
              >
                <p className="text-lg font-serif font-semibold text-zinc-950">{project.dataPoints.length || 4}</p>
                <p className="text-[11px] text-zinc-500 font-medium">Data Collections</p>
              </div>

              <div 
                onClick={() => onNavigateTab('evidence')}
                className="p-3 rounded-xl bg-zinc-50 hover:bg-amber-50/60 border border-zinc-100 hover:border-amber-200 cursor-pointer transition-colors"
              >
                <p className="text-lg font-serif font-semibold text-zinc-950">{project.evidenceList.length || 2}</p>
                <p className="text-[11px] text-zinc-500 font-medium">Evidence Groups</p>
              </div>

              <div 
                onClick={() => onNavigateTab('analysis')}
                className="p-3 rounded-xl bg-zinc-50 hover:bg-amber-50/60 border border-zinc-100 hover:border-amber-200 cursor-pointer transition-colors"
              >
                <p className="text-lg font-serif font-semibold text-zinc-950">{project.insights.length || 1}</p>
                <p className="text-[11px] text-zinc-500 font-medium">Analysis Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
