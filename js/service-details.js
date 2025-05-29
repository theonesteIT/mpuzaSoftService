// Service data
const servicesData = {
    'hair-dressing': {
        title: 'Professional Hair Dressing',
        icon: 'fa-cut',
        description: 'Experience premium hair styling services with our expert stylists. We offer a wide range of services from basic cuts to advanced styling and treatments.',
        features: [
            { icon: 'fa-scissors', text: 'Professional Hair Cutting' },
            { icon: 'fa-palette', text: 'Hair Coloring & Highlights' },
            { icon: 'fa-magic', text: 'Styling & Treatments' },
            { icon: 'fa-spa', text: 'Hair Spa & Conditioning' },
            { icon: 'fa-user-tie', text: 'Expert Stylists' }
        ],
        pricing: [
            {
                title: 'Basic Haircut',
                price: '25,000',
                duration: 'per session',
                features: ['Wash & Cut', 'Basic Styling', 'Consultation']
            },
            {
                title: 'Premium Styling',
                price: '45,000',
                duration: 'per session',
                features: ['Wash & Cut', 'Advanced Styling', 'Treatment', 'Consultation']
            },
            {
                title: 'Color & Highlights',
                price: '75,000',
                duration: 'per session',
                features: ['Color Application', 'Highlights', 'Treatment', 'Styling']
            }
        ]
    },
    'maintenance': {
        title: 'Home Maintenance Services',
        icon: 'fa-tools',
        description: 'Keep your home in perfect condition with our comprehensive maintenance services. Our skilled technicians handle everything from minor repairs to major renovations.',
        features: [
            { icon: 'fa-wrench', text: 'General Repairs' },
            { icon: 'fa-paint-roller', text: 'Painting & Decorating' },
            { icon: 'fa-hammer', text: 'Carpentry Work' },
            { icon: 'fa-toilet', text: 'Plumbing Services' },
            { icon: 'fa-broom', text: 'Cleaning Services' }
        ],
        pricing: [
            {
                title: 'Basic Maintenance',
                price: '50,000',
                duration: 'per visit',
                features: ['General Inspection', 'Minor Repairs', 'Basic Cleaning']
            },
            {
                title: 'Standard Package',
                price: '100,000',
                duration: 'per visit',
                features: ['Full Inspection', 'Repairs', 'Deep Cleaning', 'Maintenance Report']
            },
            {
                title: 'Premium Package',
                price: '200,000',
                duration: 'per visit',
                features: ['Comprehensive Service', 'All Repairs', 'Professional Cleaning', 'Detailed Report']
            }
        ]
    },
    'delivery': {
        title: 'Fast & Reliable Delivery',
        icon: 'fa-truck',
        description: 'Quick and secure delivery services for all your needs. We ensure your items reach their destination safely and on time.',
        features: [
            { icon: 'fa-box', text: 'Package Delivery' },
            { icon: 'fa-clock', text: 'Express Service' },
            { icon: 'fa-map-marked-alt', text: 'Nationwide Coverage' },
            { icon: 'fa-shield-alt', text: 'Secure Handling' },
            { icon: 'fa-route', text: 'Route Optimization' }
        ],
        pricing: [
            {
                title: 'Standard Delivery',
                price: '15,000',
                duration: 'per delivery',
                features: ['Same Day Delivery', 'Basic Tracking', 'Standard Handling']
            },
            {
                title: 'Express Delivery',
                price: '25,000',
                duration: 'per delivery',
                features: ['Priority Delivery', 'Real-time Tracking', 'Secure Handling']
            },
            {
                title: 'Premium Delivery',
                price: '40,000',
                duration: 'per delivery',
                features: ['Immediate Dispatch', 'VIP Handling', 'Insurance Coverage']
            }
        ]
    },
    'electricity': {
        title: 'Electrical Services',
        icon: 'fa-bolt',
        description: 'Professional electrical services for your home and business. Our certified electricians ensure safe and efficient electrical solutions.',
        features: [
            { icon: 'fa-plug', text: 'Installation Services' },
            { icon: 'fa-tools', text: 'Repair & Maintenance' },
            { icon: 'fa-lightbulb', text: 'Lighting Solutions' },
            { icon: 'fa-shield-alt', text: 'Safety Inspections' },
            { icon: 'fa-bolt', text: 'Emergency Services' }
        ],
        pricing: [
            {
                title: 'Basic Service',
                price: '30,000',
                duration: 'per visit',
                features: ['Basic Repairs', 'Installation', 'Safety Check']
            },
            {
                title: 'Standard Service',
                price: '60,000',
                duration: 'per visit',
                features: ['Comprehensive Repairs', 'Installation', 'Full Safety Inspection']
            },
            {
                title: 'Premium Service',
                price: '100,000',
                duration: 'per visit',
                features: ['Complete Service', 'Emergency Support', 'Detailed Report']
            }
        ]
    }
};

// DOM Elements
const serviceIcon = document.getElementById('serviceIcon');
const serviceTitle = document.getElementById('serviceTitle');
const serviceDescription = document.getElementById('serviceDescription');
const serviceFeatures = document.getElementById('serviceFeatures');
const pricingInfo = document.getElementById('pricingInfo');
const bookingForm = document.getElementById('bookingForm');
const paymentForm = document.getElementById('paymentForm');
const chatSection = document.getElementById('chatSection');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');

// Get service type from URL
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('type') || 'hair-dressing';

// Update service content
function updateServiceContent() {
    const service = servicesData[serviceType];
    if (!service) return;

    // Update header
    serviceIcon.className = `fas ${service.icon}`;
    serviceTitle.textContent = service.title;
    serviceDescription.textContent = service.description;

    // Update features
    serviceFeatures.innerHTML = service.features.map(feature => `
        <li>
            <i class="fas ${feature.icon}"></i>
            <span>${feature.text}</span>
        </li>
    `).join('');

    // Update pricing
    pricingInfo.innerHTML = service.pricing.map(plan => `
        <div class="pricing-card">
            <h3>${plan.title}</h3>
            <div class="price">RWF ${plan.price}</div>
            <div class="duration">${plan.duration}</div>
            <ul>
                ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Handle booking form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Show chat section
    chatSection.style.display = 'block';
    
    // Add booking confirmation message
    const message = `
        <div class="message">
            <p><strong>Booking Confirmed!</strong></p>
            <p>Date: ${bookingData.date}</p>
            <p>Time: ${bookingData.time}</p>
            <p>Please provide your location and specific requirements.</p>
        </div>
    `;
    chatMessages.innerHTML = message;
    
    // Scroll to chat section
    chatSection.scrollIntoView({ behavior: 'smooth' });
});

// Handle payment form submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    const paymentData = Object.fromEntries(formData.entries());
    
    // Here you would typically process the payment
    console.log('Payment data:', paymentData);
    
    // Show success message
    alert('Payment processed successfully!');
    paymentForm.reset();
});

// Handle chat form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const message = document.getElementById('messageInput').value;
    
    // Add user message
    const userMessage = `
        <div class="message user-message">
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Requirements:</strong> ${message}</p>
        </div>
    `;
    chatMessages.innerHTML += userMessage;
    
    // Simulate response
    setTimeout(() => {
        const responseMessage = `
            <div class="message">
                <p>Thank you for your request! Our team will review your requirements and get back to you shortly.</p>
                <p>We'll send you a confirmation message with the assigned worker's details.</p>
            </div>
        `;
        chatMessages.innerHTML += responseMessage;
        
        // Clear form
        chatForm.reset();
    }, 1000);
});

// Initialize service content
updateServiceContent();

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close modals when clicking the close button
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
}); 