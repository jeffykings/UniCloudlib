document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const errorMessages = document.getElementById('errorMessages'); // Added for error handling

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

      const contentType = response.headers.get('Content-Type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected server response: ${text}`);
      }

      if (response.ok) {
        alert('Signup successful! You can now log in.');
        window.location.href = 'login.html';
      } else {
        errorMessages.innerHTML = '';  // Clear previous error messages
        if (data.errors) {
          data.errors.forEach(error => {
            const p = document.createElement('p');
            p.textContent = `${error.param}: ${error.msg}`;
            errorMessages.appendChild(p);
          });
        } else {
          alert(data.message || 'Signup failed.');
        }
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  });
});
