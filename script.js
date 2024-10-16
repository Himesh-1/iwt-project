document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-signup');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        newsletterForm.reset();
    });
});

// Sample pet data (in a real application, this would come from a backend API)
const pets = [
    { id: 1, name: 'Buddy', type: 'dog', breed: 'Golden Retriever', age: 'young', description: 'Friendly and energetic', image: 'buddy.jpg' },
    { id: 2, name: 'Whiskers', type: 'cat', breed: 'Siamese', age: 'adult', description: 'Calm and affectionate', image: 'whiskers.jpg' },
    { id: 3, name: 'Polly', type: 'bird', breed: 'Parrot', age: 'young', description: 'Talkative and colorful', image: 'polly.jpg' },
    { id: 4, name: 'Rex', type: 'dog', breed: 'German Shepherd', age: 'adult', description: 'Loyal and protective', image: 'rex.jpg' },
    { id: 5, name: 'Mittens', type: 'cat', breed: 'Maine Coon', age: 'senior', description: 'Gentle giant', image: 'mittens.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
    const petList = document.getElementById('pet-list');
    const petSearch = document.getElementById('pet-search');
    const petType = document.getElementById('pet-type');
    const petAge = document.getElementById('pet-age');

    function renderPets(petsToRender) {
        petList.innerHTML = '';
        petsToRender.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <div class="pet-info">
                    <h3>${pet.name}</h3>
                    <p>Breed: ${pet.breed}</p>
                    <p>Age: ${pet.age}</p>
                    <p>${pet.description}</p>
                    <button class="adopt-button">Adopt ${pet.name}</button>
                </div>
            `;
            petList.appendChild(petCard);
        });
    }

    function filterPets() {
        const searchTerm = petSearch.value.toLowerCase();
        const typeFilter = petType.value;
        const ageFilter = petAge.value;

        const filteredPets = pets.filter(pet => {
            const matchesSearch = pet.name.toLowerCase().includes(searchTerm) || 
                                  pet.breed.toLowerCase().includes(searchTerm) ||
                                  pet.description.toLowerCase().includes(searchTerm);
            const matchesType = typeFilter === '' || pet.type === typeFilter;
            const matchesAge = ageFilter === '' || pet.age === ageFilter;

            return matchesSearch && matchesType && matchesAge;
        });

        renderPets(filteredPets);
    }

    petSearch.addEventListener('input', filterPets);
    petType.addEventListener('change', filterPets);
    petAge.addEventListener('change', filterPets);

    // Initial render
    renderPets(pets);
});

// Sample product data (in a real application, this would come from a backend API)
const products = [
    { id: 1, name: 'Premium Dog Food', category: 'food', price: 29.99, description: 'High-quality nutrition for your dog', image: 'dog-food.jpg' },
    { id: 2, name: 'Interactive Cat Toy', category: 'toys', price: 14.99, description: 'Keep your cat entertained for hours', image: 'cat-toy.jpg' },
    { id: 3, name: 'Cozy Pet Bed', category: 'accessories', price: 39.99, description: 'Comfortable bed for dogs and cats', image: 'pet-bed.jpg' },
    { id: 4, name: 'Bird Seed Mix', category: 'food', price: 9.99, description: 'Nutritious blend for various bird species', image: 'bird-seed.jpg' },
    { id: 5, name: 'Dog Leash and Collar Set', category: 'accessories', price: 24.99, description: 'Durable and stylish walking gear', image: 'leash-collar.jpg' },
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const productSearch = document.getElementById('product-search');
    const productCategory = document.getElementById('product-category');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderProducts(productsToRender) {
        productList.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    function filterProducts() {
        const searchTerm = productSearch.value.toLowerCase();
        const categoryFilter = productCategory.value;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                  product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === '' || product.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts);
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartCount();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemElement);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    productSearch.addEventListener('input', filterProducts);
    productCategory.addEventListener('change', filterProducts);

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        cart = [];
        updateCartCount();
        cartModal.style.display = 'none';
    });

    // Initial render
    renderProducts(products);
});

// Pet care information data (in a real application, this would come from a backend API)
const petCareInfo = {
    dog: {
        general: {
            diet: "High-quality dog food, meat proteins, vegetables, and occasional treats.",
            exercise: "Daily walks, playtime, and mental stimulation activities.",
            grooming: "Regular brushing, nail trimming, and bathing as needed.",
            health: "Annual vet check-ups, vaccinations, and dental care."
        },
        breeds: {
            "labrador": {
                name: "Labrador Retriever",
                traits: "Friendly, outgoing, and high-energy",
                careNeeds: "Requires plenty of exercise and mental stimulation. Prone to hip dysplasia and obesity."
            },
            "germanShepherd": {
                name: "German Shepherd",
                traits: "Intelligent, loyal, and protective",
                careNeeds: "Needs consistent training and socialization. Regular grooming to manage shedding."
            }
        }
    },
    cat: {
        general: {
            diet: "High-quality cat food, wet and dry options, with adequate protein.",
            exercise: "Interactive toys, climbing structures, and play sessions.",
            grooming: "Regular brushing, nail trimming, and dental care.",
            health: "Annual vet check-ups, vaccinations, and indoor living recommended."
        },
        breeds: {
            "siamese": {
                name: "Siamese",
                traits: "Vocal, intelligent, and social",
                careNeeds: "Requires lots of attention and interaction. May need extra mental stimulation."
            },
            "maineCoon": {
                name: "Maine Coon",
                traits: "Large, gentle, and adaptable",
                careNeeds: "Regular grooming to prevent matting. May need larger litter boxes and climbing structures."
            }
        }
    },
    bird: {
        general: {
            diet: "Varied diet of seeds, pellets, fruits, and vegetables.",
            exercise: "Flying time outside the cage, toys, and perches.",
            grooming: "Regular nail and beak trimming, occasional bathing.",
            health: "Annual vet check-ups, proper cage cleaning, and avoiding drafts."
        },
        breeds: {
            "parakeet": {
                name: "Parakeet",
                traits: "Small, social, and energetic",
                careNeeds: "Needs daily interaction and mental stimulation. Regular cage cleaning and varied diet."
            },
            "cockatiel": {
                name: "Cockatiel",
                traits: "Gentle, affectionate, and good for beginners",
                careNeeds: "Requires attention and out-of-cage time. Dust baths and varied perches recommended."
            }
        }
    },
    fish: {
        general: {
            diet: "Species-appropriate fish food, flakes, or pellets.",
            exercise: "Proper tank size and decorations for natural swimming behavior.",
            grooming: "Regular tank cleaning and water changes.",
            health: "Maintain proper water temperature and chemistry. Monitor for signs of illness."
        },
        breeds: {
            "betta": {
                name: "Betta Fish",
                traits: "Colorful, territorial, and low-maintenance",
                careNeeds: "Requires warm water and regular water changes. Should not be kept with other bettas."
            },
            "goldfish": {
                name: "Goldfish",
                traits: "Hardy, long-lived, and social",
                careNeeds: "Needs a large tank or pond. Sensitive to overfeeding and poor water quality."
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const animalTypeSelect = document.getElementById('animal-type');
    const breedSelect = document.getElementById('breed-select');
    const petInfo = document.getElementById('pet-info');

    function updateBreedOptions(animalType) {
        breedSelect.innerHTML = '<option value="">Choose a breed</option>';
        breedSelect.disabled = !animalType;

        if (animalType) {
            const breeds = petCareInfo[animalType].breeds;
            for (const [key, value] of Object.entries(breeds)) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value.name;
                breedSelect.appendChild(option);
            }
        }
    }

    function displayPetInfo(animalType, breed) {
        const generalInfo = petCareInfo[animalType].general;
        const breedInfo = breed ? petCareInfo[animalType].breeds[breed] : null;

        let infoHTML = `<h3>${animalType.charAt(0).toUpperCase() + animalType.slice(1)} Care Information</h3>`;
        
        infoHTML += `
            <h4>General Care</h4>
            <ul>
                <li><strong>Diet:</strong> ${generalInfo.diet}</li>
                <li><strong>Exercise:</strong> ${generalInfo.exercise}</li>
                <li><strong>Grooming:</strong> ${generalInfo.grooming}</li>
                <li><strong>Health:</strong> ${generalInfo.health}</li>
            </ul>
        `;

        if (breedInfo) {
            infoHTML += `
                <h4>${breedInfo.name}</h4>
                <p><strong>Traits:</strong> ${breedInfo.traits}</p>
                <p><strong>Special Care Needs:</strong> ${breedInfo.careNeeds}</p>
            `;
        }

        petInfo.innerHTML = infoHTML;
    }

    animalTypeSelect.addEventListener('change', (e) => {
        const selectedAnimalType = e.target.value;
        updateBreedOptions(selectedAnimalType);
        displayPetInfo(selectedAnimalType, '');
    });

    breedSelect.addEventListener('change', (e) => {
        const selectedBreed = e.target.value;
        const selectedAnimalType = animalTypeSelect.value;
        displayPetInfo(selectedAnimalType, selectedBreed);
    });
});

// Animal and breed information data (in a real application, this would come from a backend API)
const animalBreedData = {
    dogs: {
        name: "Dogs",
        description: "Loyal and affectionate companions, known for their diverse breeds and roles in human society.",
        lifespan: "10-13 years on average",
        habitat: "Domesticated, living alongside humans in various environments",
        image: "https://example.com/dog-image.jpg",
        breeds: {
            "labrador": {
                name: "Labrador Retriever",
                origin: "Newfoundland, Canada",
                temperament: "Friendly, outgoing, and high-energy",
                features: "Water-resistant coat, otter-like tail",
                careNeeds: "Regular exercise, grooming, and mental stimulation"
            },
            "germanShepherd": {
                name: "German Shepherd",
                origin: "Germany",
                temperament: "Intelligent, loyal, and protective",
                features: "Strong, muscular build with a dense double coat",
                careNeeds: "Consistent training, socialization, and regular exercise"
            }
        }
    },
    cats: {
        name: "Cats",
        description: "Independent and graceful animals, popular as household pets known for their agility and hunting instincts.",
        lifespan: "12-18 years on average",
        habitat: "Adaptable to various environments, both indoor and outdoor",
        image: "https://example.com/cat-image.jpg",
        breeds: {
            "siamese": {
                name: "Siamese",
                origin: "Thailand",
                temperament: "Vocal, intelligent, and social",
                features: "Distinctive color points, almond-shaped blue eyes",
                careNeeds: "Mental stimulation, interactive play, and attention"
            },
            "maineCoon": {
                name: "Maine Coon",
                origin: "United States",
                temperament: "Gentle, friendly, and adaptable",
                features: "Large size, long fur with a ruff around the neck",
                careNeeds: "Regular grooming, spacious environment, and climbing opportunities"
            }
        }
    },
    birds: {
        name: "Birds",
        description: "Feathered vertebrates known for their ability to fly, diverse species, and melodious songs.",
        lifespan: "Varies greatly by species, from a few years to several decades",
        habitat: "Found in diverse environments worldwide, from forests to urban areas",
        image: "https://example.com/bird-image.jpg",
        breeds: {
            "parakeet": {
                name: "Parakeet (Budgerigar)",
                origin: "Australia",
                temperament: "Social, playful, and energetic",
                features: "Small size, colorful plumage, hooked beak",
                careNeeds: "Social interaction, varied diet, and plenty of toys"
            },
            "africanGrey": {
                name: "African Grey Parrot",
                origin: "Central Africa",
                temperament: "Intelligent, sensitive, and capable of mimicking speech",
                features: "Grey plumage with a red tail, large vocabulary",
                careNeeds: "Mental stimulation, social interaction, and a spacious cage"
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const animalSpeciesList = document.getElementById('animal-species-list');
    const breedList = document.getElementById('breed-list');
    const animalDetails = document.getElementById('animal-details');

    function populateAnimalSpecies() {
        for (const [key, value] of Object.entries(animalBreedData)) {
            const li = document.createElement('li');
            li.textContent = value.name;
            li.dataset.species = key;
            animalSpeciesList.appendChild(li);
        }
    }

    function showAnimalInfo(species) {
        const animal = animalBreedData[species];
        animalDetails.innerHTML = `
            <h3>${animal.name}</h3>
            <img src="${animal.image}" alt="${animal.name}">
            <p><strong>Description:</strong> ${animal.description}</p>
            <p><strong>Lifespan:</strong> ${animal.lifespan}</p>
            <p><strong>Habitat:</strong> ${animal.habitat}</p>
        `;
        populateBreeds(species);
    }

    function populateBreeds(species) {
        breedList.innerHTML = '';
        const breeds = animalBreedData[species].breeds;
        for (const [key, value] of Object.entries(breeds)) {
            const li = document.createElement('li');
            li.textContent = value.name;
            li.dataset.breed = key;
            li.dataset.species = species;
            breedList.appendChild(li);
        }
    }

    function showBreedInfo(species, breed) {
        const breedInfo = animalBreedData[species].breeds[breed];
        animalDetails.innerHTML = `
            <h3>${breedInfo.name}</h3>
            <p><strong>Origin:</strong> ${breedInfo.origin}</p>
            <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
            <p><strong>Features:</strong> ${breedInfo.features}</p>
            <p><strong>Care Needs:</strong> ${breedInfo.careNeeds}</p>
        `;
    }

    animalSpeciesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const species = e.target.dataset.species;
            showAnimalInfo(species);
            animalSpeciesList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    breedList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const species = e.target.dataset.species;
            const breed = e.target.dataset.breed;
            showBreedInfo(species, breed);
            breedList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    populateAnimalSpecies();
});