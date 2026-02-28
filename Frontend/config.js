export const API_BASE_URL = "http://localhost:3001";

// Auto-authentication for testing purposes
export async function ensureAuthenticated() {
    let token = localStorage.getItem('access_token');
    if (token) return token;

    // Create a test user or login if exists
    const credentials = { email: "test@profilebooster.com", password: "password123" };

    try {
        // Try login first
        let res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        // If not found, register
        if (!res.ok && res.status === 401) {
            res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...credentials, name: "Test User" })
            });
        }

        const data = await res.json();
        if (data.accessToken) {
            localStorage.setItem('access_token', data.accessToken);
            if (data.refreshToken) localStorage.setItem('refresh_token', data.refreshToken);
            return data.accessToken;
        }
    } catch (e) {
        console.error("Failed to auto-authenticate:", e);
    }
    return null;
}

export async function authenticatedFetch(endpoint, options = {}) {
    const token = await ensureAuthenticated();

    const headers = {
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
}
