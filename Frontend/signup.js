// signup.js

const signupUrl = 'https://Unicloudlib-production.up.railway.app/auth/signup';
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
            // Redirect to the login page
            window.location.href = '/login.html'; // Adjust this path based on your frontend file structure
        } else {
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
}

// Attach event listener to the signup form
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const position = document.getElementById('position').value;

    const userData = { name, email, password, position };
    signupUser(userData);
});
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async event => {
    event.preventDefault();

    const name = signupForm.querySelector('input[placeholder="Name"]').value;
    const email = signupForm.querySelector('input[placeholder="Email"]').value;
    const password = signupForm.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value;
    const position = signupForm.querySelector('#position').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const backendURL = 'https://unicloudlib-production.up.railway.app//api/auth/signup';
    const payload = { name, email, password, position };

    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // Process JSON response

      if (!response.ok) {
        alert(data.message || 'Signup failed. Please try again.');
        return;
      }
      alert('Signup successful! Redirecting to login page...');
      window.location.replace('login.html');  // Use replace to redirect
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again later.');
    }
  });
});
