import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { INITIAL_USER } from '../../db/storage';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  breadcrumbs,
  onOpenSettings
}) => {
  return (
    <header className="h-16 px-8 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      {/* Left: Breadcrumbs or Title */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-zinc-300">/</span>}
                {crumb.onClick ? (
                  <button 
                    onClick={crumb.onClick}
                    className="hover:text-zinc-900 transition-colors text-zinc-500"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-zinc-900 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <span>Research Orchestration</span>
          </div>
        )}
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your research..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-zinc-100/80 border border-zinc-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white text-zinc-800 placeholder-zinc-400 transition-all"
          />
        </div>

        {/* Notification Bell */}
        <button 
          title="Notifications"
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>

        {/* User Mini Avatar */}
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-2 pl-2 border-l border-zinc-200"
        >
          <img
            src={INITIAL_USER.avatarUrl}
            alt={INITIAL_USER.name}
            className="w-7 h-7 rounded-full object-cover border border-zinc-200"
          />
        </button>
      </div>
    </header>
  );
};
