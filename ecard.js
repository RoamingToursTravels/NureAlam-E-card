/**
 * E-Card JavaScript - Digital Business Card
 * Author: M S Kamran
 * Organization: Roaming BD
 * Description: Interactive functionality for digital business card
 */

// ===== CONSTANTS =====
const ANIMATION_CONFIG = {
    notificationDuration: 3000,
    transitionDelay: 100,
    iconRotationDelay: 150
};

// ===== CONTACT MANAGEMENT =====
/**
 * Generates and downloads a vCard contact file, with an improved method for iOS.
 */
function saveContact() {
    // Hardcoded contact information
    const name = 'Nure Alam';
    const organization = 'Mind Mentor Overseas LTD.';
    const title = 'Managing Partner at Roaming Tours and Travel | Managing Director at Mind Mentor Overseas LTD.';
    const officePhone = '01329739725';
    const personalPhone = '8801757903911';
    const email = 'info@roamingbd.com';
    const website = 'https://roamingbd.com/';
    const address = 'House-25 (2nd Floor), Road-02, Sector-03, opposite of Shopno, Rajlokkhi, Uttara, Dhaka, Bangladesh';

    const nameParts = name.split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ');

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
N:${lastName};${firstName};;;
ORG:${organization}
TITLE:${title}
TEL;TYPE=WORK,VOICE:${officePhone}
TEL;TYPE=CELL,VOICE:${personalPhone}
EMAIL:${email}
URL:${website}
ADR;TYPE=WORK:;;${address}
END:VCARD`;

    // Safari, iOS, and Android devices have issues with the download attribute on blob URLs.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    try {
        const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);

        if (isSafari || isAndroid) {
            // For Safari/iOS/Android, redirecting is a more reliable way to trigger the import prompt.
            window.location.href = url;
        } else {
            // For other browsers, the download attribute works well.
            const downloadLink = document.createElement('a');
            const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}-contact.vcf`;
            
            downloadLink.href = url;
            downloadLink.download = fileName;
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        }
        
        showNotification('Contact ready to be saved!', 'success');
    } catch (error) {
        console.error('Error saving contact:', error);
        showNotification('Error saving contact. Please try again.', 'danger');
    }
}

// ===== WHATSAPP INTEGRATION =====
/**
 * Opens WhatsApp chat with predefined message
 */
function openWhatsApp() {
    const whatsappNumber = '8801757903911';
    const message = 'Hello! I found your contact through your digital business card.';
    
    try {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        showNotification('Error opening WhatsApp. Please try again.', 'danger');
    }
}

// ===== DARK MODE FUNCTIONALITY =====
/**
 * Initializes dark mode toggle functionality
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle?.querySelector('i');
    
    if (!darkModeToggle || !icon) {
        console.error('Dark mode toggle elements not found');
        return;
    }
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved preference
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(icon, true);
    }
    
    // Add click event listener
    darkModeToggle.addEventListener('click', function() {
        toggleDarkMode(body, icon, darkModeToggle);
    });
    
    // Add smooth transition to icon
    icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

/**
 * Toggles between light and dark mode
 * @param {HTMLElement} body - Document body element
 * @param {HTMLElement} icon - Toggle button icon element
 * @param {HTMLElement} toggleButton - Toggle button element
 */
function toggleDarkMode(body, icon, toggleButton) {
    const bgPattern = document.querySelector('.ecard-bg-pattern');
    
    if (!bgPattern) return;
    
    // Add fade effect during transition
    bgPattern.style.opacity = '0.7';
    
    setTimeout(() => {
        // Toggle dark mode class
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Update icon with smooth rotation
        icon.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            updateDarkModeIcon(icon, isDark);
            icon.style.transform = 'rotate(0deg)';
        }, ANIMATION_CONFIG.iconRotationDelay);
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDark.toString());
        
        // Restore background opacity
        setTimeout(() => {
            bgPattern.style.opacity = '1';
        }, ANIMATION_CONFIG.transitionDelay);
        
    }, ANIMATION_CONFIG.transitionDelay);
    
    // Add button press animation
    toggleButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        toggleButton.style.transform = '';
    }, ANIMATION_CONFIG.iconRotationDelay);
}

/**
 * Updates dark mode toggle icon
 * @param {HTMLElement} icon - Icon element to update
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateDarkModeIcon(icon, isDark) {
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== NOTIFICATION SYSTEM =====
/**
 * Displays modern notification messages
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, danger, info, warning)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const iconMap = {
        success: 'check-circle',
        danger: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    // Create notification element
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${iconMap[type] || iconMap.info} me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after specified duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, ANIMATION_CONFIG.notificationDuration);
}

// ===== ANIMATION SYSTEM =====
/**
 * Initializes sequential animations for page elements
 */
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-element');
    
    animateElements.forEach(element => {
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
            element.classList.add('animate-in');
        }, delay);
    });
}

/**
 * Adds interactive hover effects to social buttons
 */
function initSocialButtonEffects() {
    const socialBtns = document.querySelectorAll('.ecard-social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}



// ===== INITIALIZATION =====
/**
 * Main initialization function
 * Runs when DOM content is loaded
 */
function initECard() {
    try {
        // Initialize core functionality
        initDarkMode();
        initAnimations();
        initSocialButtonEffects();
        
        console.log('E-Card initialized successfully');
    } catch (error) {
        console.error('Error initializing E-Card:', error);
        showNotification('Error loading page features. Please refresh.', 'warning');
    }
}

// ===== EVENT LISTENERS =====
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initECard);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations if needed
        console.log('Page hidden - optimizing performance');
    } else {
        // Page is visible - resume normal operation
        console.log('Page visible - resuming normal operation');
    }
});

// Export functions for global access (if needed)
if (typeof window !== 'undefined') {
    window.ECard = {
        saveContact,
        openWhatsApp,
        showNotification,
        config: ANIMATION_CONFIG
    };
}