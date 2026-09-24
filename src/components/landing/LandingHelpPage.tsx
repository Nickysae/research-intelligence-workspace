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
  ExternalLink,
  Play,
  User as UserIcon,
  Code2,
  Briefcase,
  GitBranch,
  Award,
  Globe
} from 'lucide-react';
import { User } from '../../types';
import { INITIAL_USER, StorageService } from '../../db/storage';

interface LandingHelpPageProps {
  onGoToLogin: () => void;
  onQuickDemo: (user: User) => void;
}

export const LandingHelpPage: React.FC<LandingHelpPageProps> = ({ onGoToLogin, onQuickDemo }) => {
  const [activeTutorialStep, setActiveTutorialStep] = useState<number>(0);
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

  // Tutorial Interaktif Penggunaan Aplikasi Langkah demi Langkah
  const tutorialSteps = [
    {
      num: 1,
      title: 'Membuat Riset Baru & Menentukan Batasan Pertanyaan',
      category: 'Inisialisasi',
      desc: 'Klik tombol "+ New Research" di dashboard. Tuliskan pertanyaan utama, tujuan riset, wilayah geografis, dan jangka waktu data. AI akan memformulasikan scope awal tanpa mengubah niat riset Anda.',
      actionNote: 'Tips: Semakin spesifik batasan geografi dan rentang tahun, semakin akurat rekomendasi data.',
      previewUi: 'Project: "Impact of Renewable Energy on Economic Growth" | Scope: US, EU, China, India (2015-2024)'
    },
    {
      num: 2,
      title: 'Review & Kunci Metodologi Ilmiah (Methodology Proposal)',
      category: 'Tata Kelola',
      desc: 'Buka tab "Methodology". Periksa proposal metode (seperti Panel Regression dengan Fixed Effects). Anda memiliki 3 kendali mutlak: [Approve] untuk mengunci, [Modify] untuk mengedit, atau [Regenerate] untuk alternatif baru.',
      actionNote: 'Aturan: AI dilarang mengubah metode yang sudah disetujui tanpa izin resmi peneliti.',
      previewUi: 'Status: [Approved] • Method: Econometric Panel VAR Regression • 7 Gates Activated'
    },
    {
      num: 3,
      title: 'Ingesti & Audit Validitas Sumber (OpenAlex, arXiv, World Bank)',
      category: 'Konektivitas',
      desc: 'Di tab "Sources", klik "+ Add Source". Cari otomatis dari jurnal dunia terindeks atau masukkan dataset kustom. Setiap sumber otomatis diaudit statusnya: Validated (hijau), Questionable (kuning), atau Rejected (merah).',
      actionNote: 'Fitur: Terintegrasi langsung dengan open API gratis tanpa biaya berlangganan.',
      previewUi: '12 Sources Validated (IEA, World Bank, Google Scholar) • 1 Rejected (Biased Whitepaper)'
    },
    {
      num: 4,
      title: 'Ekstraksi Data Mentah Abadi & Pohon Bukti (Provenance Tree)',
      category: 'Pelacakan Bukti',
      desc: 'Di tab "Evidence" dan "Data", semua fakta diekstrak secara immutable (tidak bisa ditimpa). Klik "View full provenance" untuk melacak silsilah kesimpulan dari klaim teratas sampai ke dokumen asal.',
      actionNote: 'Rantai Silsilah: Claim → Analysis → Evidence → Data → Source.',
      previewUi: 'Claim: "Renewable adoption positively correlates with GDP (+0.14% CAGR, p<0.01)"'
    },
    {
      num: 5,
      title: 'Audit 7-Gatekeeper & Pengambilan Keputusan Manusia',
      category: 'Keputusan',
      desc: 'Jalankan "Run 7-Gate Audit" untuk memastikan korelasi tidak disalahartikan sebagai sebab-akibat. Di tab "Insights", baca ringkasan teruji lalu catat keputusan resmi Anda di bagian Decision References.',
      actionNote: 'Filosofi: AI may propose. Methodology constrains. Evidence supports. Human decides.',
      previewUi: 'Decision Reference: "Approved $2.4B Green Sovereign Transition Bond Allocation"'
    },
    {
      num: 6,
      title: 'Visualisasi Interaktif & Ekspor ke Google Sheets / NotebookLM',
      category: 'Hilirisasi',
      desc: 'Gunakan tab "Visualization" untuk melihat grafik waktu nyata, lalu klik "Download CSV" atau "Handoff to Google Sheets". Di tab "NotebookLM", salin 1-klik berkas markdown kurasi riset untuk dibuatkan podcast audio.',
      actionNote: 'Zero-Cost: Bekerja sempurna dengan ekosistem gratis Google Sheets dan NotebookLM.',
      previewUi: 'Export: Google Sheets Web Intent + Curated Dossier .md for NotebookLM Audio Deep Dive'
    }
  ];

  // 6 Titik Temu Orkestrasi Riset
  const titikTemuStages = [
    {
      step: '01',
      title: 'Titik Temu 1: Formulasi Pertanyaan & Batasan Riset',
      subtitle: 'Research Question & Bounded Inquiry',
      icon: Compass,
      badge: 'Fase Input',
      desc: 'Setiap penelitian bermula dari pertanyaan yang spesifik. Di sini, Anda menentukan Research Objective, Scope Geografi (misal: US, EU, ASEAN), Jangka Waktu data, dan Tujuan Pengambilan Keputusan.'
    },
    {
      step: '02',
      title: 'Titik Temu 2: Penguncian Metodologi Ilmiah & 7-Gatekeeper',
      subtitle: 'Scientific Protocol & Bias Shield',
      icon: ShieldCheck,
      badge: 'Fase Metodologi',
      desc: 'AI merumuskan proposal metodologi ilmiah yang tepat. Pengguna memegang kendali penuh dengan tombol [Approve], [Modify], atau [Regenerate] sebelum satu pun data diekstrak.'
    },
    {
      step: '03',
      title: 'Titik Temu 3: Ingesti & Validasi Sumber Bebas Konflik',
      subtitle: 'Multi-Connector Open Scholarly Knowledge',
      icon: Search,
      badge: 'Fase Sumber',
      desc: 'Menghubungkan secara otomatis ke open API bereputasi: OpenAlex API, arXiv.org, dan World Bank. Setiap sumber diaudit otoritas dan status validasinya.'
    },
    {
      step: '04',
      title: 'Titik Temu 4: Rekonstruksi Pohon Bukti (Provenance Chain)',
      subtitle: 'Immutable Data & Traceable Reasoning',
      icon: GitMerge,
      badge: 'Fase Pembuktian',
      desc: 'Data mentah disimpan secara permanen (immutable). Setiap kesimpulan dibangun di atas pohon pembuktian terbalik: Claim → Analysis → Evidence → Data → Source.'
    },
    {
      step: '05',
      title: 'Titik Temu 5: Sintesis Wawasan & Keputusan Manusia',
      subtitle: 'Human-in-the-Loop Decision References',
      icon: Lightbulb,
      badge: 'Fase Keputusan',
      desc: 'AI mengusulkan sintesis temuan dan rekomendasi strategis, namun manusia yang memverifikasi dan menandatangani keputusan akhir.'
    },
    {
      step: '06',
      title: 'Titik Temu 6: Handoff ke Google Sheets & NotebookLM',
      subtitle: 'Data Export & Audio Deep Dive',
      icon: BookOpen,
      badge: 'Fase Hilirisasi',
      desc: 'Kirim dataset terstruktur langsung ke Google Sheets / Looker Studio serta buat berkas kurasi Markdown untuk di-upload ke Google NotebookLM dalam 1 klik.'
    }
  ];

  const faqs = [
    {
      q: 'Apa itu filosofi "Titik Temu" dalam aplikasi ini?',
      a: 'Titik Temu adalah simpul yang mempertemukan 4 elemen: Pertanyaan Peneliti, Standar Metodologi Ilmiah, Bukti Data Mentah Terverifikasi, dan Keputusan Akhir Manusia sehingga tidak ada kesimpulan AI yang mengambang tanpa dasar data.'
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
        <div className="flex items-center gap-5 text-xs font-semibold">
          <a href="#tutorial" className="hidden md:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            Tutorial Penggunaan
          </a>
          <a href="#titik-temu" className="hidden sm:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            Konsep Titik Temu
          </a>
          <a href="#portfolio" className="hidden sm:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
            Tentang / Portfolio
          </a>
          <a href="#faq" className="hidden lg:inline-block text-zinc-600 hover:text-zinc-900 transition-colors">
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
          <a
            href="#tutorial"
            className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-2xl shadow-xs flex items-center gap-2 transition-all transform active:scale-98"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lihat Tutorial Penggunaan &darr;</span>
          </a>

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

      {/* SECTION: TUTORIAL PENGGUNAAN APLIKASI INTERAKTIF (HOW-TO-USE) */}
      <section id="tutorial" className="max-w-6xl mx-auto px-6 py-16 space-y-10 border-t border-zinc-200/80">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            Panduan Praktis
          </div>
          <h2 className="text-3xl font-serif text-zinc-950">
            Tutorial Penggunaan Aplikasi Langkah demi Langkah
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Pilih langkah di bawah ini untuk melihat panduan detail dan cara kerjanya di dalam sistem:
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tutorialSteps.map((step, idx) => {
            const isActive = activeTutorialStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTutorialStep(idx)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-amber-400 border-amber-500 text-zinc-950 shadow-xs font-semibold'
                    : 'bg-white border-zinc-200/80 text-zinc-600 hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`}>
                    0{step.num}
                  </span>
                  <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${isActive ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                    {step.category}
                  </span>
                </div>
                <p className="text-xs font-semibold mt-2 line-clamp-2 leading-snug">
                  {step.title.split(':')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center">
                {tutorialSteps[activeTutorialStep].num}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {tutorialSteps[activeTutorialStep].category}
              </span>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-zinc-900">
              {tutorialSteps[activeTutorialStep].title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
              {tutorialSteps[activeTutorialStep].desc}
            </p>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
              💡 {tutorialSteps[activeTutorialStep].actionNote}
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 text-zinc-100 p-6 rounded-2xl space-y-3 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Live System Preview</span>
              </span>
              <span>Langkah 0{tutorialSteps[activeTutorialStep].num}/06</span>
            </div>

            <div className="text-amber-300 text-xs font-semibold">
              &gt; {tutorialSteps[activeTutorialStep].previewUi}
            </div>

            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Tercatat otomatis pada Immutable Research Ledger untuk audit trail.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  if (activeTutorialStep < tutorialSteps.length - 1) {
                    setActiveTutorialStep(activeTutorialStep + 1);
                  } else {
                    onGoToLogin();
                  }
                }}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-semibold rounded-lg font-sans transition-colors flex items-center gap-1"
              >
                <span>{activeTutorialStep < tutorialSteps.length - 1 ? 'Langkah Berikutnya →' : 'Mulai Sekarang →'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 6 TITIK TEMU ALUR RISET */}
      <section id="titik-temu" className="max-w-6xl mx-auto px-6 py-12 space-y-10 border-t border-zinc-200/80">
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

      {/* SECTION: TENTANG PENGEMBANG & PORTFOLIO PENELITI (NICKY SAE) */}
      <section id="portfolio" className="bg-white border-y border-zinc-200/80 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Profil Pengembang & Peneliti
            </div>
            <h2 className="text-3xl font-serif text-zinc-950">
              Tentang Kreator & Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Mengenal lebih dekat dedikasi di balik perancangan Research Intelligence Workspace:
            </p>
          </div>

          <div className="bg-[#FAF9F6] p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Avatar & Badges */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="relative inline-block">
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Nicky+Sae&backgroundColor=fbbf24,f59e0b"
                  alt="Nicky Sae"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-md mx-auto lg:mx-0"
                />
                <div className="absolute -bottom-2 -right-2 bg-zinc-950 text-white p-2 rounded-xl text-xs shadow-xs">
                  ✨ Researcher
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-semibold text-zinc-950">Nicky Sae</h3>
                <p className="text-xs font-semibold text-amber-700 mt-0.5">Software Engineer & Research System Architect</p>
                <p className="text-xs text-zinc-500 mt-1">Fokus pada AI Orchestration, Evidence Provenance, & Zero-Cost Cloud</p>
              </div>

              {/* Social / Portfolio Links */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2">
                <a
                  href="https://github.com/Nickysae"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href="https://github.com/Nickysae?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfolio Repos</span>
                </a>
              </div>
            </div>

            {/* Right Col: Highlights & Engineering Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3 text-xs leading-relaxed text-zinc-700">
                <p className="font-serif text-sm font-medium text-zinc-950 leading-snug">
                  "Penelitian modern tidak boleh hanya bergantung pada jawaban instan AI tanpa dasar bukti yang dapat dipertanggungjawabkan. Kami merancang arsitektur di mana metodologi ilmiah menjadi kompas pengendali."
                </p>
                <p>
                  Sebagai pengembang dan peneliti, saya berfokus menciptakan platform yang menggabungkan <strong>Scientific Rigor</strong> dengan kemudahan akses <strong>100% Zero-Cost</strong> bagi seluruh akademisi, analis kebijakan, dan profesional data.
                </p>
              </div>

              {/* 3 Core Competency Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-zinc-200/80 space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <p className="font-semibold text-zinc-900 mt-2">Fullstack AI Systems</p>
                  <p className="text-[11px] text-zinc-500">React, TypeScript, Tailwind, Gemini API, Multi-tenancy isolation.</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-zinc-200/80 space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="font-semibold text-zinc-900 mt-2">Evidence Provenance</p>
                  <p className="text-[11px] text-zinc-500">Audit trail, immutable datasets, 7-Gatekeeper governance.</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-zinc-200/80 space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    <Globe className="w-4 h-4" />
                  </div>
                  <p className="font-semibold text-zinc-900 mt-2">Open Connectors</p>
                  <p className="text-[11px] text-zinc-500">OpenAlex, arXiv, World Bank Open Data, NotebookLM Integration.</p>
                </div>
              </div>
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
      <footer className="py-6 px-8 bg-zinc-900 text-zinc-400 text-xs text-center border-t border-zinc-800 space-y-1">
        <p>Research Intelligence Workspace • Evidence-First Scientific Orchestration • 100% Zero-Cost Architecture</p>
        <p className="text-[11px] text-zinc-500">
          Dirancang & Dikembangkan oleh <a href="https://github.com/Nickysae" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">Nicky Sae</a>
        </p>
      </footer>
    </div>
  );
};
