document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    const loginForm = document.getElementById('login-form');

    if (!loginForm) {
        console.error('Error: login-form not found in the DOM.');
        return;
    }

    console.log('login-form found and ready to use.');

    const loginUrl = 'https://Unicloudlib-production.up.railway.app/api/auth/login';

    async function loginUser(userData) {
        try {
            console.log('Sending login request to backend...');

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);

                // Save token or user info to local storage or cookies
                if (data.token) {
                    localStorage.setItem('token', data.token); // Save the token for future use
                }

                alert('Login successful! Redirecting to home page...');
                window.location.href = '/Frontend/home.html'; // Redirect to home.html
            } else {
                console.warn('Login failed:', data);
                alert(`Login failed: ${data.message || 'Please check your credentials and try again.'}`);
            }
        } catch (error) {
            console.error('Error during login process:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        const userData = { email, password };
        console.log('Collected login data:', userData);

        loginUser(userData);
    });
});
