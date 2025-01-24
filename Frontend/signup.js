document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    const signupForm = document.getElementById('signup-form'); // Fetch the signup form

    if (!signupForm) {
        console.error('Error: signup-form not found in the DOM.');
        return; // Stop execution if the form is not found
    }

    console.log('signup-form found and ready to use.');

    // Backend signup endpoint URL
    const signupUrl = 'https://Unicloudlib-production.up.railway.app/api/auth/signup';

    // Function to handle user signup
    async function signupUser(userData) {
        try {
            console.log('Sending signup request to backend...');

            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json(); // Parse JSON response from the backend

            if (response.ok) {
                console.log('Signup successful:', data);
                alert('Signup successful! Redirecting to login page...');
                window.location.href = './login.html'; // Adjust the path as needed
            } else {
                console.warn('Signup failed:', data);
                alert(`Signup failed: ${data.message || 'Unexpected error occurred.'}`);
            }
        } catch (error) {
            console.error('Error during signup process:', error);
            alert('An error occurred while signing up. Please try again later.');
        }
    }

    // Handle form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log('Signup form submitted.');

        // Collect input values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const position = document.getElementById('position').value.trim();

        // Validate input fields
        if (!name || !email || !password || !position) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Prepare user data object
        const userData = { name, email, password, position };
        console.log('Collected user data:', userData);

        // Call the signup function
        signupUser(userData);
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
