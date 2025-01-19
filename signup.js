document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (event) => {
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

    try {
      const response = await fetch('https://uni-cloudlib.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, position }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! You can now log in.');
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
});
