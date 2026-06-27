export interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work" | "project";
  tags: string[];
}

export const timelineData: TimelineEntry[] = [
  {
    year: "2022",
    title: "B.Sc. Computer Science — Started",
    organization: "St. Xavier's College, Mapusa, Goa University",
    description:
      "Began undergraduate studies in Computer Science. Built foundations in data structures, algorithms, operating systems, database systems, and computer networks.",
    type: "education",
    tags: ["DSA", "OS", "DBMS", "Networks"],
  },
  {
    year: "2024",
    title: "Schoolway — School Bus Tracking App",
    organization: "B.Sc. Final Year Project",
    description:
      "Built a real-time bus tracking application for school children during B.Sc. final year. Parents and schools can track bus locations live for student safety.",
    type: "project",
    tags: ["React Native", "Node.js", "GPS", "Real-time"],
  },
  {
    year: "2025",
    title: "B.Sc. Computer Science — Graduated",
    organization: "St. Xavier's College, Mapusa, Goa University",
    description:
      "Completed undergraduate degree in Computer Science with a CGPA of 9.16/10. Transitioned into post-graduate studies.",
    type: "education",
    tags: ["CGPA 9.16", "Graduated"],
  },
  {
    year: "2025",
    title: "Master of Computer Applications (MCA)",
    organization: "Goa Business School, Goa University",
    description:
      "Joined MCA program. Key electives: Advanced Data Structures, Software Engineering, Database Management, Computer Networks. Current CGPA: 8.2/10.",
    type: "education",
    tags: ["Advanced DSA", "Software Engineering", "DBMS"],
  },
  {
    year: "2025",
    title: "FilmVault — Movie Discovery Platform",
    organization: "Personal / Learning",
    description:
      "Built a movie discovery web app as a beginner-level project to deeply understand how APIs work. Integrated TMDB API for real-time search, favorites with localStorage, deployed on Vercel.",
    type: "project",
    tags: ["React", "Vite", "TMDB API", "Vercel"],
  },
  {
    year: "2025",
    title: "Doctor-Web — Hackathon Healthcare Platform",
    organization: "Hackathon / Team Project",
    description:
      "Worked as the Full Stack Developer on a hackathon team, responsible for the Doctor-Web module — a healthcare platform connecting patients with doctors, featuring appointment scheduling and medical records.",
    type: "project",
    tags: ["TypeScript", "React", "Node.js", "MongoDB"],
  },
  {
    year: "2025",
    title: "Nitoll Waat — IoT Waste Management",
    organization: "Hackathon / Production",
    description:
      "Joined another hackathon and built an end-to-end IoT-powered waste management platform with ESP8266 sensors, React dashboard, Kotlin Android app, and real-time WebSocket communication.",
    type: "project",
    tags: ["TypeScript", "React", "ESP8266", "PostgreSQL", "Kotlin"],
  },
  {
    year: "2025",
    title: "LIMA — Terminal Text Editor Engine",
    organization: "Systems Programming",
    description:
      "Built the raw-mode terminal text editor for LIMA's Virtual File System. Integrated Gap Buffer for O(1) insertions, programmed keystroke handling for character insertion, backspace retraction, arrow-key gap shifting, and file write-back on Escape.",
    type: "project",
    tags: ["C", "Gap Buffer", "Raw Terminal", "POSIX"],
  },
  {
    year: "2026",
    title: "Devnagri-OCR — Hindi Script Recognition",
    organization: "AI / Computer Vision",
    description:
      "Built a Devanagari script OCR system using CNN and OpenCV for recognizing Hindi characters from images. Full image preprocessing pipeline with character segmentation and Flask backend.",
    type: "project",
    tags: ["Python", "OpenCV", "CNN", "Flask"],
  },
  {
    year: "2026",
    title: "Portfolio & Google Apps Script",
    organization: "Personal / Automation",
    description:
      "Launched this cyberpunk-themed portfolio. Also built a Google Apps Script to stay automatically updated about emails from college — automating notifications and filtering for important academic updates.",
    type: "project",
    tags: ["React", "TypeScript", "Google Apps Script"],
  },
  {
    year: "2026",
    title: "MCA Final Year — Ongoing",
    organization: "Goa Business School, Goa University",
    description:
      "Currently in MCA final year. Actively building production systems, taking on contracts, and contributing to open-source. Exploring Kubernetes, advanced system design, and cloud-native architectures.",
    type: "education",
    tags: ["MCA", "Final Year", "System Design"],
  },
];
