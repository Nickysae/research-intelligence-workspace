import React from 'react';
import { 
  Plus, 
  ArrowRight, 
  Database, 
  BookOpen, 
  BarChart2, 
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  FolderPlus,
  Download
} from 'lucide-react';
import { Project, ResearchState, User } from '../../types';

interface DashboardProps {
  projects: Project[];
  currentUser: User;
  onSelectProject: (projectId: string) => void;
  onNewResearch: () => void;
  onQuickAction: (action: 'add_source' | 'notebooklm' | 'visualization') => void;
  onLoadSampleData?: () => void;
  onViewAll?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  currentUser,
  onSelectProject,
  onNewResearch,
  onQuickAction,
  onLoadSampleData,
  onViewAll
}) => {
  // Compute dashboard metrics
  const activeCount = projects.filter(p => p.state !== 'Finalized').length;
  const completedCount = projects.filter(p => p.state === 'Finalized').length;
  const pendingReviewCount = projects.filter(p => p.state === 'Review' || p.state === 'Planning').length;
  const totalSourcesCount = projects.reduce((acc, p) => acc + (p.sources?.length || 0), 0);

  const getStatusBadge = (state: ResearchState) => {
    switch (state) {
      case 'Analyzing':
        return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">Analyzing</span>;
      case 'Validating':
        return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">Validating</span>;
      case 'Planning':
        return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">Planning</span>;
      case 'Finalized':
        return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Completed</span>;
      default:
        return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">{state}</span>;
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero Welcome Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-tight text-zinc-950 font-normal">
            Good morning, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-sans">
            Turn your questions into well-supported insights.
          </p>

        </div>

        {/* New Research CTA Button */}
        <button
          onClick={onNewResearch}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-sm shadow-xs transition-all transform active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Research</span>
        </button>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all">
          <p className="text-2xl font-serif font-medium text-zinc-950">{activeCount}</p>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Active Research</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all">
          <p className="text-2xl font-serif font-medium text-zinc-950">{completedCount}</p>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Completed Research</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all">
          <p className="text-2xl font-serif font-medium text-zinc-950">{pendingReviewCount}</p>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Pending Review</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all">
          <p className="text-2xl font-serif font-medium text-zinc-950">{totalSourcesCount}</p>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Total Sources</p>
        </div>
      </div>

      {/* Main Grid: Recent Research + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Research */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900">Recent Research</h2>
            <button 
              onClick={onViewAll}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-zinc-200/80 text-center space-y-4 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/60">
                  <FolderPlus className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-900">Belum Ada Proyek Riset</h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Workspace pribadi Anda siap. Mulai proyek riset baru Anda, atau muat data sampel untuk mengeksplorasi fitur analisis.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                  <button
                    onClick={onNewResearch}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Buat Riset Pertama</span>
                  </button>
                  {onLoadSampleData && (
                    <button
                      onClick={onLoadSampleData}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Muat Data Contoh (Demo)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className="group bg-white p-4 px-5 rounded-2xl border border-zinc-200/80 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-amber-100/60 group-hover:text-amber-800 transition-colors shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-amber-950 truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-1">
                        {getStatusBadge(project.state)}
                        <span className="text-[11px] text-zinc-400">
                          Updated {project.ledger[0]?.timestamp || 'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-zinc-300 group-hover:text-zinc-700 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Access & Quote */}
        <div className="space-y-6">
          {/* Quick Access Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900">Quick Access</h2>
            <div className="space-y-2">
              <button 
                onClick={() => onQuickAction('add_source')}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 flex items-start gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Add Source</p>
                  <p className="text-[11px] text-zinc-500">Connect new research sources</p>
                </div>
              </button>

              <button 
                onClick={() => onQuickAction('notebooklm')}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 flex items-start gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Open NotebookLM</p>
                  <p className="text-[11px] text-zinc-500">Send your collection for analysis</p>
                </div>
              </button>

              <button 
                onClick={() => onQuickAction('visualization')}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 flex items-start gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Create Visualization</p>
                  <p className="text-[11px] text-zinc-500">Turn data into insights</p>
                </div>
              </button>
            </div>
          </div>

          {/* Inspirational Research Quote */}
          <div className="p-6 rounded-2xl bg-[#FFFBEB] border border-amber-200/70 relative">
            <span className="text-2xl text-amber-500 font-serif leading-none">“</span>
            <p className="text-xs font-serif italic text-zinc-900 mt-1 leading-relaxed">
              The best decisions are built on the strongest evidence.
            </p>
            <div className="mt-4 flex justify-end">
              <div className="w-6 h-6 rounded-full bg-amber-300/80 flex items-center justify-center text-xs">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
