export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: "PRODUCTION" | "LIVE" | "BETA";
  githubUrl: string;
  liveUrl?: string;
  category: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "lima",
    title: "LIMA — Lightweight In-Memory Archive",
    shortTitle: "LIMA",
    description:
      "A POSIX-like Virtual File System written in C with an integrated text editor using Gap Buffer for O(1) insertions.",
    longDescription:
      "LIMA is a high-performance, POSIX-like Virtual File System (VFS) written in C. It provides an interactive shell for managing a simulated, single-root file hierarchy entirely in memory, featuring a built-in text editor, clipboard management, and multi-level undo/redo support.",
    tech: ["C", "Make", "POSIX", "Gap Buffer", "N-ary Trees"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/LIMA",
    category: "Systems Programming",
    highlights: [
      "Interactive REPL with path completion",
      "Built-in text editor with Gap Buffer",
      "Copy/Cut/Paste across VFS",
      "Session persistence via binary serialization",
    ],
  },
  {
    id: "nitoll-waat",
    title: "Nitoll Waat — Smart Waste Management",
    shortTitle: "NITOLL WAAT",
    description:
      "End-to-end IoT-powered waste management with real-time sensor data, optimized route planning, and multi-platform dashboards.",
    longDescription:
      "An end-to-end IoT-powered waste management solution utilizing real-time sensor data from Smart Bins. The system enables municipal authorities to monitor fill levels, weight, and bin status, facilitating efficient route planning for collection vehicles.",
    tech: [
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "PostgreSQL",
      "ESP8266",
      "Kotlin",
    ],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/Nitoll_Waat",
    category: "IoT / Full Stack",
    highlights: [
      "ESP8266 sensor firmware (C++)",
      "React Admin Dashboard + Public Portal",
      "Native Android Driver App",
      "Real-time WebSocket communication",
    ],
  },
  {
    id: "filmvault",
    title: "FilmVault — Movie Discovery Platform",
    shortTitle: "FILMVAULT",
    description:
      "A dynamic movie discovery web app with real-time TMDB API search, favorites collection, and responsive grid UI.",
    longDescription:
      "A dynamic movie discovery web application built with React and Vite. Browse popular releases, search for specific titles using real-time API data, and curate a personal list of favorite movies with localStorage persistence.",
    tech: ["React 19", "Vite", "TMDB API", "React Router", "CSS3"],
    status: "LIVE",
    githubUrl:
      "https://github.com/ShreyashV38/FilmVault_A_personal_movie_discovery_and_favorites_catalog",
    liveUrl: "https://film-vault-a-personal-movie-discove.vercel.app/",
    category: "Frontend",
    highlights: [
      "Real-time movie search via TMDB API",
      "Favorites with localStorage persistence",
      "Mobile-first responsive design",
      "Deployed on Vercel",
    ],
  },
  {
    id: "devnagri-ocr",
    title: "Devnagri-OCR — Hindi Script Recognition",
    shortTitle: "DEVNAGRI OCR",
    description:
      "A Devanagari script OCR system built with Python and machine learning for recognizing Hindi characters from images.",
    longDescription:
      "A computer vision project that recognizes Devanagari (Hindi) script from images using machine learning techniques. The system processes input images, segments characters, and classifies them using trained models.",
    tech: ["Python", "OpenCV", "NumPy", "Machine Learning", "CNN"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/Devnagri-OCR",
    category: "AI / Computer Vision",
    highlights: [
      "Image preprocessing pipeline",
      "Character segmentation",
      "CNN-based classification",
      "Flask backend API",
    ],
  },
  {
    id: "bloodbank",
    title: "BloodBank — Donation Management System",
    shortTitle: "BLOODBANK",
    description:
      "Full-stack blood bank platform with donor registration, request matching, payment integration, and CSRF protection.",
    longDescription:
      "A comprehensive blood bank management system that connects blood donors with recipients. Features donor registration, blood request matching, payment processing for logistics, and secure authentication with CSRF protection.",
    tech: ["Node.js", "Express", "EJS", "MongoDB", "JWT", "Razorpay"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/BloodBank",
    category: "Full Stack",
    highlights: [
      "Donor-recipient matching algorithm",
      "Payment gateway integration",
      "CSRF + OTP authentication",
      "Real-time inventory tracking",
    ],
  },
  {
    id: "doctor-web",
    title: "Doctor-Web — Healthcare Platform",
    shortTitle: "DOCTOR WEB",
    description:
      "TypeScript healthcare web application connecting patients with doctors, featuring appointment scheduling and medical records.",
    longDescription:
      "A healthcare web application built with TypeScript that facilitates patient-doctor interactions. Includes features for appointment scheduling, medical record management, and prescription tracking.",
    tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
    status: "BETA",
    githubUrl: "https://github.com/ShreyashV38/Doctor-Web",
    category: "Healthcare / Full Stack",
    highlights: [
      "Patient-doctor appointment system",
      "Medical record management",
      "Prescription tracking",
      "Role-based access control",
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Management System",
    shortTitle: "REAL ESTATE",
    description: "Console-based real estate management application in Java demonstrating core OOP principles.",
    longDescription: "Developed a console-based real estate management application in Java, applying core OOP principles (inheritance, encapsulation, polymorphism) to model property listings, client profiles, and transaction records. Implemented structured search and filter logic and documented the codebase with Javadoc.",
    tech: ["Java", "OOP", "Javadoc"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/Real_Estate_Management_System",
    category: "Software Engineering",
    highlights: [
      "Core OOP principles",
      "Property listing and client modeling",
      "Structured search and filter logic",
      "Full Javadoc annotations"
    ]
  },
  {
    id: "traffic-control",
    title: "Traffic Control Management System",
    shortTitle: "TRAFFIC CONTROL",
    description: "Multi-lane traffic signal simulation in Java modeling adaptive signal timing.",
    longDescription: "Built a multi-lane traffic signal simulation in Java modeling adaptive signal timing across intersections using object-oriented design patterns and a priority-queue algorithm for emergency-vehicle preemption.",
    tech: ["Java", "OOP", "Priority Queue", "Simulation"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38/Traffic_Control_Management_System",
    category: "Simulation / Algorithms",
    highlights: [
      "Adaptive signal timing simulation",
      "Priority-queue algorithm for preemption",
      "Object-oriented design patterns",
      "Real-world constraints modeling"
    ]
  },
  {
    id: "schoolway",
    title: "Schoolway — School Bus Tracking App",
    shortTitle: "SCHOOLWAY",
    description: "Real-time GPS-based bus tracking app for school children, giving parents and schools live location updates for student safety.",
    longDescription: "A real-time bus tracking application built during B.Sc. final year. Parents and school administrators can track school bus locations live on a map. Designed for student safety with notifications, route history, and ETA estimates.",
    tech: ["React Native", "Node.js", "Express", "GPS", "Real-time"],
    status: "PRODUCTION",
    githubUrl: "https://github.com/ShreyashV38",
    category: "Mobile / Full Stack",
    highlights: [
      "Real-time GPS bus tracking",
      "Parent & admin dashboards",
      "Route history and ETA",
      "Push notification alerts"
    ]
  },
  {
    id: "college-email-notifier",
    title: "College Email Notifier — Google Apps Script",
    shortTitle: "EMAIL NOTIFIER",
    description: "A Google Apps Script automation to stay updated about important emails from college, filtering and forwarding academic updates.",
    longDescription: "Built a Google Apps Script that monitors incoming emails from college domains, filters for important academic updates like exam schedules, results, and announcements, and sends automated notifications to stay on top of everything.",
    tech: ["Google Apps Script", "JavaScript", "Gmail API"],
    status: "LIVE",
    githubUrl: "https://github.com/ShreyashV38",
    category: "Automation",
    highlights: [
      "Automated email filtering",
      "College domain monitoring",
      "Custom notification triggers",
      "Zero-maintenance automation"
    ]
  },
  {
    id: "cyberpunk-portfolio",
    title: "Cyberpunk Developer Portfolio",
    shortTitle: "PORTFOLIO",
    description: "A highly interactive, cyberpunk-themed personal portfolio built with React, Vite, and Tailwind CSS.",
    longDescription: "A full-stack, visually immersive portfolio website featuring custom cyberpunk aesthetics, dynamic animations, and interactive elements. Includes a fully functional contact form powered by Resend and a database-backed peer review system using tRPC.",
    tech: ["React", "TypeScript", "Tailwind CSS", "tRPC", "Resend"],
    status: "LIVE",
    githubUrl: "https://github.com/ShreyashV38/shreyashhh.github.io",
    liveUrl: "https://shreyashh.me",
    category: "Full Stack / Frontend",
    highlights: [
      "Custom cyberpunk UI with dynamic neon effects",
      "Interactive timeline and project showcase",
      "Live peer review system with database integration",
      "Functional email contact form via Resend API"
    ]
  }
];
