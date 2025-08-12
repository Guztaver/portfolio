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
    title: "Backend Developer",
    contact: {
      phone: "(73) 981155999",
      email: "contact@gustavoanjos.com",
      website: "https://gustavoanjos.com",
      github: "https://github.com/guztaver",
      linkedin: "https://linkedin.com/in/gustavo404",
    },
    profile:
      "With agility and performance in mind, I always aim to create systems that are not only highly efficient but also make life easier for the users who rely on them. With professional experience & years of study, I can swiftly identify errors and resolve them in short timeframes, contributing to the company's growth! I am also a passionate enthusiast of the Linux world!",
    experience: [
      {
        position: "Support and Development Analyst",
        company: "PREFEITURA DE PAU BRASIL",
        period: "2025 - CURRENT",
        description:
          "Allied with development tools (Laravel, Symfony, Golang, C#), I identified structural problems in the prefecture, and developed applications to help manage, control and facilitate public management through software! In addition to maintaining servers and workstations.",
      },
      {
        position: "Full Stack Developer",
        company: "WEMIND GROUP",
        period: "2024 - 2025",
        description:
          "Using technologies like Symfony aligned with Twig, I build systems to help small businesses streamline and centralize their internal processes, simplifying the daily tasks of administrators and consolidating their team data into a single platform.",
      },
      {
        position: "Speaker - Workshops",
        company: "ACADEMIC PRESENTATIONS",
        period: "2025",
        description:
          "Whether the topic is AI, development, infrastructure (infra), or automation, delivering talks on these subjects is a strong suit. These sessions can help internal teams onboard with new technologies and work more agilely, achieving high performance.",
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
        name: "Municipal Fuel Management System",
        description:
          "Complete fuel management system for public fleets built with Laravel. Features fuel control with mandatory authorization, real-time analytics dashboard, vehicle management with MERCOSUL validation, role-based access control (Admin, Manager, Operator), detailed reports with CSV export, and cost control with full transparency.",
        technologies:
          "Laravel 12, Laravel Breeze, Tailwind CSS, Alpine.js, Chart.js, SQLite/MySQL",
        impact:
          "Increased transparency in public spending, strict fuel control, and cost optimization for municipal governments.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7356710729246224384/",
      },
    ],
  },
  pt: {
    name: "GUSTAVO MUNIZ",
    title: "Desenvolvedor Backend",
    contact: {
      phone: "(73) 981155999",
      email: "contact@gustavoanjos.com",
      website: "https://gustavoanjos.com",
      github: "https://github.com/guztaver",
      linkedin: "https://linkedin.com/in/gustavo404",
    },
    profile:
      "Com agilidade e performance em mente, almejo sempre criar sistemas que, além de muito ágeis, facilitam a vida dos usuários que utilizam eles. Com experiência profissional & anos de estudo, posso identificar erros com agilidade e resolvê-los em tempos curtos, que podem ajudar no crescimento da empresa! E um entusiasta do mundo Linux!",
    experience: [
      {
        position: "Analista de Suporte e Desenvolvimento",
        company: "PREFEITURA DE PAU BRASIL",
        period: "2025 - ATUAL",
        description:
          "Aliado às ferramentas de desenvolvimento (Laravel, Symfony, Golang, C#), identifiquei problemas estruturais na prefeitura, e desenvolvi aplicativos para ajudar a gerir, controlar e facilitar a gestão pública através de software! Além de dar manutenção em servidores e workstations.",
      },
      {
        position: "Desenvolvedor Full Stack",
        company: "WEMIND GROUP",
        period: "2024 - 2025",
        description:
          "Com tecnologias como Symfony alinhadas ao Twig, construo sistemas para que empresas pequenas possam agilizar e centralizar os seus processos internos, facilitando a vida dos administradores e centralizando os dados das suas equipes em uma única plataforma.",
      },
      {
        position: "Palestrante",
        company: "DIVERSAS PALESTRAS ACADÊMICAS",
        period: "2025",
        description:
          "Seja o assunto IAs, desenvolvimento, infra ou automação, palestras desses assuntos são um forte, podendo ajudar equipes internas a se introduzirem com uma nova tecnologia e trabalhar de forma mais ágil e com ótima performance.",
      },
    ],
    education: [
      {
        degree: "Sistemas de Informação",
        institution: "FACULDADE DE EXCELÊNCIA - UNEX",
        period: "2023 - 2027",
      },
      {
        degree: "Desenvolvimento de Aplicativos Mobile - Nativo",
        institution: "SENAC",
        period: "2020 - 2020",
      },
    ],
    projects: [
      {
        name: "Sistema de Gerenciamento de Combustível Municipal",
        description:
          "Sistema completo de gerenciamento de combustível para frotas públicas desenvolvido em Laravel. Oferece controle total de abastecimentos com autorização obrigatória, dashboard analytics com gráficos em tempo real, gestão de veículos com validação MERCOSUL, sistema de roles (Admin, Gerente, Operador), relatórios detalhados e exportação CSV, e controle de custos com transparência total.",
        technologies:
          "Laravel 12, Laravel Breeze, Tailwind CSS, Alpine.js, Chart.js, SQLite/MySQL",
        impact:
          "Maior transparência nos gastos públicos, controle rigoroso de combustível e otimização de custos para prefeituras.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7356710729246224384/",
      },
    ],
  },
};

export const generateResumePDF = (language: Language): void => {
  const data = resumeData[language];
  const doc = new jsPDF();

  // Set font
  doc.setFont("helvetica");

  // Colors are defined inline where used

  // Header
  doc.setFillColor(44, 62, 80); // primaryColor
  doc.rect(0, 0, 210, 40, "F");

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.name, 20, 20);

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text(data.title, 20, 32);

  // Contact Information
  doc.setTextColor(52, 73, 94); // textColor
  doc.setFontSize(10);
  const contactInfo = [
    data.contact.phone,
    data.contact.email,
    data.contact.website,
    data.contact.github,
    data.contact.linkedin,
  ];

  let yPos = 50;
  contactInfo.forEach((info, index) => {
    doc.text(info, 20, yPos + index * 5);
  });

  yPos += contactInfo.length * 5 + 10;

  // Profile Section
  const profileTitle = language === "pt" ? "OBJETIVOS" : "PROFESSIONAL PROFILE";
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(52, 152, 219); // accentColor
  doc.text(profileTitle, 20, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(52, 73, 94); // textColor

  // Split profile text to fit page width
  const profileLines = doc.splitTextToSize(data.profile, 170);
  doc.text(profileLines, 20, yPos);
  yPos += profileLines.length * 5 + 10;

  // Experience Section
  const experienceTitle =
    language === "pt" ? "EXPERIÊNCIAS" : "WORK EXPERIENCE";
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(52, 152, 219); // accentColor
  doc.text(experienceTitle, 20, yPos);
  yPos += 10;

  data.experience.forEach((exp) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Position and Company
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // primaryColor
    doc.text(exp.position, 20, yPos);

    // Period
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 152, 219); // accentColor
    doc.text(exp.period, 20, yPos + 6);

    // Company
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // primaryColor
    doc.text(exp.company, 20, yPos + 12);

    yPos += 18;

    // Description
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94); // textColor
    const descLines = doc.splitTextToSize(exp.description, 170);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 5 + 10;
  });

  // Education Section
  const educationTitle = language === "pt" ? "FORMAÇÃO" : "ACADEMIC EDUCATION";

  // Check if we need a new page
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(52, 152, 219); // accentColor
  doc.text(educationTitle, 20, yPos);
  yPos += 10;

  data.education.forEach((edu) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Degree
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // primaryColor
    doc.text(edu.degree, 20, yPos);

    // Period
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 152, 219); // accentColor
    doc.text(edu.period, 20, yPos + 6);

    // Institution
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // primaryColor
    doc.text(edu.institution, 20, yPos + 12);

    yPos += 20;
  });

  // Projects Section
  const projectsTitle = language === "pt" ? "PROJETOS" : "KEY PROJECTS";

  // Check if we need a new page
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(52, 152, 219); // accentColor
  doc.text(projectsTitle, 20, yPos);
  yPos += 10;

  data.projects.forEach((project) => {
    // Check if we need a new page
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    // Project Name
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // primaryColor
    doc.text(project.name, 20, yPos);
    yPos += 8;

    // Description
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94); // textColor
    const descLines = doc.splitTextToSize(project.description, 170);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 5 + 5;

    // Technologies
    doc.setFont("helvetica", "bold");
    doc.setTextColor(52, 152, 219); // accentColor
    const techLabel = language === "pt" ? "Tecnologias: " : "Technologies: ";
    doc.text(techLabel, 20, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94); // textColor
    const techLines = doc.splitTextToSize(project.technologies, 170);
    doc.text(techLines, 20, yPos);
    yPos += techLines.length * 5 + 5;

    // Impact
    doc.setFont("helvetica", "bold");
    doc.setTextColor(52, 152, 219); // accentColor
    const impactLabel = language === "pt" ? "Impacto: " : "Impact: ";
    doc.text(impactLabel, 20, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94); // textColor
    const impactLines = doc.splitTextToSize(project.impact, 170);
    doc.text(impactLines, 20, yPos);
    yPos += impactLines.length * 5 + 15;
  });

  // Download the PDF
  const filename =
    language === "pt"
      ? "Gustavo_Muniz_Curriculo.pdf"
      : "Gustavo_Muniz_Resume.pdf";
  doc.save(filename);
};
