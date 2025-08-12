# Contributing to Terminal Portfolio

Thank you for your interest in contributing to this project! We welcome contributions from everyone and appreciate your help in making this portfolio better.

## 🎯 Ways to Contribute

- **Bug Reports**: Found a bug? Please report it!
- **Feature Requests**: Have an idea for a new feature?
- **Code Contributions**: Submit pull requests with improvements
- **Documentation**: Help improve our documentation
- **Testing**: Help test new features and report issues
- **Translations**: Help translate the portfolio to new languages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure code is properly formatted with Prettier

### Commit Messages

Use conventional commit messages:

```
feat: add new terminal command
fix: resolve scroll issue in terminal
docs: update README with new commands
style: fix code formatting
refactor: improve command parsing logic
test: add tests for new commands
```

### Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

3. **Create a pull request**
   - Use a clear and descriptive title
   - Fill out the pull request template
   - Link any related issues
   - Add screenshots for UI changes

### Testing

- Test your changes thoroughly
- Verify the terminal works as expected
- Test on different screen sizes
- Check both English and Portuguese languages
- Ensure keyboard navigation works

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Browser, OS, screen size
- **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please provide:

- **Description**: Clear description of the feature
- **Use Case**: Why would this feature be useful?
- **Examples**: Examples of how it would work
- **Alternatives**: Any alternative solutions you've considered

## 🌍 Adding New Commands

To add a new terminal command:

1. **Add translations** in `src/data/translations.ts`:
   ```typescript
   commands: {
     yourcommand: {
       en: "your command description",
       pt: "descrição do seu comando"
     }
   }
   ```

2. **Implement the command** in `src/hooks/useTerminal.ts`:
   ```typescript
   case 'yourcommand':
   case 'seucomando': // Portuguese version
     return handleYourCommand();
   ```

3. **Add TypeScript types** if needed in `src/types/index.ts`

4. **Update help command** to include your new command

5. **Test thoroughly** in both languages

## 🎨 Design Guidelines

- Maintain the terminal aesthetic
- Use the existing color scheme
- Ensure responsive design
- Follow accessibility best practices
- Keep animations smooth and purposeful

## 📚 Documentation

When updating documentation:

- Keep it clear and concise
- Include code examples where helpful
- Update both English and Portuguese versions if applicable
- Use proper markdown formatting

## 🔒 Security

- Never commit API keys or sensitive information
- Follow security best practices
- Report security vulnerabilities privately to [contact@gustavoanjos.com](mailto:contact@gustavoanjos.com)

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## ☕ Support the Project

If you find this project helpful and want to support its development, consider buying me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/☕-Buy%20Me%20A%20Coffee-orange.svg?style=flat&logo=buy-me-a-coffee)](https://pixmeacoffee.vercel.app/gustavo)

Your support helps me maintain and improve this project!

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors page
- Project documentation
- Release notes (for significant contributions)

## 📞 Questions?

If you have questions about contributing:

- **GitHub Discussions**: Start a discussion on GitHub
- **Email**: [contact@gustavoanjos.com](mailto:contact@gustavoanjos.com)
- **Issues**: Open an issue with the `question` label

## 🎉 Thank You!

Thank you for taking the time to contribute! Every contribution, no matter how small, helps make this project better for everyone.

---

**Happy Coding!** 🚀