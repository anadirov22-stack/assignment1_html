'use strict';

/*
 Ali Nadirov About page Javascript
*/

// Product data for Doner na Abaya
const products = [
    // Doners
    {
        id: 1,
        name: 'Chicken doner',
        category: 'doner',
        size: 'M',
        available: true
    },
    {
        id: 2,
        name: 'Beef doner',
        category: 'doner',
        size: 'M',
        available: true
    },
    {
        id: 3,
        name: 'Assorted doner',
        category: 'doner',
        size: 'M',
        available: true
    },
    {
        id: 4,
        name: 'Chicken doner',
        category: 'doner',
        size: 'S',
        available: true
    },
    {
        id: 5,
        name: 'Beef doner',
        category: 'doner',
        size: 'S',
        available: true
    },
    {
        id: 6,
        name: 'Assorted doner',
        category: 'doner',
        size: 'S',
        available: true
    },

    // Drinks
    {
        id: 7,
        name: 'Coca-Cola Zero Sugar',
        category: 'drink',
        size: '450 ml',
        available: true
    },
    {
        id: 8,
        name: 'Coca-Cola',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 9,
        name: 'Fanta',
        category: 'drink',
        size: '450 ml',
        available: true
    },
    {
        id: 10,
        name: 'Fuse Tea',
        category: 'drink',
        size: '450 ml',
        available: true
    },
    {
        id: 11,
        name: 'Sprite',
        category: 'drink',
        size: '450 ml',
        available: true
    },
    {
        id: 12,
        name: 'Coca-Cola Zero Sugar',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 13,
        name: 'Fanta',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 14,
        name: 'Sprite',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 15,
        name: 'Fuse Tea',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 16,
        name: 'Bonaqua',
        category: 'drink',
        size: '500 ml',
        available: true
    },
    {
        id: 17,
        name: 'Airyan',
        category: 'drink',
        size: '300 ml',
        available: true
    },

    // Additions
    {
        id: 18,
        name: 'Extra beef',
        category: 'addition',
        size: 'Extra portion',
        available: true
    },
    {
        id: 19,
        name: 'Extra chicken',
        category: 'addition',
        size: 'Extra portion',
        available: true
    },
    {
        id: 20,
        name: 'Peppers',
        category: 'addition',
        size: 'Extra portion',
        available: true
    },
    {
        id: 21,
        name: 'Red sauce',
        category: 'addition',
        size: 'Extra portion',
        available: true
    },
    {
        id: 22,
        name: 'White sauce',
        category: 'addition',
        size: 'Extra portion',
        available: true
    }
];

// Get all available products
function getAvailableProducts(items) {
    return items.filter(function (product) {
        return product.available === true;
    });
}

// Find a product by ID
function findProductById(items, productId) {
    return items.find(function (product) {
        return product.id === productId;
    });
}

// Count products in a category
function countProductsByCategory(items, category) {
    let count = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].category === category) {
            count++;
        }
    }

    return count;
}

// Calculate product statistics
function getProductStatistics(items) {
    const availableItems = getAvailableProducts(items);

    return {
        total: items.length,
        available: availableItems.length,
        unavailable: items.length - availableItems.length
    };
}

// Search products by name
function searchProducts(items, searchText) {
    const query = searchText.trim().toLowerCase();

    return items.filter(function (product) {
        return product.name.toLowerCase().includes(query);
    });
}

// Select a random available doner
function getRandomDoner(items) {
    const availableDoners = items.filter(function (product) {
        return product.category === 'doner' &&
            product.available === true;
    });

    if (availableDoners.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * availableDoners.length
    );

    return availableDoners[randomIndex];
}

// Display product statistics in the browser console
console.log(
    'Product statistics:',
    getProductStatistics(products)
);

console.log(
    'Number of doners:',
    countProductsByCategory(products, 'doner')
);

console.log(
    'Number of drinks:',
    countProductsByCategory(products, 'drink')
);

const selectedProduct = findProductById(products, 3);

if (selectedProduct !== undefined) {
    console.log('Found product:', selectedProduct.name);
} else {
    console.log('Product not found');
}

// Find the existing About message container
const aboutMessage = document.getElementById('about-message');

if (aboutMessage !== null) {
    aboutMessage.classList.remove('hidden');

    // Create the product search section
    const searchSection = document.createElement('section');
    searchSection.classList.add('mt-4', 'mb-4');
    searchSection.setAttribute(
        'aria-labelledby',
        'product-search-heading'
    );

    // Create the search heading
    const searchHeading = document.createElement('h2');
    searchHeading.id = 'product-search-heading';
    searchHeading.textContent = 'Find a Product';
    searchHeading.classList.add('h3', 'mb-3');

    // Create the search label
    const searchLabel = document.createElement('label');
    searchLabel.htmlFor = 'product-search';
    searchLabel.textContent = 'Search products in our menu for availability';
    searchLabel.classList.add('form-label');

    // Create the search input
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'product-search';
    searchInput.classList.add('form-control', 'mb-3');
    searchInput.placeholder = 'Enter a product name';
    searchInput.setAttribute('autocomplete', 'off');

    // Create the result count
    const resultCount = document.createElement('p');
    resultCount.classList.add('mt-3');
    resultCount.setAttribute('aria-live', 'polite');
    resultCount.textContent =
        'Start typing a product name to search.';

    // Create a simple list of search results
    const searchResults = document.createElement('ul');
    searchResults.classList.add('mt-2');
    searchResults.setAttribute('aria-live', 'polite');

    // Create the no-results message
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent =
        'No products match your search.';
    emptyMessage.classList.add('hidden', 'mt-2');
    emptyMessage.setAttribute('role', 'status');

    // Create a link to the Menu page
    const menuLink = document.createElement('a');
    menuLink.href = 'menu.html';
    menuLink.textContent = 'View the full menu and prices';
    menuLink.classList.add(
        'btn',
        'btn-outline-danger',
        'mt-3'
    );

    // Add the search elements to the section
    searchSection.appendChild(searchHeading);
    searchSection.appendChild(searchLabel);
    searchSection.appendChild(searchInput);
    searchSection.appendChild(resultCount);
    searchSection.appendChild(searchResults);
    searchSection.appendChild(emptyMessage);
    searchSection.appendChild(menuLink);

    // Add the search section to the About page
    aboutMessage.appendChild(searchSection);

    // Update results when the user searches
    function updateSearchResults() {
        searchResults.replaceChildren();

        const searchText = searchInput.value.trim();

        // Show instructions when the search is empty
        if (searchText === '') {
            resultCount.textContent =
                'Start typing a product name to search.';

            emptyMessage.classList.add('hidden');
            return;
        }

        // Find matching products
        const matchingProducts = searchProducts(
            products,
            searchText
        );

        // Display the number of matching products
        resultCount.textContent =
            'Products found: ' + matchingProducts.length;

        // Show or hide the no-results message
        emptyMessage.classList.toggle(
            'hidden',
            matchingProducts.length !== 0
        );

        // Display products as a simple text list
        matchingProducts.forEach(function (product) {
            const resultItem = document.createElement('li');

            let availabilityText;

            if (product.available === true) {
                availabilityText = 'Available';
            } else {
                availabilityText = 'Currently unavailable';
            }

            resultItem.textContent =
                product.name +
                ' (' + product.size + ')' +
                ' — ' + availabilityText;

            searchResults.appendChild(resultItem);
        });
    }

    // Search when the user types
    searchInput.addEventListener(
        'input',
        updateSearchResults
    );

    // Create the random doner recommendation button
    const recommendationButton =
        document.createElement('button');

    recommendationButton.type = 'button';

    recommendationButton.textContent =
        'Get a Doner Recommendation';

    recommendationButton.classList.add(
        'btn',
        'btn-warning',
        'mt-4'
    );

    // Create the recommendation message
    const recommendationMessage =
        document.createElement('p');

    recommendationMessage.classList.add('mt-3');

    recommendationMessage.setAttribute(
        'aria-live',
        'polite'
    );

    // Add the recommendation elements to the page
    aboutMessage.appendChild(recommendationButton);
    aboutMessage.appendChild(recommendationMessage);

    // Recommend a random available doner
    recommendationButton.addEventListener(
        'click',
        function () {
            const recommendedDoner = getRandomDoner(products);

            if (recommendedDoner !== null) {
                recommendationMessage.textContent =
                    "Today's Doner Recommendation: " +
                    recommendedDoner.name +
                    ' (' + recommendedDoner.size + ') — Available';
            } else {
                recommendationMessage.textContent =
                    'Sorry, no doners are currently available.';
            }
        }
    );

} else {
    console.error(
        'About message container was not found.'
    );
}