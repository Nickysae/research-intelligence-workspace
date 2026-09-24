import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  ShieldCheck, 
  Search, 
  GitMerge, 
  Lightbulb, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  ExternalLink,
  Play,
  User as UserIcon,
  FileText,
  Lock,
  Workflow
} from 'lucide-react';
import { User } from '../../types';
import { INITIAL_USER, StorageService } from '../../db/storage';

interface LandingHelpPageProps {
  onGoToLogin: () => void;
  onQuickDemo: (user: User) => void;
}

export const LandingHelpPage: React.FC<LandingHelpPageProps> = ({ onGoToLogin, onQuickDemo }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleDemoLogin = () => {
    StorageService.saveUser(INITIAL_USER);
    onQuickDemo(INITIAL_USER);
  };

  const handleQuickNicky = () => {
    const nicky: User = {
      id: 'usr_nickysae',
      name: 'Nicky Sae',
      email: 'nickysae@gmail.com',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Nicky+Sae&backgroundColor=fbbf24,f59e0b'
    };
    StorageService.saveUser(nicky);
    onQuickDemo(nicky);
  };

  const titikTemuStages = [
    {
      step: '01',
      title: 'Titik Temu 1: Formulasi Pertanyaan & Batasan Riset',
      subtitle: 'Research Question & Bounded Inquiry',
      icon: Compass,
      badge: 'Fase Input',
      desc: 'Setiap penelitian bermula dari pertanyaan yang spesifik. Di sini, Anda menentukan Research Objective, Scope Geografi (misal: US, EU, ASEAN), Jangka Waktu data, dan Tujuan Pengambilan Keputusan. AI membantu menstrukturkan batas-batas riset agar fokus dan terarah.'
    },
    {
      step: '02',
      title: 'Titik Temu 2: Penguncian Metodologi Ilmiah & 7-Gatekeeper',
      subtitle: 'Scientific Protocol & Bias Shield',
      icon: ShieldCheck,
      badge: 'Fase Metodologi',
      desc: 'AI merumuskan proposal metodologi ilmiah yang tepat (seperti Panel VAR Regression atau Lifecycle Cost Analysis). Pengguna memegang kendali penuh dengan tombol [Approve], [Modify], atau [Regenerate] sebelum satu pun data diekstrak.'
    },
    {
      step: '03',
      title: 'Titik Temu 3: Ingesti & Validasi Sumber Bebas Konflik',
      subtitle: 'Multi-Connector Open Scholarly Knowledge',
      icon: Search,
      badge: 'Fase Sumber',
      desc: 'Menghubungkan secara otomatis ke open API bereputasi dunia: OpenAlex API (100k req/hari), arXiv.org, dan World Bank Open Data. Setiap sumber diaudit otoritas, tahun terbit, dan status validasinya (Validated, Questionable, Rejected).'
    },
    {
      step: '04',
      title: 'Titik Temu 4: Rekonstruksi Pohon Bukti (Provenance Chain)',
      subtitle: 'Immutable Data & Traceable Reasoning',
      icon: GitMerge,
      badge: 'Fase Pembuktian',
      desc: 'Data mentah disimpan secara permanen (immutable). Setiap kesimpulan dibangun di atas pohon pembuktian terbalik: Claim → Analysis → Evidence → Data → Source. Siapa pun dapat bertanya "Mengapa kesimpulan ini dibuat?" dan langsung melihat buktinya.'
    },
    {
      step: '05',
      title: 'Titik Temu 5: Sintesis Wawasan & Keputusan Manusia',
      subtitle: 'Human-in-the-Loop Decision References',
      icon: Lightbulb,
      badge: 'Fase Keputusan',
      desc: 'Filosofi kami: AI may propose. Methodology constrains. Evidence supports. Human decides. AI mengusulkan sintesis dan rekomendasi strategis, namun manusia yang menetapkan dan menandatangani keputusan akhir.'
    },
    {
      step: '06',
      title: 'Titik Temu 6: Handoff ke Google Sheets & NotebookLM',
      subtitle: 'Data Export & Audio Deep Dive',
      icon: BookOpen,
      badge: 'Fase Hilirisasi',
      desc: 'Kirim dataset terstruktur langsung ke Google Sheets / Looker Studio untuk pemodelan visual, atau buat paket berkas Markdown kurasi riset untuk diolah menjadi Audio Overview / Podcast di Google NotebookLM.'
    }
  ];

  const gates = [
    { num: 1, name: 'Research Validity', desc: 'Memastikan pertanyaan riset jelas dan memiliki variabel terukur.' },
    { num: 2, name: 'Methodology Fit', desc: 'Mencegah ketidakcocokan metode (misal: pertanyaan kausalitas dijawab metode deskriptif).' },
    { num: 3, name: 'Source Validity', desc: 'Memeriksa otoritas, independensi, dan mendeteksi potensi konflik kepentingan komersial.' },
    { num: 4, name: 'Data Quality', desc: 'Pemeriksaan kelengkapan, deduplikasi, dan konsistensi satuan waktu/angka.' },
    { num: 5, name: 'Evidence Sufficiency', desc: 'Triangulasi dan konfirmasi silang antar minimal 2–3 lembaga riset independen.' },
    { num: 6, name: 'Inference Check', desc: 'Mencegah kesalahan fatal: Menyamakan Korelasi (Correlation) dengan Sebab-Akibat (Causation).' },
    { num: 7, name: 'Bias & Coverage Check', desc: 'Mendeteksi bias geografis, bias seleksi sampel, dan bias publikasi.' }
  ];

  const faqs = [
    {
      q: 'Apa itu filosofi "Titik Temu" dalam aplikasi ini?',
      a: 'Titik Temu adalah simpul yang mempertemukan 4 elemen penting: Pertanyaan Peneliti, Standar Metodologi Ilmiah yang ketat, Bukti Data Mentah Terverifikasi, dan Keputusan Akhir Manusia, sehingga tidak ada kesimpulan AI yang mengambang tanpa dasar data.'
    },
    {
      q: 'Apakah aplikasi ini gratis (Zero-Cost)?',
      a: 'Ya, 100% gratis. Seluruh arsitektur dibangun di atas penyimpanan browser lokal (IndexedDB) serta API terbuka gratis (OpenAlex, arXiv, World Bank, dan Google Gemini API Free Tier).'
    },
    {
      q: 'Bagaimana cara menghubungkan dengan Google NotebookLM?',
      a: 'Di dalam workspace pada tab NotebookLM, klik "Copy Package" lalu klik "Launch NotebookLM". Anda cukup mem-paste paket kurasi markdown tersebut ke dalam NotebookLM untuk menghasilkan audio overview atau diskusi mendalam.'
    },
    {
      q: 'Apakah data penelitian saya aman dan terisolasi?',
      a: 'Sangat aman. Setiap akun memiliki ruang kerja (workspace) yang terisolasi. Data Anda disimpan di browser lokal perangkat Anda dan tidak dibagikan ke pengguna lain.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col justify-between">
      {/* Top Floating Navbar */}
      <header className="px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-xs">
            <Sparkles className="w-4 h-4 fill-zinc-950" />
          </div>
          <div>
            <span className="font-semibold tracking-tight text-zinc-900 text-lg">Research AI</span>
            <span className="hidden md:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Pusat Panduan & Titik Temu
            </span>
          </div>
        </div>

        {/* Navigation Links & Action CTA */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <a href="#titik-temu" className="hidden sm:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            Konsep Titik Temu
          </a>
          <a href="#gatekeeper" className="hidden sm:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            7-Gatekeeper
          </a>
          <a href="#faq" className="hidden sm:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            FAQ
          </a>

          <button
            onClick={onGoToLogin}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-xl shadow-xs transition-colors"
          >
            <span>Masuk ke Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Pusat Bantuan & Panduan Lengkap • Blueprint v1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif text-zinc-950 font-normal tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Pusat Bantuan: Memahami Konsep <span className="underline decoration-amber-400 decoration-wavy decoration-2">Titik Temu</span> dalam Riset Ilmiah
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto font-sans leading-relaxed">
          Aplikasi ini adalah <strong>Research Orchestration Layer</strong> yang menghubungkan pertanyaan penelitian, metodologi ilmiah, audit data mentah, dan keputusan strategis manusia dalam satu alur yang dapat ditelusuri kembali ke akarnya.
        </p>

        {/* Quick Action CTA Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={onGoToLogin}
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-2xl shadow-xs flex items-center gap-2 transition-all transform active:scale-98"
          >
            <span>Buka Halaman Login &rarr;</span>
          </button>

          <button
            onClick={handleQuickNicky}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-2xl shadow-xs flex items-center gap-1.5 transition-all transform active:scale-98"
          >
            <UserIcon className="w-4 h-4" />
            <span>Masuk sebagai Nicky Sae (1-Klik)</span>
          </button>

          <button
            onClick={handleDemoLogin}
            className="px-5 py-3 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-semibold rounded-2xl shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-zinc-800" />
            <span>Jelajahi Demo (Alexandra Putri)</span>
          </button>
        </div>
      </section>

      {/* SECTION: 6 TITIK TEMU ALUR RISET */}
      <section id="titik-temu" className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
            Alur Terintegrasi
          </div>
          <h2 className="text-3xl font-serif text-zinc-950">
            6 Titik Temu Orkestrasi Penelitian
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Pelajari bagaimana setiap tahapan bekerja secara harmonis:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {titikTemuStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-7 rounded-3xl border border-zinc-200/80 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 group-hover:bg-amber-400 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono font-bold text-zinc-300 group-hover:text-amber-500 transition-colors">
                    {stage.step}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    {stage.badge}
                  </span>
                  <h3 className="font-semibold text-base text-zinc-900 mt-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">{stage.subtitle}</p>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: PROVENANCE TREE & 7-GATEKEEPER */}
      <section id="gatekeeper" className="bg-white border-y border-zinc-200/80 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              Scientific Quality Control
            </div>
            <h2 className="text-3xl font-serif text-zinc-950">
              7 Lapis Pengendali Ilmiah (Methodology Gatekeeper)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Mencegah kesimpulan tanpa dasar data dan membedakan korelasi dari sebab-akibat:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gates.map((g) => (
              <div 
                key={g.num}
                className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200/80 space-y-2 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center">
                    {g.num}
                  </span>
                  <h4 className="font-semibold text-xs text-zinc-900">Gate {g.num}</h4>
                </div>
                <p className="font-medium text-xs text-zinc-800">{g.name}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}

            {/* Provenance Flow Badge */}
            <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-amber-200/80 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-amber-900">Aturan Inti</p>
                <p className="font-serif text-sm font-semibold text-zinc-900 mt-1">
                  Silsilah Bukti (Provenance)
                </p>
                <p className="text-[11px] text-zinc-600 mt-1 font-mono">
                  Claim &rarr; Analysis &rarr; Evidence &rarr; Data &rarr; Source
                </p>
              </div>
              <p className="text-[10px] text-amber-800 mt-3 font-semibold">
                ✓ 100% Traceable & Immutable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif text-zinc-950">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Temukan jawaban seputar fitur, cara kerja, dan pemanfaatan AI:
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden text-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-semibold text-zinc-900 flex items-center justify-between hover:bg-zinc-50 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </button>
              {openFaqIndex === idx && (
                <div className="p-5 pt-0 text-zinc-600 border-t border-zinc-100 bg-zinc-50/50 leading-relaxed font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#FFFBEB] border-t border-amber-200/80 py-12 px-6 text-center space-y-4">
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="text-2xl font-serif text-zinc-950 font-normal">
            Siap Memulai Riset Berkualitas Tinggi?
          </h3>
          <p className="text-xs text-zinc-600">
            Masuk ke workspace Anda sekarang dan rasakan pengalaman riset berbasis bukti nyata.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onGoToLogin}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-2xl shadow-xs transition-all"
            >
              Masuk ke Research Workspace &rarr;
            </button>
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
