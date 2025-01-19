document.addEventListener('DOMContentLoaded', async () => {
  const filters = document.querySelectorAll('.filter-form select, .filter-form input');
  const resourceItems = document.querySelectorAll('.resource-item');
   const resourceGrid = document.querySelector('.resource-grid');

  try {
    const response = await fetch('https://your-vercel-backend-url/files');
    const files = await response.json();

    files.forEach(file => {
      const resourceItem = document.createElement('div');
      resourceItem.className = 'resource-item';
      resourceItem.innerHTML = `
        <h2>${file.title}</h2>
        <p>${file.description}</p>
        <a href="https://your-vercel-backend-url/files/${file.filename}" class="btn" download>Download</a>
      `;
      resourceGrid.appendChild(resourceItem);
    });
  } catch (error) {
    console.error('Error fetching files:', error.message);
  }
});

  filters.forEach(filter => {
    filter.addEventListener('change', () => {
      const filterValues = Array.from(filters).reduce((acc, filter) => {
        acc[filter.id] = filter.value.toLowerCase();
        return acc;
      }, {});

      resourceItems.forEach(item => {
        const matchesAll = Object.entries(filterValues).every(([key, value]) => {
          return value === '' || item.innerHTML.toLowerCase().includes(value);
        });
        item.style.display = matchesAll ? '' : 'none';
      });
    });
  });

  console.log('Resources page filters applied successfully.');
});
