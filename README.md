# Terminal Portfolio - TypeScript Version

A modern, interactive terminal-style portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project transforms the original vanilla JavaScript portfolio into a fully type-safe, modern React application.

## 🚀 Features

- **Interactive Terminal Interface** - Authentic terminal experience with command execution
- **TypeScript Support** - Full type safety and excellent developer experience
- **Bilingual Support** - English and Portuguese with easy language switching
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Modern Tech Stack** - Next.js 15, React 19, TypeScript, Tailwind CSS
- **Terminal Commands** - Comprehensive set of Unix-like commands
- **Component Architecture** - Modular, reusable React components
- **Custom Hooks** - Clean state management with custom React hooks
- **Auto-scrolling Terminal** - Automatically scrolls to bottom like real terminals
- **Fixed Terminal Size** - Consistent dimensions regardless of content
- **Keyboard Navigation** - Full keyboard shortcuts for scrolling and navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: JetBrains Mono
- **Build Tool**: Turbopack (optional)
- **Linting**: ESLint with Next.js config

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Available Commands

### Navigation Commands
- `help` - Show available commands
- `about` - Learn about Gustavo and his background
- `experience` - View work experience
- `education` - View academic background
- `skills` - See technical skills
- `projects` - View side projects
- `resume` - Download resume
- `contact` - Get contact information

### System Commands
- `clear` - Clear the terminal
- `whoami` - Display current user
- `ls` - List available sections
- `pwd` - Show current directory
- `date` - Show current date
- `uname` - Show system information
- `cat [file]` - Display file contents
- `echo [text]` - Display text
- `neofetch` - Show system info with ASCII art
- `history` - Show command history
- `tree` - Show directory structure
- `ps` - Show active processes
- `top` - Show top processes
- `uptime` - Show system uptime

### Navigation & Scrolling
- `Page Up/Down` - Scroll through terminal output
- `Ctrl+Home` - Scroll to top of terminal
- `Ctrl+End` - Scroll to bottom of terminal
- `↑/↓ arrows` - Navigate command history
- `Tab` - Autocomplete commands

### Portuguese Commands
All commands have Portuguese equivalents:
- `ajuda` (help), `sobre` (about), `experiencia` (experience)
- `educacao` (education), `habilidades` (skills), `projetos` (projects)
- `curriculo` (resume), `contato` (contact), `limpar` (clear)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and terminal CSS
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Terminal.tsx       # Main terminal container
│   ├── TerminalHeader.tsx # Terminal header with controls
│   ├── TerminalBody.tsx   # Terminal body container
│   ├── TerminalInput.tsx  # Command input component
│   ├── TerminalOutput.tsx # Output display component
│   └── ASCIIArt.tsx       # ASCII art display
├── hooks/                 # Custom React hooks
│   ├── useTerminal.ts     # Terminal state management
│   └── useTranslation.ts  # Translation utilities
├── data/                  # Static data
│   └── translations.ts    # Language translations
└── types/                 # TypeScript type definitions
    └── index.ts           # All type definitions
```

## 🎨 Styling

The project uses a custom CSS design that mimics a real terminal:

- **Colors**: Dark theme with green, blue, and yellow accents
- **Font**: JetBrains Mono for authentic monospace feel
- **Animations**: Smooth transitions and terminal startup animation
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Proper focus states and keyboard navigation

## 🔧 Development

### Key Features

1. **Type Safety**: Full TypeScript coverage with strict typing
2. **Component Design**: Modular React components for easy maintenance
3. **State Management**: Custom hooks for clean state handling
4. **Performance**: Next.js optimizations and code splitting
5. **SEO**: Proper metadata and social media tags
6. **Terminal Behavior**: Authentic terminal experience with auto-scrolling
7. **Fixed Dimensions**: Terminal maintains consistent size (1200x700px on desktop)
8. **Scroll Management**: Smart scrolling with visual indicators and shortcuts

### Custom Hooks

- `useTerminal`: Manages terminal state, command execution, and history
- `useTranslation`: Handles internationalization and language switching

### Adding New Commands

1. Add command translation in `src/data/translations.ts`
2. Implement command logic in `src/hooks/useTerminal.ts`
3. Add TypeScript types if needed in `src/types/index.ts`

## 🌐 Deployment

The project is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages** (static export)
- Any hosting service supporting Node.js

```bash
# Build for static export (optional)
npm run build

# Deploy to Vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gustavo Muniz**
- Website: [gustavoanjos.com](https://gustavoanjos.com)
- GitHub: [@guztaver](https://github.com/guztaver)
- LinkedIn: [gustavo404](https://linkedin.com/in/gustavo404)

---

## 🚀 Quick Start

After transformation, your portfolio is now ready to run:

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Migration Complete

Your original files have been preserved:
- `index.html.backup` - Original HTML file
- `assets-original/` - Original CSS and JavaScript files
- `README.md.backup` - Original README

The new TypeScript structure includes:
- Modern React components with full type safety
- Custom hooks for state management
- Responsive design with Tailwind CSS
- Enhanced developer experience with TypeScript
- Better performance with Next.js optimizations

## 🌟 What's New

- **Type Safety**: All code is now fully typed with TypeScript
- **Component Architecture**: Modular React components for better maintainability
- **Modern Tooling**: Next.js 15, React 19, ESLint, and Prettier
- **Performance**: Optimized builds and code splitting
- **Developer Experience**: Hot reloading, better error messages, IntelliSense
- **SEO Ready**: Proper metadata and social media tags
- **Deployment Ready**: Optimized for Vercel, Netlify, and other platforms
- **Real Terminal Feel**: Auto-scrolling, fixed dimensions, keyboard navigation
- **Enhanced UX**: Scroll indicators, jump-to-bottom button, smooth scrolling

## ☕ Support the Project

If you find this project helpful and want to support its development, consider buying me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/☕-Buy%20Me%20A%20Coffee-orange.svg?style=flat&logo=buy-me-a-coffee)](https://pixmeacoffee.vercel.app/gustavo)

Your support helps me maintain and improve this project!

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

- 🐛 **Bug Reports**: Found an issue? [Open a bug report](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 **Feature Requests**: Have an idea? [Request a feature](.github/ISSUE_TEMPLATE/feature_request.md)
- ❓ **Questions**: Need help? [Ask a question](.github/ISSUE_TEMPLATE/question.md)
- 🔒 **Security**: Found a vulnerability? Check our [Security Policy](SECURITY.md)

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

*Built with ❤️ using TypeScript and modern web technologies*