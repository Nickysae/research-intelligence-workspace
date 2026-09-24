import React, { useState } from 'react';
import { Database, Lock, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { Project, DataPoint } from '../../../types';
import { StorageService } from '../../../db/storage';

interface DataTabProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const DataTab: React.FC<DataTabProps> = ({ project, onUpdateProject }) => {
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [newMetric, setNewMetric] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newFact, setNewFact] = useState('');

  const handleAddDataPoint = () => {
    if (!newMetric || !newValue) return;
    const newDp: DataPoint = {
      id: `dp_${Date.now()}`,
      projectId: project.id,
      sourceId: project.sources[0]?.id || 'src_01',
      metricName: newMetric,
      value: newValue,
      extractedFact: newFact || `${newMetric}: ${newValue}`,
      isImmutable: true,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    };

    const updated: Project = {
      ...project,
      dataPoints: [newDp, ...project.dataPoints]
    };
    onUpdateProject(updated);
    StorageService.addLedgerEntry(project.id, {
      actor: 'Alexandra Putri',
      action: `Data point added (${newMetric})`,
      objectType: 'Data',
      details: `Value: ${newValue}. Marked as immutable raw evidence.`
    });

    setNewMetric('');
    setNewValue('');
    setNewFact('');
    setShowAddDataModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-zinc-950 font-normal">Immutable Raw Data</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Raw factual evidence extracted directly from validated sources. Never overwritten.
          </p>
        </div>

        <button
          onClick={() => setShowAddDataModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Data Point</span>
        </button>
      </div>

      {/* Data Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.dataPoints.map((dp) => (
          <div 
            key={dp.id}
            className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-3 relative group hover:border-amber-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-zinc-400" />
                <span>Immutable</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">{dp.year || '2024'}</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{dp.metricName}</p>
              <p className="text-xl font-serif font-semibold text-zinc-900 mt-1">{dp.value} {dp.unit && <span className="text-xs font-sans font-normal text-zinc-500">{dp.unit}</span>}</p>
            </div>

            <p className="text-xs text-zinc-600 leading-snug bg-zinc-50/70 p-2.5 rounded-xl border border-zinc-100">
              "{dp.extractedFact}"
            </p>

            <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
              <span>Timestamp: {dp.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Data Point */}
      {showAddDataModal && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-zinc-200 space-y-4">
            <h3 className="font-serif font-semibold text-zinc-900 text-base">Record Raw Data Point</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Metric / Indicator Name</label>
                <input
                  type="text"
                  placeholder="e.g. Clean Energy Investment (USD)"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Extracted Value</label>
                <input
                  type="text"
                  placeholder="e.g. $1.8 Trillion"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Exact Raw Excerpt / Fact</label>
                <textarea
                  placeholder="Quote the exact line from the source dataset..."
                  value={newFact}
                  onChange={(e) => setNewFact(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-zinc-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddDataModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 bg-zinc-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDataPoint}
                className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-500 rounded-xl"
              >
                Record Data Point
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
