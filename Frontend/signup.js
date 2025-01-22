// signup.js

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

    const backendURL = 'https://your-backend-url.onrender.com/api/auth/signup';
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
