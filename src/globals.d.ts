declare const GEMINI_API_KEY: string;

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  operationType: string;
  size: string;
  employees: number;
  hasAudits: boolean;
  environmentalIssues: string;
  esgMaturity: 'Low' | 'Medium' | 'High';
  score: 'Alto' | 'Médio' | 'Baixo';
  diagnostic?: string;
  timestamp: number;
  history: {role: 'user' | 'model', text: string}[];
}
