/**
 * E-Card JavaScript - Digital Business Card
 * Author: M S Kamran
 * Organization: Roaming BD
 * Version: 3.0.0
 * Description: Interactive functionality for digital business card with enhanced error handling
 */

'use strict';

// ===== CONSTANTS =====
const ANIMATION_CONFIG = {
    notificationDuration: 3000,
    transitionDelay: 100,
    iconRotationDelay: 150
};

// Contact information constants
const CONTACT_INFO = {
    name: 'Nure Alam',
    organization: 'Mind Mentor Overseas LTD.',
    title: 'Managing Partner at Roaming Tours and Travel | Managing Director at Mind Mentor Overseas LTD.',
    officePhone: '01329739725',
    personalPhone: '8801757903911',
    email: 'info@roamingbd.com',
    website: 'https://roamingbd.com/',
    address: 'House-25 (2nd Floor), Road-02, Sector-03, opposite of Shopno, Rajlokkhi, Uttara, Dhaka, Bangladesh',
    whatsappNumber: '8801757903911'
};

// ===== UTILITY FUNCTIONS =====
/**
 * Safely gets an element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} Element or null if not found
 */
function safeGetElement(id) {
    try {
        return document.getElementById(id);
    } catch (error) {
        console.error(`Error getting element with ID '${id}':`, error);
        return null;
    }
}

/**
 * Safely queries elements with error handling
 * @param {string} selector - CSS selector
 * @returns {NodeList|null} Elements or null if error
 */
function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.error(`Error querying selector '${selector}':`, error);
        return null;
    }
}

/**
 * Detects user's device and browser for optimized experience
 * @returns {Object} Device and browser information
 */
function detectUserEnvironment() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    return {
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
        isIOS: /ipad|iphone|ipod/.test(userAgent),
        isAndroid: /android/.test(userAgent),
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isChrome: /chrome/.test(userAgent) && !/edge/.test(userAgent),
        isFirefox: /firefox/.test(userAgent),
        supportsDownload: 'download' in document.createElement('a')
    };
}

// ===== CONTACT MANAGEMENT =====
/**
 * Generates and downloads a vCard contact file with enhanced cross-platform support
 */
function saveContact() {
    const environment = detectUserEnvironment();
    
    try {
        const vCard = generateVCard(CONTACT_INFO);
        const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const fileName = `${CONTACT_INFO.name.toLowerCase().replace(/\s+/g, '-')}-contact.vcf`;

        if (environment.isSafari || environment.isIOS || environment.isAndroid) {
            // For Safari/iOS/Android, direct navigation is more reliable
            handleMobileDownload(url, fileName);
        } else {
            // For desktop browsers, use download attribute
            handleDesktopDownload(url, fileName);
        }
        
        showNotification('Contact ready to be saved!', 'success');
        
        // Performance: Clean up blob URL after a delay
        setTimeout(() => {
            try {
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.warn('Error revoking blob URL:', error);
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error saving contact:', error);
        showNotification('Error saving contact. Please try again.', 'danger');
        
        // Fallback: Show contact info in alert
        showContactFallback();
    }
}

/**
 * Generates vCard string from contact information
 * @param {Object} contact - Contact information object
 * @returns {string} vCard formatted string
 */
function generateVCard(contact) {
    const nameParts = contact.name.split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ');

    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
N:${lastName};${firstName};;;
ORG:${contact.organization}
TITLE:${contact.title}
TEL;TYPE=WORK,VOICE:${contact.officePhone}
TEL;TYPE=CELL,VOICE:${contact.personalPhone}
EMAIL:${contact.email}
URL:${contact.website}
ADR;TYPE=WORK:;;${contact.address}
END:VCARD`;
}

/**
 * Handles contact download for mobile devices
 * @param {string} url - Blob URL
 * @param {string} fileName - File name
 */
function handleMobileDownload(url, fileName) {
    // For mobile devices, open in new window/tab
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow) {
        // If popup blocked, try direct navigation
        window.location.href = url;
    }
}

/**
 * Handles contact download for desktop browsers
 * @param {string} url - Blob URL
 * @param {string} fileName - File name
 */
function handleDesktopDownload(url, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

/**
 * Shows contact information as fallback when download fails
 */
function showContactFallback() {
    const contactText = `
Name: ${CONTACT_INFO.name}
Organization: ${CONTACT_INFO.organization}
Office: ${CONTACT_INFO.officePhone}
Personal: ${CONTACT_INFO.personalPhone}
Email: ${CONTACT_INFO.email}
Website: ${CONTACT_INFO.website}
    `.trim();
    
    if (confirm('Download failed. Would you like to copy contact information to clipboard?')) {
        copyToClipboard(contactText);
    }
}

/**
 * Copies text to clipboard with fallback support
 * @param {string} text - Text to copy
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            showNotification('Contact information copied to clipboard!', 'success');
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Contact information copied!', 'success');
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showNotification('Could not copy to clipboard', 'warning');
    }
}

// ===== WHATSAPP INTEGRATION =====
/**
 * Opens WhatsApp chat with predefined message and enhanced error handling
 */
function openWhatsApp() {
    const message = 'Hello! I found your contact through your digital business card.';
    
    try {
        // Validate WhatsApp number
        if (!CONTACT_INFO.whatsappNumber) {
            throw new Error('WhatsApp number not configured');
        }
        
        const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Try to open in new window first
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        if (!newWindow) {
            // If popup blocked, try direct navigation
            window.location.href = whatsappUrl;
        }
        
        showNotification('Opening WhatsApp...', 'info');
        
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        showNotification('Error opening WhatsApp. Please try again.', 'danger');
        
        // Fallback: Copy number to clipboard
        copyToClipboard(CONTACT_INFO.whatsappNumber);
        showNotification('WhatsApp number copied to clipboard', 'info');
    }
}

// ===== DARK MODE FUNCTIONALITY =====
/**
 * Initializes dark mode toggle functionality with enhanced error handling
 */
function initDarkMode() {
    const darkModeToggle = safeGetElement('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle?.querySelector('i');
    
    if (!darkModeToggle || !icon) {
        console.warn('Dark mode toggle elements not found - feature disabled');
        return false;
    }
    
    try {
        // Check for saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply saved preference
        if (isDarkMode) {
            body.classList.add('dark-mode');
            updateDarkModeIcon(icon, true);
        }
        
        // Add click event listener with error handling
        darkModeToggle.addEventListener('click', function(event) {
            event.preventDefault();
            toggleDarkMode(body, icon, darkModeToggle);
        });
        
        // Add smooth transition to icon
        icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        console.log('Dark mode initialized successfully');
        return true;
        
    } catch (error) {
        console.error('Error initializing dark mode:', error);
        return false;
    }
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
 * @returns {boolean} Success status
 */
function initAnimations() {
    try {
        const animateElements = safeQuerySelectorAll('.animate-element');
        
        if (!animateElements || animateElements.length === 0) {
            console.info('No animation elements found');
            return true; // Not an error, just no elements to animate
        }
        
        animateElements.forEach((element, index) => {
            const delay = parseInt(element.getAttribute('data-delay')) || (index * 100);
            
            setTimeout(() => {
                element.classList.add('animate-in');
            }, delay);
        });
        
        console.log(`🎬 Initialized animations for ${animateElements.length} elements`);
        return true;
        
    } catch (error) {
        console.error('Error initializing animations:', error);
        return false;
    }
}

/**
 * Adds interactive hover effects to social buttons
 * @returns {boolean} Success status
 */
function initSocialButtonEffects() {
    try {
        const socialBtns = safeQuerySelectorAll('.ecard-social-btn');
        
        if (!socialBtns || socialBtns.length === 0) {
            console.info('No social buttons found');
            return true;
        }
        
        socialBtns.forEach(btn => {
            // Add hover effects with error handling
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add touch effects for mobile
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        console.log(`🎯 Initialized effects for ${socialBtns.length} social buttons`);
        return true;
        
    } catch (error) {
        console.error('Error initializing social button effects:', error);
        return false;
    }
}

// ===== INITIALIZATION =====
/**
 * Main initialization function with comprehensive error handling and performance monitoring
 * Runs when DOM content is loaded
 */
function initECard() {
    const startTime = performance.now();
    const initResults = {
        darkMode: false,
        animations: false,
        socialEffects: false,
        errors: []
    };
    
    try {
        console.log('🚀 Initializing E-Card v3.0.0...');
        
        // Initialize core functionality with error tracking
        initResults.darkMode = initDarkMode();
        initResults.animations = initAnimations();
        initResults.socialEffects = initSocialButtonEffects();
        
        // Log initialization results
        const endTime = performance.now();
        const initTime = Math.round(endTime - startTime);
        
        const successCount = Object.values(initResults).filter(result => result === true).length;
        const totalFeatures = 3;
        
        console.log(`✅ E-Card initialized in ${initTime}ms`);
        console.log(`📊 Features loaded: ${successCount}/${totalFeatures}`);
        
        if (successCount === totalFeatures) {
            console.log('🎉 All features loaded successfully!');
        } else {
            console.warn('⚠️ Some features failed to load - check console for details');
        }
        
        // Show success notification for users
        if (successCount >= 2) {
            setTimeout(() => {
                showNotification('Digital business card loaded successfully!', 'success');
            }, 500);
        }
        
    } catch (error) {
        console.error('❌ Critical error initializing E-Card:', error);
        showNotification('Error loading page features. Please refresh.', 'danger');
        
        // Send error to monitoring (if implemented)
        if (typeof window.reportError === 'function') {
            window.reportError('E-Card Initialization Error', error);
        }
    }
}

// ===== EVENT LISTENERS =====
/**
 * Initialize when DOM is ready with enhanced error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        initECard();
    } catch (error) {
        console.error('❌ Failed to initialize E-Card on DOM ready:', error);
        // Fallback initialization attempt
        setTimeout(() => {
            try {
                initECard();
                console.log('✅ Fallback initialization successful');
            } catch (fallbackError) {
                console.error('❌ Fallback initialization also failed:', fallbackError);
            }
        }, 1000);
    }
});

/**
 * Handle page visibility changes for performance optimization
 */
document.addEventListener('visibilitychange', function() {
    try {
        if (document.hidden) {
            // Page is hidden - pause animations and reduce activity
            console.log('📱 Page hidden - optimizing performance');
            
            // Pause any running animations
            const animatedElements = safeQuerySelectorAll('.animate-in');
            animatedElements?.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            
        } else {
            // Page is visible - resume normal operation
            console.log('👁️ Page visible - resuming normal operation');
            
            // Resume animations
            const animatedElements = safeQuerySelectorAll('.animate-in');
            animatedElements?.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    } catch (error) {
        console.error('Error handling visibility change:', error);
    }
});

/**
 * Handle window resize for responsive adjustments
 */
let resizeTimeout;
window.addEventListener('resize', function() {
    try {
        // Debounce resize events
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('📐 Window resized - checking responsive adjustments');
            
            // Trigger any responsive adjustments if needed
            const event = new CustomEvent('ecard:resize', {
                detail: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
            document.dispatchEvent(event);
            
        }, 250);
    } catch (error) {
        console.error('Error handling window resize:', error);
    }
});

/**
 * Handle errors globally for better debugging
 */
window.addEventListener('error', function(event) {
    console.error('🚨 Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    
    // Show user-friendly error message for critical errors
    if (event.message.includes('E-Card') || event.filename?.includes('ecard')) {
        showNotification('A technical error occurred. Please refresh the page.', 'danger');
    }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser behavior
    event.preventDefault();
    
    // Show user notification for promise-related errors
    showNotification('An unexpected error occurred. Please try again.', 'warning');
});

// ===== GLOBAL EXPORTS =====
/**
 * Export functions for global access and external integration
 * Provides a clean API for other scripts to interact with E-Card functionality
 */
if (typeof window !== 'undefined') {
    window.ECard = {
        // Core functions
        saveContact,
        openWhatsApp,
        showNotification,
        
        // Utility functions
        safeGetElement,
        safeQuerySelectorAll,
        detectUserEnvironment,
        
        // Configuration
        config: ANIMATION_CONFIG,
        contactInfo: CONTACT_INFO,
        
        // Theme functions
        toggleDarkMode,
        
        // Initialization (for manual re-init if needed)
        init: initECard,
        
        // Version info
        version: '3.0.0',
        
        // Feature detection
        features: {
            darkMode: () => !!safeGetElement('#darkModeToggle'),
            animations: () => safeQuerySelectorAll('.animate-element')?.length > 0,
            socialButtons: () => safeQuerySelectorAll('.ecard-social-btn')?.length > 0
        },
        
        // Event system for external integration
        on: function(eventName, callback) {
            document.addEventListener(`ecard:${eventName}`, callback);
        },
        
        off: function(eventName, callback) {
            document.removeEventListener(`ecard:${eventName}`, callback);
        },
        
        emit: function(eventName, data) {
            const event = new CustomEvent(`ecard:${eventName}`, { detail: data });
            document.dispatchEvent(event);
        }
    };
    
    // Freeze the API to prevent tampering
    Object.freeze(window.ECard);
    Object.freeze(window.ECard.config);
    Object.freeze(window.ECard.contactInfo);
    Object.freeze(window.ECard.features);
    
    console.log('🌐 E-Card API exported to window.ECard');
}

// ===== DEVELOPMENT HELPERS =====
/**
 * Development mode detection and helpers
 */
if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:'
)) {
    console.log('🔧 Development mode detected');
    
    // Add development helpers
    window.ECardDev = {
        // Debug information
        getDebugInfo: function() {
            return {
                version: '3.0.0',
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                darkMode: document.documentElement.getAttribute('data-theme') === 'dark',
                features: window.ECard?.features || {},
                performance: {
                    loadTime: performance.now(),
                    memory: performance.memory ? {
                        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB'
                    } : 'Not available'
                }
            };
        },
        
        // Test functions
        testNotifications: function() {
            const types = ['success', 'warning', 'danger', 'info'];
            types.forEach((type, index) => {
                setTimeout(() => {
                    showNotification(`Test ${type} notification`, type);
                }, index * 1000);
            });
        },
        
        // Force re-initialization
        reinit: function() {
            console.log('🔄 Force re-initializing E-Card...');
            initECard();
        }
    };
    
    console.log('🛠️ Development helpers available at window.ECardDev');
}