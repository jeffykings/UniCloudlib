// resources.js

document.addEventListener('DOMContentLoaded', () => {
  const resourceList = document.querySelector('#resource-list');

  // Function to fetch resources from the backend
  const fetchResources = async () => {
    try {
      const response = await fetch('https://unicloudlib-production.up.railway.app/api/resources');
      if (!response.ok) {
        throw new Error(`Failed to fetch resources: ${response.statusText}`);
      }
      const resources = await response.json();
      displayResources(resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      alert('Could not load resources. Please try again later.');
    }
  };

  // Function to display resources on the page
  const displayResources = (resources) => {
    resourceList.innerHTML = '';
    resources.forEach(resource => {
      const resourceItem = document.createElement('div');
      resourceItem.className = 'resource-item';
      resourceItem.innerHTML = `
        <h3>${resource.name}</h3>
        <p>${resource.description}</p>
        <span>Type: ${resource.type}</span>
      `;
      resourceList.appendChild(resourceItem);
    });
  };

  // Initial fetch of resources
  fetchResources();
});
