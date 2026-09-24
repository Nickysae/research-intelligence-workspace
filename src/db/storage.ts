import { Project, User, Workspace } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_001',
  name: 'Alexandra Putri',
  email: 'alexandra.putri@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const INITIAL_WORKSPACE: Workspace = {
  id: 'ws_001',
  userId: 'usr_001',
  name: 'Macroeconomics & Sustainability Lab',
  description: 'Evidence-based global macroeconomic policy analysis',
  createdAt: '2026-01-10T08:00:00Z'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_renewable_energy',
    workspaceId: 'ws_001',
    userId: 'usr_001',
    title: 'Renewable Energy and Economic Growth',
    summary: 'Investigate the relationship between renewable energy adoption and economic growth across selected countries in the last 10 years.',
    state: 'Analyzing',
    stateStatusText: 'Analyzing',
    keyInfo: {
      question: 'What is the relationship between renewable energy adoption and economic growth?',
      period: '2015 – 2024',
      geographicScope: 'Selected countries (US, EU, China, India)'
    },
    stats: {
      validatedSources: 12,
      dataCollections: 4,
      evidenceGroups: 2,
      analysisComplete: 1
    },
    questionData: {
      objective: 'To analyze the relationship between renewable energy adoption and economic growth in selected countries over the past 10 years.',
      question: 'What is the relationship between renewable energy adoption and economic growth across selected countries in the last 10 years?',
      scope: {
        population: 'Developing and developed industrial economies',
        geography: 'United States, European Union, China, and India',
        timePeriod: '2015 - 2024 (10-year panel dataset)',
        availableData: 'Macroeconomic GDP growth, Renewable capacity (GW), Total investment (USD), Carbon intensity',
        intendedDecision: 'Policy guidance on national grid renewable transition incentives vs capital expenditure burden.'
      }
    },
    methodology: {
      status: 'Approved',
      recommendedMethod: 'Quantitative analysis with panel data regression & fixed effects.',
      why: 'To identify correlation and potential causal relationship while controlling for country-specific confounding variables such as baseline GDP and policy framework.',
      requiredData: [
        'Renewable energy consumption & capacity (from IEA, World Bank)',
        'Real GDP growth & capital formation (from World Bank, OECD)',
        'Control variables (e.g., government subsidies, industrialization rate, carbon tax)'
      ],
      sourceRequirements: [
        'Peer-reviewed academic empirical studies (2018-2024)',
        'Official institutional statistics (IEA, World Bank, IRENA)',
        'Audited market reports without proprietary vendor bias'
      ],
      analysisMethod: 'Econometric Panel Vector Autoregression (PVAR) & Multivariate OLS with Hausman test.',
      potentialBias: [
        'Survivorship bias towards heavily subsidized EU energy projects',
        'Reporting variance in definition of renewable subsidies across jurisdictions'
      ],
      limitations: [
        'Excludes off-grid informal biomass consumption',
        'Lag effect of grid modernization capital expenditure taking 3-5 years to reflect in GDP'
      ],
      alternativeMethod: 'Difference-in-Differences (DiD) comparing pre/post renewable tariff implementation.',
      approvedAt: '12 Apr 2025, 11:12'
    },
    sources: [
      {
        id: 'src_01',
        projectId: 'proj_renewable_energy',
        name: 'IEA - World Energy Outlook',
        provider: 'iea.org',
        type: 'Dataset',
        url: 'https://iea.org/reports/world-energy-outlook',
        authority: 'High',
        relevance: 'Primary global renewable generation capacity and investment benchmark.',
        recency: '2 days ago',
        geographicScope: 'Global (US, EU, China, India)',
        validationStatus: 'Validated',
        validationReason: 'High authority, independently verified international agency data.',
        lastChecked: '2 days ago'
      },
      {
        id: 'src_02',
        projectId: 'proj_renewable_energy',
        name: 'World Bank Open Data',
        provider: 'worldbank.org',
        type: 'Database',
        url: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG',
        authority: 'High',
        relevance: 'Standardized historical GDP growth rates and capital formation.',
        recency: '3 days ago',
        geographicScope: 'Global 190+ countries',
        validationStatus: 'Validated',
        validationReason: 'Official multilateral institution, reliable methodology and complete metadata.',
        lastChecked: '3 days ago'
      },
      {
        id: 'src_03',
        projectId: 'proj_renewable_energy',
        name: 'Google Scholar - Panel Study on Green Energy',
        provider: 'scholar.google.com',
        type: 'Academic',
        url: 'https://scholar.google.com/citations?view_op=view_citation',
        authority: 'High',
        relevance: 'Empirical regression results linking green grid transition to regional productivity.',
        recency: '1 day ago',
        validationStatus: 'Validated',
        validationReason: 'Peer-reviewed econometric paper (Q1 journal citation).',
        lastChecked: '1 day ago'
      },
      {
        id: 'src_04',
        projectId: 'proj_renewable_energy',
        name: 'Reuters Energy Briefing',
        provider: 'reuters.com',
        type: 'News',
        url: 'https://reuters.com/business/energy',
        authority: 'Medium',
        relevance: 'Qualitative market sentiment and regulatory shift announcements.',
        recency: '1 day ago',
        validationStatus: 'Validated',
        validationReason: 'Reputable journalistic source, corroborates institutional policy timelines.',
        lastChecked: '1 day ago'
      },
      {
        id: 'src_05',
        projectId: 'proj_renewable_energy',
        name: 'Government Energy Statistics Portal',
        provider: 'gov.example.org',
        type: 'Government',
        url: 'https://energy.gov.sample',
        authority: 'Medium',
        relevance: 'Regional capacity metrics without clear methodology notes.',
        recency: '2 days ago',
        validationStatus: 'Questionable',
        validationReason: 'Source is relevant but methodology cannot be independently verified.',
        lastChecked: '2 days ago'
      },
      {
        id: 'src_06',
        projectId: 'proj_renewable_energy',
        name: 'Bloomberg Green Markets',
        provider: 'bloomberg.com',
        type: 'News',
        url: 'https://bloomberg.com/green',
        authority: 'High',
        relevance: 'Private venture investments in clean tech.',
        recency: '3 days ago',
        validationStatus: 'Validated',
        validationReason: 'Audited financial metrics and market tracking.',
        lastChecked: '3 days ago'
      },
      {
        id: 'src_07',
        projectId: 'proj_renewable_energy',
        name: 'Lobbyist Energy Group Whitepaper',
        provider: 'cleanfossilcoalition.org',
        type: 'Academic',
        url: 'https://example.com/biased-whitepaper',
        authority: 'Low',
        relevance: 'Advocacy document claiming renewable instability.',
        recency: '1 week ago',
        validationStatus: 'Rejected',
        validationReason: 'Significant commercial conflict of interest and unverified sample methodology.',
        lastChecked: '4 days ago'
      }
    ],
    dataPoints: [
      {
        id: 'dp_01',
        projectId: 'proj_renewable_energy',
        sourceId: 'src_01',
        extractedFact: 'Renewable electricity capacity expanded by 50% between 2019 and 2024 globally.',
        metricName: 'Renewable Capacity Growth',
        value: '50%',
        year: 2024,
        unit: 'Percentage',
        isImmutable: true,
        timestamp: '12 Apr 2025, 14:40'
      },
      {
        id: 'dp_02',
        projectId: 'proj_renewable_energy',
        sourceId: 'src_02',
        extractedFact: 'Average real GDP growth rate for top 10 renewable adopter nations maintained +3.2% CAGR.',
        metricName: 'Real GDP CAGR',
        value: 3.2,
        year: '2015-2024',
        unit: '% CAGR',
        isImmutable: true,
        timestamp: '12 Apr 2025, 15:10'
      },
      {
        id: 'dp_03',
        projectId: 'proj_renewable_energy',
        sourceId: 'src_03',
        extractedFact: 'Regression coefficient of renewable share on GDP output is positive (beta = +0.142, p < 0.01).',
        metricName: 'Regression Coefficient Beta',
        value: 0.142,
        year: 2023,
        unit: 'OLS beta',
        isImmutable: true,
        timestamp: '12 Apr 2025, 16:00'
      }
    ],
    evidenceList: [
      {
        id: 'ev_01',
        projectId: 'proj_renewable_energy',
        claim: 'Renewable energy adoption positively impacts economic growth.',
        status: 'SUPPORTED',
        analysisSummary: 'Regression analysis (p < 0.01) confirms statistically significant positive correlation with a 2-year lag.',
        analysisMethod: 'Multivariate Panel OLS regression with country fixed effects',
        dataSummary: 'Renewable energy consumption, GDP growth rate, Capital investment (2015-2024)',
        sourceNames: ['IEA', 'World Bank', 'OECD (2015-2024)'],
        supportingDataIds: ['dp_01', 'dp_02', 'dp_03'],
        confidenceLevel: 'High'
      },
      {
        id: 'ev_02',
        projectId: 'proj_renewable_energy',
        claim: 'Transition capital expenditure causes short-term industrial margin contraction.',
        status: 'LIMITED EVIDENCE',
        analysisSummary: 'Preliminary findings show margin compression in energy-heavy manufacturing during initial 18 months.',
        analysisMethod: 'Comparative sector margin analysis',
        dataSummary: 'Heavy manufacturing quarterly EBIT margins vs energy tariff change',
        sourceNames: ['Reuters Energy', 'Bloomberg Green'],
        supportingDataIds: ['dp_01'],
        confidenceLevel: 'Moderate'
      }
    ],
    gatekeeperChecks: [
      { id: 'gate_1', name: 'Research Validity', gateNumber: 1, passed: true, details: 'Research question is clearly bounded with well-defined independent & dependent variables.', notes: 'Clarity score 100%' },
      { id: 'gate_2', name: 'Methodology Fit', gateNumber: 2, passed: true, details: 'Panel regression with fixed effects matches causal/correlational research objective.', notes: 'Hausman test recommended.' },
      { id: 'gate_3', name: 'Source Validity', gateNumber: 3, passed: true, details: '12 of 14 collected sources pass authority, recency, and independence criteria.', notes: 'Rejected 1 biased whitepaper.' },
      { id: 'gate_4', name: 'Data Quality', gateNumber: 4, passed: true, details: 'Data points are complete, normalized to USD 2020 constant prices with no duplicates.', notes: 'Zero null values in key time series.' },
      { id: 'gate_5', name: 'Evidence Sufficiency', gateNumber: 5, passed: true, details: 'Cross-corroboration verified across 3 distinct multilateral agencies.', notes: 'Sufficient sample size (N=40 panel observations).' },
      { id: 'gate_6', name: 'Inference Check (Correlation vs Causation)', gateNumber: 6, passed: true, details: 'Distinguished correlation from causation by applying instrumental variables for exogenous grid policy shifts.', notes: 'Prevents false causal claims.' },
      { id: 'gate_7', name: 'Bias & Coverage Check', gateNumber: 7, passed: true, details: 'Evaluated geographic balance across both developed (US/EU) and developing (China/India) economies.', notes: 'Checked temporal & survivor bias.' }
    ],
    insights: [
      {
        id: 'ins_01',
        projectId: 'proj_renewable_energy',
        title: 'Long-term Economic Synergies in Clean Power Transition',
        statement: 'A 10% increase in renewable electricity share correlates with an estimated 0.14% net gain in annual GDP growth after accounting for a 2-year infrastructure maturation lag.',
        claimStatus: 'SUPPORTED',
        provenanceChain: {
          claim: 'Renewable energy adoption positively impacts economic growth.',
          analysis: 'Multivariate Panel OLS regression with country fixed effects (p < 0.01).',
          evidence: '12 peer-reviewed and multilateral datasets corroborating positive GDP yield.',
          data: 'IEA renewable capacity GW & World Bank real GDP panel data (2015-2024).',
          source: 'IEA World Energy Outlook & World Bank Data Portal.'
        },
        recommendation: 'Incentivize grid-scale storage co-location to buffer the 18-month upfront CAPEX cycle.',
        createdAt: '12 Apr 2025, 17:30'
      }
    ],
    decisionReferences: [
      {
        id: 'dec_01',
        projectId: 'proj_renewable_energy',
        insightId: 'ins_01',
        decisionTitle: 'Green Infrastructure Sovereign Bond Allocation',
        strategicRationale: 'Allocate $2.4B national sovereign transition fund towards high-efficiency solar & wind farms with guaranteed feed-in tariffs based on proven +0.14% GDP yield.',
        evidenceBacking: 'SUPPORTED',
        humanDecisionRecorded: 'Approved for Q3 fiscal review committee presentation.',
        decisionStatus: 'Approved',
        updatedAt: '12 Apr 2025, 18:00'
      }
    ],
    ledger: [
      { id: 'led_01', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 10:24', actor: 'Alexandra Putri', action: 'Research question created', objectType: 'Question', details: 'Initialized research question & scope boundaries.' },
      { id: 'led_02', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 10:45', actor: 'AI Assistant', action: 'Methodology proposed', objectType: 'Protocol', details: 'Proposed Econometric Panel VAR regression model.' },
      { id: 'led_03', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 11:12', actor: 'Alexandra Putri', action: 'Methodology approved', objectType: 'Protocol', details: 'User verified and locked methodology protocol.' },
      { id: 'led_04', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 14:32', actor: 'System', action: 'Source added (IEA World Energy Outlook)', objectType: 'Source', details: 'Ingested source metadata and URL endpoint.' },
      { id: 'led_05', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 16:03', actor: 'AI Assistant', action: 'Source validation completed', objectType: 'Validation', details: '12 sources validated, 1 questioned, 1 rejected.' },
      { id: 'led_06', projectId: 'proj_renewable_energy', timestamp: '12 Apr 2025, 17:21', actor: 'System', action: 'Data collection in progress', objectType: 'Data', details: 'Extracted 92 immutable data points across 4 countries.' }
    ],
    createdAt: '2025-04-12T10:24:00Z',
    updatedAt: '2025-04-12T18:00:00Z'
  },
  {
    id: 'proj_ai_adoption',
    workspaceId: 'ws_001',
    userId: 'usr_001',
    title: 'AI Adoption in Southeast Asia',
    summary: 'Evaluating organizational generative AI readiness and productivity gains across fintech and healthcare sectors in ASEAN.',
    state: 'Validating',
    stateStatusText: 'Validating',
    keyInfo: {
      question: 'How is generative AI adoption affecting workforce productivity in ASEAN fintech?',
      period: '2023 – 2025',
      geographicScope: 'Indonesia, Singapore, Malaysia, Vietnam'
    },
    stats: {
      validatedSources: 6,
      dataCollections: 2,
      evidenceGroups: 1,
      analysisComplete: 0
    },
    questionData: {
      objective: 'Measure productivity shift and labor displacement risk from GenAI implementation in Southeast Asian financial hubs.',
      question: 'How is generative AI adoption affecting workforce productivity in ASEAN fintech?',
      scope: {
        population: 'Fintech software engineers and customer operations personnel',
        geography: 'Singapore, Indonesia, Vietnam',
        timePeriod: '2023 - 2025',
        intendedDecision: 'Enterprise training budget allocation and talent reskilling strategy.'
      }
    },
    methodology: {
      status: 'Approved',
      recommendedMethod: 'Mixed-method comparative survey with quantitative task completion telemetry.',
      why: 'Combines real customer support resolution times with qualitative engineer sentiment.',
      requiredData: ['Ticket resolution times', 'Code commit frequency', 'Survey responses (N=450)'],
      sourceRequirements: ['Internal Jira telemetry', 'ASEAN Tech Barometer', 'McKinsey GenAI in SE Asia'],
      analysisMethod: 'Pre/post implementation paired t-test and sentiment thematic clustering.',
      potentialBias: ['Self-selection bias among early-adopting tech startups'],
      limitations: ['Limited historical baseline prior to Q4 2022'],
      approvedAt: 'Yesterday'
    },
    sources: [
      {
        id: 'src_ai_1',
        projectId: 'proj_ai_adoption',
        name: 'Google & Temasek e-Conomy SEA Report',
        provider: 'economysea.withgoogle.com',
        type: 'Dataset',
        url: 'https://economysea.withgoogle.com',
        authority: 'High',
        relevance: 'Authoritative macroeconomic digital economy assessment for ASEAN.',
        recency: '1 day ago',
        validationStatus: 'Validated',
        validationReason: 'Comprehensive survey dataset and transparent methodology.',
        lastChecked: '1 day ago'
      }
    ],
    dataPoints: [],
    evidenceList: [],
    gatekeeperChecks: [],
    insights: [],
    decisionReferences: [],
    ledger: [
      { id: 'led_ai_1', projectId: 'proj_ai_adoption', timestamp: '1 day ago', actor: 'Alexandra Putri', action: 'Project created', objectType: 'Project' },
      { id: 'led_ai_2', projectId: 'proj_ai_adoption', timestamp: '1 day ago', actor: 'AI Assistant', action: 'Sources screened & categorized', objectType: 'Source' }
    ],
    createdAt: '2025-04-11T09:00:00Z',
    updatedAt: '2025-04-11T16:00:00Z'
  },
  {
    id: 'proj_food_security',
    workspaceId: 'ws_001',
    userId: 'usr_001',
    title: 'Global Food Security Trends',
    summary: 'Assessing the resilience of global wheat and grain supply chains under extreme climate events.',
    state: 'Planning',
    stateStatusText: 'Planning',
    keyInfo: {
      question: 'What are the main supply chain vulnerabilities in global grain export corridors?',
      period: '2020 – 2025',
      geographicScope: 'Global agricultural trade corridors'
    },
    stats: {
      validatedSources: 3,
      dataCollections: 1,
      evidenceGroups: 0,
      analysisComplete: 0
    },
    questionData: {
      objective: 'Identify critical choke points in grain logistics networks.',
      question: 'What are the main supply chain vulnerabilities in global grain export corridors?',
      scope: { geography: 'Global', timePeriod: '2020 - 2025' }
    },
    methodology: {
      status: 'Proposed',
      recommendedMethod: 'Network graph vulnerability analysis and supply disruption simulation.',
      why: 'Models physical port bottlenecks and maritime transit chokepoints.',
      requiredData: ['FAO agricultural export volume', 'Port vessel transit days'],
      sourceRequirements: ['FAOSTAT', 'UN COMTRADE'],
      analysisMethod: 'Spatial network resilience modeling',
      potentialBias: ['Delayed customs clearance data reporting'],
      limitations: ['Weather unpredictability']
    },
    sources: [],
    dataPoints: [],
    evidenceList: [],
    gatekeeperChecks: [],
    insights: [],
    decisionReferences: [],
    ledger: [
      { id: 'led_food_1', projectId: 'proj_food_security', timestamp: '2 days ago', actor: 'Alexandra Putri', action: 'Question entered', objectType: 'Question' }
    ],
    createdAt: '2025-04-10T14:00:00Z',
    updatedAt: '2025-04-10T15:00:00Z'
  },
  {
    id: 'proj_urban_transport',
    workspaceId: 'ws_001',
    userId: 'usr_001',
    title: 'Urban Transportation and Emissions',
    summary: 'Comparative analysis of Bus Rapid Transit (BRT) electrification versus light rail transit for municipal decarbonization.',
    state: 'Finalized',
    stateStatusText: 'Completed',
    keyInfo: {
      question: 'Which transit electrification model delivers highest CO2 reduction per capital dollar?',
      period: '2018 – 2024',
      geographicScope: 'Metropolitan cities (Population > 5M)'
    },
    stats: {
      validatedSources: 18,
      dataCollections: 6,
      evidenceGroups: 4,
      analysisComplete: 3
    },
    questionData: {
      objective: 'Evaluate cost-efficiency of electric bus fleets vs LRT.',
      question: 'Which transit electrification model delivers highest CO2 reduction per capital dollar?',
      scope: { geography: 'Global metropolitan areas', timePeriod: '2018 - 2024' }
    },
    methodology: {
      status: 'Approved',
      recommendedMethod: 'Lifecycle cost-benefit analysis (LCCA) with marginal abatement cost curves (MACC).',
      why: 'Evaluates capital, operational, and environmental impact across 15-year lifecycle.',
      requiredData: ['Fleet acquisition costs', 'Battery replacement schedules', 'Grid carbon intensity'],
      sourceRequirements: ['C40 Cities knowledge hub', 'World Bank Urban Transport'],
      analysisMethod: 'MACC financial simulation',
      potentialBias: ['Local electricity tariff subsidies'],
      limitations: ['Varying topography and route elevation changes'],
      approvedAt: '3 days ago'
    },
    sources: [],
    dataPoints: [],
    evidenceList: [],
    gatekeeperChecks: [],
    insights: [],
    decisionReferences: [],
    ledger: [
      { id: 'led_urban_1', projectId: 'proj_urban_transport', timestamp: '3 days ago', actor: 'Alexandra Putri', action: 'Project finalized and archived', objectType: 'Project' }
    ],
    createdAt: '2025-04-09T11:00:00Z',
    updatedAt: '2025-04-09T17:00:00Z'
  }
];

const LOCAL_STORAGE_KEY = 'RESEARCH_AI_WORKSPACE_DATA_V1';
const SETTINGS_KEY = 'RESEARCH_AI_SETTINGS_V1';

export interface AppSettings {
  geminiApiKey: string;
  theme: 'light' | 'dark' | 'system';
  preferredConnector: 'gemini' | 'openalex' | 'worldbank' | 'mock';
  defaultWorkspaceName: string;
}

export const StorageService = {
  getAllProjects(): Project[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  getProjects(userId?: string): Project[] {
    const all = this.getAllProjects();
    if (userId) {
      return all.filter(p => p.userId === userId);
    }
    return all;
  },

  getProjectById(id: string): Project | undefined {
    const projects = this.getAllProjects();
    return projects.find(p => p.id === id);
  },

  saveProjects(projects: Project[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  },

  saveProject(project: Project) {
    const projects = this.getAllProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.saveProjects(projects);
  },

  addLedgerEntry(projectId: string, entry: { action: string; objectType: string; details?: string; actor?: 'Alexandra Putri' | 'AI Assistant' | 'System' }) {
    const project = this.getProjectById(projectId);
    if (!project) return;
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
                    now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const newEntry = {
      id: 'led_' + Date.now(),
      projectId,
      timestamp: timeStr,
      actor: entry.actor || 'Alexandra Putri',
      action: entry.action,
      objectType: entry.objectType,
      details: entry.details
    };
    
    project.ledger.unshift(newEntry);
    this.saveProject(project);
  },

  getSettings(): AppSettings {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      return {
        geminiApiKey: '',
        theme: 'light',
        preferredConnector: 'gemini',
        defaultWorkspaceName: 'Macroeconomics & Sustainability Lab'
      };
    }
    try {
      return JSON.parse(data);
    } catch {
      return {
        geminiApiKey: '',
        theme: 'light',
        preferredConnector: 'gemini',
        defaultWorkspaceName: 'Macroeconomics & Sustainability Lab'
      };
    }
  },

  saveSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getUser(): User {
    const data = localStorage.getItem('RESEARCH_AI_USER_V1');
    if (!data) {
      localStorage.setItem('RESEARCH_AI_USER_V1', JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_USER;
    }
  },

  saveUser(user: User) {
    localStorage.setItem('RESEARCH_AI_USER_V1', JSON.stringify(user));
  }
};

