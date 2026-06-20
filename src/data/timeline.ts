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
    year: "2025",
    title: "Final Year & Portfolio Launch",
    organization: "Independent / Freelance",
    description:
      "Final year of Computer Engineering. Actively accepting contracts, building this portfolio, and contributing to open-source. Exploring advanced DSA and Prisma ORM for upcoming production systems.",
    type: "work",
    tags: ["React", "TypeScript", "tRPC", "Portfolio"],
  },
  {
    year: "2024",
    title: "Nitoll Waat — IoT Waste Management",
    organization: "Hackathon / Production",
    description:
      "Built an end-to-end IoT-powered waste management platform with ESP8266 sensors, React dashboard, Kotlin Android app, and real-time WebSocket communication. Deployed to production for municipal use.",
    type: "project",
    tags: ["TypeScript", "React", "ESP8266", "PostgreSQL", "Kotlin"],
  },
  {
    year: "2024",
    title: "Doctor Web & FilmVault",
    organization: "Personal Projects",
    description:
      "Developed a healthcare platform connecting patients with doctors (TypeScript, React, MongoDB) and a movie discovery app with TMDB API integration, live search, and localStorage persistence.",
    type: "project",
    tags: ["React", "TypeScript", "MongoDB", "TMDB API", "Vercel"],
  },
  {
    year: "2023",
    title: "Full Stack Freelance Developer",
    organization: "Freelance",
    description:
      "Started taking on freelance full-stack projects. Built client applications with React, Node.js, and PostgreSQL. Expanded skills into mobile development with React Native.",
    type: "work",
    tags: ["React", "Node.js", "PostgreSQL", "Freelance"],
  },
  {
    year: "2023",
    title: "Devnagri OCR & BloodBank",
    organization: "Academic / Personal",
    description:
      "Created a Devanagari script recognition system using CNN and OpenCV. Built a full-stack blood bank platform with donor-recipient matching, Razorpay integration, and CSRF protection.",
    type: "project",
    tags: ["Python", "OpenCV", "CNN", "Node.js", "MongoDB"],
  },
  {
    year: "2022",
    title: "LIMA — Virtual File System",
    organization: "Systems Programming",
    description:
      "Designed and built a POSIX-like Virtual File System in C with an interactive REPL, built-in text editor using Gap Buffer for O(1) insertions, clipboard management, and binary serialization.",
    type: "project",
    tags: ["C", "POSIX", "Gap Buffer", "N-ary Trees"],
  },
  {
    year: "2021",
    title: "B.E. Computer Engineering",
    organization: "Goa College of Engineering",
    description:
      "Began undergraduate studies in Computer Engineering. Foundations in data structures, algorithms, operating systems, database systems, and computer networks.",
    type: "education",
    tags: ["DSA", "OS", "DBMS", "Networks"],
  },
];
