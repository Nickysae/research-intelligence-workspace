import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  User as UserIcon,
  Play,
  HelpCircle
} from 'lucide-react';
import { User } from '../../types';
import { INITIAL_USER, INITIAL_PROJECTS, StorageService } from '../../db/storage';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const finalAvatar = avatarUrl.trim() !== ''
      ? avatarUrl
      : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=fbbf24,f59e0b`;

    const user: User = {
      id: `usr_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name,
      email,
      avatarUrl: finalAvatar
    };

    StorageService.saveUser(user);
    onLoginSuccess(user);
  };

  const handleGoogleLogin = () => {
    const inputEmail = prompt('Masukkan Email Google Anda:', 'nickysae@gmail.com');
    if (!inputEmail) return;

    const defaultName = inputEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const inputName = prompt('Masukkan Nama Lengkap Anda:', defaultName) || defaultName;
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(inputName)}&backgroundColor=fbbf24,f59e0b`;

    const user: User = {
      id: `usr_${inputEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: inputName,
      email: inputEmail,
      avatarUrl: avatar
    };

    StorageService.saveUser(user);
    onLoginSuccess(user);
  };

  const handleDemoLogin = () => {
    StorageService.saveUser(INITIAL_USER);
    const currentProjects = StorageService.getProjects();
    if (!currentProjects || currentProjects.length === 0) {
      StorageService.saveProjects(INITIAL_PROJECTS);
    }
    onLoginSuccess(INITIAL_USER);
  };

  const handleQuickNickyLogin = () => {
    const nickyUser: User = {
      id: 'usr_nickysae',
      name: 'Nicky Sae',
      email: 'nickysae@gmail.com',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Nicky+Sae&backgroundColor=fbbf24,f59e0b'
    };
    StorageService.saveUser(nickyUser);
    onLoginSuccess(nickyUser);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between p-6">
      {/* Top Header with Back to Landing */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Panduan / Landing Page</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center font-bold text-xs text-zinc-950">
            ✨
          </div>
          <span className="font-semibold text-xs text-zinc-900">Research AI</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-xl space-y-6 my-8">
        <div className="space-y-1">
          <h1 className="font-serif font-semibold text-zinc-900 text-2xl">Masuk ke Workspace</h1>
          <p className="text-xs text-zinc-500">Pilih opsi login untuk mulai mengorkestrasi riset Anda</p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-2">
          <p className="text-[11px] font-semibold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Akses Cepat 1-Klik Langsung Masuk:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl shadow-2xs transition-all text-center flex items-center justify-center gap-1"
            >
              <Play className="w-3 h-3 fill-zinc-950" />
              <span>Demo (Alexandra)</span>
            </button>
            <button
              type="button"
              onClick={handleQuickNickyLogin}
              className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all text-center flex items-center justify-center gap-1"
            >
              <UserIcon className="w-3 h-3" />
              <span>Akun Nicky Sae</span>
            </button>
          </div>
        </div>

        {/* 1-Click Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center justify-center gap-2.5 text-xs font-semibold text-zinc-800 shadow-2xs transition-all transform active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Sign in dengan Akun Google</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <div className="flex-1 h-px bg-zinc-100" />
          <span>atau isi identitas manual</span>
          <div className="flex-1 h-px bg-zinc-100" />
        </div>

        {/* Manual Form */}
        <form onSubmit={handleManualLogin} className="space-y-3.5 text-xs">
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
            <label className="block font-semibold text-zinc-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="nickysae@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Masuk ke Research Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-zinc-400">
        Research AI • Evidence-First Scientific Orchestration
      </div>
    </div>
  );
};
