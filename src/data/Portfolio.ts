export const PROFILE = {
  name: "Jayoda Pramuditha",
  role: "Full-Stack Developer · Cloud & DevOps Engineer · AI/LLM Integration",
  tagline:
    "Computer Science undergraduate building full-stack web & mobile apps, cloud infrastructure, and AI/LLM-powered products — from Flutter apps to production-style admin dashboards.",
  mission: "Building Scalable Applications, Cloud Infrastructure & AI-Powered Products",
  location: "Galle, Sri Lanka",
  email: "jayodakudagamage13@gmail.com",
  phone: "+94 750 509 482",
  github: "https://github.com/Jayo013",
  linkedin: "https://www.linkedin.com/in/jayoda-pramuditha-a674a4290/",
  medium: "https://medium.com/@pramudithakudagamage13",
  resumeUrl: "/resume.pdf",
};

type ProjectLink = {
  github?: string;
  live?: string;
};

export type Project = {
  title: string;
  role?: string;
  blurb: string;
  tech: string[];
  links: ProjectLink;
  /** Path under /public (e.g. "/projects/spendwise.png"). Falls back to a placeholder if unset. */
  image?: string;
  /** Mission status shown on the project card. Defaults to "COMPLETED" when unset. */
  status?: "COMPLETED" | "IN PROGRESS";
};

export const PROJECTS: Project[] = [
  {
    title: "SpendWise — AI-Powered Personal Finance Platform",
    role: "Team Lead, Team of 5 — University of Ruhuna Final Year Project",
    blurb:
      "Three-part full-stack platform (Flutter app, Node.js/Express API, React admin dashboard). Features a Claude AI financial assistant that turns transactions into natural-language spending summaries and budget recommendations, plus receipt scanning and SMS-based expense capture feeding a TensorFlow Lite predictive model.",
    tech: ["Flutter", "Node.js", "Express", "React", "Firebase", "TensorFlow Lite", "Claude AI"],
    links: {},
    image: "/projects/spendwise.png",
  },
  {
    title: "MindCare AI — Privacy-First Mental Wellness Platform",
    blurb:
      "Anonymous, AI-powered emotional support platform using the OpenAI API for context-aware responses, with zero PII collection by design and a three-tier real-time risk-detection engine for crisis-aware guidance.",
    tech: ["React", "Tailwind CSS", "Firebase", "OpenAI API"],
    links: { github: "https://github.com/Jayo013/MindCare-AI" },
    image: "/projects/mindcare-ai.png",
  },
  {
    title: "SummarAIze — AI Note Summarizer",
    blurb:
      "Full-stack summarization tool integrating Google Gemini and OpenAI GPT-4o-mini side by side, secured with Auth0 + JWT (JOSE), with per-user history in AWS DynamoDB and PDF/TXT export.",
    tech: ["Next.js", "Express", "TypeScript", "Auth0", "AWS DynamoDB", "Google Gemini", "OpenAI"],
    links: { github: "https://github.com/Jayo013/SummarAIze" },
    image: "/projects/summaraize.png",
  },
  {
    title: "AuthCraft — Secure Authentication System",
    blurb:
      "A secure, easy-to-integrate authentication system for web applications, with password hashing, JWT/session-based login, protected routes, and token refresh & logout support — built with modern security best practices.",
    tech: ["Node.js", "Express.js", "JWT", "bcrypt", "MongoDB"],
    links: { github: "https://github.com/Jayo013/AuthCraft" },
    image: "/projects/authcraft.png",
  },
  {
    title: "Sentiment Analysis on Customer Reviews",
    blurb:
      "Logistic regression model classifying customer reviews as positive or negative, using NLTK for text preprocessing, deployed as a live REST endpoint via Flask on Azure Web Services.",
    tech: ["Python", "Scikit-learn", "NLTK", "Flask"],
    links: { github: "https://github.com/Jayo013/sentiment_analysis_project" },
    image: "/projects/sentiment-analysis.png",
  },
  {
    title: "Personal Portfolio",
    blurb:
      "This site — a component-based, responsive portfolio built to showcase projects, skills, and experience.",
    tech: ["React", "TypeScript", "Next.js"],
    links: { github: "https://github.com/Jayo013/my-portfolio" },
    image: "/projects/portfolio.png",
    status: "IN PROGRESS",
  },

];

type TimelineEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    id: "spendwise-lead",
    company: "SpendWise — Final Year Project, University of Ruhuna",
    role: "Team Lead, Team of 5",
    period: "2025 — 2026",
    points: [
      "Led a team of 5 across a three-part full-stack platform: a Flutter mobile app, a Node.js/Express REST API, and a React admin dashboard.",
      "Engineered an AI financial assistant on Claude AI via iterative prompt engineering for spending summaries, budget recommendations, and conversational Q&A.",
      "Integrated Firebase Auth, Firestore, Cloud Messaging, and SendGrid to unify auth, real-time sync, and notifications across mobile, web, and admin surfaces.",
    ],
  },
];

type EducationEntry = {
  id: string;
  institution: string;
  credential: string;
  period: string;
  details: string[];
};

export const EDUCATION: EducationEntry[] = [
  {
    id: "bsc-ruhuna",
    institution: "University of Ruhuna",
    credential: "BSc in Physical Science — Computer Science, Mathematics & Applied Mathematics",
    period: "2023 — Present",
    details: [],
  },
  {
    id: "nibm-diploma",
    institution: "National Institute of Business Management (NIBM)",
    credential: "Diploma in Software Engineering",
    period: "2022 — 2023",
    details: ["Relevant coursework: C, C#, Java, JavaScript, HTML, React.js, MSSQL, IntelliJ, Supabase."],
  },
  {
    id: "al-vidyaloka",
    institution: "Vidyaloka College, Galle",
    credential: "G.C.E. Advanced Level — Physical Science Stream",
    period: "2019 — 2021",
    details: [],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  category: "professional" | "participation";
  /** Path under /public to an image proof (png/jpg). */
  image?: string;
  /** Path under /public to a PDF proof. */
  file?: string;
};

export const CERTIFICATIONS: Certification[] = [
  // Professional certifications
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional",
    issuer: "Oracle",
    year: "2025",
    category: "professional",
    image: "/certifications/oracle-multicloud-architect-professional.png",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    category: "professional",
    image: "/certifications/oracle-foundations-associate.png",
  },
  { name: "Postman API Fundamentals — Student Expert", issuer: "Postman", category: "professional" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", category: "professional" },
  { name: "Java, SQL, and Problem Solving", issuer: "HackerRank", category: "professional" },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    category: "professional",
    file: "/certifications/java-basic.pdf",
  },
  {
    name: "SQL (Basic)",
    issuer: "HackerRank",
    category: "professional",
    file: "/certifications/sql-basic.pdf",
  },
  {
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    category: "professional",
    file: "/certifications/sql-intermediate.pdf",
  },
  { name: "Python", issuer: "CODL, University of Moratuwa", category: "professional" },
  {
    name: "Docker — Level 1",
    issuer: "KodeKloud",
    category: "professional",
    image: "/certifications/docker-level-1.png",
  },
  {
    name: "Kubernetes — Level 1",
    issuer: "KodeKloud",
    category: "professional",
    image: "/certifications/kubernetes-level-1.png",
  },
  {
    name: "FinOps",
    issuer: "FinOps Foundation",
    category: "professional",
    file: "/certifications/finops.pdf",
  },

  // Hackathons & participation
  {
    name: "Road to RushCoder 3.0 Hackathon — Certificate of Participation",
    issuer: "University of Ruhuna, Dept. of Computer Science",
    year: "2025",
    category: "participation",
    image: "/certifications/rushcoder-3.0-hackathon.jpg",
  },
  {
    name: "INSURGEX 1.0 Hackathon — Certificate of Participation",
    issuer: "University of Ruhuna, Dept. of Computer Science",
    year: "2024",
    category: "participation",
    file: "/certifications/insurgex-1.0-hackathon.pdf",
  },
  {
    name: "Coderellay Hackathon — Certificate of Participation",
    issuer: "Coderellay",
    category: "participation",
    image: "/certifications/coderellay-hackathon.jpg",
  },
  {
    name: "MoraXtreme 10.0 — Certificate of Participation",
    issuer: "University of Moratuwa",
    category: "participation",
    file: "/certifications/moraxtreme-10.0.pdf",
  },
  {
    name: "J'puraXtreme 2.0 — Certificate of Participation",
    issuer: "University of Sri Jayewardenepura",
    category: "participation",
    file: "/certifications/jpuraxtreme.pdf",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "1st Runner-Up — Road to Rushcoder 3.0 Hackathon",
    org: "Team Byte_Builders · University of Ruhuna, Dept. of Computer Science",
    period: "Jan 2025",
    blurb: "Placed 1st runner-up among 50+ competing teams in a 2-hour competitive coding hackathon.",
  },
  {
    title: "Google Cloud Skills Boost Arcade — Program Completion",
    org: "Google Cloud",
    period: "2025",
    blurb: "Completed 355+ hands-on labs and real-world challenges across Google Cloud technologies.",
  },
];
