import React, { useState } from 'react';
import { Plus, CheckCircle2, AlertCircle, XCircle, ExternalLink, ShieldCheck, Globe, Database, BookOpen, Newspaper, Landmark } from 'lucide-react';
import { Project, Source, SourceStatus } from '../../../types';

interface SourcesTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onOpenAddSource: () => void;
}

export const SourcesTab: React.FC<SourcesTabProps> = ({ project, onUpdateProject, onOpenAddSource }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | SourceStatus>('All');
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const filteredSources = project.sources.filter(s => {
    if (activeFilter === 'All') return true;
    return s.validationStatus === activeFilter;
  });

  const getTypeIcon = (type: Source['type']) => {
    switch (type) {
      case 'Academic':
        return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
      case 'Dataset':
      case 'Database':
        return <Database className="w-3.5 h-3.5 text-amber-600" />;
      case 'News':
        return <Newspaper className="w-3.5 h-3.5 text-purple-600" />;
      case 'Government':
        return <Landmark className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-zinc-600" />;
    }
  };

  const getStatusBadge = (status: SourceStatus) => {
    switch (status) {
      case 'Validated':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Validated</span>;
      case 'Questionable':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">Questionable</span>;
      case 'Rejected':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Rejected</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title & Add Source CTA */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-zinc-950 font-normal">Sources</h1>
        
        <button
          onClick={onOpenAddSource}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Source</span>
        </button>
      </div>

      {/* Filter Tabs: All Sources | Validated | Questionable | Rejected */}
      <div className="flex items-center gap-6 border-b border-zinc-200 text-xs">
        <button
          onClick={() => setActiveFilter('All')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeFilter === 'All' ? 'text-zinc-950 border-b-2 border-amber-400' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          All Sources ({project.sources.length})
        </button>
        <button
          onClick={() => setActiveFilter('Validated')}
          className={`pb-3 font-medium transition-colors relative ${
            activeFilter === 'Validated' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Validated ({project.sources.filter(s => s.validationStatus === 'Validated').length})
        </button>
        <button
          onClick={() => setActiveFilter('Questionable')}
          className={`pb-3 font-medium transition-colors relative ${
            activeFilter === 'Questionable' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Questionable ({project.sources.filter(s => s.validationStatus === 'Questionable').length})
        </button>
        <button
          onClick={() => setActiveFilter('Rejected')}
          className={`pb-3 font-medium transition-colors relative ${
            activeFilter === 'Rejected' ? 'text-zinc-950 border-b-2 border-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Rejected ({project.sources.filter(s => s.validationStatus === 'Rejected').length})
        </button>
      </div>

      {/* Sources Table (Exact replica of mockup) */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              <th className="py-3.5 px-6">Source</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Last Checked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {filteredSources.map((source) => (
              <tr 
                key={source.id}
                onClick={() => setSelectedSource(source)}
                className="hover:bg-amber-50/40 cursor-pointer transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                      {getTypeIcon(source.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 group-hover:text-amber-950">
                        {source.name}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{source.provider}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-zinc-600 font-medium">
                  {source.type}
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(source.validationStatus)}
                </td>
                <td className="py-4 px-6 text-zinc-400">
                  {source.lastChecked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Source Detail Drawer/Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-zinc-950/30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-zinc-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  {getTypeIcon(selectedSource.type)}
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-zinc-900 text-base">{selectedSource.name}</h3>
                  <a 
                    href={selectedSource.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-amber-600 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{selectedSource.provider}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSource(null)}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-500">Validation Status</span>
                {getStatusBadge(selectedSource.validationStatus)}
              </div>

              <div>
                <span className="font-semibold text-zinc-500">Validation Reason</span>
                <p className="text-zinc-800 mt-1 font-medium leading-relaxed">{selectedSource.validationReason}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200/60">
                <div>
                  <span className="font-semibold text-zinc-400 text-[10px] uppercase">Authority</span>
                  <p className="text-zinc-800 font-semibold">{selectedSource.authority}</p>
                </div>
                <div>
                  <span className="font-semibold text-zinc-400 text-[10px] uppercase">Recency</span>
                  <p className="text-zinc-800 font-semibold">{selectedSource.recency}</p>
                </div>
              </div>

              <div>
                <span className="font-semibold text-zinc-500">Relevance Scope</span>
                <p className="text-zinc-600 mt-0.5">{selectedSource.relevance}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedSource(null)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
