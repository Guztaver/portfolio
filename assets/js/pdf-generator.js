// PDF Generator Utility
// Handles resume PDF generation in both English and Portuguese

class PDFGenerator {
  constructor() {
    this.resumeData = {
      en: this.getEnglishResumeData(),
      pt: this.getPortugueseResumeData()
    };
  }

  // Generate and download PDF
  downloadResume(language) {
    const filename = language === 'en'
      ? 'Gustavo_Muniz_Resume_EN.pdf'
      : 'Gustavo_Muniz_Resume_PT.pdf';

    const content = this.resumeData[language];
    this.generatePDF(content, filename);

    return {
      filename,
      success: true
    };
  }

  // Get English resume data
  getEnglishResumeData() {
    return {
      title: 'GUSTAVO MUNIZ - Full Stack Developer',
      sections: {
        profile: {
          title: 'PROFESSIONAL PROFILE',
          content: 'With agility and performance in mind, I always aim to create systems that are not only highly efficient but also make life easier for the users who rely on them. With professional experience & years of study, I can swiftly identify errors and resolve them in short timeframes, contributing to the company\'s growth! I am also a passionate enthusiast of the Linux world!'
        },
        contact: {
          title: 'CONTACT',
          content: [
            '(73) 981155999',
            'contact@gustavoanjos.com',
            'https://gustavoanjos.com',
            'https://github.com/guztaver',
            'https://linkedin.com/in/gustavo404'
          ]
        },
        experience: {
          title: 'WORK EXPERIENCE',
          items: [
            {
              period: '2025 - CURRENT',
              company: 'PREFEITURA DE PAU BRASIL',
              position: 'Support and Development Analyst',
              description: 'Allied with development tools (Laravel, Symfony, Golang, C#), I identified structural problems in the city hall, and developed applications to help manage, control and facilitate public management through software! In addition to maintaining servers and workstations.'
            },
            {
              period: '2024 - 2025',
              company: 'WEMIND GROUP',
              position: 'Full Stack Developer',
              description: 'Using technologies like Symfony aligned with Twig, I build systems to help small businesses streamline and centralize their internal processes, simplifying the daily tasks of administrators and consolidating their team data into a single platform.'
            },
            {
              period: '2025',
              company: 'ACADEMIC PRESENTATIONS',
              position: 'Speaker - Workshops',
              description: 'Whether the topic is AI, development, infrastructure (infra), or automation, delivering talks on these subjects is a strong suit. These sessions can help internal teams onboard with new technologies and work more agilely, achieving high performance.'
            }
          ]
        },
        education: {
          title: 'ACADEMIC EDUCATION',
          items: [
            {
              period: '2023 - 2027',
              institution: 'UNIVERSITY OF EXCELLENCE - UNEX',
              course: 'Information Systems'
            },
            {
              period: '2020',
              institution: 'SENAC',
              course: 'Native Mobile Development'
            }
          ]
        }
      }
    };
  }

  // Get Portuguese resume data
  getPortugueseResumeData() {
    return {
      title: 'GUSTAVO MUNIZ - Desenvolvedor Full Stack',
      sections: {
        profile: {
          title: 'OBJETIVOS',
          content: 'Com agilidade e performance em mente, almejo sempre criar sistemas que, além de muito ágeis, facilitam a vida dos usuários que utilizam eles. Com experiência profissional & anos de estudo, posso identificar erros com agilidade e resolver-los em tempos curtos, que podem ajudar no crescimento da empresa! E um entusiasta do mundo Linux!'
        },
        contact: {
          title: 'CONTATO',
          content: [
            '(73) 981155999',
            'contact@gustavoanjos.com',
            'https://gustavoanjos.com',
            'https://github.com/guztaver',
            'https://linkedin.com/in/gustavo404'
          ]
        },
        experience: {
          title: 'EXPERIÊNCIAS',
          items: [
            {
              period: '2025 - ATUAL',
              company: 'PREFEITURA DE PAU BRASIL',
              position: 'Analista de Suporte e Desenvolvimento',
              description: 'Aliado as ferramentas de desenvolvimento (Laravel, Symfony, Golang, C#), identifiquei problemas estruturais na prefeitura, e desenvolvi aplicativos para ajudar a gerir, controlar e facilitar a gestão pública através de software! Além de dar manutenção em servidores e workstations.'
            },
            {
              period: '2024 - 2025',
              company: 'WEMIND GROUP',
              position: 'Desenvolvedor Full Stack',
              description: 'Com tecnologias como Symfony alinhadas ao Twig, construo sistemas para que empresas pequenas possam agilizar e centralizar os seus processos internos, facilitando a vida dos administradores e centralizando os dados das suas equipes em uma única plataforma.'
            },
            {
              period: '2025',
              company: 'DIVERSAS PALESTRAS ACADÊMICAS',
              position: 'Palestrante',
              description: 'Seja o assunto IAs, desenvolvimento, infra ou automação, palestras dessas assuntos são um forte, podendo ajudar equipes internas a se introduzirem com uma nova tecnologia e trabalhar de forma mais ágil e com ótima performance.'
            }
          ]
        },
        education: {
          title: 'FORMAÇÃO',
          items: [
            {
              period: '2023 - 2027',
              institution: 'FACULDADE DE EXCELÊNCIA - UNEX',
              course: 'Sistemas de Informação'
            },
            {
              period: '2020',
              institution: 'SENAC',
              course: 'Desenvolvimento de Aplicativos Mobile - Nativo'
            }
          ]
        }
      }
    };
  }

  // Generate PDF using browser print functionality
  generatePDF(content, filename) {
    const printWindow = window.open('', '_blank');

    const htmlContent = this.generateHTMLContent(content);

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
  }

  // Generate HTML content for PDF
  generateHTMLContent(content) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${content.title}</title>
    <meta charset="UTF-8">
    <style>
        @media print {
            body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                line-height: 1.4;
                margin: 20px;
                color: #000;
            }
            h1 {
                color: #333;
                font-size: 18px;
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #333;
                padding-bottom: 10px;
            }
            h2 {
                color: #555;
                font-size: 14px;
                border-bottom: 2px solid #333;
                padding-bottom: 5px;
                margin-top: 20px;
                margin-bottom: 10px;
            }
            h3 {
                color: #666;
                font-size: 13px;
                margin-bottom: 5px;
                margin-top: 15px;
            }
            .contact-info {
                text-align: center;
                margin-bottom: 20px;
                padding: 10px;
                background: #f9f9f9;
                border-radius: 5px;
            }
            .contact-info p {
                margin: 3px 0;
                font-weight: 500;
            }
            .experience-item, .education-item {
                margin-bottom: 15px;
                border-left: 3px solid #333;
                padding-left: 10px;
            }
            .period {
                font-weight: bold;
                color: #333;
                font-size: 12px;
            }
            .company {
                font-weight: bold;
                color: #555;
                font-size: 13px;
            }
            .position {
                font-style: italic;
                color: #666;
                font-size: 12px;
                margin: 2px 0;
            }
            .description {
                margin-top: 5px;
                text-align: justify;
                line-height: 1.5;
            }
            .profile {
                background: #f9f9f9;
                padding: 15px;
                border-left: 4px solid #333;
                margin-bottom: 20px;
                text-align: justify;
                border-radius: 5px;
            }
            @page {
                margin: 2cm;
            }
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 20px;
            color: #000;
        }
        h1 {
            color: #333;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        h2 {
            color: #555;
            font-size: 14px;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        h3 {
            color: #666;
            font-size: 13px;
            margin-bottom: 5px;
            margin-top: 15px;
        }
        .contact-info {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 5px;
        }
        .contact-info p {
            margin: 3px 0;
            font-weight: 500;
        }
        .experience-item, .education-item {
            margin-bottom: 15px;
            border-left: 3px solid #333;
            padding-left: 10px;
        }
        .period {
            font-weight: bold;
            color: #333;
            font-size: 12px;
        }
        .company {
            font-weight: bold;
            color: #555;
            font-size: 13px;
        }
        .position {
            font-style: italic;
            color: #666;
            font-size: 12px;
            margin: 2px 0;
        }
        .description {
            margin-top: 5px;
            text-align: justify;
            line-height: 1.5;
        }
        .profile {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #333;
            margin-bottom: 20px;
            text-align: justify;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>${content.title}</h1>

    <div class="contact-info">
        ${content.sections.contact.content.map(item => `<p>${item}</p>`).join('')}
    </div>

    <h2>${content.sections.profile.title}</h2>
    <div class="profile">${content.sections.profile.content}</div>

    <h2>${content.sections.experience.title}</h2>
    ${content.sections.experience.items.map(item => `
        <div class="experience-item">
            <div class="period">${item.period} | <span class="company">${item.company}</span></div>
            <div class="position">${item.position}</div>
            <div class="description">${item.description}</div>
        </div>
    `).join('')}

    <h2>${content.sections.education.title}</h2>
    ${content.sections.education.items.map(item => `
        <div class="education-item">
            <div class="period">${item.period} | <span class="company">${item.institution}</span></div>
            <div class="position">${item.course}</div>
        </div>
    `).join('')}

    <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #666;">
        Generated on ${new Date().toLocaleDateString()} - Portfolio: https://gustavoanjos.com
    </div>
</body>
</html>
    `;
  }

  // Get resume data for specific language
  getResumeData(language) {
    return this.resumeData[language] || this.resumeData.en;
  }

  // Validate resume data structure
  validateResumeData(data) {
    const requiredSections = ['profile', 'contact', 'experience', 'education'];

    if (!data || !data.sections) {
      return { valid: false, error: 'Missing sections data' };
    }

    for (const section of requiredSections) {
      if (!data.sections[section]) {
        return { valid: false, error: `Missing ${section} section` };
      }
    }

    return { valid: true };
  }

  // Add custom section to resume (for future extensions)
  addCustomSection(language, sectionName, sectionData) {
    if (!this.resumeData[language]) {
      this.resumeData[language] = this.getEnglishResumeData();
    }

    this.resumeData[language].sections[sectionName] = sectionData;
  }

  // Update existing section
  updateSection(language, sectionName, sectionData) {
    if (this.resumeData[language] && this.resumeData[language].sections[sectionName]) {
      this.resumeData[language].sections[sectionName] = {
        ...this.resumeData[language].sections[sectionName],
        ...sectionData
      };
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
