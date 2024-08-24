// script.js
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generate-btn');
    const searchInput = document.getElementById('search-input');
    const imageContainer = document.getElementById('image-container');
    
    // Unsplash API key (replace with your own key if necessary)
    const API_KEY = 'YOUR_UNSPLASH_API_KEY';// Enter_your_API_here//
    const API_URL = 'https://api.unsplash.com/search/photos';

    button.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) {
            alert('Please enter a search term.');
            return;
        }
        
        try {
            // Fetch images from Unsplash API
            const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${API_KEY}`);
            const data = await response.json();

            if (data.results.length === 0) {
                imageContainer.innerHTML = '<p>No images found.</p>';
                return;
            }
            
            // Pick a random image from the search results
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const selectedImage = data.results[randomIndex].urls.regular;
            
            // Create an image element
            const img = document.createElement('img');
            img.src = selectedImage;
            img.alt = 'Random Image';

            // Clear any existing images
            imageContainer.innerHTML = '';
            
            // Add the new image to the container
            imageContainer.appendChild(img);
        } catch (error) {
            console.error('Error fetching images:', error);
            imageContainer.innerHTML = '<p>Failed to load images.</p>';
        }
    });
});
