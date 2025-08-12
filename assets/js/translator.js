// Content Translator Utility
// Handles dynamic content translation and text replacement

class ContentTranslator {
  constructor() {
    this.currentLanguage = "en";
  }

  // Set current language
  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  // Get translation for a key
  translate(key) {
    const keys = key.split(".");
    let value = translations[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  // Translate HTML content dynamically
  translateContent(content) {
    if (this.currentLanguage === "en") {
      return content; // No translation needed for English
    }

    let translatedContent = content;

    // Apply short content translations
    Object.entries(contentTranslations).forEach(([en, pt]) => {
      translatedContent = translatedContent.replace(new RegExp(en, "g"), pt);
    });

    // Apply long content translations
    Object.entries(longContentTranslations).forEach(([en, pt]) => {
      translatedContent = translatedContent.replace(en, pt);
    });

    return translatedContent;
  }

  // Update welcome message with proper command highlights
  updateWelcomeMessage() {
    const welcomeEl = document.getElementById("welcome-message");
    if (!welcomeEl) return;

    const elements = welcomeEl.querySelectorAll("[data-en][data-pt]");
    elements.forEach((el) => {
      const text =
        this.currentLanguage === "pt"
          ? el.getAttribute("data-pt")
          : el.getAttribute("data-en");

      // Always use innerHTML to preserve formatting
      if (this.currentLanguage === "pt") {
        if (text.includes("'ajuda'") || text.includes("'sobre'")) {
          el.innerHTML = text
            .replace(/'ajuda'/g, "<span class=\"command\">'ajuda'</span>")
            .replace(/'sobre'/g, "<span class=\"command\">'sobre'</span>");
        } else {
          el.innerHTML = text;
        }
      } else {
        if (text.includes("'help'") || text.includes("'about'")) {
          el.innerHTML = text
            .replace(/'help'/g, "<span class=\"command\">'help'</span>")
            .replace(/'about'/g, "<span class=\"command\">'about'</span>");
        } else {
          el.innerHTML = text;
        }
      }
    });
  }

  // Get localized date
  getLocalizedDate() {
    const now = new Date();
    const locale = this.currentLanguage === "pt" ? "pt-BR" : "en-US";
    return now.toLocaleString(locale);
  }

  // Get file name mapping for current language
  getFileMap() {
    return translations[this.currentLanguage].files;
  }

  // Get file list for current language
  getFileList() {
    return translations[this.currentLanguage].fileList;
  }

  // Replace placeholders in text
  replacePlaceholders(text, replacements) {
    let result = text;
    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{${key}}`, "g"), value);
    });
    return result;
  }

  // Get command list for auto-completion
  getCommandList() {
    return Object.keys(translations[this.currentLanguage].commands);
  }

  // Check if a command exists in current language
  hasCommand(command) {
    return command.toLowerCase() in translations[this.currentLanguage].commands;
  }

  // Get language-specific messages
  getMessage(key, replacements = {}) {
    const message = this.translate(`messages.${key}`);
    return replacements
      ? this.replacePlaceholders(message, replacements)
      : message;
  }

  // Get content translation
  getContent(key) {
    return this.translate(`content.${key}`);
  }

  // Format language switch messages
  getLanguageSwitchMessage() {
    if (this.currentLanguage === "pt") {
      return {
        switched: this.getMessage("languageSwitched"),
        info: this.getMessage("languageInfo"),
      };
    } else {
      return {
        switched: this.getMessage("languageSwitched"),
        info: this.getMessage("languageInfo"),
      };
    }
  }

  // Validate translation completeness (development helper)
  validateTranslations() {
    const enKeys = this.getAllKeys(translations.en);
    const ptKeys = this.getAllKeys(translations.pt);

    const missingInPt = enKeys.filter((key) => !ptKeys.includes(key));
    const missingInEn = ptKeys.filter((key) => !enKeys.includes(key));

    if (missingInPt.length > 0) {
      console.warn("Missing Portuguese translations:", missingInPt);
    }

    if (missingInEn.length > 0) {
      console.warn("Missing English translations:", missingInEn);
    }

    return {
      complete: missingInPt.length === 0 && missingInEn.length === 0,
      missingInPt,
      missingInEn,
    };
  }

  // Helper to get all keys from nested object
  getAllKeys(obj, prefix = "") {
    let keys = [];

    Object.keys(obj).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        keys = keys.concat(this.getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    });

    return keys;
  }
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContentTranslator;
}
