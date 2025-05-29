// Service data
const services = {
    'hair-dressing': {
        title: 'Hair Dressing Services',
        description: 'Professional hair styling services including cutting, coloring, and styling. Our experienced stylists will help you achieve your desired look.',
        price: '50,000 RWF',
        image: 'images/hair-dressing.jpg'
    },
    'maintenance': {
        title: 'Maintenance Services',
        description: 'Comprehensive home and office maintenance services including plumbing, electrical repairs, and general maintenance.',
        price: '75,000 RWF',
        image: 'images/maintenance.jpg'
    },
    'delivery': {
        title: 'Delivery Services',
        description: 'Fast and reliable delivery services for packages and goods across the city. Track your delivery in real-time.',
        price: '25,000 RWF',
        image: 'images/delivery.jpg'
    },
    'electricity': {
        title: 'Electrical Services',
        description: 'Professional electrical services including installations, repairs, and maintenance for homes and businesses.',
        price: '60,000 RWF',
        image: 'images/electricity.jpg'
    },
    'cleaning': {
        title: 'Cleaning Services',
        description: 'Professional cleaning services for homes and offices. We offer regular cleaning, deep cleaning, and specialized cleaning solutions.',
        price: '45,000 RWF',
        image: 'images/cleaning.jpg'
    },
    'cooking': {
        title: 'Cooking Services',
        description: 'Expert chefs available for home cooking, catering, and special events. Enjoy delicious meals prepared in your own kitchen.',
        price: '65,000 RWF',
        image: 'images/cooking.jpg'
    },
    'gardening': {
        title: 'Gardening Services',
        description: 'Professional gardening and landscaping services. We handle garden maintenance, design, and plant care.',
        price: '40,000 RWF',
        image: 'images/gardening.jpg'
    },
    'security': {
        title: 'Security Services',
        description: 'Professional security guards and surveillance systems for homes and businesses. 24/7 protection and monitoring.',
        price: '80,000 RWF',
        image: 'images/security.jpg'
    }
};

// Language switching functionality
let currentLang = 'en';

function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.lang-dropdown-content');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.lang-dropdown');
    if (!dropdown.contains(event.target)) {
        document.querySelector('.lang-dropdown-content').classList.remove('show');
    }
});

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update dropdown button text
    const langBtn = document.querySelector('.lang-dropdown-btn span');
    const langTranslations = document.querySelector(`.lang-content[data-lang="${lang}"]`);
    if (langTranslations) {
        const currentLangText = langTranslations.querySelector('[data-key="currentLang"]');
        if (currentLangText) {
            langBtn.textContent = currentLangText.textContent;
        }
    }
    
    // Close dropdown
    document.querySelector('.lang-dropdown-content').classList.remove('show');

    // Get translations for selected language
    const translations = document.querySelector(`.lang-content[data-lang="${lang}"]`);
    if (!translations) return;

    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations.querySelector(`[data-key="${key}"]`);
        if (translation) {
            element.textContent = translation.textContent;
        }
    });

    // Update service descriptions
    Object.keys(services).forEach(serviceId => {
        const service = services[serviceId];
        const titleKey = `${serviceId}Title`;
        const descKey = `${serviceId}Desc`;
        
        const titleTranslation = translations.querySelector(`[data-key="${titleKey}"]`);
        const descTranslation = translations.querySelector(`[data-key="${descKey}"]`);
        
        if (titleTranslation) service.title = titleTranslation.textContent;
        if (descTranslation) service.description = descTranslation.textContent;
    });

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);
});

// Modal functionality
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showSignupModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'block';
}

// Close modals when clicking the X or outside the modal
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Service details functionality
function showServiceDetails(serviceId) {
    const service = services[serviceId];
    if (!service) return;

    // Check if user is logged in
    if (!isUserLoggedIn()) {
        // Show login modal first
        showLoginModal();
        // Store the service ID to show after login
        localStorage.setItem('pendingService', serviceId);
        return;
    }

    // If user is logged in, show service details
    document.getElementById('serviceTitle').textContent = service.title;
    document.getElementById('serviceDescription').textContent = service.description;
    document.getElementById('servicePrice').textContent = service.price;
    document.getElementById('serviceImage').src = service.image;
    
    document.getElementById('serviceDetailsModal').style.display = 'block';
}

// User authentication state
let isLoggedIn = false;

function isUserLoggedIn() {
    return isLoggedIn;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Here you would typically validate credentials with your backend
    // For demo purposes, we'll just set logged in to true
    isLoggedIn = true;
    
    // Close login modal
    document.getElementById('loginModal').style.display = 'none';
    
    // Check if there's a pending service to show
    const pendingService = localStorage.getItem('pendingService');
    if (pendingService) {
        showServiceDetails(pendingService);
        localStorage.removeItem('pendingService');
    }
});

// Handle payment form submission
function showPaymentForm() {
    // Always show PayPal payment form
    document.getElementById('serviceDetailsModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'block';
    
    // Switch to PayPal tab automatically
    switchPaymentMethod('paypal');
    
    // Update payment info
    const serviceTitle = document.getElementById('serviceTitle').textContent;
    const servicePrice = document.getElementById('servicePrice').textContent;
    
    document.getElementById('paymentServiceName').textContent = serviceTitle;
    document.getElementById('paymentAmount').textContent = servicePrice;
}

// SMS Service Configuration
const SMS_CONFIG = {
    username: 'sandbox', // Default sandbox username, update with your actual username
    apiKey: 'atsk_4bcf0ee09e26594a0f4cbe79a5c1eeae66671dbd8e89ff5ecd6c38679c898830e4cb3328',
    senderId: 'NGERERAYO',
    apiUrl: 'https://api.africastalking.com/version1/messaging',
    defaultPhone: '0798699601' // Default phone number for notifications
};

// Payment handling functions
function initiatePayment() {
    const form = document.getElementById('paymentForm');
    const formData = new FormData(form);
    
    // Validate phone number
    const phone = formData.get('phone');
    if (!isValidPhoneNumber(phone)) {
        showError('Telefoni yawe ntabwo ari nziza. Nyamuneka andika telefoni yawe nziza (Nka: 0788123456)');
        return;
    }
    
    // Validate email
    const email = formData.get('email');
    if (!isValidEmail(email)) {
        showError('Email yawe ntabwo ari nziza. Nyamuneka andika email yawe nziza');
        return;
    }
    
    // Validate name
    const name = formData.get('name');
    if (!name.trim()) {
        showError('Nyamuneka andika amazina yawe');
        return;
    }

    // Send initial SMS
    sendInitialSMS({
        phone: phone,
        name: name,
        service: document.getElementById('paymentServiceName').textContent,
        amount: document.getElementById('paymentAmount').textContent
    });
    
    // Show mobile confirmation modal
    document.getElementById('mobileConfirmationModal').style.display = 'block';
}

// Send initial SMS before payment
async function sendInitialSMS(paymentInfo) {
    const message = `Urakoze ${paymentInfo.name}!
    
Ubutumwa bwo kwishyura:
Serivisi: ${paymentInfo.service}
Amafaranga: ${paymentInfo.amount}

Kugirango ukohereze, kanda kuri "Emeza" kuri telefoni yawe.

Ubutumwa bwemeza buzakozwa kuri: ${SMS_CONFIG.defaultPhone}`;

    try {
        await sendSMS(paymentInfo.phone, message);
        console.log('Initial SMS sent successfully');
    } catch (error) {
        console.error('Error sending initial SMS:', error);
        showError('Habaye ikibazo mu kohereza ubutumwa. Nyamuneka ongera ugerageze.');
    }
}

// Send SMS using Africa's Talking API
async function sendSMS(phoneNumber, message) {
    try {
        // Use default phone if none provided
        const targetPhone = phoneNumber || SMS_CONFIG.defaultPhone;
        
        // Format phone number to international format
        const formattedPhone = targetPhone.startsWith('0') ? '+250' + targetPhone.substring(1) : targetPhone;
        
        console.log('Sending SMS to:', formattedPhone);
        
        const response = await fetch(SMS_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'apiKey': SMS_CONFIG.apiKey
            },
            body: new URLSearchParams({
                username: SMS_CONFIG.username,
                to: formattedPhone,
                message: message,
                from: SMS_CONFIG.senderId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('SMS API Error:', errorData);
            throw new Error(errorData.message || 'SMS sending failed');
        }

        const result = await response.json();
        console.log('SMS sent successfully:', result);
        return result;
    } catch (error) {
        console.error('SMS sending error:', error);
        throw error;
    }
}

// Send payment confirmation SMS
async function sendPaymentConfirmationSMS(paymentDetails) {
    const message = `Urakoze ${paymentDetails.payer.name}!

Kwishyura kwawe kwa ${paymentDetails.amount} ${paymentDetails.currency} kwa ${paymentDetails.service} byagenze neza.

Order ID: ${paymentDetails.orderId}
Itariki: ${new Date().toLocaleDateString('rw-RW')}

Ubutumwa bwemeza buzakozwa kuri: ${SMS_CONFIG.defaultPhone}

Urakoze kwishyura!`;

    try {
        // Send to both customer and default number
        await Promise.all([
            sendSMS(paymentDetails.payer.phone, message),
            sendSMS(SMS_CONFIG.defaultPhone, `New Payment Received:
Service: ${paymentDetails.service}
Amount: ${paymentDetails.amount} ${paymentDetails.currency}
Customer: ${paymentDetails.payer.name}
Phone: ${paymentDetails.payer.phone}
Order ID: ${paymentDetails.orderId}`)
        ]);
        console.log('Payment confirmation SMS sent successfully');
    } catch (error) {
        console.error('Error sending payment confirmation SMS:', error);
        showError('Habaye ikibazo mu kohereza ubutumwa bwemeza. Nyamuneka ongera ugerageze.');
    }
}

function isValidPhoneNumber(phone) {
    // Check if phone number is 10 digits and starts with 07
    return /^07\d{8}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorModal.style.display = 'block';
}

function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}

function confirmMobilePayment() {
    // Close mobile confirmation modal
    document.getElementById('mobileConfirmationModal').style.display = 'none';
    
    // Show PayPal button
    renderPayPalButton();
}

function closeMobileConfirmation() {
    document.getElementById('mobileConfirmationModal').style.display = 'none';
}

// PayPal Integration
function renderPayPalButton() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
        },
        createOrder: function(data, actions) {
            const price = getServicePrice();
            const usdPrice = convertToUSD(price);
            
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: usdPrice,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: usdPrice
                            }
                        }
                    },
                    description: document.getElementById('paymentServiceName').textContent,
                    custom_id: generateOrderId()
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Payment completed successfully
                console.log('Payment completed:', details);
                
                // Get form data
                const form = document.getElementById('paymentForm');
                const formData = new FormData(form);
                
                // Store payment details
                const paymentDetails = {
                    orderId: details.id,
                    status: details.status,
                    amount: details.purchase_units[0].amount.value,
                    currency: details.purchase_units[0].amount.currency_code,
                    service: document.getElementById('paymentServiceName').textContent,
                    payer: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone')
                    },
                    timestamp: new Date().toISOString()
                };
                
                // Send payment confirmation SMS
                sendPaymentConfirmationSMS(paymentDetails);
                
                // Show success message
                showPaymentSuccess(paymentDetails);
            });
        },
        onError: function(err) {
            console.error('PayPal Error:', err);
            showError('Habaye ikibazo mu kwishyura. Nyamuneka ongera ugerageze.');
        }
    }).render('#paypal-button-container');
}

function showPaymentSuccess(paymentDetails) {
    const successModal = document.getElementById('paymentSuccessModal');
    const paymentDetailsElement = document.getElementById('paymentDetails');
    
    // Update payment details
    paymentDetailsElement.innerHTML = `
        <strong>Order ID:</strong> ${paymentDetails.orderId}<br>
        <strong>Amafaranga:</strong> ${paymentDetails.amount} ${paymentDetails.currency}<br>
        <strong>Serivisi:</strong> ${paymentDetails.service}<br>
        <strong>Umukiriya:</strong> ${paymentDetails.payer.name}<br>
        <strong>Email:</strong> ${paymentDetails.payer.email}<br>
        <strong>Telefoni:</strong> ${paymentDetails.payer.phone}
    `;
    
    // Show success modal
    document.getElementById('paymentModal').style.display = 'none';
    successModal.style.display = 'block';
}

function closePaymentSuccessModal() {
    document.getElementById('paymentSuccessModal').style.display = 'none';
    // Refresh the page or redirect to home
    window.location.reload();
}

// Helper function to convert RWF to USD (using a fixed rate for demo)
function convertToUSD(rwfAmount) {
    // Remove currency symbol and commas
    const cleanAmount = rwfAmount.replace(/[^0-9.-]+/g, '');
    // Convert to number
    const amount = parseFloat(cleanAmount);
    // Convert RWF to USD (using approximate rate of 1 USD = 1300 RWF)
    const usdAmount = amount / 1300;
    // Round to 2 decimal places
    return usdAmount.toFixed(2);
}

// Generate a unique order ID
function generateOrderId() {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get service price from the UI
function getServicePrice() {
    const priceText = document.getElementById('paymentAmount').textContent;
    return priceText;
}

// Logout functionality
function logout() {
    isLoggedIn = false;
    // Clear any stored data
    localStorage.removeItem('pendingService');
    // Redirect to home or refresh page
    window.location.reload();
}

// Update UI based on login state
function updateUIForLoginState() {
    const loginBtn = document.querySelector('.login-btn');
    if (isLoggedIn) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
    } else {
        loginBtn.textContent = 'Sign In';
        loginBtn.onclick = showLoginModal;
    }
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateUIForLoginState();
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);
});

// Mobile menu functionality
document.querySelector('.hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto slideshow
setInterval(() => {
    changeSlide(1);
}, 5000);

// Payment Methods
function switchPaymentMethod(method) {
    const momoForm = document.getElementById('momoPaymentForm');
    const paypalForm = document.getElementById('paypalPaymentForm');
    const tabs = document.querySelectorAll('.payment-tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    if (method === 'momo') {
        momoForm.style.display = 'block';
        paypalForm.style.display = 'none';
    } else {
        momoForm.style.display = 'none';
        paypalForm.style.display = 'block';
        renderPayPalButton();
    }
}

// Handle MTN MoMo payment
document.getElementById('momoPaymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phoneNumber = formData.get('phone');
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Here you would typically integrate with MTN Mobile Money API
    // For now, we'll just show a success message
    const message = `Payment request sent to ${phoneNumber}. Please check your phone to complete the payment.`;
    showPaymentSuccess();
}); 