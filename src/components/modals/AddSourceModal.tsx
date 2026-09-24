import React, { useState } from 'react';
import { Search, Plus, ExternalLink, Globe, Database, BookOpen, CheckCircle, ShieldCheck, X, Sparkles } from 'lucide-react';
import { Project, Source, SourceStatus } from '../../types';
import { ConnectorService, SearchResultItem } from '../../services/connectorService';
import { StorageService } from '../../db/storage';

interface AddSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSourceAdded: (source: Source) => void;
}

export const AddSourceModal: React.FC<AddSourceModalProps> = ({
  isOpen,
  onClose,
  project,
  onSourceAdded
}) => {
  const [query, setQuery] = useState(project.keyInfo.question || '');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customType, setCustomType] = useState<Source['type']>('Dataset');
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const items = await ConnectorService.searchAllFreeConnectors(query);
      setResults(items);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddSearchResult = (item: SearchResultItem) => {
    const newSource: Source = {
      id: `src_${Date.now()}`,
      projectId: project.id,
      name: item.name,
      provider: item.provider,
      type: item.type,
      url: item.url,
      authority: item.authority,
      relevance: item.relevance,
      recency: item.recency,
      validationStatus: item.validationStatus,
      validationReason: item.validationReason,
      lastChecked: 'Just now'
    };

    onSourceAdded(newSource);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: `Source added (${newSource.name.slice(0, 30)}...)`,
      objectType: 'Source',
      details: `Provider: ${newSource.provider}. Status: ${newSource.validationStatus}`
    });
  };

  const handleAddManual = () => {
    if (!customName.trim()) return;
    const newSource: Source = {
      id: `src_${Date.now()}`,
      projectId: project.id,
      name: customName,
      provider: customUrl ? new URL(customUrl.startsWith('http') ? customUrl : `https://${customUrl}`).hostname : 'Custom Source',
      type: customType,
      url: customUrl || 'https://custom-source.local',
      authority: 'Medium',
      relevance: 'Custom ingested research source.',
      recency: 'Just now',
      validationStatus: 'Validated',
      validationReason: 'Manually verified and confirmed by researcher.',
      lastChecked: 'Just now'
    };

    onSourceAdded(newSource);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: `Custom source registered (${newSource.name})`,
      objectType: 'Source',
      details: 'Added via manual connector.'
    });
    setCustomName('');
    setCustomUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-7 shadow-xl border border-zinc-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-semibold text-zinc-900 text-lg">Add Research Source</h2>
            <p className="text-xs text-zinc-400">Discover and validate open scholarly and institutional data</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${activeTab === 'search' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-500'}`}
          >
            Free Connectors Search (OpenAlex, arXiv, World Bank)
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${activeTab === 'manual' ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-500'}`}
          >
            Direct URL / Custom Dataset
          </button>
        </div>

        {/* Connector Search View */}
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search keywords, papers, datasets, or policies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
              <button
                disabled={isSearching}
                onClick={handleSearch}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {/* Results List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {results.length > 0 ? (
                results.map((res, idx) => {
                  const alreadyAdded = project.sources.some(s => s.name === res.name);
                  return (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl border border-zinc-200 hover:border-amber-300 bg-white flex items-center justify-between gap-3 text-xs transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 truncate">{res.name}</span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                            {res.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{res.provider} • {res.recency}</p>
                        <p className="text-[11px] text-zinc-600 mt-1 line-clamp-1">{res.relevance}</p>
                      </div>

                      <button
                        disabled={alreadyAdded}
                        onClick={() => handleAddSearchResult(res)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                          alreadyAdded
                            ? 'bg-zinc-100 text-zinc-400'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xs'
                        }`}
                      >
                        {alreadyAdded ? 'Added' : '+ Ingest'}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 rounded-2xl">
                  Enter research keywords above to query OpenAlex, arXiv, and World Bank APIs in real-time.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manual Ingest View */}
        {activeTab === 'manual' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Source Name / Organization</label>
              <input
                type="text"
                placeholder="e.g. IMF World Economic Outlook Database"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Source URL / Endpoint</label>
              <input
                type="text"
                placeholder="https://www.imf.org/data/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Source Type</label>
              <select
                value={customType}
                onChange={(e) => setCustomType(e.target.value as Source['type'])}
                className="w-full p-2.5 rounded-xl border border-zinc-200 bg-white"
              >
                <option value="Dataset">Dataset</option>
                <option value="Database">Database</option>
                <option value="Academic">Academic Publication</option>
                <option value="Government">Government / Public Agency</option>
                <option value="News">News / Journalistic</option>
                <option value="API">Custom API</option>
                <option value="CSV">CSV File</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-zinc-600 font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={!customName.trim()}
                onClick={handleAddManual}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold rounded-xl"
              >
                Ingest Custom Source
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
