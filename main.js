/* =========================================
   Krishi Mitra - Main JavaScript
   AI-Powered Farming Revolution
   ========================================= */

// Global Variables
let currentLanguage = 'hindi';
let isLoading = false;
let currentRating = 0;
let scrollIndicator = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize components
    initializeNavigation();
    initializeLanguageToggle();
    initializeScrollEffects();
    initializeAnimations();
    initializeForms();
    initializeFAQ();
    initializeMarketData();
    initializeCharts();
    initializeMobileMenu();
    initializeBackToTop();
    initializeToasts();
    
    console.log('🌱 Krishi Mitra initialized successfully!');
}

// =====================================
// NAVIGATION & SCROLL EFFECTS
// =====================================

function initializeNavigation() {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavOnScroll();
        updateScrollIndicator();
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            updateActiveNavLink(id);
        }
    });
}

// =====================================
// LANGUAGE TOGGLE
// =====================================

function initializeLanguageToggle() {
    const langBtn = document.getElementById('lang-btn');
    const currentLangSpan = document.getElementById('current-lang');
    
    langBtn.addEventListener('click', function() {
        toggleLanguage();
    });
    
    // Set initial language
    setLanguage(currentLanguage);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'hindi' ? 'english' : 'hindi';
    setLanguage(currentLanguage);
    
    // Show toast notification
    const message = currentLanguage === 'hindi' 
        ? 'भाषा हिंदी में बदल गई' 
        : 'Language changed to English';
    showToast(message, 'info');
}

function setLanguage(language) {
    const hindiElements = document.querySelectorAll('.hindi-text');
    const englishElements = document.querySelectorAll('.english-text');
    const currentLangSpan = document.getElementById('current-lang');
    
    if (language === 'hindi') {
        hindiElements.forEach(el => el.classList.remove('hidden'));
        englishElements.forEach(el => el.classList.add('hidden'));
        currentLangSpan.textContent = 'हिंदी';
        document.documentElement.lang = 'hi';
    } else {
        hindiElements.forEach(el => el.classList.add('hidden'));
        englishElements.forEach(el => el.classList.remove('hidden'));
        currentLangSpan.textContent = 'English';
        document.documentElement.lang = 'en';
    }
    
    // Update input placeholders
    updatePlaceholders(language);
}

function updatePlaceholders(language) {
    const placeholders = {
        hindi: {
            'chat-input': 'अपना सवाल यहां टाइप करें...',
            'feedback-name': 'आपका नाम',
            'feedback-email': 'आपका ईमेल',
            'feedback-message': 'आपका फीडबैक'
        },
        english: {
            'chat-input': 'Type your question here...',
            'feedback-name': 'Your Name',
            'feedback-email': 'Your Email',
            'feedback-message': 'Your Feedback'
        }
    };
    
    Object.keys(placeholders[language]).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = placeholders[language][id];
        }
    });
}

// =====================================
// MOBILE MENU
// =====================================

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-menu-btn i');
    
    mobileMenu.classList.remove('hidden');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-menu-btn i');
    
    mobileMenu.classList.add('hidden');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// =====================================
// SCROLL EFFECTS & ANIMATIONS
// =====================================

function initializeScrollEffects() {
    // Create scroll indicator
    createScrollIndicator();
    
    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .video-card, .crop-gallery-item, .investment-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

function createScrollIndicator() {
    scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
}

function updateScrollIndicator() {
    if (scrollIndicator) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
}

function initializeAnimations() {
    // Add fade-in animation class to CSS if not already present
    if (!document.querySelector('style[data-krishi-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-krishi-animations', 'true');
        style.textContent = `
            .animate-fade-in {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-slide-up {
                opacity: 0;
                transform: translateY(50px);
                animation: slideUpIn 0.8s ease-out 0.3s forwards;
            }
            
            @keyframes slideUpIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add initial animation classes
    setTimeout(() => {
        const heroTitle = document.querySelector('#hero h1');
        const heroSubtitle = document.querySelector('#hero p');
        
        if (heroTitle) heroTitle.classList.add('animate-fade-in');
        if (heroSubtitle) heroSubtitle.classList.add('animate-slide-up');
    }, 100);
}

// =====================================
// BACK TO TOP BUTTON
// =====================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.classList.remove('visible');
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
}

// =====================================
// FORMS & USER INTERACTIONS
// =====================================

function initializeForms() {
    initializeInvestmentSlider();
    initializeGetStartedButton();
    initializeFeedbackForm();
    initializeRatingStars();
    initializeCropComparison();
}

function initializeInvestmentSlider() {
    const slider = document.getElementById('investment-slider');
    const display = document.getElementById('investment-display');
    
    if (slider && display) {
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            display.textContent = `₹${value.toLocaleString('en-IN')}`;
        });
        
        // Set initial value
        const initialValue = parseInt(slider.value);
        display.textContent = `₹${initialValue.toLocaleString('en-IN')}`;
    }
}

function initializeGetStartedButton() {
    const getStartedBtn = document.getElementById('get-started-btn');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            document.getElementById('ai-tools').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFeedbackSubmission();
        });
    }
}

function handleFeedbackSubmission() {
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const message = document.getElementById('feedback-message').value;
    
    if (!name || !email || !message || currentRating === 0) {
        const errorMsg = currentLanguage === 'hindi' 
            ? 'कृपया सभी फील्ड भरें और रेटिंग दें'
            : 'Please fill all fields and provide rating';
        showToast(errorMsg, 'error');
        return;
    }
    
    // Simulate form submission
    const form = document.getElementById('feedback-form');
    form.classList.add('loading');
    
    setTimeout(() => {
        form.classList.remove('loading');
        form.reset();
        resetRating();
        
        const successMsg = currentLanguage === 'hindi'
            ? 'आपका फीडबैक सफलतापूर्वक भेजा गया!'
            : 'Your feedback has been submitted successfully!';
        showToast(successMsg, 'success');
    }, 2000);
}

function initializeRatingStars() {
    const stars = document.querySelectorAll('#rating-stars i');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            setRating(index + 1);
        });
        
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
    });
    
    const ratingContainer = document.getElementById('rating-stars');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            highlightStars(currentRating);
        });
    }
}

function setRating(rating) {
    currentRating = rating;
    highlightStars(rating);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#rating-stars i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('text-yellow-400');
            star.classList.remove('text-gray-300');
        } else {
            star.classList.add('text-gray-300');
            star.classList.remove('text-yellow-400');
        }
    });
}

function resetRating() {
    currentRating = 0;
    highlightStars(0);
}

// =====================================
// FAQ FUNCTIONALITY
// =====================================

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQItem(this);
        });
    });
}

function toggleFAQItem(questionBtn) {
    const faqItem = questionBtn.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = questionBtn.querySelector('i');
    
    const isActive = questionBtn.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        const a = q.closest('.faq-item').querySelector('.faq-answer');
        if (a) a.classList.add('hidden');
    });
    
    // Toggle current item
    if (!isActive) {
        questionBtn.classList.add('active');
        answer.classList.remove('hidden');
    }
}

// =====================================
// MARKET DATA & TABLES
// =====================================

function initializeMarketData() {
    loadMarketPrices();
    
    // Update market prices every 30 seconds
    setInterval(loadMarketPrices, 30000);
}

function loadMarketPrices() {
    const marketData = [
        { 
            crop: 'गेहूं / Wheat', 
            current: '₹2,150', 
            yesterday: '₹2,120', 
            trend: 'up',
            change: '+1.4%'
        },
        { 
            crop: 'धान / Rice', 
            current: '₹2,950', 
            yesterday: '₹2,980', 
            trend: 'down',
            change: '-1.0%'
        },
        { 
            crop: 'मक्का / Maize', 
            current: '₹1,850', 
            yesterday: '₹1,850', 
            trend: 'stable',
            change: '0%'
        },
        { 
            crop: 'सोयाबीन / Soybean', 
            current: '₹4,200', 
            yesterday: '₹4,150', 
            trend: 'up',
            change: '+1.2%'
        },
        { 
            crop: 'चना / Chickpea', 
            current: '₹5,300', 
            yesterday: '₹5,350', 
            trend: 'down',
            change: '-0.9%'
        },
        { 
            crop: 'अश्वगंधा / Ashwagandha', 
            current: '₹1,200/kg', 
            yesterday: '₹1,180/kg', 
            trend: 'up',
            change: '+1.7%'
        },
        { 
            crop: 'ड्रैगन फ्रूट / Dragon Fruit', 
            current: '₹350/kg', 
            yesterday: '₹340/kg', 
            trend: 'up',
            change: '+2.9%'
        }
    ];
    
    const tableBody = document.querySelector('#market-price-table tbody');
    if (tableBody) {
        tableBody.innerHTML = marketData.map(item => `
            <tr>
                <td class="px-6 py-4 font-medium">${item.crop}</td>
                <td class="px-6 py-4 font-semibold text-green-600">${item.current}</td>
                <td class="px-6 py-4 text-gray-600">${item.yesterday}</td>
                <td class="px-6 py-4">
                    <span class="price-trend ${item.trend}">
                        <i class="fas fa-arrow-${item.trend === 'up' ? 'up' : item.trend === 'down' ? 'down' : 'right'}"></i>
                        ${item.change}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

// =====================================
// CROP COMPARISON TOOL
// =====================================

function initializeCropComparison() {
    const compareButton = document.getElementById('compare-crops');
    
    if (compareButton) {
        compareButton.addEventListener('click', function() {
            handleCropComparison();
        });
    }
}

function handleCropComparison() {
    const crop1 = document.getElementById('crop1-select').value;
    const crop2 = document.getElementById('crop2-select').value;
    const resultsDiv = document.getElementById('comparison-results');
    
    if (!crop1 || !crop2) {
        const errorMsg = currentLanguage === 'hindi' 
            ? 'कृपया दो फसलें चुनें'
            : 'Please select two crops';
        showToast(errorMsg, 'error');
        return;
    }
    
    if (crop1 === crop2) {
        const errorMsg = currentLanguage === 'hindi' 
            ? 'कृपया अलग-अलग फसलें चुनें'
            : 'Please select different crops';
        showToast(errorMsg, 'error');
        return;
    }
    
    // Get crop data
    const cropData = getCropComparisonData();
    const data1 = cropData[crop1];
    const data2 = cropData[crop2];
    
    // Display comparison results
    displayComparisonResults(data1, data2, resultsDiv);
}

function getCropComparisonData() {
    return {
        ashwagandha: {
            name: 'Ashwagandha / अश्वगंधा',
            investment: 25000,
            roi: 1100,
            timeToHarvest: '6 months',
            difficulty: 'Easy',
            marketDemand: 'Very High',
            subsidy: '75% NMPB support'
        },
        bamboo: {
            name: 'Bamboo / बांस',
            investment: 60000,
            roi: 1433,
            timeToHarvest: '5 years',
            difficulty: 'Medium',
            marketDemand: 'Extremely High',
            subsidy: 'National Bamboo Mission'
        },
        dragon_fruit: {
            name: 'Dragon Fruit / ड्रैगन फ्रूट',
            investment: 200000,
            roi: 225,
            timeToHarvest: '18 months',
            difficulty: 'Medium',
            marketDemand: 'Very High',
            subsidy: '₹30,000/hectare'
        },
        strawberry: {
            name: 'Strawberry / स्ट्रॉबेरी',
            investment: 80000,
            roi: 600,
            timeToHarvest: '4 months',
            difficulty: 'High',
            marketDemand: 'Very High',
            subsidy: 'Horticulture Mission'
        },
        aloe_vera: {
            name: 'Aloe Vera / घृतकुमारी',
            investment: 15000,
            roi: 700,
            timeToHarvest: '8 months',
            difficulty: 'Very Easy',
            marketDemand: 'High',
            subsidy: 'Available'
        }
    };
}

function displayComparisonResults(data1, data2, container) {
    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white rounded-lg shadow-lg">
                <thead>
                    <tr class="bg-indigo-600 text-white">
                        <th class="px-6 py-4 text-left">Parameter / पैरामीटर</th>
                        <th class="px-6 py-4 text-center">${data1.name}</th>
                        <th class="px-6 py-4 text-center">${data2.name}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 font-medium">Investment / निवेश</td>
                        <td class="px-6 py-4 text-center ${data1.investment < data2.investment ? 'text-green-600 font-bold' : ''}">${formatCurrency(data1.investment)}</td>
                        <td class="px-6 py-4 text-center ${data2.investment < data1.investment ? 'text-green-600 font-bold' : ''}">${formatCurrency(data2.investment)}</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="px-6 py-4 font-medium">ROI %</td>
                        <td class="px-6 py-4 text-center ${data1.roi > data2.roi ? 'text-green-600 font-bold' : ''}">${data1.roi}%</td>
                        <td class="px-6 py-4 text-center ${data2.roi > data1.roi ? 'text-green-600 font-bold' : ''}">${data2.roi}%</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 font-medium">Time to Harvest / फसल का समय</td>
                        <td class="px-6 py-4 text-center">${data1.timeToHarvest}</td>
                        <td class="px-6 py-4 text-center">${data2.timeToHarvest}</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="px-6 py-4 font-medium">Difficulty / कठिनाई</td>
                        <td class="px-6 py-4 text-center">${data1.difficulty}</td>
                        <td class="px-6 py-4 text-center">${data2.difficulty}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 font-medium">Market Demand / बाजार की मांग</td>
                        <td class="px-6 py-4 text-center">${data1.marketDemand}</td>
                        <td class="px-6 py-4 text-center">${data2.marketDemand}</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="px-6 py-4 font-medium">Government Subsidy / सब्सिडी</td>
                        <td class="px-6 py-4 text-center">${data1.subsidy}</td>
                        <td class="px-6 py-4 text-center">${data2.subsidy}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-2">
                <i class="fas fa-lightbulb mr-2"></i>
                <span class="hindi-text">सिफारिश</span>
                <span class="english-text hidden">Recommendation</span>
            </h4>
            <p class="text-blue-700">
                ${getComparisonRecommendation(data1, data2)}
            </p>
        </div>
    `;
    
    container.classList.remove('hidden');
}

function getComparisonRecommendation(data1, data2) {
    if (currentLanguage === 'hindi') {
        if (data1.roi > data2.roi && data1.investment < data2.investment) {
            return `${data1.name.split('/')[1]} बेहतर विकल्प है क्योंकि यह कम निवेश में ज्यादा ROI देता है।`;
        } else if (data2.roi > data1.roi && data2.investment < data1.investment) {
            return `${data2.name.split('/')[1]} बेहतर विकल्प है क्योंकि यह कम निवेश में ज्यादा ROI देता है।`;
        } else if (data1.roi > data2.roi) {
            return `${data1.name.split('/')[1]} ज्यादा ROI देता है लेकिन ज्यादा निवेश चाहिए।`;
        } else {
            return `${data2.name.split('/')[1]} ज्यादा ROI देता है लेकिन ज्यादा निवेश चाहिए।`;
        }
    } else {
        if (data1.roi > data2.roi && data1.investment < data2.investment) {
            return `${data1.name.split('/')[0]} is better as it offers higher ROI with lower investment.`;
        } else if (data2.roi > data1.roi && data2.investment < data1.investment) {
            return `${data2.name.split('/')[0]} is better as it offers higher ROI with lower investment.`;
        } else if (data1.roi > data2.roi) {
            return `${data1.name.split('/')[0]} offers higher ROI but requires more investment.`;
        } else {
            return `${data2.name.split('/')[0]} offers higher ROI but requires more investment.`;
        }
    }
}

// =====================================
// CHARTS & VISUALIZATIONS
// =====================================

function initializeCharts() {
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        setupWealthProjectionChart();
    }
}

function setupWealthProjectionChart() {
    const canvas = document.getElementById('wealth-projection-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample data - this will be updated by AI recommendations
    const data = {
        labels: ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 10'],
        datasets: [{
            label: 'Portfolio Value (₹ Lakhs)',
            data: [1, 4, 8, 15, 22, 35, 75],
            borderColor: 'rgb(22, 163, 74)',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value (₹ Lakhs)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `₹${context.parsed.y} Lakhs`;
                        }
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// =====================================
// TOAST NOTIFICATIONS
// =====================================

function initializeToasts() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-4';
        document.body.appendChild(container);
    }
}

function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colors = {
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600'
    };
    
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="${icons[type]} ${colors[type]} text-xl mr-3"></i>
            <div class="flex-1">
                <p class="font-medium text-gray-800">${message}</p>
            </div>
            <button onclick="removeToast(this)" class="ml-4 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

function removeToast(element) {
    const toast = element.classList ? element : element.closest('.toast');
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =====================================
// ERROR HANDLING
// =====================================

window.addEventListener('error', function(e) {
    console.error('Krishi Mitra Error:', e.error);
    showToast('An error occurred. Please refresh the page.', 'error');
});

// =====================================
// PERFORMANCE MONITORING
// =====================================

// Log performance metrics
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Krishi Mitra loaded in ${loadTime}ms`);
        
        // Log to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime),
                custom_parameter: 'krishi_mitra'
            });
        }
    }
});

// =====================================
// EXPORT FOR MODULE USAGE
// =====================================

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        formatCurrency,
        toggleLanguage,
        setLanguage
    };
}

// Make functions available globally
window.KrishiMitra = {
    showToast,
    formatCurrency,
    toggleLanguage,
    setLanguage,
    removeToast
};