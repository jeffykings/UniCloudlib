document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.hero input[type="text"]');
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    console.log(`Searching for resources related to: ${query}`);
  });

  console.log('Index page script loaded successfully.');
});
