document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
      const response = await fetch('https://uni-cloudlib.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Unexpected response format or server error: ${errorText}`);
      }

      const data = await response.json();

      alert('Login successful!');
      localStorage.setItem('authToken', data.token);
      window.location.href = 'home.html';
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  });
});
