const signupUrl = 'https://Unicloudlib-production.up.railway.app/auth/signup'; // Update with your backend URL

// Function to handle user signup
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
            // Success message and redirect
            alert('Signup successful! Redirecting to login page...');
            window.location.href = '/login.html'; // Adjust path as needed
        } else {
            // Display error message from backend
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
}

// Add event listener to the form
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const position = document.getElementById('position').value;

    // Prepare user data object
    const userData = { name, email, password, position };

    // Call signup function
    signupUser(userData);
});
