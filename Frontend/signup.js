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

    const backendURL = 'https://https://unicloudlib-production.up.railway.app/api/auth/signup';
    const payload = { name, email, password, position };

    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);
      }
      alert('Signup successful!');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again later.');
    }
  });

  console.log('Signup form validation and connection initialized.');
});
