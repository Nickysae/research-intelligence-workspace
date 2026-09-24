import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  User as UserIcon,
  BookOpen,
  Search,
  GitMerge,
  Lightbulb,
  BarChart2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { User } from '../../types';
import { StorageService } from '../../db/storage';

interface LandingPageProps {
  onLoginSuccess: (user: User) => void;
}

const STEPS = [
  {
    icon: <Search className="w-5 h-5 text-amber-500" />,
    title: 'Buat Proyek Riset',
    desc: 'Mulai dengan mendefinisikan pertanyaan penelitian utama Anda. Sistem akan membimbing Anda merumuskan hipotesis dan metodologi yang solid.',
  },
  {
    icon: <BookOpen className="w-5 h-5 text-amber-500" />,
    title: 'Kumpulkan Sumber',
    desc: 'Tambahkan jurnal, artikel, dan data dari OpenAlex, arXiv, atau World Bank. AI memvalidasi dan mengklasifikasikan setiap sumber secara otomatis.',
  },
  {
    icon: <GitMerge className="w-5 h-5 text-amber-500" />,
    title: 'Temukan Titik Temu',
    desc: 'AI menganalisis keseluruhan sumber dan menemukan benang merah — koneksi lintas literatur yang tidak terlihat secara manual.',
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-amber-500" />,
    title: 'Visualisasikan & Simpulkan',
    desc: 'Ekspor temuan sebagai grafik interaktif, catatan terstruktur, dan laporan siap publikasi — semua dalam satu workspace.',
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    title: 'Hasilkan Wawasan',
    desc: 'Dari data mentah menjadi insight tajam. AI Evidence Engine mengidentifikasi pola, anomali, dan peluang riset yang belum dieksplorasi.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [openStep, setOpenStep] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setAuthError(null);
    setAuthSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const cleanEmail = email.trim().toLowerCase();

    if (activeTab === 'login') {
      if (!cleanEmail) {
        setAuthError('Silakan masukkan alamat email Anda.');
        return;
      }
      const res = StorageService.loginUser(cleanEmail);
      if (!res.success) {
        setAuthError(res.message || 'Akun tidak ditemukan. Silakan buat akun baru.');
        return;
      }
      onLoginSuccess(res.user!);
    } else {
      const cleanName = name.trim();
      if (!cleanName || !cleanEmail) {
        setAuthError('Nama lengkap dan email wajib diisi.');
        return;
      }
      const res = StorageService.registerUser(cleanName, cleanEmail);
      if (!res.success) {
        setAuthError(res.message || 'Pendaftaran gagal.');
        return;
      }
      setAuthSuccess('Akun berhasil dibuat! Mengalihkan ke workspace...');
      setTimeout(() => {
        onLoginSuccess(res.user!);
      }, 500);
    }
  };

  const handleGoogleLogin = () => {
    setAuthError(null);
    setAuthSuccess(null);
    const inputEmail = prompt('Masukkan Email Google Anda:');
    if (!inputEmail) return;

    const cleanEmail = inputEmail.trim().toLowerCase();
    const registered = StorageService.getRegisteredUsers();
    const existing = registered.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      StorageService.saveUser(existing);
      onLoginSuccess(existing);
    } else {
      const defaultName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const inputName = prompt('Email belum terdaftar. Masukkan Nama Lengkap untuk membuat akun baru:', defaultName);
      if (!inputName) return;

      const res = StorageService.registerUser(inputName, cleanEmail);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setAuthError(res.message || 'Pendaftaran Google gagal.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-sm font-bold text-zinc-950">✨</div>
            <span className="font-semibold text-sm text-zinc-900">Research AI</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold text-zinc-500">
            <a href="#panduan" className="hover:text-zinc-900 transition-colors">Panduan</a>
            <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
            <a href="#masuk" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl transition-colors font-semibold">
              Masuk / Daftar
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-[11px] font-semibold mb-6">
          <Sparkles className="w-3 h-3" /> Didukung Gemini AI
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight mb-4">
          Dari Pertanyaan<br className="hidden md:block" /> ke <span className="text-amber-500">Penemuan</span>
        </h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto mb-8">
          Research AI adalah workspace riset berbasis AI — mengumpulkan sumber, menemukan titik temu lintas literatur, dan mengubah data menjadi wawasan yang siap dipublikasikan.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#masuk"
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            Mulai Riset Sekarang
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#panduan"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Pelajari Alur Riset
          </a>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-3 gap-4">
          {[
            { val: '5 Tab', label: 'Modul Analisis' },
            { val: 'AI', label: 'Evidence Engine' },
            { val: '100%', label: 'Berbasis Bukti' },
          ].map(s => (
            <div key={s.label} className="text-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-xs">
              <div className="text-xl font-bold text-zinc-900">{s.val}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 1: LOGIN / DAFTAR ── */}
      <section id="masuk" className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Akses Workspace Riset</h2>
          <p className="text-sm text-zinc-500">
            {activeTab === 'login' 
              ? 'Masukkan email Anda yang telah terdaftar untuk masuk' 
              : 'Daftarkan akun baru untuk memulai riset pribadi Anda'}
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden">
          <div className="p-6 space-y-5">
            {/* Tab Toggle */}
            <div className="flex bg-zinc-100 rounded-xl p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === 'login' ? 'bg-white shadow-xs text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('signup')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === 'signup' ? 'bg-white shadow-xs text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Buat Akun Baru
              </button>
            </div>

            {/* Error & Success Messages */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{authError}</p>
              </div>
            )}

            {authSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <p>{authSuccess}</p>
              </div>
            )}

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center justify-center gap-2.5 text-xs font-semibold text-zinc-800 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{activeTab === 'login' ? 'Masuk dengan Akun Google' : 'Daftar dengan Akun Google'}</span>
            </button>

            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <div className="flex-1 h-px bg-zinc-100" />
              <span>atau gunakan email</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {activeTab === 'signup' && (
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">
                    Nama Lengkap Peneliti
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Abdurrosyid Robbani"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none transition"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Alamat Email</label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-amber-400/50 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{activeTab === 'login' ? 'Masuk ke Workspace' : 'Daftar & Masuk ke Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PANDUAN ── */}
      <section id="panduan" className="bg-white border-y border-zinc-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Panduan Penggunaan</span>
            <h2 className="text-2xl font-serif font-bold text-zinc-900 mt-2 mb-2">Cara Kerja Research AI</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">
              Lima langkah sederhana dari pertanyaan penelitian hingga wawasan yang siap dipublikasikan.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenStep(openStep === i ? null : i)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-zinc-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Langkah {i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                  </div>
                  {openStep === i
                    ? <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />}
                </button>
                {openStep === i && (
                  <div className="px-4 pb-4 pt-0 text-xs text-zinc-500 leading-relaxed border-t border-zinc-100 mt-0 bg-zinc-50">
                    <p className="pt-3">{step.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#masuk"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              <span>Mulai Riset Anda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ABOUT ── */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Tentang Proyek Ini</span>
          <h2 className="text-2xl font-serif font-bold text-zinc-900 mt-2 mb-4">Dibuat dengan Tujuan</h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            Research AI lahir dari kebutuhan nyata para peneliti yang kewalahan mengelola literatur dan kehilangan benang merah di antara ratusan sumber. Proyek ini dibangun sebagai bukti bahwa AI bukan pengganti peneliti — melainkan katalis yang mempercepat proses penemuan.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mb-10">
            Didesain dan dikembangkan sebagai bagian dari eksplorasi agentic AI untuk sains. Lihat portofolio lengkap untuk eksplorasi teknologi lainnya.
          </p>

          <a
            href="https://abdurrosyid-portfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Lihat Portofolio Lengkap
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-amber-400 flex items-center justify-center text-[10px] font-bold text-zinc-950">✨</div>
            <span>Research AI — Evidence-First Scientific Orchestration</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#masuk" className="hover:text-zinc-700 transition-colors">Masuk / Daftar</a>
            <a href="#panduan" className="hover:text-zinc-700 transition-colors">Panduan</a>
            <a href="https://abdurrosyid-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-zinc-700 transition-colors flex items-center gap-1">
              Portfolio <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
