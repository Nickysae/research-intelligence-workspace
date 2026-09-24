import React, { useState } from 'react';
import { User as UserIcon, Mail, ShieldCheck, Check, X, LogIn, Sparkles } from 'lucide-react';
import { User } from '../../types';
import { StorageService } from '../../db/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserUpdated: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdated
}) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Generate avatar URL from name if empty
    const finalAvatar = avatarUrl.trim() !== '' 
      ? avatarUrl 
      : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=fbbf24,f59e0b`;

    const updatedUser: User = {
      id: `usr_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name,
      email,
      avatarUrl: finalAvatar
    };

    StorageService.saveUser(updatedUser);
    onUserUpdated(updatedUser);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleGoogleQuickLogin = () => {
    // Quick prompt for Google Sign In
    const googleEmail = prompt('Masukkan alamat email Google Anda:', email || 'user@gmail.com');
    if (googleEmail) {
      const defaultName = googleEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const googleName = prompt('Masukkan nama lengkap Anda:', name || defaultName) || defaultName;
      const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(googleName)}&backgroundColor=fbbf24,f59e0b`;

      const newUser: User = {
        id: `usr_${googleEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        name: googleName,
        email: googleEmail,
        avatarUrl: avatar
      };

      StorageService.saveUser(newUser);
      onUserUpdated(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-xl border border-zinc-200 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-zinc-900 text-lg">Akun & Profil Peneliti</h2>
              <p className="text-xs text-zinc-400">Identity & Multi-Tenancy Isolation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Google Sign-In One-Click Button */}
        <button
          type="button"
          onClick={handleGoogleQuickLogin}
          className="w-full py-3 px-4 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center justify-center gap-3 text-xs font-semibold text-zinc-800 shadow-2xs transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In dengan Akun Google Anda</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <div className="flex-1 h-px bg-zinc-200" />
          <span>atau lengkapi profil manual</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Manual Profile Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Nama Lengkap Peneliti</label>
            <input
              type="text"
              placeholder="Contoh: Nicky Sae"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Alamat Email</label>
            <input
              type="email"
              placeholder="nickysae@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Foto Profil / Avatar URL (Opsional)</label>
            <input
              type="text"
              placeholder="https://... atau biarkan kosong untuk auto-avatar"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
            />
          </div>

          {/* Privacy Note from PRD */}
          <div className="p-3 bg-[#FFFBEB] rounded-xl border border-amber-200/70 text-[11px] text-zinc-700 leading-relaxed">
            <span className="font-semibold text-amber-950">Prinsip Data Blueprint:</span> Akun Google hanya digunakan sebagai identitas. Seluruh riset, data mentah, dan audit ledger Anda tersimpan terisolasi di ruang kerja (*workspace*) Anda.
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-950" /> : <LogIn className="w-4 h-4" />}
              <span>{isSaved ? 'Tersimpan!' : 'Gunakan Akun Ini'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
