import { supabase } from './supabase.js';
import { DataFormatter } from './utils.js';

class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    async init() {
        // Check authentication
        await this.checkAuth();
        
        // Load dashboard data
        await this.loadDashboardData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize charts
        this.initCharts();
    }

    async checkAuth() {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!session || error) {
            window.location.href = 'login.html';
            return;
        }
        
        this.currentUser = session.user;
        this.updateUserDisplay();
    }

    async loadDashboardData() {
        // Load stats
        await this.loadStats();
        
        // Load recent inquiries
        await this.loadRecentInquiries();
        
        // Load properties for management
        await this.loadPropertiesForManagement();
        
        // Load lands for management
        await this.loadLandsForManagement();
    }

    async loadStats() {
        // Get counts
        const [
            { count: propertiesCount },
            { count: landsCount },
            { count: inquiriesCount },
            { data: recentInquiries }
        ] = await Promise.all([
            supabase.from('properties').select('*', { count: 'exact', head: true }),
            supabase.from('lands').select('*', { count: 'exact', head: true }),
            supabase.from('inquiries').select('*', { count: 'exact', head: true }),
            supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
        ]);

        // Update UI
        document.getElementById('statsProperties').textContent = propertiesCount || 0;
        document.getElementById('statsLands').textContent = landsCount || 0;
        document.getElementById('statsInquiries').textContent = inquiriesCount || 0;
    }

    async loadRecentInquiries() {
        const { data: inquiries } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        this.renderInquiriesTable(inquiries || []);
    }

    async loadPropertiesForManagement() {
        const { data: properties } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        this.renderPropertiesTable(properties || []);
    }

    async loadLandsForManagement() {
        const { data: lands } = await supabase
            .from('lands')
            .select('*')
            .order('created_at', { ascending: false });

        this.renderLandsTable(lands || []);
    }

    renderInquiriesTable(inquiries) {
        const tbody = document.getElementById('inquiriesTableBody');
        if (!tbody) return;

        tbody.innerHTML = inquiries.map(inquiry => `
            <tr>
                <td>${DataFormatter.formatDate(inquiry.created_at)}</td>
                <td>${inquiry.name}</td>
                <td>${inquiry.email}</td>
                <td>${inquiry.phone || 'N/A'}</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(inquiry.status)}">
                        ${inquiry.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="admin.viewInquiry('${inquiry.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-success" onclick="admin.updateInquiryStatus('${inquiry.id}', 'contacted')">
                        <i class="fas fa-check"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderPropertiesTable(properties) {
        const tbody = document.getElementById('propertiesTableBody');
        if (!tbody) return;

        tbody.innerHTML = properties.map(property => `
            <tr>
                <td>${property.serial_no}</td>
                <td>${property.title}</td>
                <td>${property.location}</td>
                <td>${property.type}</td>
                <td>${DataFormatter.formatPrice(property.price)}</td>
                <td>
                    <span class="badge ${property.category === 'rent' ? 'bg-info' : 'bg-primary'}">
                        ${property.category}
                    </span>
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" 
                               ${property.is_active ? 'checked' : ''}
                               onchange="admin.togglePropertyActive('${property.id}', this.checked)">
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="admin.editProperty('${property.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="admin.deleteProperty('${property.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderLandsTable(lands) {
        const tbody = document.getElementById('landsTableBody');
        if (!tbody) return;

        tbody.innerHTML = lands.map(land => `
            <tr>
                <td>${land.location}</td>
                <td>${land.type}</td>
                <td>${DataFormatter.formatPrice(land.price)}</td>
                <td>${land.size} ${land.size_unit}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" 
                               ${land.is_active ? 'checked' : ''}
                               onchange="admin.toggleLandActive('${land.id}', this.checked)">
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="admin.editLand('${land.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="admin.deleteLand('${land.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getStatusColor(status) {
        const colors = {
            'new': 'warning',
            'contacted': 'info',
            'resolved': 'success',
            'spam': 'danger'
        };
        return colors[status] || 'secondary';
    }

    async togglePropertyActive(propertyId, isActive) {
        try {
            const { error } = await supabase
                .from('properties')
                .update({ is_active: isActive })
                .eq('id', propertyId);

            if (error) throw error;
            
            this.showAlert(`Property ${isActive ? 'activated' : 'deactivated'} successfully`, 'success');
        } catch (error) {
            console.error('Error updating property:', error);
            this.showAlert('Error updating property', 'danger');
        }
    }

    async toggleLandActive(landId, isActive) {
        try {
            const { error } = await supabase
                .from('lands')
                .update({ is_active: isActive })
                .eq('id', landId);

            if (error) throw error;
            
            this.showAlert(`Land ${isActive ? 'activated' : 'deactivated'} successfully`, 'success');
        } catch (error) {
            console.error('Error updating land:', error);
            this.showAlert('Error updating land', 'danger');
        }
    }

    async uploadImage(file, bucket) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2)}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(fileName);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    initCharts() {
        // Initialize charts using Chart.js or similar
        // Implementation depends on specific charting requirements
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.href = 'login.html';
        });

        // Form submissions
        const propertyForm = document.getElementById('propertyForm');
        if (propertyForm) {
            propertyForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveProperty(e.target);
            });
        }

        const landForm = document.getElementById('landForm');
        if (landForm) {
            landForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveLand(e.target);
            });
        }
    }

    async saveProperty(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Upload main image if exists
        const imageFile = form.querySelector('#propertyImage').files[0];
        if (imageFile) {
            data.main_image = await this.uploadImage(imageFile, 'property-images');
        }

        try {
            if (data.id) {
                // Update existing property
                const { error } = await supabase
                    .from('properties')
                    .update(data)
                    .eq('id', data.id);
                
                if (error) throw error;
                this.showAlert('Property updated successfully', 'success');
            } else {
                // Create new property
                const { error } = await supabase
                    .from('properties')
                    .insert([data]);
                
                if (error) throw error;
                this.showAlert('Property created successfully', 'success');
            }
            
            form.reset();
            await this.loadPropertiesForManagement();
        } catch (error) {
            console.error('Error saving property:', error);
            this.showAlert('Error saving property', 'danger');
        }
    }

    async saveLand(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Upload main image if exists
        const imageFile = form.querySelector('#landImage').files[0];
        if (imageFile) {
            data.main_image = await this.uploadImage(imageFile, 'land-images');
        }

        try {
            if (data.id) {
                // Update existing land
                const { error } = await supabase
                    .from('lands')
                    .update(data)
                    .eq('id', data.id);
                
                if (error) throw error;
                this.showAlert('Land updated successfully', 'success');
            } else {
                // Create new land
                const { error } = await supabase
                    .from('lands')
                    .insert([data]);
                
                if (error) throw error;
                this.showAlert('Land created successfully', 'success');
            }
            
            form.reset();
            await this.loadLandsForManagement();
        } catch (error) {
            console.error('Error saving land:', error);
            this.showAlert('Error saving land', 'danger');
        }
    }

    showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alert, container.firstChild);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    updateUserDisplay() {
        const userElement = document.getElementById('currentUser');
        if (userElement && this.currentUser) {
            userElement.textContent = this.currentUser.email;
        }
    }
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new AdminDashboard();
});

export { AdminDashboard };
