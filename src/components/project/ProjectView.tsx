import React, { useState } from 'react';
import { Share2, Download, CheckCircle2, ChevronRight, FileText, ArrowLeft } from 'lucide-react';
import { Project, ResearchState } from '../../types';
import { OverviewTab } from './tabs/OverviewTab';
import { QuestionTab } from './tabs/QuestionTab';
import { MethodologyTab } from './tabs/MethodologyTab';
import { SourcesTab } from './tabs/SourcesTab';
import { DataTab } from './tabs/DataTab';
import { EvidenceTab } from './tabs/EvidenceTab';
import { AnalysisTab } from './tabs/AnalysisTab';
import { InsightsTab } from './tabs/InsightsTab';
import { VisualizationTab } from './tabs/VisualizationTab';
import { NotebookLMTab } from './tabs/NotebookLMTab';
import { LedgerTab } from './tabs/LedgerTab';

export type ProjectTabKey = 
  | 'Overview' 
  | 'Question' 
  | 'Methodology' 
  | 'Sources' 
  | 'Data' 
  | 'Evidence' 
  | 'Analysis' 
  | 'Insights' 
  | 'Visualization' 
  | 'NotebookLM' 
  | 'Ledger';

interface ProjectViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onOpenAddSource: () => void;
  onBackToDashboard: () => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  onUpdateProject,
  onOpenAddSource,
  onBackToDashboard
}) => {
  const [activeTab, setActiveTab] = useState<ProjectTabKey>('Overview');
  const [copiedShare, setCopiedShare] = useState(false);

  const tabs: ProjectTabKey[] = [
    'Overview',
    'Question',
    'Methodology',
    'Sources',
    'Data',
    'Evidence',
    'Analysis',
    'Insights',
    'Visualization',
    'NotebookLM',
    'Ledger'
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleExportFullJSON = () => {
    const dataStr = JSON.stringify(project, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.id}_full_archive.json`;
    link.click();
  };

  const getStatusBadge = (state: ResearchState) => {
    switch (state) {
      case 'Analyzing':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">Analyzing</span>;
      case 'Validating':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">Validating</span>;
      case 'Planning':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">Planning</span>;
      case 'Finalized':
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">Completed</span>;
      default:
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800">{state}</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-normal text-zinc-950 tracking-tight">
              {project.title}
            </h1>
            {getStatusBadge(project.state)}
          </div>
          <p className="text-xs text-zinc-500 mt-1 max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={handleExportFullJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 11 Horizontal Navigation Tabs (Exact replica of mockup) */}
      <div className="border-b border-zinc-200 flex items-center gap-8 overflow-x-auto text-xs no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 font-medium whitespace-nowrap transition-colors relative ${
                isActive
                  ? 'text-zinc-950 font-semibold border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-800'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-2">
        {activeTab === 'Overview' && (
          <OverviewTab 
            project={project} 
            onNavigateTab={(tabKey) => {
              const matched = tabs.find(t => t.toLowerCase() === tabKey.toLowerCase());
              if (matched) setActiveTab(matched);
            }} 
          />
        )}
        {activeTab === 'Question' && (
          <QuestionTab project={project} onUpdateProject={onUpdateProject} />
        )}
        {activeTab === 'Methodology' && (
          <MethodologyTab project={project} onUpdateProject={onUpdateProject} />
        )}
        {activeTab === 'Sources' && (
          <SourcesTab 
            project={project} 
            onUpdateProject={onUpdateProject} 
            onOpenAddSource={onOpenAddSource} 
          />
        )}
        {activeTab === 'Data' && (
          <DataTab project={project} onUpdateProject={onUpdateProject} />
        )}
        {activeTab === 'Evidence' && (
          <EvidenceTab project={project} />
        )}
        {activeTab === 'Analysis' && (
          <AnalysisTab project={project} onUpdateProject={onUpdateProject} />
        )}
        {activeTab === 'Insights' && (
          <InsightsTab project={project} onUpdateProject={onUpdateProject} />
        )}
        {activeTab === 'Visualization' && (
          <VisualizationTab project={project} />
        )}
        {activeTab === 'NotebookLM' && (
          <NotebookLMTab project={project} />
        )}
        {activeTab === 'Ledger' && (
          <LedgerTab project={project} />
        )}
      </div>
    </div>
  );
};
