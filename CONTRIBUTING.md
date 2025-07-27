# Contributing to Nure Alam E-Card

Thank you for your interest in contributing to this digital business card project! This guide will help you get started with contributing effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be constructive**: Provide helpful feedback and suggestions
- **Be professional**: Keep discussions focused and productive

## Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Git for version control
- A modern web browser for testing
- Text editor or IDE of your choice

### Project Structure

```
nure-alam-ecard/
├── index.html          # Main HTML file
├── ecard.css          # Styles and themes
├── ecard.js           # JavaScript functionality
├── images/            # Image assets
├── README.md          # Project documentation
├── CHANGELOG.md       # Version history
├── LICENSE            # MIT License
├── SECURITY.md        # Security policy
├── CONTRIBUTING.md    # This file
├── .gitignore         # Git ignore rules
└── package.json       # Project metadata
```

## Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/NureAlam-E-card.git
   cd NureAlam-E-card
   ```

2. **Set up the upstream remote**
   ```bash
   git remote add upstream https://github.com/RoamingToursTravels/NureAlam-E-card.git
   ```

3. **Start local development server**
   ```bash
   # Using Python (recommended)
   python3 -m http.server 8000
   
   # Or using Node.js
   npx http-server -p 8000
   
   # Or using PHP
   php -S localhost:8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**: Fix issues or improve functionality
- ✨ **Features**: Add new features or enhance existing ones
- 📚 **Documentation**: Improve README, comments, or guides
- 🎨 **Design**: Improve UI/UX or visual elements
- ⚡ **Performance**: Optimize code or loading times
- 🔧 **Maintenance**: Update dependencies or tooling
- 🌐 **Accessibility**: Improve accessibility features
- 📱 **Mobile**: Enhance mobile experience

### Before You Start

1. **Check existing issues**: Look for related issues or discussions
2. **Create an issue**: For significant changes, create an issue first
3. **Discuss your approach**: Get feedback before implementing
4. **Keep it focused**: One feature/fix per pull request

### Branch Naming

Use descriptive branch names:
- `feature/dark-mode-improvements`
- `fix/safari-contact-colors`
- `docs/update-readme`
- `refactor/javascript-cleanup`

## Pull Request Process

### 1. Prepare Your Changes

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Test your changes
# Open http://localhost:8000 and test thoroughly

# Commit your changes
git add .
git commit -m "Add descriptive commit message"
```

### 2. Sync with Upstream

```bash
# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main
```

### 3. Submit Pull Request

1. Push your branch to your fork
2. Create a pull request on GitHub
3. Fill out the pull request template
4. Wait for review and address feedback

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Dark mode tested
- [ ] Light mode tested

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No breaking changes (or clearly documented)
```

## Coding Standards

### HTML Guidelines

- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Maintain consistent indentation (2 spaces)
- Use descriptive class names
- Validate HTML markup

### CSS Guidelines

- Use CSS custom properties (variables) for theming
- Follow BEM methodology for class naming
- Mobile-first responsive design
- Consistent spacing and typography
- Avoid !important unless necessary
- Group related properties together

```css
/* Good example */
.ecard-contact {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  transition: var(--transition-fast);
}
```

### JavaScript Guidelines

- Use modern ES6+ features
- Follow functional programming principles
- Add comprehensive error handling
- Use descriptive variable and function names
- Add JSDoc comments for functions
- Avoid global variables

```javascript
/**
 * Safely retrieves a DOM element with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} - Found element or null
 */
function safeGetElement(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error(`Error selecting element: ${selector}`, error);
    return null;
  }
}
```

### General Guidelines

- **Performance**: Optimize for fast loading
- **Accessibility**: Follow WCAG guidelines
- **Browser Support**: Test on major browsers
- **Mobile First**: Design for mobile devices
- **Progressive Enhancement**: Ensure basic functionality without JavaScript
- **Security**: Follow security best practices

## Testing

### Manual Testing Checklist

#### Functionality Testing
- [ ] Contact download works (vCard)
- [ ] WhatsApp link opens correctly
- [ ] Social media links work
- [ ] Dark/light mode toggle functions
- [ ] All buttons and interactions work
- [ ] Error handling works properly

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Large mobile (414x896)

#### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible
- [ ] Alt text for images

### Performance Testing

- [ ] Page loads in under 2 seconds
- [ ] Images are optimized
- [ ] CSS and JS are minified (if applicable)
- [ ] No console errors
- [ ] Smooth animations

## Documentation

### Code Comments

- Add comments for complex logic
- Explain "why" not just "what"
- Use JSDoc for function documentation
- Keep comments up to date

### README Updates

When making significant changes:
- Update feature lists
- Modify setup instructions if needed
- Add new customization options
- Update browser support information

### Changelog

For each contribution:
- Add entry to CHANGELOG.md
- Follow semantic versioning
- Categorize changes (Added, Changed, Fixed, Removed)

## Getting Help

### Resources

- **Project Issues**: [GitHub Issues](https://github.com/RoamingToursTravels/NureAlam-E-card/issues)
- **Discussions**: [GitHub Discussions](https://github.com/RoamingToursTravels/NureAlam-E-card/discussions)
- **Email**: nurealam.tours@gmail.com

### Common Questions

**Q: Can I add external libraries?**
A: We prefer to keep the project dependency-free, but discuss your use case in an issue first.

**Q: How do I test on different devices?**
A: Use browser developer tools for device simulation, or test on actual devices.

**Q: What if my PR conflicts with main branch?**
A: Rebase your branch on the latest main branch and resolve conflicts.

## Recognition

Contributors will be:
- Listed in the project's contributors section
- Credited in release notes for significant contributions
- Mentioned in the README for major features

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this digital business card project better! 🚀