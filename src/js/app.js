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
                <div class="service-details">
                    <h4 class="mb-4">Property Bazaar Services</h4>
                    <p class="lead">Your one-stop marketplace for all property transactions</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Core Services:</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Property listing and digital marketing</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Buyer/seller matchmaking algorithms</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>End-to-end transaction coordination</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Legal documentation preparation</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Market analysis and competitive pricing</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Property staging and photography</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Open house organization</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Benefits:</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-star text-warning me-2"></i>Wider market reach through digital platforms</li>
                                <li class="mb-2"><i class="fas fa-star text-warning me-2"></i>Reduced time on market</li>
                                <li class="mb-2"><i class="fas fa-star text-warning me-2"></i>Maximum property value realization</li>
                                <li class="mb-2"><i class="fas fa-star text-warning me-2"></i>Professional negotiation support</li>
                                <li class="mb-2"><i class="fas fa-star text-warning me-2"></i>Secure transaction process</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-4">
                        <i class="fas fa-info-circle me-2"></i>
                        <strong>Contact us for a free property valuation and market analysis!</strong>
                    </div>
                </div>
            `
        },
        {
            id: 'renting-letting',
            title: 'Renting / Letting',
            icon: 'fa-house-user',
            description: 'Professional property management and tenant placement services.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Professional Renting & Letting Services</h4>
                    <p class="lead">Maximize your rental income with expert property management</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Landlord Services:</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-user-check text-primary me-2"></i>Tenant screening and background checks</li>
                                <li class="mb-2"><i class="fas fa-file-contract text-primary me-2"></i>Lease agreement preparation and management</li>
                                <li class="mb-2"><i class="fas fa-money-bill-wave text-primary me-2"></i>Rent collection and financial reporting</li>
                                <li class="mb-2"><i class="fas fa-tools text-primary me-2"></i>Maintenance coordination and supervision</li>
                                <li class="mb-2"><i class="fas fa-shield-alt text-primary me-2"></i>Property inspections and condition reporting</li>
                                <li class="mb-2"><i class="fas fa-chart-line text-primary me-2"></i>Rental market analysis and optimization</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Tenant Services:</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-search text-success me-2"></i>Personalized property matching</li>
                                <li class="mb-2"><i class="fas fa-handshake text-success me-2"></i>Viewing coordination</li>
                                <li class="mb-2"><i class="fas fa-file-signature text-success me-2"></i>Lease negotiation assistance</li>
                                <li class="mb-2"><i class="fas fa-home text-success me-2"></i>Move-in inspection support</li>
                                <li class="mb-2"><i class="fas fa-headset text-success me-2"></i>24/7 tenant support hotline</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6><i class="fas fa-percentage text-primary me-2"></i>Management Fee Structure:</h6>
                                    <p class="mb-1">• Full Management: 8-10% of monthly rent</p>
                                    <p class="mb-1">• Letting Only: One month's rent + VAT</p>
                                    <p class="mb-0">• Rent Collection: 5% of monthly rent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'buying-selling',
            title: 'Buying & Selling',
            icon: 'fa-handshake',
            description: 'Expert guidance through property purchase and sale transactions.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Property Buying & Selling Services</h4>
                    <p class="lead">Seamless property transactions with expert guidance every step of the way</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="service-feature mb-4">
                                <h6 class="text-primary mb-3"><i class="fas fa-shopping-cart me-2"></i>Buying Services</h6>
                                <ul class="list-unstyled">
                                    <li class="mb-2"><i class="fas fa-search me-2 text-info"></i>Property search based on your criteria</li>
                                    <li class="mb-2"><i class="fas fa-eye me-2 text-info"></i>Property viewing coordination</li>
                                    <li class="mb-2"><i class="fas fa-balance-scale me-2 text-info"></i>Market valuation and price negotiation</li>
                                    <li class="mb-2"><i class="fas fa-file-invoice-dollar me-2 text-info"></i>Offer preparation and submission</li>
                                    <li class="mb-2"><i class="fas fa-clipboard-check me-2 text-info"></i>Due diligence and property verification</li>
                                    <li class="mb-2"><i class="fas fa-handshake me-2 text-info"></i>Purchase agreement facilitation</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="service-feature mb-4">
                                <h6 class="text-primary mb-3"><i class="fas fa-home me-2"></i>Selling Services</h6>
                                <ul class="list-unstyled">
                                    <li class="mb-2"><i class="fas fa-chart-line me-2 text-warning"></i>Competitive market analysis</li>
                                    <li class="mb-2"><i class="fas fa-camera me-2 text-warning"></i>Professional photography & virtual tours</li>
                                    <li class="mb-2"><i class="fas fa-bullhorn me-2 text-warning"></i>Multi-platform marketing strategy</li>
                                    <li class="mb-2"><i class="fas fa-users me-2 text-warning"></i>Buyer screening and showings</li>
                                    <li class="mb-2"><i class="fas fa-file-signature me-2 text-warning"></i>Offer evaluation and negotiation</li>
                                    <li class="mb-2"><i class="fas fa-tasks me-2 text-warning"></i>Closing coordination</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mt-3">
                        <h6><i class="fas fa-lightbulb me-2"></i>Why Choose Us?</h6>
                        <p class="mb-0">Average time to sell: 45 days (vs. market average 90 days)<br>
                        Average sale price: 98% of asking price (vs. market average 92%)<br>
                        95% client satisfaction rate</p>
                    </div>
                </div>
            `
        },
        {
            id: 'surveying-mapping',
            title: 'Surveying & Mapping Services',
            icon: 'fa-map',
            description: 'Accurate boundary surveys and geospatial data collection.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Professional Surveying & Mapping Services</h4>
                    <p class="lead">Precision geospatial solutions using state-of-the-art technology</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-ruler-combined me-2"></i>Land Surveying</h6>
                                    <ul class="list-unstyled">
                                        <li class="mb-2"><i class="fas fa-drafting-compass me-2"></i>Boundary identification and demarcation</li>
                                        <li class="mb-2"><i class="fas fa-expand-alt me-2"></i>Topographic surveys</li>
                                        <li class="mb-2"><i class="fas fa-road me-2"></i>Route and alignment surveys</li>
                                        <li class="mb-2"><i class="fas fa-building me-2"></i>Construction stakeout surveys</li>
                                        <li class="mb-2"><i class="fas fa-vector-square me-2"></i>Cadastral surveys and subdivision</li>
                                        <li class="mb-2"><i class="fas fa-water me-2"></i>Hydrographic surveys</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-satellite me-2"></i>Mapping Services</h6>
                                    <ul class="list-unstyled">
                                        <li class="mb-2"><i class="fas fa-map-marked-alt me-2"></i>GIS mapping and analysis</li>
                                        <li class="mb-2"><i class="fas fa-layer-group me-2"></i>3D terrain modeling</li>
                                        <li class="mb-2"><i class="fas fa-draw-polygon me-2"></i>Digital mapping and cartography</li>
                                        <li class="mb-2"><i class="fas fa-drone me-2"></i>Aerial and drone mapping</li>
                                        <li class="mb-2"><i class="fas fa-sitemap me-2"></i>Utility mapping</li>
                                        <li class="mb-2"><i class="fas fa-chart-area me-2"></i>Volume calculations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="alert alert-info">
                                <h6><i class="fas fa-tools me-2"></i>Technology We Use:</h6>
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-satellite-dish text-primary me-2"></i>GPS/GNSS Systems</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-robot text-primary me-2"></i>Total Stations</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-quidditch text-primary me-2"></i>3D Laser Scanners</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-camera text-primary me-2"></i>Aerial Photography</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-map-marked text-primary me-2"></i>GIS Software (ArcGIS, QGIS)</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-drone text-primary me-2"></i>UAV/Drone Technology</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'boundary-confirmation',
            title: 'Boundary & Area Confirmation',
            icon: 'fa-ruler-combined',
            description: 'Precise property boundary identification and area calculation.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Boundary & Area Confirmation Services</h4>
                    <p class="lead">Eliminate boundary disputes with certified verification services</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-8">
                            <h6 class="text-primary mb-3">Our Boundary Services Include:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Boundary identification and marking</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Beacon location and verification</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Encroachment detection</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Boundary dispute resolution</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Deed description verification</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Subdivision boundary establishment</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Right-of-way determination</li>
                                        <li class="mb-2"><i class="fas fa-check-double text-success me-2"></i>Easement identification</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <h6 class="text-primary mb-3">Area Calculation Services:</h6>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card bg-light mb-3">
                                            <div class="card-body">
                                                <h6 class="card-title">Standard Area Survey</h6>
                                                <p class="card-text small">Accurate measurement for registration, valuation, and planning purposes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card bg-light mb-3">
                                            <div class="card-body">
                                                <h6 class="card-title">High-Precision Survey</h6>
                                                <p class="card-text small">±5cm accuracy for construction, legal disputes, and high-value properties</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-clipboard-check me-2"></i>Certification</h6>
                                </div>
                                <div class="card-body">
                                    <p>All our boundary surveys come with:</p>
                                    <ul class="list-unstyled">
                                        <li class="mb-2"><i class="fas fa-certificate text-warning me-2"></i>Certified Survey Report</li>
                                        <li class="mb-2"><i class="fas fa-map-marked-alt text-warning me-2"></i>Digital Boundary Map</li>
                                        <li class="mb-2"><i class="fas fa-file-pdf text-warning me-2"></i>PDF & CAD Formats</li>
                                        <li class="mb-2"><i class="fas fa-shield-alt text-warning me-2"></i>Legal Admissibility</li>
                                        <li class="mb-0"><i class="fas fa-stamp text-warning me-2"></i>Registered Surveyor's Stamp</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning mt-4">
                        <h6><i class="fas fa-exclamation-triangle me-2"></i>Common Boundary Issues We Solve:</h6>
                        <div class="row mt-2">
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Neighbor encroachments</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Missing beacons</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Title deed discrepancies</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Incorrect area measurements</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Boundary line disputes</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Access right conflicts</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'physical-planning',
            title: 'Physical Planning / Scheme Plans',
            icon: 'fa-drafting-compass',
            description: 'Development planning and scheme design services.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Physical Planning & Scheme Design Services</h4>
                    <p class="lead">Professional planning solutions for sustainable development</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Development Planning Services:</h6>
                            <div class="list-group">
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-city text-primary me-2"></i>Urban Planning</h6>
                                    <p class="small mb-0">Comprehensive urban development plans, zoning regulations, and land use planning</p>
                                </div>
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-home text-primary me-2"></i>Residential Schemes</h6>
                                    <p class="small mb-0">Housing estate planning, gated community design, and subdivision schemes</p>
                                </div>
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-industry text-primary me-2"></i>Commercial & Industrial</h6>
                                    <p class="small mb-0">Business parks, industrial zones, and commercial complex planning</p>
                                </div>
                                <div class="list-group-item border-0">
                                    <h6 class="mb-1"><i class="fas fa-tree text-primary me-2"></i>Environmental Planning</h6>
                                    <p class="small mb-0">EIA coordination, environmental impact assessments, and sustainable design</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Scheme Plan Services:</h6>
                            <div class="list-group">
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-drafting-compass text-success me-2"></i>Subdivision Plans</h6>
                                    <p class="small mb-0">Land subdivision for sale, inheritance, or development purposes</p>
                                </div>
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-road text-success me-2"></i>Road & Infrastructure</h6>
                                    <p class="small mb-0">Road layouts, drainage systems, and utility networks planning</p>
                                </div>
                                <div class="list-group-item border-0 mb-2">
                                    <h6 class="mb-1"><i class="fas fa-water text-success me-2"></i>Servicing Plans</h6>
                                    <p class="small mb-0">Water, sewer, electricity, and telecommunications infrastructure</p>
                                </div>
                                <div class="list-group-item border-0">
                                    <h6 class="mb-1"><i class="fas fa-university text-success me-2"></i>Approval Processing</h6>
                                    <p class="small mb-0">Liaison with county governments for plan approval and permitting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-list-ol me-2"></i>Our Planning Process:</h6>
                                    <div class="row text-center">
                                        <div class="col-md-3">
                                            <div class="p-3 border rounded">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">1</div>
                                                <p class="mb-0 small">Site Analysis & Assessment</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="p-3 border rounded">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">2</div>
                                                <p class="mb-0 small">Conceptual Design Development</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="p-3 border rounded">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">3</div>
                                                <p class="mb-0 small">Stakeholder Consultation</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="p-3 border rounded">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">4</div>
                                                <p class="mb-0 small">Approval & Implementation</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mt-4">
                        <h6><i class="fas fa-award me-2"></i>Certified Professionals:</h6>
                        <p class="mb-0">Our team includes registered physical planners certified by the Physical Planners Registration Board (PPRB) with extensive experience in county government approvals across Kenya.</p>
                    </div>
                </div>
            `
        },
        {
            id: 'valuation',
            title: 'Valuation',
            icon: 'fa-chart-line',
            description: 'Professional property valuation for various purposes.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Professional Property Valuation Services</h4>
                    <p class="lead">Certified valuations for legal, financial, and transactional purposes</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Valuation Purposes:</h6>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100 border-primary">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-balance-scale text-primary me-2"></i>Legal Valuations</h6>
                                            <ul class="list-unstyled small">
                                                <li class="mb-1">• Court cases & disputes</li>
                                                <li class="mb-1">• Divorce settlements</li>
                                                <li class="mb-1">• Probate & inheritance</li>
                                                <li class="mb-1">• Compensation claims</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100 border-success">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-university text-success me-2"></i>Financial Valuations</h6>
                                            <ul class="list-unstyled small">
                                                <li class="mb-1">• Mortgage & loan security</li>
                                                <li class="mb-1">• Insurance purposes</li>
                                                <li class="mb-1">• Investment analysis</li>
                                                <li class="mb-1">• Portfolio valuation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100 border-warning">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-handshake text-warning me-2"></i>Transactional</h6>
                                            <ul class="list-unstyled small">
                                                <li class="mb-1">• Sale & purchase pricing</li>
                                                <li class="mb-1">• Rental determination</li>
                                                <li class="mb-1">• Auction reserve prices</li>
                                                <li class="mb-1">• Partnership dissolution</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100 border-info">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-calculator text-info me-2"></i>Taxation</h6>
                                            <ul class="list-unstyled small">
                                                <li class="mb-1">• Capital gains tax</li>
                                                <li class="mb-1">• Stamp duty assessment</li>
                                                <li class="mb-1">• Rental income tax</li>
                                                <li class="mb-1">• Wealth declaration</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-clipboard-list me-2"></i>Our Valuation Methodology</h6>
                                </div>
                                <div class="card-body">
                                    <h6 class="text-primary">Approaches We Use:</h6>
                                    <div class="mb-3">
                                        <p class="mb-1"><strong>1. Sales Comparison Approach</strong></p>
                                        <p class="small text-muted">Comparing similar recently sold properties in the area</p>
                                    </div>
                                    <div class="mb-3">
                                        <p class="mb-1"><strong>2. Income Capitalization Approach</strong></p>
                                        <p class="small text-muted">Based on rental income potential and capitalization rates</p>
                                    </div>
                                    <div class="mb-3">
                                        <p class="mb-1"><strong>3. Cost Approach</strong></p>
                                        <p class="small text-muted">Land value + construction cost - depreciation</p>
                                    </div>
                                    <div>
                                        <p class="mb-1"><strong>4. Residual Method</strong></p>
                                        <p class="small text-muted">Development potential analysis for vacant land</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card mt-3">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-certificate me-2"></i>Certification & Standards</h6>
                                    <p class="small mb-2">Our valuations comply with:</p>
                                    <ul class="list-unstyled small">
                                        <li class="mb-1"><i class="fas fa-check text-success me-2"></i>International Valuation Standards (IVS)</li>
                                        <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Kenyan Property Valuation Guidelines</li>
                                        <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Institute of Surveyors of Kenya (ISK) Standards</li>
                                        <li class="mb-0"><i class="fas fa-check text-success me-2"></i>Banks' mortgage valuation requirements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-4">
                        <h6><i class="fas fa-file-invoice-dollar me-2"></i>Valuation Fee Structure:</h6>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="mb-1"><strong>Residential Properties:</strong></p>
                                <p class="mb-0">0.1% - 0.5% of property value (min KES 10,000)</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><strong>Commercial Properties:</strong></p>
                                <p class="mb-0">0.05% - 0.2% of property value (min KES 25,000)</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><strong>Land Valuation:</strong></p>
                                <p class="mb-0">KES 15,000 - KES 50,000 based on size and location</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'map-data',
            title: 'Map Data Provision',
            icon: 'fa-map-marked-alt',
            description: 'GIS data and customized mapping solutions.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">GIS & Map Data Provision Services</h4>
                    <p class="lead">Comprehensive geospatial data solutions for informed decision-making</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-8">
                            <h6 class="text-primary mb-3">Our GIS Services:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <h6><i class="fas fa-layer-group text-primary me-2"></i>Data Collection</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-table me-2 text-info"></i>Property attribute data</li>
                                            <li class="mb-2"><i class="fas fa-road me-2 text-info"></i>Road network mapping</li>
                                            <li class="mb-2"><i class="fas fa-water me-2 text-info"></i>Utility infrastructure</li>
                                            <li class="mb-2"><i class="fas fa-tree me-2 text-info"></i>Land cover classification</li>
                                            <li class="mb-2"><i class="fas fa-mountain me-2 text-info"></i>Topographic data</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h6><i class="fas fa-database text-primary me-2"></i>Data Processing</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-sync-alt me-2 text-success"></i>Data conversion & migration</li>
                                            <li class="mb-2"><i class="fas fa-filter me-2 text-success"></i>Data cleaning & validation</li>
                                            <li class="mb-2"><i class="fas fa-project-diagram me-2 text-success"></i>Spatial analysis</li>
                                            <li class="mb-2"><i class="fas fa-chart-bar me-2 text-success"></i>Statistical analysis</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <h6><i class="fas fa-map text-primary me-2"></i>Map Production</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-print me-2 text-warning"></i>Thematic mapping</li>
                                            <li class="mb-2"><i class="fas fa-map-pin me-2 text-warning"></i>Interactive web maps</li>
                                            <li class="mb-2"><i class="fas fa-search-location me-2 text-warning"></i>Suitability analysis maps</li>
                                            <li class="mb-2"><i class="fas fa-chart-area me-2 text-warning"></i>3D visualization</li>
                                            <li class="mb-2"><i class="fas fa-users me-2 text-warning"></i>Public participation maps</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h6><i class="fas fa-mobile-alt text-primary me-2"></i>Mobile GIS</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-map-marked me-2 text-danger"></i>Field data collection apps</li>
                                            <li class="mb-2"><i class="fas fa-clipboard-check me-2 text-danger"></i>Inspection tracking</li>
                                            <li class="mb-2"><i class="fas fa-walking me-2 text-danger"></i>Asset management</li>
                                            <li class="mb-2"><i class="fas fa-exclamation-triangle me-2 text-danger"></i>Incident reporting</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-file-download me-2"></i>Available Data Formats</h6>
                                </div>
                                <div class="card-body">
                                    <p class="small">We provide data in multiple formats:</p>
                                    <div class="row">
                                        <div class="col-6">
                                            <p class="mb-1"><i class="fas fa-file-excel text-success me-2"></i>Excel/CSV</p>
                                            <p class="mb-1"><i class="fas fa-file-code text-info me-2"></i>GeoJSON</p>
                                            <p class="mb-1"><i class="fas fa-file-alt text-warning me-2"></i>KML/KMZ</p>
                                        </div>
                                        <div class="col-6">
                                            <p class="mb-1"><i class="fas fa-file-archive text-danger me-2"></i>Shapefile</p>
                                            <p class="mb-1"><i class="fas fa-database text-primary me-2"></i>PostGIS</p>
                                            <p class="mb-1"><i class="fas fa-file-pdf text-danger me-2"></i>PDF Maps</p>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <h6 class="text-primary small">Software Compatibility:</h6>
                                        <p class="small mb-0">
                                            <span class="badge bg-info me-1">ArcGIS</span>
                                            <span class="badge bg-success me-1">QGIS</span>
                                            <span class="badge bg-warning me-1">AutoCAD</span>
                                            <span class="badge bg-danger">Google Earth</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card mt-3">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-clock me-2"></i>Delivery Timeline</h6>
                                    <ul class="list-unstyled small">
                                        <li class="mb-2"><i class="fas fa-bolt text-warning me-2"></i><strong>Express:</strong> 24-48 hours</li>
                                        <li class="mb-2"><i class="fas fa-truck text-success me-2"></i><strong>Standard:</strong> 3-5 business days</li>
                                        <li class="mb-0"><i class="fas fa-calendar-alt text-info me-2"></i><strong>Custom Projects:</strong> 1-4 weeks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mt-4">
                        <div class="row">
                            <div class="col-md-8">
                                <h6><i class="fas fa-bullseye me-2"></i>Applications Across Industries:</h6>
                                <div class="row">
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-city me-2"></i>Urban Planning</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-seedling me-2"></i>Agriculture</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-hard-hat me-2"></i>Construction</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-shipping-fast me-2"></i>Logistics</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-fire-extinguisher me-2"></i>Emergency Services</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-wifi me-2"></i>Telecom</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-tint me-2"></i>Water Management</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p class="mb-1"><i class="fas fa-bolt me-2"></i>Energy</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <p class="mb-1"><strong>Data Accuracy:</strong></p>
                                    <div class="display-6 text-primary">99.5%</div>
                                    <p class="small">Guaranteed spatial accuracy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'property-title',
            title: 'Property & Title Services',
            icon: 'fa-file-contract',
            description: 'Title deed processing and property registration.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Property & Title Deed Services</h4>
                    <p class="lead">Seamless title processing and property registration with guaranteed compliance</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Title Processing Services:</h6>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-file-signature text-primary me-2"></i>Title Search & Verification</h6>
                                        <small class="text-muted">1-2 days</small>
                                    </div>
                                    <p class="mb-1 small">Comprehensive search at lands registry to verify ownership, encumbrances, and restrictions</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-exchange-alt text-success me-2"></i>Transfer of Title</h6>
                                        <small class="text-muted">4-6 weeks</small>
                                    </div>
                                    <p class="mb-1 small">Complete transfer process including stamp duty payment, consent to transfer, and registration</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-cut text-warning me-2"></i>Subdivision & Consolidation</h6>
                                        <small class="text-muted">8-12 weeks</small>
                                    </div>
                                    <p class="mb-1 small">Legal subdivision of properties and consolidation of multiple titles into single ownership</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-user-friends text-info me-2"></i>Joint Ownership Registration</h6>
                                        <small class="text-muted">3-4 weeks</small>
                                    </div>
                                    <p class="mb-1 small">Registration of multiple owners, tenancy in common, or joint tenancy arrangements</p>
                                </a>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Additional Services:</h6>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-home text-primary me-2"></i>Lease Registration</h6>
                                            <p class="small">Registration of long-term leases (over 2 years) at the lands registry</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-unlock text-success me-2"></i>Discharge of Charge</h6>
                                            <p class="small">Processing bank charge discharge upon loan repayment completion</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-hands-helping text-warning me-2"></i>Easement Registration</h6>
                                            <p class="small">Registration of rights of way, access rights, and utility easements</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-exclamation-triangle text-danger me-2"></i>Caveat Registration</h6>
                                            <p class="small">Lodging and removal of caveats to protect property interests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-clipboard-check me-2"></i>Document Checklist</h6>
                                    <p class="small mb-2">Required for title processing:</p>
                                    <ul class="list-unstyled small">
                                        <li class="mb-1"><i class="fas fa-id-card text-info me-2"></i>National ID/Passport copies</li>
                                        <li class="mb-1"><i class="fas fa-file-alt text-info me-2"></i>Original title deed</li>
                                        <li class="mb-1"><i class="fas fa-receipt text-info me-2"></i>PIN certificates</li>
                                        <li class="mb-0"><i class="fas fa-map-marked-alt text-info me-2"></i>Survey & location maps</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-money-check-alt me-2"></i>Government Fees & Charges</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Service</th>
                                                    <th>Government Fee</th>
                                                    <th>Stamp Duty</th>
                                                    <th>Our Service Fee</th>
                                                    <th>Total Estimated</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Title Transfer</td>
                                                    <td>KES 5,000</td>
                                                    <td>2-4% of value</td>
                                                    <td>KES 25,000</td>
                                                    <td>Varies by property</td>
                                                </tr>
                                                <tr>
                                                    <td>Lease Registration</td>
                                                    <td>KES 3,000</td>
                                                    <td>1% of premium</td>
                                                    <td>KES 15,000</td>
                                                    <td>From KES 18,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Charge Registration</td>
                                                    <td>KES 2,500</td>
                                                    <td>KES 100</td>
                                                    <td>KES 10,000</td>
                                                    <td>KES 12,600</td>
                                                </tr>
                                                <tr>
                                                    <td>Title Search</td>
                                                    <td>KES 500</td>
                                                    <td>-</td>
                                                    <td>KES 3,000</td>
                                                    <td>KES 3,500</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p class="small text-muted mb-0">*Government fees subject to change. Stamp duty rates vary by location and property value.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning mt-4">
                        <h6><i class="fas fa-exclamation-circle me-2"></i>Common Title Issues We Resolve:</h6>
                        <div class="row mt-2">
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Missing title deeds</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Boundary discrepancies</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Succession matters</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Adverse possession claims</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Fraudulent transfers</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Double allocation</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Unregistered charges</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Restrictive covenants</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'consultancy',
            title: 'Consultancy Services',
            icon: 'fa-user-tie',
            description: 'Expert real estate consultancy and advisory.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Real Estate Consultancy & Advisory Services</h4>
                    <p class="lead">Strategic insights and expert guidance for informed property decisions</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Strategic Advisory Services:</h6>
                            <div class="accordion" id="consultancyAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#consultancyOne">
                                            <i class="fas fa-chart-line text-primary me-2"></i>Market Research & Analysis
                                        </button>
                                    </h2>
                                    <div id="consultancyOne" class="accordion-collapse collapse show" data-bs-parent="#consultancyAccordion">
                                        <div class="accordion-body">
                                            <ul class="list-unstyled small">
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Market trend analysis and forecasting</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Supply and demand assessment</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Competitive landscape analysis</li>
                                                <li class="mb-0"><i class="fas fa-check-circle text-success me-2"></i>Investment opportunity identification</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#consultancyTwo">
                                            <i class="fas fa-hand-holding-usd text-success me-2"></i>Investment Advisory
                                        </button>
                                    </h2>
                                    <div id="consultancyTwo" class="accordion-collapse collapse" data-bs-parent="#consultancyAccordion">
                                        <div class="accordion-body">
                                            <ul class="list-unstyled small">
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Portfolio optimization strategies</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Risk assessment and mitigation</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Return on investment analysis</li>
                                                <li class="mb-0"><i class="fas fa-check-circle text-success me-2"></i>Exit strategy planning</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#consultancyThree">
                                            <i class="fas fa-city text-warning me-2"></i>Development Feasibility
                                        </button>
                                    </h2>
                                    <div id="consultancyThree" class="accordion-collapse collapse" data-bs-parent="#consultancyAccordion">
                                        <div class="accordion-body">
                                            <ul class="list-unstyled small">
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Site selection and assessment</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Financial feasibility studies</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Development cost estimation</li>
                                                <li class="mb-0"><i class="fas fa-check-circle text-success me-2"></i>Market absorption analysis</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#consultancyFour">
                                            <i class="fas fa-balance-scale text-info me-2"></i>Due Diligence
                                        </button>
                                    </h2>
                                    <div id="consultancyFour" class="accordion-collapse collapse" data-bs-parent="#consultancyAccordion">
                                        <div class="accordion-body">
                                            <ul class="list-unstyled small">
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Legal and title verification</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Physical condition assessment</li>
                                                <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>Environmental compliance check</li>
                                                <li class="mb-0"><i class="fas fa-check-circle text-success me-2"></i>Financial records audit</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card h-100">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-users me-2"></i>Our Clientele</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <h6 class="text-primary small">Individual Investors</h6>
                                            <p class="small">Personal investment portfolio advice and management</p>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <h6 class="text-primary small">Developers</h6>
                                            <p class="small">Project feasibility and development strategy</p>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <h6 class="text-primary small">Financial Institutions</h6>
                                            <p class="small">Property portfolio valuation and risk assessment</p>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <h6 class="text-primary small">Corporate Clients</h6>
                                            <p class="small">Commercial property strategy and portfolio optimization</p>
                                        </div>
                                        <div class="col-md-6">
                                            <h6 class="text-primary small">Government Agencies</h6>
                                            <p class="small">Public property management and development planning</p>
                                        </div>
                                        <div class="col-md-6">
                                            <h6 class="text-primary small">International Investors</h6>
                                            <p class="small">Market entry strategy and local compliance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card mt-3">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-graduation-cap me-2"></i>Our Expert Team</h6>
                                    <p class="small mb-2">Our consultancy team includes:</p>
                                    <ul class="list-unstyled small">
                                        <li class="mb-1"><i class="fas fa-user-graduate text-primary me-2"></i>Chartered Surveyors (RICS)</li>
                                        <li class="mb-1"><i class="fas fa-user-graduate text-success me-2"></i>Real Estate Economists</li>
                                        <li class="mb-1"><i class="fas fa-user-graduate text-warning me-2"></i>Urban Planners</li>
                                        <li class="mb-1"><i class="fas fa-user-graduate text-info me-2"></i>Financial Analysts</li>
                                        <li class="mb-0"><i class="fas fa-user-graduate text-danger me-2"></i>Legal Advisors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-clipboard-list me-2"></i>Consultancy Process</h6>
                                    <div class="row text-center">
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">1</div>
                                                <p class="mb-0 small"><strong>Initial Consultation</strong></p>
                                                <p class="small text-muted">Understanding client needs</p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">2</div>
                                                <p class="mb-0 small"><strong>Data Collection</strong></p>
                                                <p class="small text-muted">Market & property analysis</p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">3</div>
                                                <p class="mb-0 small"><strong>Analysis</strong></p>
                                                <p class="small text-muted">Expert evaluation</p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">4</div>
                                                <p class="mb-0 small"><strong>Recommendations</strong></p>
                                                <p class="small text-muted>Strategic solutions</p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">5</div>
                                                <p class="mb-0 small"><strong>Implementation</strong></p>
                                                <p class="small text-muted">Action plan execution</p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="p-2">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-2" style="width: 50px; height: 50px; line-height: 50px;">6</div>
                                                <p class="mb-0 small"><strong>Review</strong></p>
                                                <p class="small text-muted">Performance monitoring</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-4">
                        <div class="row">
                            <div class="col-md-8">
                                <h6><i class="fas fa-money-bill-wave me-2"></i>Fee Structure Options:</h6>
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Hourly Rate:</strong></p>
                                        <p class="mb-0">KES 5,000 - 15,000/hour</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Project-Based:</strong></p>
                                        <p class="mb-0">KES 50,000 - 500,000+</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Retainer:</strong></p>
                                        <p class="mb-0">KES 100,000 - 1M/month</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <p class="mb-1"><strong>Client Satisfaction:</strong></p>
                                    <div class="display-6 text-primary">97%</div>
                                    <p class="small">Based on 2023 client surveys</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'legal-transactions',
            title: 'Legal Transactions',
            icon: 'fa-balance-scale',
            description: 'Legal documentation and transaction support.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Legal Transaction Support Services</h4>
                    <p class="lead">Comprehensive legal documentation and transaction management for secure property dealings</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-8">
                            <h6 class="text-primary mb-3">Legal Documentation Services:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <h6><i class="fas fa-file-contract text-primary me-2"></i>Agreement Preparation</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-handshake me-2"></i>Sale Agreements</li>
                                            <li class="mb-2"><i class="fas fa-key me-2"></i>Lease Agreements (Residential & Commercial)</li>
                                            <li class="mb-2"><i class="fas fa-hands-helping me-2"></i>Joint Venture Agreements</li>
                                            <li class="mb-2"><i class="fas fa-hard-hat me-2"></i>Construction Contracts</li>
                                            <li class="mb-2"><i class="fas fa-exchange-alt me-2"></i>Exchange Agreements</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h6><i class="fas fa-gavel text-primary me-2"></i>Legal Support</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-user-tie me-2"></i>Advocate liaison services</li>
                                            <li class="mb-2"><i class="fas fa-scale-balanced me-2"></i>Court process representation</li>
                                            <li class="mb-2"><i class="fas fa-file-signature me-2"></i>Affidavit preparation</li>
                                            <li class="mb-2"><i class="fas fa-stamp me-2"></i>Commissioner for Oaths services</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <h6><i class="fas fa-clipboard-check text-primary me-2"></i>Due Diligence</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-search me-2"></i>Title search and verification</li>
                                            <li class="mb-2"><i class="fas fa-exclamation-triangle me-2"></i>Encumbrance checks</li>
                                            <li class="mb-2"><i class="fas fa-map-marked-alt me-2"></i>Land rate clearance</li>
                                            <li class="mb-2"><i class="fas fa-building me-2"></i>Planning compliance verification</li>
                                            <li class="mb-2"><i class="fas fa-users me-2"></i>Succession verification</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h6><i class="fas fa-university text-primary me-2"></i>Government Liaison</h6>
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-file-invoice-dollar me-2"></i>Stamp duty assessment and payment</li>
                                            <li class="mb-2"><i class="fas fa-receipt me-2"></i>Capital gains tax processing</li>
                                            <li class="mb-2"><i class="fas fa-landmark me-2"></i>Lands registry submissions</li>
                                            <li class="mb-2"><i class="fas fa-city me-2"></i>County government approvals</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-shield-alt me-2"></i>Transaction Security Features</h6>
                                </div>
                                <div class="card-body">
                                    <ul class="list-unstyled small">
                                        <li class="mb-2"><i class="fas fa-lock text-success me-2"></i>Escrow account management</li>
                                        <li class="mb-2"><i class="fas fa-fingerprint text-success me-2"></i>Identity verification</li>
                                        <li class="mb-2"><i class="fas fa-file-shield text-success me-2"></i>Document authentication</li>
                                        <li class="mb-2"><i class="fas fa-history text-success me-2"></i>Transaction audit trail</li>
                                        <li class="mb-2"><i class="fas fa-user-shield text-success me-2"></i>Witness services</li>
                                        <li class="mb-0"><i class="fas fa-check-double text-success me-2"></i>Double verification process</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="card mt-3">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-clock me-2"></i>Standard Timelines</h6>
                                    <ul class="list-unstyled small">
                                        <li class="mb-2"><i class="fas fa-bolt text-warning me-2"></i><strong>Document Drafting:</strong> 24-48 hours</li>
                                        <li class="mb-2"><i class="fas fa-file-signature text-info me-2"></i><strong>Agreement Execution:</strong> 1-3 days</li>
                                        <li class="mb-2"><i class="fas fa-tasks text-success me-2"></i><strong>Due Diligence:</strong> 3-5 business days</li>
                                        <li class="mb-0"><i class="fas fa-flag-checkered text-primary me-2"></i><strong>Transaction Completion:</strong> 4-8 weeks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-list-ol me-2"></i>Standard Transaction Process</h6>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="text-center p-3">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-3" style="width: 60px; height: 60px; line-height: 60px;">
                                                    <i class="fas fa-handshake"></i>
                                                </div>
                                                <h6>Offer & Acceptance</h6>
                                                <p class="small">Letter of offer, offer acceptance, deposit payment</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="text-center p-3">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-3" style="width: 60px; height: 60px; line-height: 60px;">
                                                    <i class="fas fa-search"></i>
                                                </div>
                                                <h6>Due Diligence</h6>
                                                <p class="small">Title search, land rate clearance, planning checks</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="text-center p-3">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-3" style="width: 60px; height: 60px; line-height: 60px;">
                                                    <i class="fas fa-file-contract"></i>
                                                </div>
                                                <h6>Documentation</h6>
                                                <p class="small">Sale agreement, completion documents, tax payments</p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="text-center p-3">
                                                <div class="bg-primary text-white rounded-circle mx-auto mb-3" style="width: 60px; height: 60px; line-height: 60px;">
                                                    <i class="fas fa-flag-checkered"></i>
                                                </div>
                                                <h6>Completion</h6>
                                                <p class="small">Balance payment, handover, registration of transfer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mt-4">
                        <div class="row">
                            <div class="col-md-8">
                                <h6><i class="fas fa-file-invoice-dollar me-2"></i>Fee Structure:</h6>
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Sale Agreement:</strong></p>
                                        <p class="mb-0">KES 15,000 - 50,000</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Lease Agreement:</strong></p>
                                        <p class="mb-0">KES 10,000 - 30,000</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><strong>Transaction Management:</strong></p>
                                        <p class="mb-0">1-2% of transaction value</p>
                                    </div>
                                </div>
                                <p class="small mt-2 mb-0">*Minimum fee KES 10,000. Complex transactions may attract higher fees.</p>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <p class="mb-1"><strong>Success Rate:</strong></p>
                                    <div class="display-6 text-primary">99.2%</div>
                                    <p class="small">Transactions completed without legal issues</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning">
                        <h6><i class="fas fa-exclamation-triangle me-2"></i>Common Legal Issues We Prevent:</h6>
                        <div class="row mt-2">
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Fraudulent transactions</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Title defects</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Breach of contract</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Undisclosed encumbrances</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Planning violations</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Tax compliance issues</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Boundary disputes</p>
                            </div>
                            <div class="col-md-3">
                                <p class="mb-1"><i class="fas fa-times-circle me-2"></i>Succession claims</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'office-transactions',
            title: 'Official Office Transactions',
            icon: 'fa-building',
            description: 'Government liaison and official processing.',
            details: `
                <div class="service-details">
                    <h4 class="mb-4">Official Office Transactions & Government Liaison</h4>
                    <p class="lead">Expert handling of government procedures and official documentation for seamless property transactions</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Government Agency Services:</h6>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-landmark text-primary me-2"></i>Ministry of Lands</h6>
                                        <span class="badge bg-primary">Nairobi</span>
                                    </div>
                                    <p class="mb-1 small">Title searches, registration, transfers, subdivisions, and general land registry services</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-city text-success me-2"></i>County Governments</h6>
                                        <span class="badge bg-success">All Counties</span>
                                    </div>
                                    <p class="mb-1 small">Planning approvals, building permits, land rate clearance, development consents</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-university text-warning me-2"></i>Kenya Revenue Authority (KRA)</h6>
                                        <span class="badge bg-warning">Nationwide</span>
                                    </div>
                                    <p class="mb-1 small">Stamp duty assessment & payment, capital gains tax, PIN registration, tax compliance</p>
                                </a>
                                
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><i class="fas fa-water text-info me-2"></i>National Water Services</h6>
                                        <span class="badge bg-info">Utilities</span>
                                    </div>
                                    <p class="mb-1 small">Water connection applications, sewerage services, water meter installation</p>
                                </a>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="text-primary mb-3">Additional Agency Services:</h6>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-bolt text-warning me-2"></i>Kenya Power</h6>
                                            <p class="small">Electricity connection applications, meter installation, power upgrade requests</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-tree text-success me-2"></i>NEMA</h6>
                                            <p class="small">Environmental impact assessments, EIA licenses, environmental compliance</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-road text-danger me-2"></i>KeNHA/KURA</h6>
                                            <p class="small">Road access permits, wayleave approvals, highway frontage developments</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h6 class="card-title"><i class="fas fa-phone-alt text-primary me-2"></i>Communications Authority</h6>
                                            <p class="small">Telecom wayleaves, mast installations, fiber optic installations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary"><i class="fas fa-clipboard-list me-2"></i>Required Documents Checklist</h6>
                                    <p class="small mb-2">Standard requirements for most government transactions:</p>
                                    <ul class="list-unstyled small">
                                        <li class="mb-1"><i class="fas fa-id-card text-info me-2"></i>National ID/Passport copies</li>
                                        <li class="mb-1"><i class="fas fa-file-alt text-info me-2"></i>PIN certificate</li>
                                        <li class="mb-1"><i class="fas fa-map text-info me-2"></i>Survey plan</li>
                                        <li class="mb-0"><i class="fas fa-receipt text-info me-2"></i>Land rate clearance certificate</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card border-primary">
                                <div class="card-header bg-primary text-white">
                                    <h6 class="mb-0"><i class="fas fa-money-check-alt me-2"></i>Government Fees & Processing Time</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Service</th>
                                                    <th>Agency</th>
                                                    <th>Government Fee</th>
                                                    <th>Processing Time</th>
                                                    <th>Our Service Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Title Search</td>
                                                    <td>Lands Registry</td>
                                                    <td>KES 500</td>
                                                    <td>1-2 days</td>
                                                    <td>KES 3,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Land Rate Clearance</td>
                                                    <td>County Gov</td>
                                                    <td>Varies by arrears</td>
                                                    <td>3-7 days</td>
                                                    <td>KES 5,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Planning Approval</td>
                                                    <td>County Planning</td>
                                                    <td>0.5-2% of construction</td>
                                                    <td>4-8 weeks</td>
                                                    <td>KES 25,000+</td>
                                                </tr>
                                                <tr>
                                                    <td>Stamp Duty Assessment</td>
                                                    <td>KRA</td>
                                                    <td>2-4% of value</td>
                                                    <td>2-3 days</td>
                                                    <td>KES 5,000</td>
                                                </tr>
                                                <tr>
                                                    <td>EIA License</td>
                                                    <td>NEMA</td>
                                                    <td>KES 10,000+</td>
                                                    <td>6-12 weeks</td>
                                                    <td>KES 50,000+</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p class="small text-muted mb-0">*Government fees are subject to change. Processing times may vary based on agency workload and completeness of documentation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="alert alert-info mt-4">
                        <div class="row">
                            <div class="col-md-8">
                                <h6><i class="fas fa-bullseye me-2"></i>Why Use Our Government Liaison Services?</h6>
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-clock text-primary me-2"></i><strong>Time Saving</strong></p>
                                        <p class="small">Save 70% of your time on government procedures</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-check-circle text-success me-2"></i><strong>Accuracy</strong></p>
                                        <p class="small">100% compliance with all requirements</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p class="mb-1"><i class="fas fa-shield-alt text-warning me-2"></i><strong>Risk Reduction</strong></p>
                                        <p class="small">Avoid costly errors and rejections</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <p class="mb-1"><strong>Success Rate:</strong></p>
                                    <div class="display-6 text-primary">98.7%</div>
                                    <p class="small">First-time approval rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card bg-light">
                                <div class="card-body">
                                    <h6 class="text-primary mb-3"><i class="fas fa-network-wired me-2"></i>Our Government Network</h6>
                                    <p class="small mb-3">We have established relationships with key personnel in:</p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Ministry of Lands HQ</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Ardhi House Registry</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Nairobi County Govt</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Kiambu County Govt</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>KRA Headquarters</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>NEMA Regional Offices</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Kenya Power HQ</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="mb-1"><i class="fas fa-check text-success me-2"></i>Water Services Boards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            {
    id: 'auctioneering',
    title: 'Auctioneering Services',
    icon: 'fa-gavel',
    description: 'Bank and registered auctioneering services for properties and lands.',
    details: `
        <div class="service-details">
            <h4 class="mb-4">Professional Property & Land Auctioneering Services</h4>
            <p class="lead">Licensed auctioneering services specializing in residential, commercial properties, and land parcels for banks and private clients</p>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <h6 class="text-primary mb-3">Property Auction Services:</h6>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1"><i class="fas fa-home text-primary me-2"></i>Residential Properties</h6>
                                <span class="badge bg-primary">Monthly</span>
                            </div>
                            <p class="mb-1 small">Houses, apartments, townhouses, and bungalows from bank repossessions and private sellers</p>
                            <small class="text-muted">Includes: 3-bedroom houses, apartments, bungalows, townhouses</small>
                        </a>
                        
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1"><i class="fas fa-building text-success me-2"></i>Commercial Properties</h6>
                                <span class="badge bg-success">Quarterly</span>
                            </div>
                            <p class="mb-1 small">Office spaces, retail units, warehouses, and industrial properties</p>
                            <small class="text-muted">Includes: Office blocks, shopping centers, warehouses, factories</small>
                        </a>
                        
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1"><i class="fas fa-university text-warning me-2"></i>Bank Mortgage Auctions</h6>
                                <span class="badge bg-warning">Statutory</span>
                            </div>
                            <p class="mb-1 small">Statutory auction services for defaulted mortgage properties from financial institutions</p>
                            <small class="text-muted">Full statutory compliance including notices and advertising</small>
                        </a>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <h6 class="text-primary mb-3">Land Auction Services:</h6>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title"><i class="fas fa-map-marked-alt text-primary me-2"></i>Residential Plots</h6>
                                    <p class="small">Urban and suburban residential plots, gated community plots, and serviced plots</p>
                                    <p class="small text-muted mb-0">Sizes: 1/8 acre to 1 acre plots</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title"><i class="fas fa-industry text-success me-2"></i>Commercial & Industrial Land</h6>
                                    <p class="small">Commercial plots, industrial zones, and investment land parcels</p>
                                    <p class="small text-muted mb-0">Prime locations for business development</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title"><i class="fas fa-tree text-warning me-2"></i>Agricultural Land</h6>
                                    <p class="small">Farmland, agricultural plots, and rural land parcels</p>
                                    <p class="small text-muted mb-0">Suitable for farming, livestock, or investment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="text-primary"><i class="fas fa-id-card me-2"></i>Our Credentials</h6>
                            <ul class="list-unstyled small">
                                <li class="mb-1"><i class="fas fa-certificate text-warning me-2"></i>Licensed Auctioneers - License No: AUC-12345-2024</li>
                                <li class="mb-1"><i class="fas fa-shield-alt text-warning me-2"></i>Bonded and Insured: KES 10M Professional Indemnity</li>
                                <li class="mb-0"><i class="fas fa-handshake text-warning me-2"></i>Registered with all Tier 1 & 2 Banks in Kenya</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card border-primary">
                        <div class="card-header bg-primary text-white">
                            <h6 class="mb-0"><i class="fas fa-list-ol me-2"></i>Property & Land Auction Process</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-danger text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">1</div>
                                        <p class="mb-0 small"><strong>Instruction</strong></p>
                                        <p class="small text-muted">Client/bank instruction</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-danger text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">2</div>
                                        <p class="mb-0 small"><strong>Valuation</strong></p>
                                        <p class="small text-muted">Professional property valuation</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-warning text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">3</div>
                                        <p class="mb-0 small"><strong>Marketing</strong></p>
                                        <p class="small text-muted">30-day marketing campaign</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-warning text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">4</div>
                                        <p class="mb-0 small"><strong>Viewing</strong></p>
                                        <p class="small text-muted">Property inspection period</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-success text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">5</div>
                                        <p class="mb-0 small"><strong>Auction</strong></p>
                                        <p class="small text-muted">Public auction event</p>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="text-center p-2">
                                        <div class="bg-success text-white rounded-circle mx-auto mb-2" style="width: 40px; height: 40px; line-height: 40px;">6</div>
                                        <p class="mb-0 small"><strong>Completion</strong></p>
                                        <p class="small text-muted">Payment & transfer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-primary mb-3"><i class="fas fa-calendar-alt me-2"></i>Upcoming Property Auctions</h6>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">Monthly Property Auction</h6>
                                        <small class="text-muted">15th Monthly</small>
                                    </div>
                                    <p class="mb-1 small">Residential and commercial properties at our Nairobi auction hall</p>
                                    <small class="text-muted">Viewing: 10th-14th monthly</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">Land Parcels Auction</h6>
                                        <small class="text-muted">Last Wednesday Monthly</small>
                                    </div>
                                    <p class="mb-1 small">Residential, commercial, and agricultural land parcels</p>
                                    <small class="text-muted">Viewing: Week before auction</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">Bank Property Auction</h6>
                                        <small class="text-muted">Quarterly</small>
                                    </div>
                                    <p class="mb-1 small">High-value bank repossessed properties</p>
                                    <small class="text-muted">Next: March 30, 2024</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-primary mb-3"><i class="fas fa-file-invoice-dollar me-2"></i>Commission Structure</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Property Type</th>
                                            <th>Commission Rate</th>
                                            <th>Minimum Fee</th>
                                            <th>Advertising Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Residential Properties</td>
                                            <td>5% of hammer price</td>
                                            <td>KES 50,000</td>
                                            <td>Included</td>
                                        </tr>
                                        <tr>
                                            <td>Commercial Properties</td>
                                            <td>4% of hammer price</td>
                                            <td>KES 75,000</td>
                                            <td>Included</td>
                                        </tr>
                                        <tr>
                                            <td>Residential Land</td>
                                            <td>6% of hammer price</td>
                                            <td>KES 30,000</td>
                                            <td>KES 15,000</td>
                                        </tr>
                                        <tr>
                                            <td>Commercial Land</td>
                                            <td>5% of hammer price</td>
                                            <td>KES 50,000</td>
                                            <td>KES 20,000</td>
                                        </tr>
                                        <tr>
                                            <td>Bank Mortgage Auctions</td>
                                            <td>5% of hammer price</td>
                                            <td>KES 100,000</td>
                                            <td>Included</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="small text-muted mb-0">*All fees exclude 16% VAT. Reserve prices set at 75% of forced sale value.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-primary mb-3"><i class="fas fa-bullhorn me-2"></i>Our Marketing Channels</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-newspaper text-primary me-2"></i><strong>Newspaper Advertisements:</strong> Daily Nation & Standard (Statutory requirement)</li>
                                <li class="mb-2"><i class="fas fa-globe text-success me-2"></i><strong>Online Platforms:</strong> Our website, social media, property portals</li>
                                <li class="mb-2"><i class="fas fa-mail-bulk text-warning me-2"></i><strong>Direct Marketing:</strong> Email campaigns to registered bidders</li>
                                <li class="mb-2"><i class="fas fa-map-signs text-info me-2"></i><strong>On-Site Signage:</strong> Property signage and directional boards</li>
                                <li class="mb-0"><i class="fas fa-users text-danger me-2"></i><strong>Auction Catalogues:</strong> Printed and digital catalogues</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-primary mb-3"><i class="fas fa-handshake me-2"></i>Bank Partnerships</h6>
                            <p class="small mb-3">We are registered auctioneers with:</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>Equity Bank</p>
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>KCB Bank</p>
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>Co-operative Bank</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>NCBA Bank</p>
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>Absa Bank</p>
                                    <p class="mb-1"><i class="fas fa-university text-primary me-2"></i>Stanbic Bank</p>
                                </div>
                            </div>
                            <div class="mt-3">
                                <p class="small mb-0"><i class="fas fa-check-circle text-success me-2"></i>All statutory notices prepared and served in compliance with Auctioneers Act</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-success mt-4">
                <div class="row">
                    <div class="col-md-8">
                        <h6><i class="fas fa-chart-line me-2"></i>Auction Performance (2023):</h6>
                        <div class="row">
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-percentage text-primary me-2"></i><strong>Success Rate:</strong> 88%</p>
                                <p class="small">Properties sold at auction</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-money-bill-wave text-success me-2"></i><strong>Average Price:</strong> 94%</p>
                                <p class="small">Of forced sale value achieved</p>
                            </div>
                            <div class="col-md-4">
                                <p class="mb-1"><i class="fas fa-users text-warning me-2"></i><strong>Attendance:</strong> 60+</p>
                                <p class="small">Average bidders per auction</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center">
                            <p class="mb-1"><strong>Annual Volume:</strong></p>
                            <div class="display-6 text-primary">250+</div>
                            <p class="small">Properties & lands auctioned</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info">
                <h6><i class="fas fa-info-circle me-2"></i>Bidder Requirements for Property Auctions:</h6>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-money-check-alt me-2"></i>10% deposit of intended maximum bid</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-id-card me-2"></i>Original National ID/Passport</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-pin me-2"></i>KRA PIN Certificate</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-file-signature me-2"></i>Bidder registration form</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-cash-register me-2"></i>Balance payment within 30 days</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1"><i class="fas fa-gavel me-2"></i>Terms & conditions acceptance</p>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-warning">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Important Notes:</h6>
                <ul class="mb-0">
                    <li>All properties sold "as is, where is" basis</li>
                    <li>Buyer to conduct own due diligence before bidding</li>
                    <li>Properties subject to existing encumbrances unless stated otherwise</li>
                    <li>Successful bidders must pay balance within stipulated period or forfeit deposit</li>
                    <li>All sales subject to reserve price and auctioneer's discretion</li>
                </ul>
            </div>
        </div>
        }
        ];
    `

    
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
