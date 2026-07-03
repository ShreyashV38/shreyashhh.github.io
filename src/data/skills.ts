export interface SkillCategory {
  category: string;
  items: string[];
  percentage: number;
}

export const skills: SkillCategory[] = [
  {
    category: "CORE_LANGUAGES",
    items: ["C", "C++", "JavaScript", "TypeScript", "Python", "Java"],
    percentage: 65,
  },
  {
    category: "FRONTEND_MATRIX",
    items: ["React", "React Native", "Next.js", "Vite", "HTML5", "CSS3", "Tailwind"],
    percentage: 70,
  },
  {
    category: "BACKEND_GRID",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSocket"],
    percentage: 55,
  },
  {
    category: "DATABASE_CORE",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis"],
    percentage: 50,
  },
  {
    category: "AI_NEURAL",
    items: ["Machine Learning", "OpenCV", "Computer Vision", "TensorFlow"],
    percentage: 40,
  },
  {
    category: "INFRA_NET",
    items: ["Git", "GitHub", "Docker", "Linux", "Vercel", "AWS Basics"],
    percentage: 45,
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
