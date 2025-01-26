document.addEventListener('DOMContentLoaded', () => {
  const editProfileButton = document.querySelector('.profile-info button');
  const profileName = document.querySelector('.profile-info h2');
  const email = document.querySelector('.profile-info p');

  editProfileButton.addEventListener('click', () => {
    const newName = prompt('Enter your new name:', profileName.textContent);
    const newEmail = prompt('Enter your new email:', email.textContent.replace('Email: ', ''));
    
    if (newName) profileName.textContent = newName;
    if (newEmail) email.textContent = `Email: ${newEmail}`;
    
    console.log('Profile updated:', { name: newName, email: newEmail });
  });

  console.log('Profile page script initialized.');
});
