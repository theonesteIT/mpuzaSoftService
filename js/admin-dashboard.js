// Tab Navigation
document.querySelectorAll('.nav-links li').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.nav-links li').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        // Show selected tab content
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Service Management
function showAddServiceModal() {
    document.getElementById('addServiceModal').style.display = 'block';
}

// Advertisement Management
function showAddAdModal() {
    document.getElementById('addAdModal').style.display = 'block';
}

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

// Form Submissions
document.getElementById('addServiceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add service logic here
    const serviceData = {
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        price: document.getElementById('servicePrice').value,
        image: document.getElementById('serviceImage').files[0]
    };
    
    // Here you would typically send this data to your backend
    console.log('New service:', serviceData);
    this.closest('.modal').style.display = 'none';
});

document.getElementById('addAdForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add advertisement logic here
    const adData = {
        title: document.getElementById('adTitle').value,
        description: document.getElementById('adDescription').value,
        image: document.getElementById('adImage').files[0],
        duration: document.getElementById('adDuration').value
    };
    
    // Here you would typically send this data to your backend
    console.log('New advertisement:', adData);
    this.closest('.modal').style.display = 'none';
});

// Chat System
function initializeChat() {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            // Here you would typically send the message to your backend
            console.log('New message:', message);
            chatInput.value = '';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
    
    // Load initial data
    loadServices();
    loadCustomers();
    loadChats();
    loadAdvertisements();
});

// Data loading functions
function loadServices() {
    // Here you would typically fetch services from your backend
    console.log('Loading services...');
}

function loadCustomers() {
    // Here you would typically fetch customers from your backend
    console.log('Loading customers...');
}

function loadChats() {
    // Here you would typically fetch chats from your backend
    console.log('Loading chats...');
}

function loadAdvertisements() {
    // Here you would typically fetch advertisements from your backend
    console.log('Loading advertisements...');
} 