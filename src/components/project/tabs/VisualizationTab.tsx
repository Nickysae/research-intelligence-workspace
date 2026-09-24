import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Download, ExternalLink, BarChart2, Table, Sparkles, Check } from 'lucide-react';
import { Project } from '../../../types';

interface VisualizationTabProps {
  project: Project;
}

export const VisualizationTab: React.FC<VisualizationTabProps> = ({ project }) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [copied, setCopied] = useState(false);

  // Time series panel data for renewable capacity vs GDP CAGR
  const data = [
    { year: '2015', renewableGW: 1840, gdpIndex: 100, investmentUSD: 290 },
    { year: '2016', renewableGW: 2010, gdpIndex: 103.2, investmentUSD: 310 },
    { year: '2017', renewableGW: 2180, gdpIndex: 106.8, investmentUSD: 340 },
    { year: '2018', renewableGW: 2380, gdpIndex: 110.1, investmentUSD: 375 },
    { year: '2019', renewableGW: 2540, gdpIndex: 112.9, investmentUSD: 410 },
    { year: '2020', renewableGW: 2800, gdpIndex: 110.8, investmentUSD: 450 },
    { year: '2021', renewableGW: 3060, gdpIndex: 117.4, investmentUSD: 520 },
    { year: '2022', renewableGW: 3370, gdpIndex: 121.2, investmentUSD: 610 },
    { year: '2023', renewableGW: 3870, gdpIndex: 124.9, investmentUSD: 720 },
    { year: '2024', renewableGW: 4450, gdpIndex: 129.1, investmentUSD: 850 },
  ];

  const handleDownloadCSV = () => {
    const headers = 'Year,Renewable_Capacity_GW,GDP_Growth_Index,Investment_Billion_USD\n';
    const rows = data.map(d => `${d.year},${d.renewableGW},${d.gdpIndex},${d.investmentUSD}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.title.replace(/\s+/g, '_')}_Dataset.csv`;
    link.click();
  };

  const handleOpenGoogleSheets = () => {
    // Open new Google Spreadsheet in browser
    window.open('https://docs.google.com/spreadsheets/create', '_blank');
  };

  const handleOpenLookerStudio = () => {
    window.open('https://lookerstudio.google.com/navigation/reporting', '_blank');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-zinc-950 font-normal">Data Visualization & Dataset Handoff</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Rendered research metrics with zero-cost Google Sheets / Looker Studio handoff connectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handleOpenGoogleSheets}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Handoff to Google Sheets</span>
          </button>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-white p-7 rounded-3xl border border-zinc-200/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              Global Renewable Energy Capacity (GW) vs. GDP Growth Index (2015–2024)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Source: IEA & World Bank Open Data</p>
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-lg transition-colors ${chartType === 'line' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-lg transition-colors ${chartType === 'bar' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-lg transition-colors ${chartType === 'area' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Area
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="year" stroke="#a1a1aa" fontSize={11} />
                <YAxis yAxisId="left" stroke="#f59e0b" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#18181b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="renewableGW" name="Renewable Capacity (GW)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="gdpIndex" name="Real GDP Index (2015=100)" stroke="#18181b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            ) : chartType === 'bar' ? (
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="year" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="investmentUSD" name="Clean Energy Investment ($B)" fill="#fbbf24" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="year" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="renewableGW" name="Renewable Capacity (GW)" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Looker Studio Handoff Card */}
      <div className="p-6 rounded-3xl bg-zinc-900 text-white flex items-center justify-between shadow-xs">
        <div>
          <h3 className="font-semibold text-sm">Need Advanced BI & Enterprise Dashboarding?</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Export directly to Google Looker Studio without setting up custom analytics pipelines.
          </p>
        </div>
        <button
          onClick={handleOpenLookerStudio}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          Launch Looker Studio
        </button>
      </div>
    </div>
  );
};
