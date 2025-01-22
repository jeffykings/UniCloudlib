// login.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    const backendURL = 'https://https://unicloudlib-production.up.railway.app//api/auth/login';
    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }
      const result = await response.json();
      alert('Login successful! Welcome, ' + result.user.name);
      // Redirect or further actions here
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  });

  console.log('Login form script initialized.');
});
