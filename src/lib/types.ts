export type Client = {
  id: number;
  name: string;
  risk: number;
  threats: number;
  compliance: number;
  status: 'critical' | 'at-risk' | 'healthy';
  assets: number;
  industry: string;
};

export type Threat = {
  id: number;
  client: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: 'GuardDuty' | 'Security Hub' | 'CloudTrail';
  status: 'active' | 'isolating' | 'blocked' | 'monitoring';
  time: string;
  description: string;
  details: Record<string, any>;
};

export type ComplianceData = {
  framework: 'HIPAA' | 'SOX' | 'GDPR' | 'PCI-DSS';
  status: number;
  violations: number;
  lastAudit: string;
};

export type AiInsight = {
  id: string;
  type: 'prediction' | 'recommendation' | 'anomaly';
  message: string;
  severity: 'high' | 'medium' | 'low';
  action?: string;
  icon: React.ElementType;
};

export type ComplianceEvent = {
  id: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  framework: 'HIPAA' | 'SOX' | 'GDPR' | 'PCI-DSS';
};
