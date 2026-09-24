export type ResearchState = 
  | 'Planning' 
  | 'Searching' 
  | 'Screening' 
  | 'Validating' 
  | 'Extracting' 
  | 'Analyzing' 
  | 'Synthesizing' 
  | 'Review' 
  | 'Finalized';

export type ClaimStatus = 
  | 'SUPPORTED' 
  | 'LIMITED EVIDENCE' 
  | 'CONFLICTING EVIDENCE' 
  | 'INSUFFICIENT EVIDENCE' 
  | 'UNSUPPORTED CLAIM';

export type SourceStatus = 'Validated' | 'Questionable' | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface ResearchQuestion {
  objective: string;
  question: string;
  scope: {
    population?: string;
    geography?: string;
    timePeriod?: string;
    availableData?: string;
    intendedDecision?: string;
  };
}

export interface MethodologyProposal {
  status: 'Proposed' | 'Approved' | 'Modified' | 'Rejected';
  recommendedMethod: string;
  why: string;
  requiredData: string[];
  sourceRequirements: string[];
  analysisMethod: string;
  potentialBias: string[];
  limitations: string[];
  alternativeMethod?: string;
  approvedAt?: string;
}

export interface Source {
  id: string;
  projectId: string;
  name: string;
  provider: string; // 'IEA', 'World Bank', 'Google Scholar', 'Reuters', 'Bloomberg', 'Custom API'
  type: 'Dataset' | 'Database' | 'Academic' | 'News' | 'Government' | 'Web Search' | 'API' | 'CSV';
  url: string;
  authority: 'High' | 'Medium' | 'Low';
  relevance: string;
  recency: string;
  geographicScope?: string;
  populationScope?: string;
  knownBias?: string;
  validationStatus: SourceStatus;
  validationReason: string;
  lastChecked: string;
  rawExcerpt?: string;
}

export interface DataPoint {
  id: string;
  projectId: string;
  sourceId: string;
  extractedFact: string;
  metricName: string;
  value: string | number;
  year?: string | number;
  country?: string;
  unit?: string;
  isImmutable: boolean;
  timestamp: string;
}

export interface EvidenceNode {
  id: string;
  projectId: string;
  claim: string;
  status: ClaimStatus;
  analysisSummary: string;
  analysisMethod: string;
  dataSummary: string;
  sourceNames: string[];
  supportingDataIds: string[];
  contradictoryDataIds?: string[];
  confidenceLevel: 'High' | 'Moderate' | 'Low';
}

export interface GatekeeperCheck {
  id: string;
  name: string;
  gateNumber: number;
  passed: boolean;
  details: string;
  notes: string;
}

export interface Insight {
  id: string;
  projectId: string;
  title: string;
  statement: string;
  claimStatus: ClaimStatus;
  provenanceChain: {
    claim: string;
    analysis: string;
    evidence: string;
    data: string;
    source: string;
  };
  recommendation: string;
  createdAt: string;
}

export interface DecisionReference {
  id: string;
  projectId: string;
  insightId: string;
  decisionTitle: string;
  strategicRationale: string;
  evidenceBacking: ClaimStatus;
  humanDecisionRecorded?: string;
  decisionStatus: 'Pending Review' | 'Approved' | 'Deferred' | 'Actioned';
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  projectId: string;
  timestamp: string;
  actor: 'Alexandra Putri' | 'AI Assistant' | 'System';
  action: string;
  objectType: string;
  details?: string;
  badge?: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  userId: string;
  title: string;
  summary: string;
  state: ResearchState;
  stateStatusText?: string;
  keyInfo: {
    question: string;
    period: string;
    geographicScope: string;
  };
  stats: {
    validatedSources: number;
    dataCollections: number;
    evidenceGroups: number;
    analysisComplete: number;
  };
  questionData: ResearchQuestion;
  methodology: MethodologyProposal;
  sources: Source[];
  dataPoints: DataPoint[];
  evidenceList: EvidenceNode[];
  gatekeeperChecks: GatekeeperCheck[];
  insights: Insight[];
  decisionReferences: DecisionReference[];
  ledger: LedgerEntry[];
  createdAt: string;
  updatedAt: string;
}
