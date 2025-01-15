document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    console.log(`Login attempt with email: ${email}`);
    alert('Login successful!');  // Replace this with actual authentication logic
  });

  console.log('Login form script initialized.');
});
