document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(`Signup successful for email: ${email}`);
    alert('Signup successful!'); 
  });

  console.log('Signup form validation active.');
});
