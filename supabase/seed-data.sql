-- Insert initial admin user (password: Admin123!)
INSERT INTO users (email, full_name, role) 
VALUES ('admin@spatioproperty.co.ke', 'System Administrator', 'admin');

-- Insert services
INSERT INTO services (service_id, title, icon, description, display_order) VALUES
('property-bazaar', 'Property Bazaar Services', 'fa-store', 'Comprehensive property listing, marketing, and transaction management.', 1),
('renting-letting', 'Renting / Letting', 'fa-house-user', 'Professional property management and tenant placement services.', 2),
('buying-selling', 'Buying & Selling', 'fa-handshake', 'Expert guidance through property purchase and sale transactions.', 3),
('surveying-mapping', 'Surveying & Mapping Services', 'fa-map', 'Accurate boundary surveys and geospatial data collection.', 4),
('boundary-confirmation', 'Boundary & Area Confirmation', 'fa-ruler-combined', 'Precise property boundary identification and area calculation.', 5),
('physical-planning', 'Physical Planning / Scheme Plans', 'fa-drafting-compass', 'Development planning and scheme design services.', 6),
('valuation', 'Valuation', 'fa-chart-line', 'Professional property valuation for various purposes.', 7),
('map-data', 'Map Data Provision', 'fa-map-marked-alt', 'GIS data and customized mapping solutions.', 8),
('property-title', 'Property & Title Services', 'fa-file-contract', 'Title deed processing and property registration.', 9),
('consultancy', 'Consultancy Services', 'fa-user-tie', 'Expert real estate consultancy and advisory.', 10),
('legal-transactions', 'Legal Transactions', 'fa-balance-scale', 'Legal documentation and transaction support.', 11),
('office-transactions', 'Official Office Transactions', 'fa-building', 'Government liaison and official processing.', 12),
('auctioneering', 'Auctioneering Services', 'fa-gavel', 'Bank and registered auctioneering services.', 13);

-- Sample properties
INSERT INTO properties (serial_no, title, location, type, price, category, bedrooms, bathrooms, size_sqft, latitude, longitude, description) VALUES
('PROP-001', 'Modern Apartment in Kilimani', 'Kilimani, Nairobi', 'Apartment', 4500000, 'sale', 3, 2, 1800, -1.3021, 36.7969, 'Spacious 3-bedroom apartment with modern finishes and amenities.'),
('PROP-002', 'Luxury Villa in Karen', 'Karen, Nairobi', 'Villa', 25000000, 'sale', 5, 4, 4500, -1.3191, 36.7082, 'Exclusive gated community villa with pool and garden.'),
('PROP-003', 'Office Space in Westlands', 'Westlands, Nairobi', 'Commercial', 150000, 'rent', 0, 2, 1200, -1.2641, 36.8045, 'Prime office space in business district.'),
('PROP-004', '2-Bedroom in Lavington', 'Lavington, Nairobi', 'Apartment', 85000, 'rent', 2, 2, 1100, -1.2689, 36.8032, 'Fully furnished apartment with balcony.'),
('PROP-005', 'Townhouse in Runda', 'Runda, Nairobi', 'Townhouse', 18000000, 'sale', 4, 3, 3200, -1.2247, 36.8227, 'Modern townhouse with private compound.');

-- Sample lands
INSERT INTO lands (location, type, description, price, size, latitude, longitude, title_deed_no) VALUES
('Kiambu Road', 'Residential Plot', 'Prime residential plot with title deed', 8500000, 0.5, -1.2000, 36.8500, 'KIAMBU/12345/2023'),
('Mombasa Road', 'Commercial Plot', 'Commercial plot near highway', 25000000, 1.2, -1.3200, 36.9000, 'NAIROBI/67890/2023'),
('Ngong', 'Agricultural Land', 'Fertile agricultural land', 3500000, 5.0, -1.3600, 36.6500, 'NGONG/54321/2023'),
('Kitengela', 'Residential Plot', 'Gated community plot', 4500000, 0.25, -1.4700, 36.9500, 'KITENGELA/11223/2023'),
('Juja', 'Investment Plot', 'Strategic investment land', 12000000, 2.0, -1.1000, 37.1000, 'JUJA/44556/2023');

-- Create storage policies
CREATE POLICY "Public can view property images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'property-images' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Public can view land images"
ON storage.objects FOR SELECT
USING (bucket_id = 'land-images');

CREATE POLICY "Authenticated users can upload land images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'land-images' 
    AND auth.role() = 'authenticated'
);
