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
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('authToken', data.token);
        window.location.href = 'home.html';
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
});
