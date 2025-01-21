document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter-form select, .filter-form input');
  const resourceItems = document.querySelectorAll('.resource-item');

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
