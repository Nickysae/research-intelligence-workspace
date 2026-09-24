import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  HelpCircle, 
  Search, 
  GitMerge, 
  Database, 
  BarChart3, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewResearch?: () => void;
}

const MODULE_GUIDES = [
  {
    icon: <Search className="w-5 h-5 text-amber-500" />,
    title: '1. Formulasi Pertanyaan & Metodologi',
    description: 'Tentukan pertanyaan riset utama Anda. Gemini AI akan menganalisis kelayakan pertanyaan, memvalidasi batasan wilayah & waktu, serta menyusun metodologi ilmiah yang disetujui (Approved Protocol).'
  },
  {
    icon: <Database className="w-5 h-5 text-blue-500" />,
    title: '2. Pengumpulan Sumber & Data Points',
    description: 'Koneksikan sumber akademis dari OpenAlex, arXiv, World Bank, atau manual. Setiap sumber melalui gatekeeper akurasi, dan fakta kunci diekstrak sebagai Data Point yang immutable.'
  },
  {
    icon: <GitMerge className="w-5 h-5 text-emerald-500" />,
    title: '3. Titik Temu (Evidence & Synthesis)',
    description: 'Konsep inti "Titik Temu": AI mengidentifikasi keselarasan, konflik, dan korelasi antar data yang berbeda untuk merumuskan bukti ilmiah (Evidence Groups) yang kokoh dan bebas halusinasi.'
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
    title: '4. Visualisasi & Chart Interaktif',
    description: 'Data kuantitatif divisualisasikan menjadi grafik multi-axis (tren pertumbuhan, kapasitas energi, korelasi) dengan indikator signifikansi statistik.'
  },
  {
    icon: <BookOpen className="w-5 h-5 text-rose-500" />,
    title: '5. NotebookLM Assistant & Ledger',
    description: 'Tanya jawab interaktif berbasis sumber riset terverifikasi, membuat ringkasan temuan, dan melacak seluruh riwayat perubahan melalui Audit Ledger.'
  }
];

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onNewResearch
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-7 shadow-2xl border border-zinc-200 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-zinc-900 text-xl flex items-center gap-2">
                <span>Panduan Riset Titik Temu</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Concept & Workflow
                </span>
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cara mengorkestrasi riset berbasis bukti nyata dari formulasi pertanyaan hingga sintesis penemuan.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Philosophy Card */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 space-y-2">
          <div className="font-semibold flex items-center gap-1.5 text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Filosofi "Titik Temu"</span>
          </div>
          <p className="leading-relaxed text-zinc-700">
            Dalam dunia akademis dan riset profesional, kesimpulan yang valid tidak diambil dari satu opini, melainkan dari <strong>titik temu (convergence)</strong> berbagai bukti independen yang saling mengonfirmasi. Sistem ini dirancang untuk mencegah halusinasi AI dengan melacak setiap klaim hingga ke data mentah dan sumber aslinya.
          </p>
        </div>

        {/* Steps Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1.5 md:col-span-1 border-r border-zinc-100 pr-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Langkah Modul</p>
            {MODULE_GUIDES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  selectedIdx === idx 
                    ? 'bg-zinc-900 text-white shadow-xs font-semibold' 
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {item.icon}
                  <span className="truncate">{item.title.split('. ')[1]}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          <div className="md:col-span-2 p-5 bg-zinc-50 rounded-2xl border border-zinc-200/70 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white shadow-2xs">
                  {MODULE_GUIDES[selectedIdx].icon}
                </div>
                <h3 className="text-sm font-bold text-zinc-900">
                  {MODULE_GUIDES[selectedIdx].title}
                </h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {MODULE_GUIDES[selectedIdx].description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Langkah {selectedIdx + 1} dari {MODULE_GUIDES.length}</span>
              <div className="flex gap-1">
                <button
                  disabled={selectedIdx === 0}
                  onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                  className="px-2 py-1 rounded bg-white border border-zinc-200 disabled:opacity-40 text-zinc-700"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={selectedIdx === MODULE_GUIDES.length - 1}
                  onClick={() => setSelectedIdx(prev => Math.min(MODULE_GUIDES.length - 1, prev + 1))}
                  className="px-2 py-1 rounded bg-zinc-900 text-white disabled:opacity-40"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://abdurrosyid-portfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
          >
            <span>Tentang Pengembang (Portofolio)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            {onNewResearch && (
              <button
                onClick={() => {
                  onNewResearch();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold transition-colors shadow-2xs"
              >
                Buat Riset Baru
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
