// upload.js

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.querySelector('#uploadForm');
  
  uploadForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      school: formData.get('school'),
      department: formData.get('department'),
      course: formData.get('course'),
      level: formData.get('level')
    };

    const file = formData.get('file');
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const backendURL = 'https://your-backend-url.onrender.com/api/resources';
    const payload = new FormData();
    payload.append('file', file);
    Object.entries(data).forEach(([key, value]) => payload.append(key, value));
    
    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        body: payload,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('File upload failed. Please try again later.');
    }
  });

  console.log('Upload page script initialized.');
});
