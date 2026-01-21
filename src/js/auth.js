import { supabase } from './supabase.js';

class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoginForm();
        this.checkRedirect();
    }

    setupLoginForm() {
        const form = document.getElementById('loginForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = form.querySelector('#email').value;
            const password = form.querySelector('#password').value;
            
            await this.login(email, password);
        });
    }

    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Redirect to admin dashboard
            window.location.href = 'admin.html';
        } catch (error) {
            this.showError(error.message);
        }
    }

    async logout() {
        await supabase.auth.signOut();
        window.location.href = 'login.html';
    }

    async checkRedirect() {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If user is logged in and on login page, redirect to admin
        if (session && window.location.pathname.includes('login.html')) {
            window.location.href = 'admin.html';
        }
        
        // If user is not logged in and on admin page, redirect to login
        if (!session && window.location.pathname.includes('admin.html')) {
            window.location.href = 'login.html';
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('d-none');
            
            setTimeout(() => {
                errorDiv.classList.add('d-none');
            }, 5000);
        }
    }
}

// Initialize auth manager
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthManager();
});

export { AuthManager };
