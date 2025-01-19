document.addEventListener('DOMContentLoaded', async () => {
  const filters = document.querySelectorAll('.filter-form select, .filter-form input');
  const resourceItems = document.querySelectorAll('.resource-item');
   const resourceGrid = document.querySelector('.resource-grid');

  try {
    const response = await fetch('https://uni-cloudlib-6lngnkkj8-jeffykings-projects.vercel.app/');
    const files = await response.json();

    resourceGrid,innerHTML = '';
    files.forEach(file => {
      const resourceItem = document.createElement('div');
      resourceItem.className = 'resource-item';
      resourceItem.innerHTML = `
        <h2>${file.title}</h2>
        <p><strong>Description:</strong> ${file.description}</p>
        <p><strong>School:</strong> ${file.school}</p>
        <p><strong>Department:</strong> ${file.department}</p>
        <p><strong>Course:</strong> ${file.course}</p>
        <p><strong>Level:</strong> ${file.level}</p>
        <a href="https://uni-cloudlib-6lngnkkj8-jeffykings-projects.vercel.app/${file.filename}" class="btn" download>Download</a>
      ';
      resourceGrid.appendChild(resourceItem);
    });
  } catch (error) {
    console.error('Error fetching files:', error.message);
    sresourceGrid.innerHTML = '<p>Error loading resources. Please try again later.</p>';
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
