import { jsPDF } from "jspdf";
import type { Language } from "../types";

interface ResumeData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    github: string;
    linkedin: string;
  };
  profile: string;
  skills: {
    backend: string[];
    frontend: string[];
    bestPractices: string[];
  };
  experience: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    impact: string;
    link?: string;
  }>;
}

const resumeData: Record<Language, ResumeData> = {
  en: {
    name: "GUSTAVO MUNIZ",
    title: "Full Stack Developer",
    contact: {
      phone: "(73) 981155999",
      email: "contact@gustavoanjos.com",
      website: "gustavoanjos.com",
      github: "github.com/guztaver",
      linkedin: "linkedin.com/in/gustavo404",
    },
    profile:
      "Full Stack developer focused on high-performance systems and clean architecture. Expert in creating efficient solutions that simplify complex business processes. Linux enthusiast with a strong commitment to best practices like TDD and Clean Code.",
    skills: {
      backend: ["PHP (Laravel, Symfony)", "Java (Spring Boot)", "Node.js (TypeScript)", "Go", "C# (.NET)"],
      frontend: ["React, Next.js", "Vue.js, Nuxt.js", "Angular", "Tailwind CSS"],
      bestPractices: ["TDD", "Clean Code", "Clean Architecture", "Design Patterns", "Agile"]
    },
    experience: [
      {
        position: "Support and Development Analyst",
        company: "PREFEITURA DE PAU BRASIL",
        period: "2025 - CURRENT",
        description:
          "Developed applications for public management using Laravel, Symfony, and Go. Managed servers and implemented automation scripts to optimize city hall operations.",
      },
      {
        position: "Full Stack Developer",
        company: "WEMIND GROUP",
        period: "2024 - 2025",
        description:
          "Built centralized management systems using Symfony and Twig, helping small businesses streamline internal processes and team data management.",
      },
      {
        position: "Speaker - Workshops",
        company: "ACADEMIC PRESENTATIONS",
        period: "2025",
        description:
          "Delivered technical workshops on AI, modern software development, and infrastructure automation for internal teams and academic audiences.",
      },
    ],
    education: [
      {
        degree: "Information Systems",
        institution: "UNIVERSITY OF EXCELLENCE - UNEX",
        period: "2023 - 2027",
      },
      {
        degree: "Native Mobile Development",
        institution: "SENAC",
        period: "2020 - 2020",
      },
    ],
    projects: [
      {
        name: "School Meal Management",
        description: "Comprehensive system for managing school meal distribution and inventory logistics.",
        technologies: "Laravel, Vue.js",
        impact: "Optimized logistics for the municipal education department.",
      },
      {
        name: "AI Financial Manager",
        description: "Mobile app featuring AI-driven insights and spending analysis.",
        technologies: "React Native, AI Integration",
        impact: "Enhanced financial awareness through automated analysis.",
      },
      {
        name: "Medical Regulation System",
        description: "High-performance system for healthcare regulation and patient flow management.",
        technologies: "Spring Boot, Vue.js",
        impact: "Reduced bottlenecks in medical scheduling.",
      },
      {
        name: "Municipal Fuel Management",
        description: "End-to-end management for public fleets with real-time analytics and cost control.",
        technologies: "Laravel, Tailwind, MySQL",
        impact: "Increased transparency and cost-saving in public spending.",
      }
    ],
  },
  pt: {
    name: "GUSTAVO MUNIZ",
    title: "Desenvolvedor Full Stack",
    contact: {
      phone: "(73) 981155999",
      email: "contact@gustavoanjos.com",
      website: "gustavoanjos.com",
      github: "github.com/guztaver",
      linkedin: "linkedin.com/in/gustavo404",
    },
    profile:
      "Desenvolvedor Full Stack focado em sistemas de alta performance e arquitetura limpa. Especialista em criar soluções eficientes que simplificam processos de negócios complexos. Entusiasta Linux com forte compromisso com TDD e Clean Code.",
    skills: {
      backend: ["PHP (Laravel, Symfony)", "Java (Spring Boot)", "Node.js (TypeScript)", "Go", "C# (.NET)"],
      frontend: ["React, Next.js", "Vue.js, Nuxt.js", "Angular", "Tailwind CSS"],
      bestPractices: ["TDD", "Clean Code", "Clean Architecture", "Design Patterns", "Agile"]
    },
    experience: [
      {
        position: "Analista de Suporte e Desenvolvimento",
        company: "PREFEITURA DE PAU BRASIL",
        period: "2025 - ATUAL",
        description:
          "Desenvolvimento de aplicações para gestão pública com Laravel, Symfony e Go. Manutenção de servidores e criação de scripts de automação.",
      },
      {
        position: "Desenvolvedor Full Stack",
        company: "WEMIND GROUP",
        period: "2024 - 2025",
        description:
          "Construção de sistemas de gestão centralizados com Symfony e Twig, auxiliando pequenas empresas a otimizar processos internos.",
      },
      {
        position: "Palestrante",
        company: "PALESTRAS ACADÊMICAS",
        period: "2025",
        description:
          "Ministrei workshops técnicos sobre IA, desenvolvimento moderno de software e automação de infraestrutura.",
      },
    ],
    education: [
      {
        degree: "Sistemas de Informação",
        institution: "FACULDADE DE EXCELÊNCIA - UNEX",
        period: "2023 - 2027",
      },
      {
        degree: "Desenvolvimento Mobile Nativo",
        institution: "SENAC",
        period: "2020 - 2020",
      },
    ],
    projects: [
      {
        name: "Gestão de Merendas Escolares",
        description: "Sistema abrangente para gestão de distribuição e logística de merenda escolar.",
        technologies: "Laravel, Vue.js",
        impact: "Otimizou a logística da secretaria de educação municipal.",
      },
      {
        name: "Gestão Financeira com IA",
        description: "App mobile com insights gerados por IA e análise de gastos.",
        technologies: "React Native, Integração IA",
        impact: "Melhorou a consciência financeira através de análise automatizada.",
      },
      {
        name: "Sistema de Regulação Médica",
        description: "Sistema de alta performance para regulação de saúde e fluxo de pacientes.",
        technologies: "Spring Boot, Vue.js",
        impact: "Reduziu gargalos no agendamento médico.",
      },
      {
        name: "Gestão de Combustível Municipal",
        description: "Gestão ponta-a-ponta de frotas públicas com analytics e controle de custos.",
        technologies: "Laravel, Tailwind, MySQL",
        impact: "Aumentou a transparência e economia no gasto público.",
      }
    ],
  },
};

export const generateResumePDF = async (language: Language): Promise<void> => {
  const data = resumeData[language];
  const doc = new jsPDF();
  
  const primaryColor = [44, 62, 80];
  const accentColor = [52, 152, 219];
  const textColor = [52, 73, 94];
  const sidebarColor = [245, 247, 249];

  // Sidebar background
  doc.setFillColor(sidebarColor[0], sidebarColor[1], sidebarColor[2]);
  doc.rect(0, 0, 70, 297, "F");

  // Header background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(70, 0, 140, 40, "F");

  // Photo
  try {
    // Add a circular placeholder or shadow effect
    doc.setFillColor(255, 255, 255);
    doc.circle(35, 35, 22, "F");
    doc.addImage("/guztaver-photo.jpg", "JPEG", 15, 15, 40, 40);
  } catch (error) {
    console.error("Could not add image:", error);
  }

  // Name & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(data.name, 75, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(data.title, 75, 30);

  // --- LEFT COLUMN (Sidebar) ---
  let leftY = 70;
  
  // Contact
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "CONTATO" : "CONTACT", 15, leftY);
  leftY += 8;
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  const contacts = [
    data.contact.phone,
    data.contact.email,
    data.contact.website,
    data.contact.github,
    data.contact.linkedin
  ];
  contacts.forEach(c => {
    doc.text(c, 15, leftY);
    leftY += 5;
  });
  leftY += 10;

  // Skills
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "HABILIDADES" : "SKILLS", 15, leftY);
  leftY += 8;

  const renderSkillGroup = (title: string, skills: string[]) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(title, 15, leftY);
    leftY += 5;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    skills.forEach(s => {
      doc.text("• " + s, 18, leftY);
      leftY += 4.5;
    });
    leftY += 4;
  };

  renderSkillGroup("Backend", data.skills.backend);
  renderSkillGroup("Frontend", data.skills.frontend);
  renderSkillGroup(language === "pt" ? "Boas Práticas" : "Best Practices", data.skills.bestPractices);

  // Education
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "FORMAÇÃO" : "EDUCATION", 15, leftY);
  leftY += 8;

  data.education.forEach(edu => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const eduLines = doc.splitTextToSize(edu.degree, 45);
    doc.text(eduLines, 15, leftY);
    leftY += (eduLines.length * 4);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(edu.period, 15, leftY);
    leftY += 4;
    const instLines = doc.splitTextToSize(edu.institution, 45);
    doc.text(instLines, 15, leftY);
    leftY += (instLines.length * 4) + 2;
  });

  // --- RIGHT COLUMN ---
  let rightY = 55;

  // Profile
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "PERFIL" : "PROFILE", 75, rightY);
  rightY += 2;
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.line(75, rightY, 200, rightY);
  rightY += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  const profileLines = doc.splitTextToSize(data.profile, 120);
  doc.text(profileLines, 75, rightY);
  rightY += (profileLines.length * 5) + 10;

  // Experience
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "EXPERIÊNCIA" : "EXPERIENCE", 75, rightY);
  rightY += 2;
  doc.line(75, rightY, 200, rightY);
  rightY += 8;

  data.experience.forEach(exp => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(exp.position, 75, rightY);
    
    doc.setFontSize(10);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(exp.period, 160, rightY);
    rightY += 5;
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(exp.company, 75, rightY);
    rightY += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(exp.description, 120);
    doc.text(descLines, 75, rightY);
    rightY += (descLines.length * 4.5) + 8;
  });

  // Projects
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(language === "pt" ? "PROJETOS" : "PROJECTS", 75, rightY);
  rightY += 2;
  doc.line(75, rightY, 200, rightY);
  rightY += 8;

  data.projects.forEach(proj => {
    if (rightY > 270) {
      doc.addPage();
      rightY = 20;
    }
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(proj.name, 75, rightY);
    rightY += 5;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(proj.technologies, 75, rightY);
    rightY += 4;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const projLines = doc.splitTextToSize(proj.description, 120);
    doc.text(projLines, 75, rightY);
    rightY += (projLines.length * 4.5) + 6;
  });

  // Download
  const filename = language === "pt" ? "Gustavo_Muniz_Curriculo.pdf" : "Gustavo_Muniz_Resume.pdf";
  doc.save(filename);
};
