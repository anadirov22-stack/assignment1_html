/*

'use strict';
// Data about products available at Doner na Abaya
const products =[
{
    id: 1,
    name: 'Chicken doner M',
    category: 'doner',
    size: 'M',
    available: true
},
{
    id: 2,
    name: 'Beef doner M',
    category: 'doner',
    size: 'M',
    available: true
},
{   
    id: 3,
    name: 'Assorted doner M',
    category: 'doner',
    size: 'M',
    available: true
},
{
    id: 4,
    name: 'Chicken doner S',
    category: 'doner',
    size: 'S',
    available: true
},
{
    id: 5,
    name: 'Beef doner S',
    category: 'doner',
    size: 'S',
    available: true
}, 
{
    id: 6,
    name: 'Assorted doner S',
    category: 'doner',
    size: 'S',
    available: true
},
{
    id: 7,
    name: 'Coca-Cola 500 ml',
    category: 'drink',
    size: '500 ml',
    available: true
},
{
    id: 8,
    name: 'Fanta 450 ml',
    category: 'drink',
    size: '450 ml',
    available: true
}
];

// Get all available products
function getAvailableProducts(items) {
    return items.filter(function(product) {
    return product.available === true;
});
}
const availableProducts = getAvailableProducts(products);
console.log ('Available products: ',  availableProducts)
    console.log ('Number of available products:',  availableProducts.length);


// Find a product by its ID
function findProductById(items, productId) {
    return items.find(function (product) {
        return product.id === productId;
    });
}
const selectedProduct = findProductById(products, 3);
console.log ('Selected product: ', selectedProduct);


// Count products in a category
function countProductsByCategory(items, category) {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].category === category){
            count ++;
        }
    }
    return count;
    }
    const donerCount = countProductsByCategory(products, 'doner');
    const drinkCount = countProductsByCategory(products, 'drink');
    console.log ('Number of doners: ', donerCount);
    console.log ('Number of drinks: ', drinkCount);

// Calculate product statistics
    function getProductStatistics(items) {
        const availableProducts = getAvailableProducts(items);

        return {
            total: items.length,
            available: availableProducts.length,
            unavailable: items.length - availableProducts.length
        };
    }
    const statistics = getProductStatistics(products);
    console.log ('Product Statistics: ', statistics) 

function filterProducts(items, category, onlyAvailable){
    return items.filter(function(product){
        return product.category === category && (!onlyAvailable || product.available === true);
    });
}
const availableDoners = filterProducts(products, 'doner', true);
const allDrinks = filterProducts(products, 'drink', false);

console.log ('Available doners: ', availableDoners);
console.log ('All drinks: ', allDrinks);    






// Select a random doner
function getRandomDoner(items) {
const doners = items.filter(function (product) {
return product.category === 'doner' &&
product.available === true;
});

if (doners.length === 0) {
    return null;
}

const randomIndex = Math.floor(Math.random() * doners.length);

return doners[randomIndex];
}

const randomDoner = getRandomDoner(products);

console.log('Random doner recommendation:', randomDoner);


if (selectedProduct !== undefined ) {
    console.log ('Found product: ', selectedProduct.name);
}
else {
    console.log ('Product not found')
}

// Create a button for the random doner recommendation
const recommendationButton = document.createElement('button');

recommendationButton.type = 'button';
recommendationButton.textContent = 'Get a Doner Recommendation';

recommendationButton.classList.add(
    'btn',
    'btn-warning',
    'mt-3'
);

// Create a container for the recommendation message
const recommendationMessage = document.createElement('p');

recommendationMessage.classList.add('mt-3');
recommendationMessage.setAttribute('aria-live', 'polite');

// Find the existing About message container
const aboutMessage = document.getElementById('about-message');

 if (aboutMessage !== null) {
    aboutMessage.classList.remove('hidden');

    aboutMessage.appendChild(recommendationButton);
    aboutMessage.appendChild(recommendationMessage);

    recommendationButton.addEventListener('click', function () {
        const recommendedDoner = getRandomDoner(products);

        if (recommendedDoner !== null) {
            recommendationMessage.textContent =
                'Today\'s Doner Recommendation: ' + recommendedDoner.name;
        } else {
            recommendationMessage.textContent =
                'Sorry, no doners are currently available.';
        }
    });
}
*/



'use strict';

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

// Filter products by category and availability
function filterProducts(items, category, onlyAvailable) {
    return items.filter(function (product) {
        const matchesCategory =
            category === 'all' || product.category === category;

        const matchesAvailability =
            !onlyAvailable || product.available === true;

        return matchesCategory && matchesAvailability;
    });
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
    const doners = filterProducts(items, 'doner', true);

    if (doners.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * doners.length);

    return doners[randomIndex];
}

// Display product statistics
console.log('Product statistics:', getProductStatistics(products));
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

    // Create the product catalogue container
    const catalogueSection = document.createElement('section');
    catalogueSection.classList.add('mt-4', 'mb-4');
    catalogueSection.setAttribute('aria-labelledby', 'catalogue-heading');

    const catalogueHeading = document.createElement('h2');
    catalogueHeading.id = 'catalogue-heading';
    catalogueHeading.textContent = 'Explore Our Products';
    catalogueHeading.classList.add('h3', 'mb-3');

    // Create search input
    const searchLabel = document.createElement('label');
    searchLabel.htmlFor = 'product-search';
    searchLabel.textContent = 'Search products';
    searchLabel.classList.add('form-label');

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'product-search';
    searchInput.classList.add('form-control', 'mb-3');
    searchInput.placeholder = 'Enter a product name';

    // Create category filter
    const categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = 'product-category';
    categoryLabel.textContent = 'Choose a category';
    categoryLabel.classList.add('form-label');

    const categorySelect = document.createElement('select');
    categorySelect.id = 'product-category';
    categorySelect.classList.add('form-select', 'mb-3');

    const categories = [
    { value: 'all', text: 'All products' },
    { value: 'doner', text: 'Doners' },
    { value: 'drink', text: 'Drinks' },
    { value: 'addition', text: 'Additions' }
];

    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option');
        option.value = categories[i].value;
        option.textContent = categories[i].text;
        categorySelect.appendChild(option);
    }

    // Create availability filter
    const availabilityLabel = document.createElement('label');
    availabilityLabel.classList.add('form-check', 'mb-3');

    const availabilityCheckbox = document.createElement('input');
    availabilityCheckbox.type = 'checkbox';
    availabilityCheckbox.id = 'available-only';
    availabilityCheckbox.classList.add('form-check-input');

    const availabilityText = document.createElement('span');
    availabilityText.textContent = ' Show available products only';
    availabilityText.classList.add('form-check-label');

    availabilityLabel.appendChild(availabilityCheckbox);
    availabilityLabel.appendChild(availabilityText);

    // Create result count
    const resultCount = document.createElement('p');
    resultCount.classList.add('mt-3');
    resultCount.setAttribute('aria-live', 'polite');
    const selectionMessage = document.createElement('p');
    selectionMessage.classList.add('mt-2');
    selectionMessage.setAttribute('aria-live', 'polite');

    // Create product list
    const productList = document.createElement('div');
    productList.classList.add('row', 'g-3');

    // Create no-results message
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No products match your search.';
    emptyMessage.classList.add('hidden', 'mt-3');
    emptyMessage.setAttribute('role', 'status');

    // Create reset button
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.textContent = 'Reset filters';
    resetButton.classList.add('btn', 'btn-secondary', 'mt-3');

    // Add controls to the catalogue section
    catalogueSection.appendChild(catalogueHeading);
    catalogueSection.appendChild(searchLabel);
    catalogueSection.appendChild(searchInput);
    catalogueSection.appendChild(categoryLabel);
    catalogueSection.appendChild(categorySelect);
    catalogueSection.appendChild(availabilityLabel);
    catalogueSection.appendChild(resultCount);
    catalogueSection.appendChild(selectionMessage);
    catalogueSection.appendChild(productList);
    catalogueSection.appendChild(emptyMessage);
    catalogueSection.appendChild(resetButton);

    aboutMessage.appendChild(catalogueSection);

    // Render product cards
    function renderProducts(items) {
        productList.replaceChildren();

        for (let i = 0; i < items.length; i++) {
            const product = items[i];

            const column = document.createElement('div');
            column.classList.add('col-12', 'col-md-6', 'col-lg-4');

            const card = document.createElement('article');
            card.classList.add('card', 'h-100', 'shadow-sm');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const productName = document.createElement('h3');
            productName.classList.add('card-title', 'h5');
            productName.textContent = product.name;

            const productCategory = document.createElement('p');
            productCategory.classList.add('card-text');
            productCategory.textContent =
                'Category: ' + product.category;

            const productSize = document.createElement('p');
            productSize.classList.add('card-text');
            productSize.textContent = 'Size: ' + product.size;

            const productAvailability = document.createElement('p');
            productAvailability.classList.add('card-text');

            if (product.available === true) {
                productAvailability.textContent = 'Availability: Available';
            } else {
                productAvailability.textContent = 'Availability: Currently unavailable';
            }

            // Add a meaningful next action for a selected product
            const selectButton = document.createElement('button');
            selectButton.type = 'button';
            selectButton.textContent = 'View product';
            selectButton.classList.add('btn', 'btn-outline-danger');

            selectButton.addEventListener('click', function () {
    selectionMessage.textContent =
        'Selected product: ' + product.name +
        '. For prices and ordering, visit the Menu page.';

    productList.querySelectorAll('.card').forEach(
        function (selectedCard) {
            selectedCard.classList.remove(
                'border-danger',
                'border-2'
            );
        }
    );

    card.classList.add('border-danger', 'border-2');
});

            cardBody.appendChild(productName);
            cardBody.appendChild(productCategory);
            cardBody.appendChild(productSize);
            cardBody.appendChild(productAvailability);
            cardBody.appendChild(selectButton);

            card.appendChild(cardBody);
            column.appendChild(card);
            productList.appendChild(column);
        }

        resultCount.textContent = 'Products found: ' + items.length;
        emptyMessage.classList.toggle('hidden', items.length !== 0);
    }

    // Apply search and filter controls together
    function updateCatalogue() {
        const category = categorySelect.value;
        const onlyAvailable = availabilityCheckbox.checked;
        const searchText = searchInput.value;

        const categoryResults = filterProducts(
            products,
            category,
            onlyAvailable
        );

        const matchingProducts = searchProducts(
            categoryResults,
            searchText
        );

        renderProducts(matchingProducts);
    }

    // Listen for user actions
    searchInput.addEventListener('input', updateCatalogue);
    categorySelect.addEventListener('change', updateCatalogue);
    availabilityCheckbox.addEventListener('change', updateCatalogue);

    resetButton.addEventListener('click', function () {
        searchInput.value = '';
        categorySelect.value = 'all';
        availabilityCheckbox.checked = false;

        updateCatalogue();
        searchInput.focus();
    });

    // Create the random recommendation button
    const recommendationButton = document.createElement('button');
    recommendationButton.type = 'button';
    recommendationButton.textContent = 'Get a Doner Recommendation';
    recommendationButton.classList.add('btn', 'btn-warning', 'mt-4');

    const recommendationMessage = document.createElement('p');
    recommendationMessage.classList.add('mt-3');
    recommendationMessage.setAttribute('aria-live', 'polite');

    aboutMessage.appendChild(recommendationButton);
    aboutMessage.appendChild(recommendationMessage);

    recommendationButton.addEventListener('click', function () {
        const recommendedDoner = getRandomDoner(products);

        if (recommendedDoner !== null) {
            recommendationMessage.textContent =
                'Today\'s Doner Recommendation: ' + recommendedDoner.name;
        } else {
            recommendationMessage.textContent =
                'Sorry, no doners are currently available.';
        }
    });

    // Show all products when the page first loads
    updateCatalogue();
} else {
    console.error('About message container was not found.');
}
