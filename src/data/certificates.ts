export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  image?: string; // path to certificate image in /certificates/ folder
}

export const certificates: Certificate[] = [
  {
    id: "ibm-cybersecurity",
    title: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "09 Jun 2026",
    credentialId: "PLAN-805005E992EA",
    description: "Earned a credential for the completion of Cybersecurity Fundamentals.",
    image: "/certificates/IBM_CyberSecurity.png"
  },
  {
    id: "anthropic-mcp",
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "2026",
    description: "Completed advanced topics on the Model Context Protocol.",
    image: "/certificates/Claude_MCP.png"
  }
];
