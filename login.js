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

      let data;
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }
      
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
