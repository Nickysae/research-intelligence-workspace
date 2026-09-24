import React, { useState } from 'react';
import { Settings, Key, Shield, Check, X, Sparkles, ExternalLink } from 'lucide-react';
import { StorageService, AppSettings } from '../../db/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<AppSettings>(StorageService.getSettings());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    StorageService.saveSettings(settings);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-7 shadow-xl border border-zinc-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-zinc-900 text-lg">Settings & AI Configuration</h2>
              <p className="text-xs text-zinc-400">Zero-Cost Connector & API Management</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gemini API Key Box */}
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-950 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Google Gemini API Key (100% Free Tier)</span>
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-amber-800 hover:underline flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Used for automated scientific methodology proposals and 7-gate bias auditing. If left blank, the app runs offline heuristic generators.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={settings.geminiApiKey}
              onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-amber-200 bg-white focus:ring-2 focus:ring-amber-400 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Active Research Workspace Name</label>
            <input
              type="text"
              value={settings.defaultWorkspaceName}
              onChange={(e) => setSettings({ ...settings, defaultWorkspaceName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-zinc-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Primary Academic Connector</label>
            <select
              value={settings.preferredConnector}
              onChange={(e) => setSettings({ ...settings, preferredConnector: e.target.value as any })}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-white"
            >
              <option value="gemini">Google Gemini + Free Scholarly (OpenAlex / arXiv / World Bank)</option>
              <option value="openalex">OpenAlex API (100k Req/Day Free)</option>
              <option value="worldbank">World Bank Open Data</option>
              <option value="mock">Local Sandbox / Offline Mode</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-950" /> : null}
            <span>{saved ? 'Saved!' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
