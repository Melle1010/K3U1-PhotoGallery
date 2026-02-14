function filterImagesByCategory(images, category) {
    if (category === 'all') return images;
    return images.filter(img => img.category === category);
}

function searchImages(images, query) {
    if (!query) return images;
    const lowerQuery = query.toLowerCase();
    
    return images.filter(img => 
        img.alt.toLowerCase().includes(lowerQuery) || 
        img.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

// --- DOM / UI (Detta körs bara i webbläsaren) ---
if (typeof document !== 'undefined') {
    
    const imageSection = document.querySelector('#image-section');
    const fullImage = document.querySelector('#full-image');
    const closeButton = document.querySelector('#close');
    const backgroundDimmer = document.querySelector('#background-dimmer');
    let allImages = [];

    async function init() {
        try {
            const response = await fetch('assets/data/images.json');
            allImages = await response.json();
            renderImages(allImages); // Rita ut allt från början
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderImages(imagesToRender) {
        imageSection.innerHTML = '';

        if (imagesToRender.length === 0) {
            imageSection.innerHTML = '<p>Inga bilder hittades.</p>';
            return;
        }

        imagesToRender.forEach(imgData => {
            // Skapa semantiska element
            const img = document.createElement('img');
            
            img.src = imgData.thumb;
            img.alt = imgData.alt;
            img.loading = 'lazy';
            
            // Click event för Modal (UPPGIFT: Visa stor bild)
            img.addEventListener('click', () => openFullImage(imgData));

            imageSection.appendChild(img);
        });
    }

    function openFullImage(imgData) {
        fullImage.classList.remove('hidden');
        closeButton.classList.remove('hidden');
        backgroundDimmer.classList.remove('hidden');
        fullImage.src = imgData.full;
    }

    if(closeButton) {
        closeButton.addEventListener('click', () => {
            fullImage.classList.add('hidden');
            closeButton.classList.add('hidden');
            backgroundDimmer.classList.add('hidden');
        });
    }

    // Event listeners för Kategori-knappar
    document.querySelectorAll('#category-buttons-nav button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.id;
            const filtered = filterImagesByCategory(allImages, category);
            renderImages(filtered);
        });
    });

    // Event listener för Sök
    const searchInput = document.querySelector('#site-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const result = searchImages(allImages, query);
        renderImages(result);
    });

    // Starta appen
    init();
}