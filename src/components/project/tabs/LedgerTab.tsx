import React from 'react';
import { User, Bot, Database, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Project, LedgerEntry } from '../../../types';

interface LedgerTabProps {
  project: Project;
}

export const LedgerTab: React.FC<LedgerTabProps> = ({ project }) => {
  const getActorIcon = (actor: LedgerEntry['actor']) => {
    if (actor === 'AI Assistant') {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-2xs">
          <Bot className="w-4 h-4" />
        </div>
      );
    }
    if (actor === 'System') {
      return (
        <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-700 shadow-2xs">
          <Database className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-zinc-950 font-bold text-xs shadow-2xs">
        <User className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header with Title & Live Indicator */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-zinc-950 font-normal">Research Ledger</h1>
        
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Audit Trail</span>
        </div>
      </div>

      {/* Main Timeline Card (Exact replica of bottom-right mockup) */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-2xs">
        <div className="relative pl-6">
          {/* Vertical Yellow Timeline Connector */}
          <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-amber-300/80" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {project.ledger.map((entry, idx) => (
              <div key={entry.id || idx} className="relative flex items-start gap-6 group">
                {/* Node Icon */}
                <div className="relative z-10 shrink-0">
                  {getActorIcon(entry.actor)}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-semibold text-zinc-900 group-hover:text-amber-950 transition-colors">
                      {entry.action}
                    </h3>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    By {entry.actor}
                  </p>
                  {entry.details && (
                    <p className="text-xs text-zinc-600 mt-1 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 font-sans">
                      {entry.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full History Footer */}
        <div className="pt-8 mt-6 border-t border-zinc-100 flex justify-end">
          <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
            <span>View full history</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
