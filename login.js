document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
      const response = await fetch('https://uni-cloudlib.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        // Store the token for future use (optional)
        localStorage.setItem('authToken', data.token);
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
});
