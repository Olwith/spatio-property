// Application Configuration
const CONFIG = {
    // Map Settings
    MAP: {
        DEFAULT_CENTER: [-1.2921, 36.8219], // Nairobi coordinates
        DEFAULT_ZOOM: 12,
        SATELLITE_URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        OSM_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    
    // API Settings
    API: {
        PROPERTIES_PER_PAGE: 9,
        LANDS_PER_PAGE: 10,
        INQUIRIES_PER_PAGE: 10
    },
    
    // Contact Information
    CONTACT: {
        PHONE: '+254 700 000 000',
        WHATSAPP: '+254 711 000 000',
        EMAIL: 'info@spatioproperty.co.ke',
        ADDRESS: 'Nairobi, Kenya'
    },
    
    // Social Media
    SOCIAL: {
        FACEBOOK: 'https://facebook.com/spatioproperty',
        TWITTER: 'https://twitter.com/spatioproperty',
        INSTAGRAM: 'https://instagram.com/spatioproperty',
        LINKEDIN: 'https://linkedin.com/company/spatioproperty'
    }
};

export { CONFIG };
