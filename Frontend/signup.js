document.addEventListener('DOMContentLoaded', () => {
    const signupUrl = 'https://Unicloudlib-production.up.railway.app/auth/signup'; // Replace with your backend URL

    async function signupUser(userData) {
        try {
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful! Redirecting to login page...');
                window.location.href = '/login.html'; // Adjust this path based on your file structure
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again.');
        }
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Collect form input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const position = document.getElementById('position').value;

            // Prepare user data object
            const userData = { name, email, password, position };

            // Call the signup function
            signupUser(userData);
        });
    } else {
        console.error('Signup form not found in the DOM.');
    }
});
