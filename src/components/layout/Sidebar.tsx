import React from 'react';
import { 
  Home, 
  FolderKanban, 
  Briefcase, 
  Layers, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { INITIAL_USER } from '../../db/storage';

export type ActiveNav = 'home' | 'my-research' | 'workspace' | 'sources' | 'notebooklm' | 'visualization' | 'settings';

interface SidebarProps {
  activeNav: ActiveNav;
  setActiveNav: (nav: ActiveNav) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav, onOpenSettings }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-research', label: 'My Research', icon: FolderKanban },
    { id: 'workspace', label: 'Workspace', icon: Briefcase },
    { id: 'sources', label: 'Sources', icon: Layers },
    { id: 'notebooklm', label: 'NotebookLM', icon: BookOpen },
    { id: 'visualization', label: 'Visualization', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#FAF9F6] border-r border-zinc-200/80 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-sm">
            <Sparkles className="w-4 h-4 fill-zinc-950" />
          </div>
          <span className="font-semibold tracking-tight text-zinc-900 text-lg">Research AI</span>
        </div>

        {/* Nav Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'settings') {
                    onOpenSettings();
                  } else {
                    setActiveNav(item.id as ActiveNav);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-100/70 text-zinc-900 font-semibold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950 stroke-[2.2]' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & User Profile */}
      <div className="p-4 space-y-4">
        {/* Research Quote Card */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200/60 relative overflow-hidden">
          <div className="text-xs font-serif italic text-zinc-800 leading-snug">
            "Good research leads to better decisions."
          </div>
          <div className="mt-3 flex justify-end">
            <div className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center text-xs">
              💡
            </div>
          </div>
        </div>

        {/* User Card */}
        <div 
          onClick={onOpenSettings}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-200/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src={INITIAL_USER.avatarUrl} 
              alt={INITIAL_USER.name}
              className="w-8 h-8 rounded-full object-cover border border-zinc-200" 
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-zinc-900 truncate">{INITIAL_USER.name}</p>
              <p className="text-[11px] text-zinc-500 truncate">{INITIAL_USER.email}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
};
