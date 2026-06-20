export interface SkillCategory {
  category: string;
  items: string[];
  percentage: number;
}

export const skills: SkillCategory[] = [
  {
    category: "CORE_LANGUAGES",
    items: ["C", "C++", "JavaScript", "TypeScript", "Python", "Java"],
    percentage: 92,
  },
  {
    category: "FRONTEND_MATRIX",
    items: ["React", "React Native", "Next.js", "Vite", "HTML5", "CSS3", "Tailwind"],
    percentage: 90,
  },
  {
    category: "BACKEND_GRID",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSocket"],
    percentage: 85,
  },
  {
    category: "DATABASE_CORE",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis"],
    percentage: 82,
  },
  {
    category: "AI_NEURAL",
    items: ["Machine Learning", "OpenCV", "Computer Vision", "TensorFlow"],
    percentage: 70,
  },
  {
    category: "INFRA_NET",
    items: ["Git", "GitHub", "Docker", "Linux", "Vercel", "AWS Basics"],
    percentage: 75,
  },
];

export const techStack = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "C",
  "C++",
  "Java",
  "PostgreSQL",
  "MongoDB",
  "Docker",
];
