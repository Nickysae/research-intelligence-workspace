import React, { useState } from 'react';
import { BookOpen, Copy, Check, ExternalLink, Download, Sparkles, FileText } from 'lucide-react';
import { Project } from '../../../types';

interface NotebookLMTabProps {
  project: Project;
}

export const NotebookLMTab: React.FC<NotebookLMTabProps> = ({ project }) => {
  const [copied, setCopied] = useState(false);

  // Generate Curated Markdown Research Collection for NotebookLM
  const generateNotebookLMPackage = () => {
    return `# RESEARCH INTELLIGENCE DOSSIER
## Project: ${project.title}
Generated for NotebookLM Ingestion & Deep Synthesis
Date: ${new Date().toLocaleDateString('en-GB')}

---

### 1. Research Question & Scope
- **Question**: ${project.questionData.question}
- **Objective**: ${project.questionData.objective}
- **Geography**: ${project.questionData.scope.geography || 'Global'}
- **Time Period**: ${project.questionData.scope.timePeriod || 'Recent'}

---

### 2. Approved Scientific Methodology
- **Recommended Method**: ${project.methodology.recommendedMethod}
- **Methodological Rationale**: ${project.methodology.why}
- **Required Data Parameters**: ${project.methodology.requiredData.join('; ')}
- **Analysis Approach**: ${project.methodology.analysisMethod}
- **Identified Biases**: ${project.methodology.potentialBias.join(', ')}
- **Limitations**: ${project.methodology.limitations.join(', ')}

---

### 3. Audited Research Sources (${project.sources.filter(s => s.validationStatus === 'Validated').length} Validated)
${project.sources.map((s, idx) => `
#### Source [${idx + 1}]: ${s.name} (${s.provider})
- **Type**: ${s.type}
- **Authority**: ${s.authority}
- **Validation Status**: ${s.validationStatus}
- **Audit Reason**: ${s.validationReason}
- **Reference URL**: ${s.url}
- **Relevance**: ${s.relevance}
`).join('')}

---

### 4. Extracted Immutable Data Points
${project.dataPoints.map((dp, idx) => `
- **Fact [${idx + 1}]**: "${dp.extractedFact}" (Metric: ${dp.metricName} = ${dp.value} ${dp.unit || ''}, Year: ${dp.year || 'N/A'})
`).join('')}

---

### 5. Corroborated Evidence & Insights
${project.insights.map((ins, idx) => `
#### Insight [${idx + 1}]: ${ins.title}
- **Claim Status**: ${ins.claimStatus}
- **Statement**: "${ins.statement}"
- **Recommendation**: ${ins.recommendation}
- **Provenance**: ${ins.provenanceChain.claim} -> ${ins.provenanceChain.analysis} -> ${ins.provenanceChain.data}
`).join('')}

---
*End of Research Collection Bundle.*
`;
  };

  const packageContent = generateNotebookLMPackage();

  const handleCopy = () => {
    navigator.clipboard.writeText(packageContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([packageContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.title.replace(/\s+/g, '_')}_NotebookLM_Bundle.md`;
    link.click();
  };

  const handleOpenNotebookLM = () => {
    window.open('https://notebooklm.google.com', '_blank');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-zinc-950 font-normal">NotebookLM Handoff Packager</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Prepare and export curated evidence collections into Google NotebookLM for audio deep-dives and grounding.
          </p>
        </div>

        <button
          onClick={handleOpenNotebookLM}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Launch NotebookLM</span>
        </button>
      </div>

      {/* Action Steps Card */}
      <div className="bg-[#FFFBEB] p-6 rounded-3xl border border-amber-200/80 space-y-3">
        <h2 className="text-xs font-semibold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Official NotebookLM Handoff Workflow</span>
        </h2>
        <ol className="list-decimal list-inside text-xs text-zinc-700 space-y-1.5 leading-relaxed">
          <li>Click <strong>Copy Curated Markdown Bundle</strong> or <strong>Download .md File</strong> below.</li>
          <li>Click <strong>Launch NotebookLM</strong> to open your personal Google NotebookLM studio.</li>
          <li>In NotebookLM, click <em>+ Add Sources</em> &rarr; <em>Copied Text / Markdown</em> and paste your package.</li>
          <li>Generate grounded audio overviews, multi-source citations, or interactive synthesis queries.</li>
        </ol>
      </div>

      {/* Curated Package Box */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-2xs overflow-hidden space-y-0">
        <div className="p-4 px-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/60">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-800">Curated Research Dossier (.md)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Package'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        <pre className="p-6 text-[11px] font-mono text-zinc-700 bg-white max-h-96 overflow-y-auto leading-relaxed select-all whitespace-pre-wrap">
          {packageContent}
        </pre>
      </div>
    </div>
  );
};
