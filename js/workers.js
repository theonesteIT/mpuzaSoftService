// Sample worker data
const workersData = {
    'john-doe': {
        name: 'John Doe',
        title: 'Professional Hair Stylist',
        location: 'New York, NY',
        rating: 4.8,
        image: 'images/worker1.jpg',
        status: 'available',
        experience: 5,
        clients: 120,
        about: 'Experienced hair stylist with a passion for creating beautiful looks. Specialized in modern cuts and color techniques.',
        skills: ['Hair Cutting', 'Color Treatment', 'Styling', 'Extensions', 'Consultation'],
        experience: [
            {
                title: 'Senior Stylist',
                company: 'Glamour Salon',
                period: '2020 - Present',
                description: 'Leading a team of stylists and managing high-profile clients.'
            },
            {
                title: 'Hair Stylist',
                company: 'Style Studio',
                period: '2018 - 2020',
                description: 'Provided hair services and maintained client relationships.'
            }
        ],
        education: [
            {
                degree: 'Advanced Hair Design',
                school: 'Beauty Academy',
                year: '2018'
            }
        ]
    },
    'jane-smith': {
        name: 'Jane Smith',
        title: 'Electrical Engineer',
        location: 'Los Angeles, CA',
        rating: 4.9,
        image: 'images/worker2.jpg',
        status: 'busy',
        experience: 8,
        clients: 200,
        about: 'Licensed electrical engineer with extensive experience in residential and commercial projects.',
        skills: ['Electrical Installation', 'Maintenance', 'Repairs', 'Safety Inspection', 'Project Management'],
        experience: [
            {
                title: 'Senior Electrical Engineer',
                company: 'Power Solutions Inc.',
                period: '2019 - Present',
                description: 'Managing large-scale electrical projects and leading a team of technicians.'
            }
        ],
        education: [
            {
                degree: 'B.S. Electrical Engineering',
                school: 'Tech University',
                year: '2015'
            }
        ]
    }
};

// DOM Elements
const searchInput = document.querySelector('.search-box input');
const categoryFilter = document.querySelector('#category');
const sortFilter = document.querySelector('#sort');
const workersContainer = document.querySelector('.workers-container');
const workerProfileModal = document.querySelector('.worker-profile-modal');
const workerProfileContent = document.querySelector('.worker-profile');
const applicationForm = document.querySelector('.application-form');
const fileInput = document.querySelector('input[type="file"]');
const fileNameDisplay = document.querySelector('.file-name');

// Show worker profile
function showWorkerProfile(workerId) {
    const worker = workersData[workerId];
    if (!worker) return;

    // Update profile content
    workerProfileContent.innerHTML = `
        <div class="profile-header">
            <img src="${worker.image}" alt="${worker.name}">
            <div class="profile-info">
                <h2>${worker.name}</h2>
                <p class="worker-title">${worker.title}</p>
                <p class="worker-location"><i class="fas fa-map-marker-alt"></i> ${worker.location}</p>
                <div class="profile-stats">
                    <span><i class="fas fa-star"></i> ${worker.rating} Rating</span>
                    <span><i class="fas fa-briefcase"></i> ${worker.experience} Years</span>
                    <span><i class="fas fa-users"></i> ${worker.clients} Clients</span>
                </div>
            </div>
        </div>
        <div class="profile-details">
            <h3>About</h3>
            <p>${worker.about}</p>
            
            <h3>Skills</h3>
            <div class="skills-list">
                ${worker.skills.map(skill => `<span>${skill}</span>`).join('')}
            </div>
            
            <h3>Experience</h3>
            ${worker.experience.map(exp => `
                <div class="experience-item">
                    <h4>${exp.title}</h4>
                    <p>${exp.company} | ${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
            
            <h3>Education</h3>
            ${worker.education.map(edu => `
                <div class="education-item">
                    <h4>${edu.degree}</h4>
                    <p>${edu.school} | ${edu.year}</p>
                </div>
            `).join('')}
        </div>
        <div class="profile-actions">
            <button class="contact-btn"><i class="fas fa-envelope"></i> Contact</button>
            <button class="book-btn"><i class="fas fa-calendar-check"></i> Book Now</button>
        </div>
    `;

    // Show modal
    workerProfileModal.style.display = 'flex';
}

// Search and filter functionality
function filterWorkers() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;

    // Filter workers based on search term and category
    const filteredWorkers = Object.entries(workersData).filter(([id, worker]) => {
        const matchesSearch = worker.name.toLowerCase().includes(searchTerm) ||
                            worker.title.toLowerCase().includes(searchTerm) ||
                            worker.location.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || worker.title.toLowerCase().includes(category);
        return matchesSearch && matchesCategory;
    });

    // Sort workers
    filteredWorkers.sort((a, b) => {
        const workerA = a[1];
        const workerB = b[1];
        switch (sortBy) {
            case 'rating':
                return workerB.rating - workerA.rating;
            case 'experience':
                return workerB.experience - workerA.experience;
            case 'clients':
                return workerB.clients - workerA.clients;
            default:
                return 0;
        }
    });

    // Update worker cards
    workersContainer.innerHTML = filteredWorkers.map(([id, worker]) => `
        <div class="worker-card">
            <div class="worker-image">
                <img src="${worker.image}" alt="${worker.name}">
                <span class="worker-status ${worker.status}">${worker.status}</span>
            </div>
            <div class="worker-info">
                <h3>${worker.name}</h3>
                <p class="worker-title">${worker.title}</p>
                <p class="worker-location"><i class="fas fa-map-marker-alt"></i> ${worker.location}</p>
                <div class="worker-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>${worker.rating}</span>
                </div>
                <div class="worker-stats">
                    <span><i class="fas fa-briefcase"></i> ${worker.experience} years</span>
                    <span><i class="fas fa-users"></i> ${worker.clients} clients</span>
                </div>
                <button class="view-profile-btn" onclick="showWorkerProfile('${id}')">View Profile</button>
            </div>
        </div>
    `).join('');
}

// File upload handling
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name;
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
});

// Application form handling
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(applicationForm);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your server
    console.log('Application submitted:', data);
    
    // Show success message
    alert('Application submitted successfully! We will review your application and get back to you soon.');
    applicationForm.reset();
    fileNameDisplay.textContent = 'No file chosen';
});

// Event listeners
searchInput.addEventListener('input', filterWorkers);
categoryFilter.addEventListener('change', filterWorkers);
sortFilter.addEventListener('change', filterWorkers);

// Close modal when clicking outside
workerProfileModal.addEventListener('click', (e) => {
    if (e.target === workerProfileModal) {
        workerProfileModal.style.display = 'none';
    }
});

// Initialize workers list
filterWorkers();

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