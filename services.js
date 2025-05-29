// Service Model
class Service {
    constructor(id, title, description, icon, image, pricingPlans) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.image = image;
        this.pricingPlans = pricingPlans;
    }
}

// Service Manager
class ServiceManager {
    constructor() {
        this.services = JSON.parse(localStorage.getItem('services')) || this.getDefaultServices();
    }

    getDefaultServices() {
        return [
            {
                id: 'hair-dressing',
                title: {
                    en: 'Hair Dressing Services',
                    rw: 'Serivisi z\'imyambaro'
                },
                description: {
                    en: 'Professional hair styling and treatment services',
                    rw: 'Serivisi z\'imyambaro n\'imyitozo'
                },
                icon: 'fas fa-cut',
                image: 'hair-dressing.jpg',
                pricingPlans: {
                    basic: {
                        price: '$20-30',
                        features: {
                            en: ['Basic Haircut', 'Hair Wash', 'Basic Styling', 'Hair Trim'],
                            rw: ['Gukata imyambaro y\'ibanze', 'Koga imyambaro', 'Gutera imyambaro y\'ibanze', 'Gukata imyambaro']
                        }
                    },
                    standard: {
                        price: '$40-60',
                        features: {
                            en: ['Premium Haircut', 'Deep Conditioning', 'Advanced Styling', 'Basic Hair Color'],
                            rw: ['Gukata imyambaro nziza', 'Gutera imyitozo', 'Gutera imyambaro nziza', 'Gutera amabara y\'ibanze']
                        }
                    },
                    premium: {
                        price: '$80-120',
                        features: {
                            en: ['Luxury Haircut', 'Full Treatment', 'Professional Styling', 'Premium Hair Color', 'Hair Extensions'],
                            rw: ['Gukata imyambaro nziza cyane', 'Gutera imyitozo yose', 'Gutera imyambaro nziza cyane', 'Gutera amabara nziza', 'Gutera imyambaro yongewe']
                        }
                    }
                }
            },
            {
                id: 'electrical',
                title: {
                    en: 'Electrical Services',
                    rw: 'Serivisi z\'amashanyarazi'
                },
                description: {
                    en: 'Expert electrical repairs and installations',
                    rw: 'Gukora no gutera amashanyarazi'
                },
                icon: 'fas fa-bolt',
                image: 'electrical.jpg',
                pricingPlans: {
                    basic: {
                        price: '$50-100',
                        features: {
                            en: ['Basic Repairs', 'Simple Installations', 'Safety Checks', 'Basic Consultation'],
                            rw: ['Gukora vuba', 'Gutera amashanyarazi y\'ibanze', 'Kugenzura ubuzima', 'Kuganira n\'umwishingizi']
                        }
                    },
                    standard: {
                        price: '$150-300',
                        features: {
                            en: ['Advanced Repairs', 'Complex Installations', 'System Upgrades', 'Regular Maintenance'],
                            rw: ['Gukora nziza', 'Gutera amashanyarazi nziza', 'Gusubiramo amashanyarazi', 'Gukurikiranwa']
                        }
                    },
                    premium: {
                        price: '$400-800',
                        features: {
                            en: ['Complete System Repair', 'Full System Installation', 'System Design', 'Home Automation', '24/7 Support'],
                            rw: ['Gukora byose', 'Gutera amashanyarazi yose', 'Gutera amashanyarazi nziza', 'Gutera amashanyarazi y\'imodoka', 'Gufasha buri gihe']
                        }
                    }
                }
            },
            {
                id: 'cooking',
                title: {
                    en: 'Cooking Services',
                    rw: 'Serivisi z\'ubugenge'
                },
                description: {
                    en: 'Professional cooking and catering services',
                    rw: 'Serivisi z\'ubugenge n\'ibiryo'
                },
                icon: 'fas fa-utensils',
                image: 'cooking.jpg',
                pricingPlans: {
                    basic: {
                        price: '$30-50 per meal',
                        features: {
                            en: ['Daily Meal Preparation', 'Basic Menu Options', 'Local Delivery', 'Standard Portions'],
                            rw: ['Guteka ibiryo by\'umunsi', 'Ibiryo by\'ibanze', 'Kuzana ibiryo', 'Ibipimo by\'isanzwe']
                        }
                    },
                    standard: {
                        price: '$100-200 per event',
                        features: {
                            en: ['Event Catering', 'Custom Menu Planning', 'Full Service', 'Setup & Cleanup'],
                            rw: ['Guteka ibiryo by\'umunsi mukuru', 'Guteka ibiryo by\'umunsi mukuru', 'Gutanga serivisi yose', 'Gutanga serivisi yose']
                        }
                    },
                    premium: {
                        price: '$300-500 per event',
                        features: {
                            en: ['Luxury Catering', 'Gourmet Menu', 'Premium Service', 'Professional Staff', 'Equipment Rental'],
                            rw: ['Guteka ibiryo nziza cyane', 'Ibiryo nziza cyane', 'Serivisi nziza cyane', 'Abakozi b\'umwuga', 'Gutanga ibikoresho']
                        }
                    }
                }
            }
        ];
    }

    // Add a new service
    addService(service) {
        this.services.push(service);
        this.saveServices();
    }

    // Update an existing service
    updateService(id, updatedService) {
        const index = this.services.findIndex(service => service.id === id);
        if (index !== -1) {
            this.services[index] = { ...this.services[index], ...updatedService };
            this.saveServices();
        }
    }

    // Delete a service
    deleteService(id) {
        this.services = this.services.filter(service => service.id !== id);
        this.saveServices();
    }

    // Get all services
    getAllServices() {
        return this.services;
    }

    // Get a specific service by ID
    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }

    // Save services to localStorage
    saveServices() {
        localStorage.setItem('services', JSON.stringify(this.services));
    }
}

// Create a global instance of ServiceManager
const serviceManager = new ServiceManager();

// Export the ServiceManager instance
window.serviceManager = serviceManager; 