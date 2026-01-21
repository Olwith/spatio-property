import { supabase } from './supabase.js';
import { AnimationController, DataFormatter, FormValidator } from './utils.js';

class SpatioApp {
    constructor() {
        this.animation = new AnimationController();
        this.services = this.getServicesData();
        this.init();
    }

    async init() {
        // Load initial data
        await this.loadProperties();
        await this.loadLands();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Populate services
        this.populateServices();
        
        // Setup contact form
        this.setupContactForm();
    }

    getServicesData() {
        return [
            {
                id: 'property-bazaar',
                title: 'Property Bazaar Services',
                icon: 'fa-store',
                description: 'Comprehensive property listing, marketing, and transaction management.',
                details: `
                    <h5>Property Bazaar Services</h5>
                    <p>We provide end-to-end property transaction services including:</p>
                    <ul>
                        <li>Property listing and marketing</li>
                        <li>Buyer/seller matchmaking</li>
                        <li>Transaction coordination</li>
                        <li>Documentation support</li>
                        <li>Market analysis and pricing</li>
                    </ul>
                    <p><strong>Contact us for a free property valuation!</strong></p>
                `
            },
            {
                id: 'renting-letting',
                title: 'Renting / Letting',
                icon: 'fa-house-user',
                description: 'Professional property management and tenant placement services.',
                details: 'Detailed renting and letting services...'
            },
            // Add all other services...
        ];
    }

    async loadProperties() {
        try {
            const { data: properties, error } = await supabase
                .from('properties')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            this.renderProperties(properties || []);
        } catch (error) {
            console.error('Error loading properties:', error);
            this.showError('propertiesContainer', 'Unable to load properties. Please try again later.');
        }
    }

    renderProperties(properties) {
        const container = document.getElementById('propertiesContainer');
        if (!container) return;

        container.innerHTML = properties.map((property, index) => `
            <div class="col-md-6 col-lg-4">
                <div class="card property-card stagger-animate" data-delay="${index * 100}">
                    <img src="${property.main_image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80'}" 
                         class="property-img" alt="${property.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${property.title}</h5>
                            <span class="badge ${property.category === 'rent' ? 'bg-info' : 'bg-primary'}">
                                ${property.category === 'rent' ? 'For Rent' : 'For Sale'}
                            </span>
                        </div>
                        <p class="card-text text-muted small mb-2">
                            <i class="fas fa-map-marker-alt me-1"></i> ${property.location}
                        </p>
                        <p class="card-text mb-3">${property.description.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="text-primary mb-0">KSH ${property.price.toLocaleString()}</h5>
                            <div>
                                <button class="btn btn-sm btn-outline-primary me-2" 
                                        onclick="app.viewPropertyPhotos(${property.id})">
                                    <i class="fas fa-images"></i>
                                </button>
                                <button class="btn btn-sm btn-primary" 
                                        onclick="window.propertyMap.highlightMarker('property', ${property.id})">
                                    <i class="fas fa-map-marker-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Trigger animations
        this.animation.initStaggerAnimations();
    }

    async loadLands() {
        try {
            const { data: lands, error } = await supabase
                .from('lands')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            this.renderLands(lands || []);
        } catch (error) {
            console.error('Error loading lands:', error);
            this.showError('landsTable tbody', 'Unable to load land listings.');
        }
    }

    renderLands(lands) {
        const tbody = document.querySelector('#landsTable tbody');
        if (!tbody) return;

        tbody.innerHTML = lands.map(land => `
            <tr class="stagger-animate">
                <td>${land.location}</td>
                <td><span class="badge bg-success">${land.type}</span></td>
                <td>${land.description.substring(0, 80)}...</td>
                <td class="fw-bold">KSH ${land.price.toLocaleString()}</td>
                <td>${land.size} acres</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" 
                            onclick="app.viewLandDetails(${land.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" 
                            onclick="window.propertyMap.highlightMarker('land', ${land.id})">
                        <i class="fas fa-map"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    populateServices() {
        const container = document.querySelector('#services .row');
        if (!container) return;

        // First card is already in HTML, add remaining
        const servicesHtml = this.services.slice(1).map((service, index) => `
            <div class="col-md-6 col-lg-4">
                <div class="card property-card h-100 animate-on-scroll" data-service="${service.id}" data-delay="${(index + 1) * 100}">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <i class="fas ${service.icon} text-primary"></i>
                            </div>
                            <h5 class="card-title mb-0">${service.title}</h5>
                        </div>
                        <p class="card-text">${service.description}</p>
                        <button class="btn btn-link text-decoration-none p-0" 
                                onclick="app.showServiceDetails('${service.id}')">
                            Learn More →
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML += servicesHtml;
    }

    showServiceDetails(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        document.getElementById('serviceModalTitle').textContent = service.title;
        document.getElementById('serviceModalBody').innerHTML = service.details;
        
        const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
        modal.show();
    }

    setupEventListeners() {
        // Property search
        const searchInput = document.getElementById('propertySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProperties(e.target.value);
            });
        }

        // Property filter
        const filterSelect = document.getElementById('propertyFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                if (target !== '#') {
                    this.animation.smoothScrollTo(target);
                }
            });
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Validate
                if (!FormValidator.validateRequired([data.name, data.email, data.message])) {
                    this.showAlert('Please fill in all required fields.', 'danger');
                    return;
                }
                
                if (!FormValidator.validateEmail(data.email)) {
                    this.showAlert('Please enter a valid email address.', 'danger');
                    return;
                }
                
                try {
                    const { error } = await supabase
                        .from('inquiries')
                        .insert([{
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            message: data.message,
                            status: 'new'
                        }]);
                    
                    if (error) throw error;
                    
                    this.showAlert('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    this.showAlert('Sorry, there was an error sending your message. Please try again.', 'danger');
                }
            });
        }
    }

    filterProperties(searchTerm) {
        const cards = document.querySelectorAll('#propertiesContainer .card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.parentElement.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
        });
    }

    filterByCategory(category) {
        const cards = document.querySelectorAll('#propertiesContainer .card');
        cards.forEach(card => {
            if (category === 'all') {
                card.parentElement.style.display = 'block';
            } else {
                const badge = card.querySelector('.badge');
                const isMatch = badge && badge.textContent.toLowerCase().includes(category);
                card.parentElement.style.display = isMatch ? 'block' : 'none';
            }
        });
    }

    async viewPropertyPhotos(propertyId) {
        // Implementation for property photo gallery
        const { data: images } = await supabase
            .from('property_images')
            .select('*')
            .eq('property_id', propertyId);
        
        if (images && images.length > 0) {
            // Create and show modal with images
            this.showImageGallery(images);
        }
    }

    showImageGallery(images) {
        // Implementation for image gallery modal
        console.log('Show gallery with', images.length, 'images');
    }

    showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 400px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    showError(selector, message) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-3x text-muted mb-3"></i>
                    <p class="text-muted">${message}</p>
                </div>
            `;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SpatioApp();
});

export { SpatioApp };
