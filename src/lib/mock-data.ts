import type { Client, Threat, ComplianceData, AiInsight, ComplianceEvent } from './types';
import { Eye, ShieldAlert, FileWarning } from 'lucide-react';

export const CLIENTS: Client[] = [
  { id: 1, name: "Acme Corp", risk: 85, threats: 3, compliance: 92, status: "critical", assets: 142, industry: "Finance" },
  { id: 2, name: "TechStart Inc.", risk: 72, threats: 5, compliance: 88, status: "at-risk", assets: 210, industry: "Technology" },
  { id: 3, name: "HealthWell", risk: 45, threats: 1, compliance: 99, status: "healthy", assets: 85, industry: "Healthcare" },
  { id: 4, name: "RetailGiant", risk: 65, threats: 2, compliance: 91, status: "at-risk", assets: 540, industry: "E-commerce" },
  { id: 5, name: "Innovate LLC", risk: 20, threats: 0, compliance: 97, status: "healthy", assets: 50, industry: "Consulting" },
  { id: 6, name: "Logistics Pro", risk: 78, threats: 4, compliance: 85, status: "at-risk", assets: 320, industry: "Logistics" },
  { id: 7, name: "EduCare", risk: 33, threats: 1, compliance: 95, status: "healthy", assets: 120, industry: "Education" },
  { id: 8, name: "Global Mags", risk: 91, threats: 8, compliance: 78, status: "critical", assets: 450, industry: "Manufacturing" },
  { id: 9, name: "FinSecure", risk: 55, threats: 2, compliance: 94, status: "at-risk", assets: 180, industry: "Finance" },
  { id: 10, name: "NextGen Media", risk: 15, threats: 0, compliance: 99, status: "healthy", assets: 75, industry: "Media" },
];

// Generate more clients to reach 47
for (let i = 11; i <= 47; i++) {
  const risk = Math.floor(Math.random() * 100);
  let status: 'critical' | 'at-risk' | 'healthy';
  if (risk > 80) status = 'critical';
  else if (risk > 50) status = 'at-risk';
  else status = 'healthy';

  CLIENTS.push({
    id: i,
    name: `Client #${i}`,
    risk,
    threats: Math.floor(Math.random() * 6),
    compliance: 75 + Math.floor(Math.random() * 25),
    status,
    assets: 50 + Math.floor(Math.random() * 400),
    industry: "Various",
  });
}


export const THREATS: Threat[] = [
  { id: 1, client: "Acme Corp", type: "Unusual API Activity", severity: "critical", source: "GuardDuty", status: "active", time: "2 min ago", description: "Anomalous usage of high-privilege APIs detected from an unknown IP address.", details: { ip: "203.0.113.42", user: "admin_user", api: "CreateUser" } },
  { id: 2, client: "TechStart Inc.", type: "Potential Ransomware", severity: "high", source: "Security Hub", status: "isolating", time: "15 min ago", description: "Multiple files being encrypted in a short period on a key server.", details: { server: "FILESRV01", files_affected: 2341 } },
  { id: 3, client: "Global Mags", type: "Malware Detected", severity: "high", source: "GuardDuty", status: "active", time: "22 min ago", description: "Trojan.GenericKDZ.31 detected on an endpoint.", details: { endpoint: "WS-MFG-102", malware_signature: "Trojan.GenericKDZ.31" } },
  { id: 4, client: "RetailGiant", type: "Suspicious Login", severity: "medium", source: "CloudTrail", status: "monitoring", time: "45 min ago", description: "Multiple failed login attempts followed by a successful login from a new location.", details: { user: "ecom_manager", location: "Unknown" } },
  { id: 5, client: "Logistics Pro", type: "Data Exfiltration", severity: "critical", source: "GuardDuty", status: "blocked", time: "1 hour ago", description: "Large volume of data being transferred to an external, non-corporate domain.", details: { domain: "suspicious-data-dump.net", volume: "1.2 GB" } },
  { id: 6, client: "Acme Corp", type: "EC2 Instance Communication with Known Malicious IP", severity: "high", source: "GuardDuty", status: "active", time: "2 hours ago", description: "EC2 instance is communicating with a remote host on a custom port that is associated with malicious activity.", details: { instanceId: "i-0123456789abcdef0", maliciousIp: "198.51.100.10" } },
  { id: 7, client: "TechStart Inc.", type: "Publicly Accessible S3 Bucket", severity: "medium", source: "Security Hub", status: "monitoring", time: "3 hours ago", description: "An S3 bucket policy allows public read access.", details: { bucketName: "techstart-public-assets" } },
  { id: 8, client: "HealthWell", type: "IAM Policy Misconfiguration", severity: "medium", source: "CloudTrail", status: "active", time: "5 hours ago", description: "An IAM policy was updated with overly permissive privileges (*:*).", details: { policyName: "developer-access-policy", updatedBy: "dev-user" } },
];

export const COMPLIANCE_DATA: ComplianceData[] = [
  { framework: "HIPAA", status: 98, violations: 2, lastAudit: "2 days ago" },
  { framework: "SOX", status: 92, violations: 5, lastAudit: "1 week ago" },
  { framework: "GDPR", status: 88, violations: 8, lastAudit: "3 days ago" },
  { framework: "PCI-DSS", status: 95, violations: 3, lastAudit: "Yesterday" },
];

export const AI_INSIGHTS: AiInsight[] = [
  { id: 'insight-1', type: "prediction", message: "Acme Corp is 78% likely to be targeted by a phishing campaign this week based on industry trends.", severity: "high", action: "Enable enhanced monitoring", icon: ShieldAlert },
  { id: 'insight-2', type: "anomaly", message: "Unusual login pattern detected across 3 clients in the Finance sector. Recommend immediate credential rotation.", severity: "medium", action: "Initiate rotation", icon: Eye },
  { id: 'insight-3', type: "recommendation", message: "TechStart Inc. has 12 unpatched critical vulnerabilities. Automated patching is recommended.", severity: "high", action: "Deploy patches", icon: FileWarning },
];

export const COMPLIANCE_EVENTS: ComplianceEvent[] = [
  { id: 'event-1', severity: 'medium', description: 'PCI-DSS Rule 3.4 - PAN is not rendered unreadable.', timestamp: '2 hours ago', framework: 'PCI-DSS' },
  { id: 'event-2', severity: 'low', description: 'HIPAA - Access logs for patient data not reviewed in 90 days.', timestamp: '1 day ago', framework: 'HIPAA' },
  { id: 'event-3', severity: 'high', description: 'GDPR - Data processing agreement missing for a new sub-processor.', timestamp: '3 days ago', framework: 'GDPR' },
  { id: 'event-4', severity: 'low', description: 'SOX - Password complexity policy not enforced for 2 new users.', timestamp: '5 days ago', framework: 'SOX' },
];
