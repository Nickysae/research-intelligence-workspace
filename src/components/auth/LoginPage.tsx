import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  LogIn, 
  ShieldCheck, 
  HelpCircle, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Database, 
  BookOpen, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  User as UserIcon,
  GitMerge,
  Search,
  ExternalLink,
  Lightbulb
} from 'lucide-react';
import { User } from '../../types';
import { StorageService } from '../../db/storage';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
    const demoUser = StorageService.getUser();
    onLoginSuccess(demoUser);
  };

  // Konsep Titik Temu Langkah Penggunaan
  const titikTemuSteps = [
    {
      step: '01',
      title: 'Titik Temu Formulasi Pertanyaan & Batasan',
      subtitle: 'Research Question & Context',
      icon: Compass,
      desc: 'Masukkan pertanyaan riset, jangka waktu, dan batasan geografi. AI akan bertindak sebagai asisten ilmiah yang memahami konteks tanpa mengambil alih keputusan Anda.',
      badge: 'Input & Scope'
    },
    {
      step: '02',
      title: 'Titik Temu Metodologi & 7-Gatekeeper',
      subtitle: 'Methodology Governance',
      icon: ShieldCheck,
      desc: 'AI merumuskan proposal metode ilmiah (seperti Panel Regression atau LCCA). Anda memegang kontrol penuh untuk [Approve], [Modify], atau [Regenerate] sebelum riset dijalankan.',
      badge: 'Scientific Control'
    },
    {
      step: '03',
      title: 'Titik Temu Sumber Terbuka Bebas Bias',
      subtitle: 'Open Scholarly & Institutional Ingestion',
      icon: Search,
      desc: 'Hubungkan sumber data dari OpenAlex API, arXiv, dan World Bank secara otomatis. Audit status sumber menjadi Validated, Questionable, atau Rejected.',
      badge: 'Multi-Connector'
    },
    {
      step: '04',
      title: 'Titik Temu Rekonstruksi Pohon Bukti (Provenance)',
      subtitle: 'Immutable Evidence Traceability',
      icon: GitMerge,
      desc: 'Setiap data mentah bersifat abadi (immutable). Jika ada yang bertanya "Mengapa kesimpulan ini dibuat?", telusuri rantai: Claim → Analysis → Evidence → Data → Source.',
      badge: 'Provenance Tree'
    },
    {
      step: '05',
      title: 'Titik Temu Keputusan Manusia (Human Decision)',
      subtitle: 'Human-in-the-Loop',
      icon: Lightbulb,
      desc: 'AI mengusulkan sintesis temuan dan rekomendasi strategis, sementara Anda menetapkan dan mencatat keputusan resmi pada Decision References.',
      badge: 'Final Decision'
    },
    {
      step: '06',
      title: 'Titik Temu Integrasi Sheets & NotebookLM',
      subtitle: 'Visualization & Deep Audio Podcast',
      icon: BookOpen,
      desc: 'Ekspor dataset terstruktur ke Google Sheets / Looker Studio serta buat berkas kurasi Markdown untuk di-upload ke Google NotebookLM dalam 1 klik.',
      badge: 'Zero-Cost Export'
    }
  ];

  const faqs = [
    {
      q: 'Apakah aplikasi ini gratis untuk digunakan?',
      a: 'Ya, 100% Zero-Cost. Aplikasi ini menggunakan penyimpanan browser lokal (IndexedDB) serta API publik gratis seperti OpenAlex, arXiv, World Bank, dan Google Gemini API Free Tier.'
    },
    {
      q: 'Bagaimana prinsip "Titik Temu" dalam aplikasi ini?',
      a: 'Titik Temu adalah filosofi mempertemukan pertanyaan peneliti, standar metodologi ilmiah yang ketat, data mentah terverifikasi, dan keputusan akhir manusia dalam satu alur orkestrasi yang dapat diaudit.'
    },
    {
      q: 'Apakah data riset saya akan dicampur dengan pengguna lain?',
      a: 'Tidak. Sesuai prinsip Data Isolation pada blueprint, setiap akun memiliki ruang kerja mandiri yang terisolasi sepenuhnya.'
    },
    {
      q: 'Apakah saya wajib memiliki Google Gemini API Key?',
      a: 'Tidak wajib. Tanpa API Key, aplikasi tetap berjalan dengan generator heuristik bawaan. Memasukkan API Key gratis dari Google AI Studio akan mengaktifkan analisis AI generatif langsung.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="px-8 py-5 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-xs">
            <Sparkles className="w-4 h-4 fill-zinc-950" />
          </div>
          <div>
            <span className="font-semibold tracking-tight text-zinc-900 text-lg">Research AI</span>
            <span className="hidden sm:inline-block ml-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200">
              Evidence-First Workspace
            </span>
          </div>
        </div>

        <a 
          href="#titik-temu" 
          className="text-xs font-semibold text-zinc-600 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Butuh Bantuan?</span>
        </a>
      </header>

      {/* Hero & Login Box Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 7 Cols: Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-900">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Research Orchestration Layer • v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif text-zinc-950 font-normal tracking-tight leading-[1.15]">
            Turn your research questions into <span className="underline decoration-amber-400 decoration-wavy decoration-2">well-supported</span> insights.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 font-sans leading-relaxed max-w-xl">
            Hubungkan berbagai sumber data, mesin pencari akademis, analisis AI, dan visualisasi dalam satu workspace dengan metodologi ilmiah dan pembuktian <em>(provenance tracking)</em> sebagai lapisan pengendali.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
              <p className="font-semibold text-zinc-900">Evidence First</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Tidak ada klaim tanpa bukti yang dapat dilacak.</p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
              <p className="font-semibold text-zinc-900">7-Gatekeeper</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Cegah bias & korelasi semu secara otomatis.</p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs col-span-2 sm:col-span-1">
              <p className="font-semibold text-zinc-900">Human Decision</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">AI mengusulkan, manusia pengambil keputusan.</p>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Login Form Card */}
        <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-zinc-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif font-semibold text-zinc-900 text-xl">Masuk ke Workspace</h2>
            <p className="text-xs text-zinc-500">Mulai riset baru atau lanjutkan riset Anda</p>
          </div>

          {/* 1-Click Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-2xl border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/40 flex items-center justify-center gap-3 text-xs font-semibold text-zinc-800 shadow-2xs transition-all transform active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="flex-1 h-px bg-zinc-100" />
            <span>atau masuk dengan akun peneliti</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Form */}
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

          {/* Guest / Demo Login Quick Button */}
          <div className="pt-2 border-t border-zinc-100 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-zinc-500 hover:text-amber-600 font-medium transition-colors"
            >
              Ingin melihat demo dulu? <strong>Masuk sebagai Peneliti Demo &rarr;</strong>
            </button>
          </div>
        </div>
      </main>

      {/* SECTION: BUTUH BANTUAN? KONSEP TITIK TEMU & TUTORIAL */}
      <section id="titik-temu" className="bg-white border-t border-zinc-200/80 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-xs font-semibold text-amber-900">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Butuh Bantuan? • Konsep Titik Temu Riset</span>
            </div>
            <h2 className="text-3xl font-serif font-normal text-zinc-950 tracking-tight">
              Bagaimana Aplikasi Mengorkestrasi Penelitian Anda?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-sans leading-relaxed">
              Konsep <strong>Titik Temu</strong> menghubungkan seluruh tahapan riset yang sebelumnya tercerai-berai menjadi satu rantai pembuktian terintegrasi:
            </p>
          </div>

          {/* 6 Titik Temu Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {titikTemuSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-[#FAF9F6] border border-zinc-200/80 hover:border-amber-300 hover:shadow-xs transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold group-hover:bg-amber-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {item.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                    <h3 className="font-semibold text-sm text-zinc-900 mt-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-medium">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive FAQ & Help Accordion */}
          <div className="bg-[#FFFBEB] p-8 rounded-3xl border border-amber-200/80 max-w-3xl mx-auto space-y-4">
            <h3 className="font-serif font-semibold text-zinc-900 text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-amber-200/60 overflow-hidden text-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-zinc-900 flex items-center justify-between hover:bg-amber-50/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-zinc-600 border-t border-zinc-100 bg-zinc-50/50 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Back to top CTA */}
            <div className="pt-4 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Sudah Paham? Masuk ke Aplikasi &uarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 bg-zinc-900 text-zinc-400 text-xs text-center border-t border-zinc-800">
        <p>Research Intelligence Workspace • Evidence-First Scientific Orchestration • 100% Zero-Cost Architecture</p>
      </footer>
    </div>
  );
};
