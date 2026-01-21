import { supabase } from './supabase.js';

class PropertyMap {
    constructor() {
        this.map = null;
        this.baseLayers = {};
        this.propertyLayer = null;
        this.landLayer = null;
        this.markers = new Map();
        this.init();
    }

    async init() {
        await this.loadMap();
        await this.loadData();
        this.setupControls();
    }

    async loadMap() {
        // Initialize map centered on Nairobi
        this.map = L.map('map-container').setView([-1.2921, 36.8219], 12);

        // Create base layers
        this.baseLayers.satellite = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
        ).addTo(this.map);

        this.baseLayers.streets = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        );

        // Add layer control
        L.control.layers(this.baseLayers).addTo(this.map);

        // Initialize marker layers
        this.propertyLayer = L.layerGroup().addTo(this.map);
        this.landLayer = L.layerGroup().addTo(this.map);
    }

    async loadData() {
        // Load properties
        const { data: properties, error: propertiesError } = await supabase
            .from('properties')
            .select('*')
            .eq('is_active', true);

        if (!propertiesError && properties) {
            this.addPropertiesToMap(properties);
        }

        // Load lands
        const { data: lands, error: landsError } = await supabase
            .from('lands')
            .select('*')
            .eq('is_active', true);

        if (!landsError && lands) {
            this.addLandsToMap(lands);
        }
    }

    addPropertiesToMap(properties) {
        properties.forEach(property => {
            if (property.latitude && property.longitude) {
                const marker = L.marker([property.latitude, property.longitude])
                    .bindPopup(this.createPropertyPopup(property))
                    .addTo(this.propertyLayer);
                
                this.markers.set(`property_${property.id}`, marker);
            }
        });
    }

    addLandsToMap(lands) {
        lands.forEach(land => {
            if (land.latitude && land.longitude) {
                const marker = L.circleMarker([land.latitude, land.longitude], {
                    radius: 8,
                    fillColor: '#10b981',
                    color: '#047857',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                })
                .bindPopup(this.createLandPopup(land))
                .addTo(this.landLayer);
                
                this.markers.set(`land_${land.id}`, marker);
            }
        });
    }

    createPropertyPopup(property) {
        return `
            <div class="map-popup">
                <img src="${property.main_image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80'}" 
                     style="width: 200px; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                <h6 class="mb-1">${property.title}</h6>
                <p class="mb-1 text-muted small">${property.location}</p>
                <p class="mb-2 fw-bold text-primary">KSH ${property.price.toLocaleString()}</p>
                <button onclick="window.openPropertyDetails(${property.id})" 
                        class="btn btn-sm btn-primary w-100">View Details</button>
            </div>
        `;
    }

    createLandPopup(land) {
        return `
            <div class="map-popup">
                <h6 class="mb-1">${land.title}</h6>
                <p class="mb-1 text-muted small">${land.location}</p>
                <p class="mb-1">Size: ${land.size} acres</p>
                <p class="mb-2 fw-bold text-success">KSH ${land.price.toLocaleString()}</p>
                <button onclick="window.openLandDetails(${land.id})" 
                        class="btn btn-sm btn-success w-100">View Details</button>
            </div>
        `;
    }

    setupControls() {
        // Toggle controls
        document.getElementById('toggleProperties').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.addLayer(this.propertyLayer);
            } else {
                this.map.removeLayer(this.propertyLayer);
            }
        });

        document.getElementById('toggleLands').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.addLayer(this.landLayer);
            } else {
                this.map.removeLayer(this.landLayer);
            }
        });

        // Base layer buttons
        document.getElementById('mapSatellite').addEventListener('click', () => {
            this.baseLayers.satellite.addTo(this.map);
            this.updateLayerButtons('satellite');
        });

        document.getElementById('mapOSM').addEventListener('click', () => {
            this.baseLayers.streets.addTo(this.map);
            this.updateLayerButtons('streets');
        });
    }

    updateLayerButtons(activeLayer) {
        document.getElementById('mapSatellite').classList.toggle('active', activeLayer === 'satellite');
        document.getElementById('mapOSM').classList.toggle('active', activeLayer === 'streets');
    }

    // Public methods
    flyTo(lat, lng, zoom = 15) {
        this.map.flyTo([lat, lng], zoom);
    }

    highlightMarker(type, id) {
        const key = `${type}_${id}`;
        const marker = this.markers.get(key);
        if (marker) {
            marker.openPopup();
            this.map.setView(marker.getLatLng(), 16);
        }
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.propertyMap = new PropertyMap();
});

export { PropertyMap };
