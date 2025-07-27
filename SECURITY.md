# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |
| 2.0.x   | :x:                |
| 1.0.x   | :x:                |

## Security Features

### Built-in Security Measures

- **No External Dependencies**: Zero third-party libraries reduce attack surface
- **No External API Calls**: All functionality works offline
- **No Data Collection**: No personal data is transmitted or stored externally
- **Client-Side Only**: No server-side processing or data storage
- **Content Security**: No dynamic script execution or eval() usage
- **Input Sanitization**: All user inputs are properly handled

### Browser Security

- **HTTPS Ready**: Designed to work securely over HTTPS
- **Same-Origin Policy**: Respects browser security boundaries
- **Local Storage**: Only uses browser's local storage for theme preferences
- **No Cookies**: No tracking or session cookies used

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Email**: Send details to `nurealam.tours@gmail.com`
2. **Subject**: Use "SECURITY: [Brief Description]"
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Status Updates**: Every week until resolved
- **Resolution**: Critical issues within 30 days

### Responsible Disclosure

- Please allow reasonable time for fixes before public disclosure
- We will credit security researchers (unless they prefer anonymity)
- We may provide a coordinated disclosure timeline

## Security Best Practices for Users

### Deployment Security

1. **Use HTTPS**: Always serve over HTTPS in production
2. **Content Security Policy**: Consider adding CSP headers
3. **Regular Updates**: Keep the E-Card updated to latest version
4. **Secure Hosting**: Use reputable hosting services

### Customization Security

1. **Validate Changes**: Review all code modifications
2. **Avoid External Scripts**: Don't add untrusted JavaScript
3. **Image Security**: Use trusted image sources
4. **Link Verification**: Verify all external links

### Contact Information Security

1. **Public Information**: Only include information you're comfortable sharing publicly
2. **Phone Numbers**: Consider using business numbers only
3. **Email Addresses**: Use professional email addresses
4. **Social Media**: Ensure social media profiles are appropriate for professional use

## Common Security Considerations

### What This E-Card Does NOT Do

- ❌ Collect or transmit personal data
- ❌ Use tracking scripts or analytics
- ❌ Store data on external servers
- ❌ Require user registration or login
- ❌ Use third-party services (except social media links)
- ❌ Execute dynamic or user-provided code

### What This E-Card DOES Do

- ✅ Works entirely in the browser
- ✅ Uses only standard web technologies
- ✅ Stores theme preference locally
- ✅ Generates vCard files client-side
- ✅ Opens social media links in new tabs
- ✅ Provides clear user notifications

## Security Checklist for Developers

If you're contributing to or modifying this project:

- [ ] No external script inclusions
- [ ] No eval() or Function() constructors
- [ ] No innerHTML with user data
- [ ] Proper error handling
- [ ] Input validation where applicable
- [ ] No sensitive data in code
- [ ] HTTPS-compatible code
- [ ] Cross-browser security testing

## Vulnerability Categories

### High Priority
- Code execution vulnerabilities
- Data exposure issues
- Authentication bypasses (if applicable)

### Medium Priority
- Cross-site scripting (XSS)
- Content injection
- Privacy leaks

### Low Priority
- UI/UX security issues
- Information disclosure (non-sensitive)
- Denial of service (client-side)

## Security Updates

Security updates will be:
- Released as patch versions (e.g., 3.0.1)
- Documented in CHANGELOG.md
- Announced in repository releases
- Tagged with security labels

## Contact

For security-related questions or concerns:
- **Email**: nurealam.tours@gmail.com
- **Repository**: [GitHub Issues](https://github.com/RoamingToursTravels/NureAlam-E-card/issues) (for non-sensitive issues)

---

**Note**: This is a static website project with minimal security risks due to its client-side-only nature and zero external dependencies. However, we maintain this security policy to ensure best practices and user confidence.