import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  ArrowRight, 
  Calendar, 
  Database, 
  CheckCircle2,
  Download,
  FolderPlus
} from 'lucide-react';
import { Project, ResearchState } from '../../types';

interface MyResearchViewProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onNewResearch: () => void;
}

export const MyResearchView: React.FC<MyResearchViewProps> = ({
  projects,
  onSelectProject,
  onNewResearch
}) => {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState<string>('all');

  const filtered = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.keyInfo.question.toLowerCase().includes(search.toLowerCase());
    const matchesState = filterState === 'all' || p.state === filterState;
    return matchesSearch && matchesState;
  });

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
        return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">{state}</span>;
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif tracking-tight text-zinc-950 font-normal">
            My Research Projects
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Kelola dan pantau seluruh proyek riset, repositori data, dan sintesis bukti Anda.
          </p>
        </div>

        <button
          onClick={onNewResearch}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-sm shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Research</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari riset berdasarkan judul atau topik..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Planning', 'Analyzing', 'Validating', 'Finalized'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterState === st
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {st === 'all' ? 'Semua Proyek' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-zinc-200/80 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/60">
            <FolderPlus className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-zinc-900">
              {projects.length === 0 ? 'Belum Ada Riset yang Dimulai' : 'Tidak Ada Riset yang Cocok'}
            </h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
              {projects.length === 0
                ? 'Mulai inisiasi proyek riset pertama Anda dengan bantuan AI untuk mengumpulkan sumber dan merumuskan titik temu.'
                : 'Coba ubah kata kunci pencarian atau filter status yang Anda pilih.'}
            </p>
          </div>
          {projects.length === 0 && (
            <div className="flex items-center justify-center pt-3">
              <button
                onClick={onNewResearch}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Buat Riset Pertama</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-white rounded-3xl border border-zinc-200/80 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getStatusBadge(project.state)}
                  <span className="text-[11px] text-zinc-400">
                    {project.stats.validatedSources} Sumber Teruji
                  </span>
                </div>

                <h3 className="font-semibold text-zinc-900 group-hover:text-amber-950 text-base leading-snug line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-400 text-[11px]">
                  {project.keyInfo.geographicScope || 'Global'}
                </span>
                <span className="font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Buka Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
