document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const school = document.getElementById('school').value;
    const department = document.getElementById('department').value;
    const course = document.getElementById('course').value;
    const level = document.getElementById('level').value;
    const fileInput = document.getElementById('file');

    if (!fileInput.files.length) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('school', school);
    formData.append('department', department);
    formData.append('course', course);
    formData.append('level', level);
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('https://your-vercel-backend-url/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'File uploaded successfully!');
      } else {
        alert(data.message || 'Upload failed.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });

  console.log('Upload page script initialized.');
});
