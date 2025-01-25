document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error('Error: loginForm not found in the DOM.');
        return;
    }

    console.log('loginForm found and ready to use.');

    const loginUrl = 'https://Unicloudlib-production.up.railway.app/api/auth/login';

    async function loginUser(userData) {
        try {
            console.log('Sending login request to backend with data:', userData);

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError);
                throw new Error('Invalid response from server');
            }

            if (response.ok) {
                console.log('Login successful:', data);

                // Save token or user info to local storage or cookies
                if (data.token) {
                    localStorage.setItem('token', data.token);
                } else {
                    console.warn('No token received in the response.');
                }

                alert('Login successful! Redirecting to home page...');
                window.location.href = './home.html'; // Adjust the redirect path based on your project
            } else {
                console.warn('Login failed with response:', data);
                alert(`Login failed: ${data.message || 'Please check your credentials and try again.'}`);
            }
        } catch (error) {
            console.error('Error during login process:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (!emailInput || !passwordInput) {
            console.error('Error: Input elements not found in the DOM.');
            alert('An error occurred. Please try again later.');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        const userData = { email, password };
        console.log('Collected login data:', userData);

        loginUser(userData);
    });
});
