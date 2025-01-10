document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.querySelector('form');
  
  uploadForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const fileInput = document.getElementById('file');
    
    if (!fileInput.files.length) {
      alert('Please select a file to upload.');
      return;
    }

    console.log(`Uploading file with title: ${title}`);
    alert('File uploaded successfully!');
  });

  console.log('Upload page script initialized.');
});
