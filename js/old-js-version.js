'use strict';
/* ==================== OLD MAIN.JS ==================== */
(function(){
	'use strict';
// Original main.js (before jQuery rewrite)
function setCurrentPageNavigation() {
const currentPage = window.location.pathname.split('/').pop();
const navigationLinks = document.querySelectorAll('nav a');
navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.setAttribute('aria-current', 'page');
    } else if (link.getAttribute('aria-current') === 'page') {
        link.removeAttribute('aria-current');
    }
});
}
function initializeSharedFeatures() { setCurrentPageNavigation(); }
initializeSharedFeatures();
})();
/* ==================== OLD ABOUT.JS ==================== */
(function(){
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
})();
/* ==================== OLD GALLERY AND REVIEWS.JS ==================== */
(function(){
	'use strict';
/*
    Alikhan Kuttybayev & Ali Nadirov
    Gallery and Reviews page JavaScript (gallery and reviews.html)
*/
const STORAGE_KEY = 'donerNaAbayaReviews';
const initialReviews = [
    {
        id: 'review-1',
        name: 'Arman',
        doner: 'Assorted, standard',
        rating: 5,
        wait: 15,
        date: '2026-09-10',
        text: 'I liked this branch. The doner was fresh and filling, the order was prepared quickly, and the place was clean. I especially liked the sauce.'
    },
    {
        id: 'review-2',
        name: 'Araylym, staff member',
        doner: 'Beef, large',
        rating: 5,
        wait: 15,
        date: '2026-09-11',
        text: 'All our meat is halal. A lot of people come to us exactly for this reason.'
    },
    {
        id: 'review-3',
        name: "Our Team's Visit",
        doner: 'Assorted, standard',
        rating: 5,
        wait: 17,
        date: '2026-09-11',
        text: 'The place was clean and cozy, and the staff were polite. Like Arman, we found the doner fresh and filling. Preparation takes 15-20 minutes.'
    },
    {
        id: 'review-4',
        name: 'Alex',
        doner: 'Chicken, standard',
        rating: 5,
        wait: 15,
        date: '2026-09-10',
        text: 'The chicken doner was tasty and freshly prepared.'
    },
    {
        id: 'review-5',
        name: 'Dana',
        doner: 'Beef, standard',
        rating: 4,
        wait: 18,
        date: '2026-09-12',
        text: 'The beef doner was good, and the service was quick.'
    },
    {
        id: 'review-6',
        name: 'Emma',
        doner: 'Beef, large',
        rating: 3,
        wait: 22,
        date: '2026-09-22',
        text: 'The food was good, although the waiting time could improve.'
    }
];
const reviewList = document.getElementById('review-list');
const reviewCount = document.getElementById('review-count');
const reviewSummary = document.getElementById('review-summary');
const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('reviewer-name');
const emailInput = document.getElementById('reviewer-email');
const phoneInput = document.getElementById('reviewer-phone');
const dateInput = document.getElementById('visit-date');
const waitInput = document.getElementById('wait-minutes');
const donerSelect = document.getElementById('doner-choice');
const reviewText = document.getElementById('review-text');
const publishCheck = document.getElementById('publish-ok');
const confirmBox = document.getElementById('review-confirmation');
const errorBox = document.getElementById('review-error');
let savedReviews = [];
let activeReviewId = '';
// Load saved reviews from localStorage
function loadSavedReviews() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw !== null ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}
// Save reviews to localStorage
function saveReviews(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('Could not save review');
    }
}
// Function 1: Filter reviews by search query and minimum rating
function filterReviews(items, searchText, minRating) {
    const query = searchText.trim().toLowerCase();
    const min = Number(minRating);
    return items.filter(function (item) {
        const matchesText =
            query === '' ||
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.doner.toLowerCase().includes(query);
        const matchesRating = min === 0 || item.rating >= min;
        return matchesText && matchesRating;
    });
}
// Function 2: Calculate average rating
function getAverageRating(items) {
    if (items.length === 0) {
        return '0.0';
    }
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i].rating;
    }
    return (sum / items.length).toFixed(1);
}
// Function 3: Reusable DOM builder for each review card
function createReviewCard(item) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-lg-4');
    const card = document.createElement('article');
    card.classList.add('card', 'h-100', 'border-top', 'border-danger', 'border-4', 'review-card');
    if (item.id === activeReviewId) {
        card.classList.add('active', 'selected');
    }
    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column');
    const title = document.createElement('h3');
    title.classList.add('card-title', 'h5', 'review-name');
    title.textContent = item.name;
    const meta = document.createElement('p');
    meta.classList.add('small', 'fw-bold', 'text-danger', 'mb-2');
    meta.textContent = 'Rating: ' + item.rating + '/5 · ' + item.doner;
    const quote = document.createElement('blockquote');
    quote.classList.add('mb-2');
    const textP = document.createElement('p');
    textP.classList.add('fst-italic', 'mb-0');
    textP.textContent = item.text;
    quote.appendChild(textP);
    const dateP = document.createElement('p');
    dateP.classList.add('small', 'text-muted', 'mt-auto', 'mb-0');
    dateP.textContent = 'Visit date: ' + item.date + ' (Wait: ~' + item.wait + ' min)';
    body.append(title, meta, quote, dateP);
    card.appendChild(body);
    col.appendChild(card);
    return col;
}
// Function 4: Validate form fields
function validateForm() {
    const errors = [];
    const selectedRatingEl = document.querySelector('input[name="rating"]:checked');
    const ratingVal = selectedRatingEl !== null ? Number(selectedRatingEl.value) : 0;
    const textVal = reviewText.value.trim();
    if (nameInput.value.trim().length < 2) {
        errors.push({ field: nameInput, msg: 'Name must be at least 2 characters.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        errors.push({ field: emailInput, msg: 'Please enter a valid email address.' });
    }
    if (dateInput.value === '') {
        errors.push({ field: dateInput, msg: 'Please select your visit date.' });
    } else if (new Date(dateInput.value + 'T00:00:00') > new Date()) {
        errors.push({ field: dateInput, msg: 'Visit date cannot be in the future.' });
    }
    if (donerSelect.value === '') {
        errors.push({ field: donerSelect, msg: 'Please choose a doner.' });
    }
    if (ratingVal === 0) {
        errors.push({ field: document.getElementById('rating-5'), msg: 'Please select a rating.' });
    }
    if (textVal.length < 10) {
        errors.push({ field: reviewText, msg: 'Review must be at least 10 characters.' });
    } else if (ratingVal <= 2 && ratingVal > 0 && textVal.length < 25) {
        errors.push({ field: reviewText, msg: 'For rating 1 or 2, explain in at least 25 characters.' });
    }
    if (!publishCheck.checked) {
        errors.push({ field: publishCheck, msg: 'Please agree to publish your review.' });
    }
    return errors;
}
function initReviewsPage() {
    if (reviewList === null || form === null) {
        return;
    }
    form.noValidate = true;
    savedReviews = loadSavedReviews();
    // Create search & rating filter controls above What Visitors Say
    const controls = document.createElement('div');
    controls.classList.add('row', 'g-2', 'mb-3');
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.classList.add('form-control');
    searchInput.placeholder = 'Search reviews...';
    const col1 = document.createElement('div');
    col1.classList.add('col-12', 'col-md-5');
    col1.appendChild(searchInput);
    const ratingFilter = document.createElement('select');
    ratingFilter.classList.add('form-select');
    [
        { val: '0', text: 'All Ratings' },
        { val: '5', text: '5 Stars Only' },
        { val: '4', text: '4+ Stars' }
    ].forEach(function (opt) {
        const o = document.createElement('option');
        o.value = opt.val;
        o.textContent = opt.text;
        ratingFilter.appendChild(o);
    });
    const col2 = document.createElement('div');
    col2.classList.add('col-6', 'col-md-4');
    col2.appendChild(ratingFilter);
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.classList.add('btn', 'btn-outline-dark', 'w-100');
    resetBtn.textContent = 'Reset';
    const col3 = document.createElement('div');
    col3.classList.add('col-6', 'col-md-3');
    col3.appendChild(resetBtn);
    controls.append(col1, col2, col3);
    const emptyMsg = document.createElement('p');
    emptyMsg.classList.add('alert', 'alert-warning', 'hidden');
    emptyMsg.textContent = 'No reviews match your search.';
    reviewSummary.insertAdjacentElement('beforebegin', controls);
    reviewList.insertAdjacentElement('beforebegin', emptyMsg);
    // Live character counter below review textarea
    const charCounter = document.createElement('p');
    charCounter.classList.add('small', 'text-muted', 'mt-1', 'mb-0');
    charCounter.textContent = 'Characters: 0 (min 10)';
    reviewText.insertAdjacentElement('afterend', charCounter);
    reviewText.addEventListener('input', function () {
        charCounter.textContent = 'Characters: ' + reviewText.value.trim().length + ' (min 10)';
    });
    function render() {
        const allReviews = savedReviews.concat(initialReviews);
        const filtered = filterReviews(allReviews, searchInput.value, ratingFilter.value);
        reviewList.replaceChildren();
        if (reviewCount !== null) {
            reviewCount.textContent =
                filtered.length + ' (Avg rating: ' + getAverageRating(filtered) + '/5)';
        }
        if (filtered.length === 0) {
            emptyMsg.classList.remove('hidden');
            return;
        }
        emptyMsg.classList.add('hidden');
        for (let i = 0; i < filtered.length; i++) {
            reviewList.appendChild(createReviewCard(filtered[i]));
        }
    }
    searchInput.addEventListener('input', render);
    ratingFilter.addEventListener('change', render);
    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        ratingFilter.value = '0';
        activeReviewId = '';
        render();
    });
    function clearErrors() {
        form.querySelectorAll('.js-err').forEach(function (el) { el.remove(); });
        form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
        errorBox.classList.add('hidden');
        confirmBox.classList.add('hidden');
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();
        const errors = validateForm();
        if (errors.length > 0) {
            errors.forEach(function (item) {
                item.field.classList.add('error');
                const msg = document.createElement('div');
                msg.classList.add('js-err', 'error', 'small', 'mt-1');
                msg.textContent = item.msg;
                item.field.parentElement.appendChild(msg);
            });
            errorBox.textContent = 'Please fix the highlighted fields above.';
            errorBox.classList.remove('hidden');
            errors[0].field.focus();
            return;
        }
        const ratingVal = Number(document.querySelector('input[name="rating"]:checked').value);
        const donerText = donerSelect.options[donerSelect.selectedIndex].text;
        const refNum = 'REV-' + (Math.floor(Math.random() * 900) + 100);
        const newId = 'review-user-' + Date.now();
        const newReview = {
            id: newId,
            name: nameInput.value.trim(),
            doner: donerText,
            rating: ratingVal,
            wait: Number(waitInput.value) || 15,
            date: dateInput.value + ' (Added ' + new Date().toLocaleTimeString() + ')',
            text: reviewText.value.trim()
        };
        savedReviews.unshift(newReview);
        saveReviews(savedReviews);
        activeReviewId = newId;
        searchInput.value = '';
        ratingFilter.value = '0';
        render();
        confirmBox.textContent =
            'Demo confirmation ' + refNum + ': Thank you, ' + newReview.name +
            '! Your review was added to What Visitors Say below. No data is sent to a server.';
        confirmBox.classList.remove('hidden');
        form.reset();
        charCounter.textContent = 'Characters: 0 (min 10)';
    });
    form.addEventListener('reset', function () {
        clearErrors();
        charCounter.textContent = 'Characters: 0 (min 10)';
    });
    render();
}
initReviewsPage();
})();
/* ==================== OLD ORDER.JS ==================== */
/* Mazhit Nurasyl */
(function(){
	'use strict';
const products=[
    { id:'chicken-standard',name:'Chicken Doner — Standard',category:'doner',price:1895 },
    { id:'chicken-large',name:'Chicken Doner — Large',category:'doner',price:2195 },
    { id:'beef-standard',name:'Beef Doner — Standard',category:'doner',price:2195 },
    { id:'beef-large',name:'Beef Doner — Large',category:'doner',price:2495 },
    { id:'assorted-standard',name:'Assorted Doner — Standard',category:'doner',price:2095 },
    { id:'assorted-large',name:'Assorted Doner — Large',category:'doner',price:2395 }
];
const drinks=[
    { id:'coca-cola-450',name:'Coca-Cola 450 ml',category:'drink',price:795 },
    { id:'coca-cola-500',name:'Coca-Cola 500 ml',category:'drink',price:845 },
    { id:'coca-cola-zero-450',name:'Coca-Cola Zero Sugar 450 ml',category:'drink',price:795 },
    { id:'coca-cola-zero-500',name:'Coca-Cola Zero Sugar 500 ml',category:'drink',price:845 },
    { id:'fanta-450',name:'Fanta 450 ml',category:'drink',price:795 },
    { id:'fanta-500',name:'Fanta 500 ml',category:'drink',price:845 },
    { id:'sprite-450',name:'Sprite 450 ml',category:'drink',price:795 },
    { id:'sprite-500',name:'Sprite 500 ml',category:'drink',price:845 },
    { id:'fuse-tea-450',name:'Fuse Tea 450 ml',category:'drink',price:795 },
    { id:'fuse-tea-500',name:'Fuse Tea 500 ml',category:'drink',price:845 },
    { id:'bonaqua-500',name:'Bonaqua 500 ml',category:'drink',price:595 },
    { id:'ayran-300',name:'Ayran 300 ml',category:'drink',price:595 }
];
const extras=[
    { id:'extra-chicken',name:'Extra chicken 50 g',category:'extra',price:590 },
    { id:'extra-beef',name:'Extra beef 50 g',category:'extra',price:690 },
    { id:'extra-fries',name:'Fries',category:'extra',price:895 },
    { id:'extra-sauce',name:'Sauce',category:'extra',price:200 },
    { id:'extra-peppers',name:'Peppers',category:'extra',price:100 }
];
const cart=[];
const orderForm=document.querySelector('#order-form');
const donerSelect=document.querySelector('#doner-product');
const donerQuantity=document.querySelector('#doner-quantity');
const drinkSelect=document.querySelector('#drink-product');
const drinkQuantity=document.querySelector('#drink-quantity');
const extraOptions=document.querySelectorAll('.extra-option');
const addSelectionButton=document.querySelector('#add-selection');
const cartEmpty=document.querySelector('#cart-empty');
const cartItems=document.querySelector('#cart-items');
const cartSummary=document.querySelector('#cart-summary');
const clearCartButton=document.querySelector('#clear-cart');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const phoneInput=document.querySelector('#phone');
const dateInput=document.querySelector('#order-date');
const timeInput=document.querySelector('#order-time');
const confirmInput=document.querySelector('#confirm');
const resetButton=document.querySelector('#reset-order');
const confirmationBox=document.querySelector('#order-confirmation');
const errorBox=document.querySelector('#order-error');
function findItemById(items,id){
    return items.find(function(item){
        return item.id===id;
    });
}
function calculateItemTotal(price,quantity){
    return price*quantity;
}
function calculateCartTotal(){
    return cart.reduce(function(total,item){
        return total+calculateItemTotal(item.price,item.quantity);
    },0);
}
function calculateTotalQuantity(){
    return cart.reduce(function(total,item){
        return total+item.quantity;
    },0);
}
function createDemoReference(){
    const randomNumber=Math.floor(Math.random()*9000)+1000;
    return 'DNA-'+randomNumber;
}
function getOrderType(){
    const selectedType=document.querySelector('input[name="type"]:checked');
    if(selectedType===null){
        return '';
    }
    return selectedType.value;
}
function clearMessages(){
    confirmationBox.textContent='';
    errorBox.textContent='';
    confirmationBox.classList.add('state-hidden');
    errorBox.classList.add('state-hidden');
}
function showError(message){
    errorBox.textContent=message;
    errorBox.classList.remove('state-hidden');
}
function showConfirmation(message){
    confirmationBox.textContent=message;
    confirmationBox.classList.remove('state-hidden');
}
function clearFieldErrors(){
    document.querySelectorAll('.js-field-error').forEach(function(error){
        error.remove();
    });
    orderForm.querySelectorAll('.is-invalid').forEach(function(field){
        field.classList.remove('is-invalid');
    });
}
function addFieldError(field,message,container){
    field.classList.add('is-invalid');
    const error=document.createElement('div');
    error.classList.add('js-field-error','text-danger','small','mt-1');
    error.textContent=message;
    if(container!==undefined&&container!==null){
        container.append(error);
    }else{
        field.insertAdjacentElement('afterend',error);
    }
}
function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone){
    const cleanPhone=phone.replace(/[\s()-]/g,'');
    return /^\+?[0-9]{10,15}$/.test(cleanPhone);
}
function isPastDate(dateValue){
    if(dateValue===''){
        return false;
    }
    const selectedDate=new Date(dateValue+'T00:00:00');
    const today=new Date();
    today.setHours(0,0,0,0);
    return selectedDate<today;
}
function isFridayBreak(dateValue,timeValue){
    if(dateValue===''||timeValue===''){
        return false;
    }
    const selectedDate=new Date(dateValue+'T00:00:00');
    return selectedDate.getDay()===5&&timeValue>='12:30'&&timeValue<'14:00';
}
function validateQuantity(input){
    const quantity=Number(input.value);
    return Number.isNaN(quantity)!==true&&quantity>=1&&quantity<=10;
}
function addOrUpdateCartItem(item,quantity){
    const existingItem=cart.find(function(cartItem){
        return cartItem.id===item.id;
    });
    if(existingItem!==undefined){
        existingItem.quantity=Math.min(existingItem.quantity+quantity,10);
    }else{
        cart.push({id:item.id,name:item.name,category:item.category,price:item.price,quantity:quantity});
    }
}
function getSelectedExtras(){
    const selected=[];
    extraOptions.forEach(function(option){
        if(option.checked===true){
            const extra=findItemById(extras,option.value);
            if(extra!==undefined){
                selected.push(extra);
            }
        }
    });
    return selected;
}
function resetSelection(){
    donerSelect.value='';
    drinkSelect.value='';
    donerQuantity.value=1;
    drinkQuantity.value=1;
    extraOptions.forEach(function(option){
        option.checked=false;
    });
}
function addSelectionToCart(){
    clearMessages();
    clearFieldErrors();
    const donerChosen=donerSelect.value!=='';
    const drinkChosen=drinkSelect.value!=='';
    const selectedExtras=getSelectedExtras();
    if(donerChosen===true&&validateQuantity(donerQuantity)!==true){
        addFieldError(donerQuantity,'Quantity must be from 1 to 10.');
        donerQuantity.focus();
        return;
    }
    if(drinkChosen===true&&validateQuantity(drinkQuantity)!==true){
        addFieldError(drinkQuantity,'Quantity must be from 1 to 10.');
        drinkQuantity.focus();
        return;
    }
    if(donerChosen!==true&&drinkChosen!==true&&selectedExtras.length===0){
        showError('Choose at least one doner, drink or extra.');
        donerSelect.focus();
        return;
    }
    let addedCount=0;
    if(donerChosen===true){
        const doner=findItemById(products,donerSelect.value);
        if(doner!==undefined){
            addOrUpdateCartItem(doner,Number(donerQuantity.value));
            addedCount+=1;
        }
    }
    if(drinkChosen===true){
        const drink=findItemById(drinks,drinkSelect.value);
        if(drink!==undefined){
            addOrUpdateCartItem(drink,Number(drinkQuantity.value));
            addedCount+=1;
        }
    }
    selectedExtras.forEach(function(extra){
        addOrUpdateCartItem(extra,1);
        addedCount+=1;
    });
    renderCart();
    showConfirmation(addedCount+' item type(s) added to the cart. Current total: '+calculateCartTotal()+' KZT.');
    resetSelection();
}
function createCartItemElement(item,index){
    const wrapper=document.createElement('div');
    wrapper.classList.add('border','rounded','p-3','mb-3','bg-body-tertiary');
    const topRow=document.createElement('div');
    topRow.classList.add('d-flex','flex-wrap','justify-content-between','gap-2');
    const name=document.createElement('h3');
    name.classList.add('h6','mb-1');
    name.textContent=item.name;
    const category=document.createElement('span');
    category.classList.add('badge','text-bg-secondary');
    category.textContent=item.category;
    topRow.append(name,category);
    const price=document.createElement('p');
    price.classList.add('mb-2');
    price.textContent=item.price+' KZT × '+item.quantity+' = '+calculateItemTotal(item.price,item.quantity)+' KZT';
    const controls=document.createElement('div');
    controls.classList.add('d-flex','flex-wrap','align-items-center','gap-2');
    const decreaseButton=document.createElement('button');
    decreaseButton.type='button';
    decreaseButton.classList.add('btn','btn-outline-dark','btn-sm');
    decreaseButton.textContent='−';
    const quantityBadge=document.createElement('span');
    quantityBadge.classList.add('badge','text-bg-dark');
    quantityBadge.textContent=String(item.quantity);
    const increaseButton=document.createElement('button');
    increaseButton.type='button';
    increaseButton.classList.add('btn','btn-outline-dark','btn-sm');
    increaseButton.textContent='+';
    const removeButton=document.createElement('button');
    removeButton.type='button';
    removeButton.classList.add('btn','btn-outline-danger','btn-sm');
    removeButton.textContent='Remove';
    decreaseButton.addEventListener('click',function(){
        if(item.quantity>1){
            item.quantity-=1;
            renderCart();
        }
    });
    increaseButton.addEventListener('click',function(){
        if(item.quantity<10){
            item.quantity+=1;
            renderCart();
        }
    });
    removeButton.addEventListener('click',function(){
        cart.splice(index,1);
        renderCart();
        showConfirmation(item.name+' was removed from the cart.');
    });
    controls.append(decreaseButton,quantityBadge,increaseButton,removeButton);
    wrapper.append(topRow,price,controls);
    return wrapper;
}
function renderCart(){
    cartItems.replaceChildren();
    if(cart.length===0){
        cartEmpty.classList.remove('d-none');
        cartSummary.textContent='';
        clearCartButton.disabled=true;
        return;
    }
    cartEmpty.classList.add('d-none');
    clearCartButton.disabled=false;
    cart.forEach(function(item,index){
        cartItems.append(createCartItemElement(item,index));
    });
    cartSummary.textContent='Total items: '+calculateTotalQuantity()+' | Final total: '+calculateCartTotal()+' KZT';
}
function clearCart(){
    cart.length=0;
    renderCart();
    clearMessages();
    showConfirmation('Cart cleared.');
}
function validateCheckout(){
    clearFieldErrors();
    const name=nameInput.value.trim();
    const email=emailInput.value.trim();
    const phone=phoneInput.value.trim();
    const orderType=getOrderType();
    let valid=true;
    let firstInvalidField=null;
    if(cart.length===0){
        showError('Your cart is empty. Add at least one item before checkout.');
        valid=false;
    }
    if(name===''){
        addFieldError(nameInput,'Please enter your name.');
        firstInvalidField=nameInput;
        valid=false;
    }
    if(email===''||isValidEmail(email)!==true){
        addFieldError(emailInput,'Please enter a valid email address.');
        if(firstInvalidField===null){
            firstInvalidField=emailInput;
        }
        valid=false;
    }
    if(phone===''||isValidPhone(phone)!==true){
        addFieldError(phoneInput,'Please enter a valid phone number.');
        if(firstInvalidField===null){
            firstInvalidField=phoneInput;
        }
        valid=false;
    }
    if(dateInput.value===''){
        addFieldError(dateInput,'Please choose an order date.');
        if(firstInvalidField===null){
            firstInvalidField=dateInput;
        }
        valid=false;
    }else if(isPastDate(dateInput.value)===true){
        addFieldError(dateInput,'The order date cannot be in the past.');
        if(firstInvalidField===null){
            firstInvalidField=dateInput;
        }
        valid=false;
    }
    if(timeInput.value===''){
        addFieldError(timeInput,'Please choose a preferred time.');
        if(firstInvalidField===null){
            firstInvalidField=timeInput;
        }
        valid=false;
    }else if(isFridayBreak(dateInput.value,timeInput.value)===true){
        addFieldError(timeInput,'Friday break is from 12:30 to 14:00. Please choose another time.');
        if(firstInvalidField===null){
            firstInvalidField=timeInput;
        }
        valid=false;
    }
    if(orderType===''){
        const pickupInput=document.querySelector('#pickup');
        const orderTypeContainer=pickupInput.closest('.col-12');
        addFieldError(pickupInput,'Please choose Pickup or Delivery.',orderTypeContainer);
        if(firstInvalidField===null){
            firstInvalidField=pickupInput;
        }
        valid=false;
    }
    if(confirmInput.checked!==true){
        const confirmContainer=confirmInput.closest('.col-12');
        addFieldError(confirmInput,'Please confirm your order information.',confirmContainer);
        if(firstInvalidField===null){
            firstInvalidField=confirmInput;
        }
        valid=false;
    }
    return {valid:valid,field:firstInvalidField};
}
function createOrderSummary(){
    return cart.map(function(item){
        return item.name+' × '+item.quantity;
    }).join(', ');
}
function handleOrderSubmit(event){
    event.preventDefault();
    clearMessages();
    const validation=validateCheckout();
    if(validation.valid!==true){
        if(errorBox.textContent===''){
            showError('Please correct the highlighted fields before checkout.');
        }
        if(validation.field!==null){
            validation.field.focus();
        }
        return;
    }
    const reference=createDemoReference();
    const message='Demo confirmation '+reference+' for '+nameInput.value.trim()+'. Order: '+createOrderSummary()+'. Total items: '+calculateTotalQuantity()+'. Final total: '+calculateCartTotal()+' KZT. Order type: '+getOrderType()+'. Date: '+dateInput.value+', time: '+timeInput.value+'. No data was sent to a server and no real restaurant order was created.';
    showConfirmation(message);
}
function handleReset(event){
    event.preventDefault();
    orderForm.reset();
    cart.length=0;
    clearMessages();
    clearFieldErrors();
    renderCart();
    showConfirmation('Order form and cart were reset.');
}
function clearFieldErrorOnInteraction(event){
    const field=event.target;
    if(field.classList.contains('is-invalid')){
        field.classList.remove('is-invalid');
    }
    const nextElement=field.nextElementSibling;
    if(nextElement!==null&&nextElement.classList.contains('js-field-error')){
        nextElement.remove();
    }
}
function setMinimumOrderDate(){
    const today=new Date();
    const year=today.getFullYear();
    const month=String(today.getMonth()+1).padStart(2,'0');
    const day=String(today.getDate()).padStart(2,'0');
    dateInput.min=year+'-'+month+'-'+day;
}
function initializeOrderPage(){
    if(orderForm===null){
        return;
    }
    setMinimumOrderDate();
    renderCart();
    addSelectionButton.addEventListener('click',addSelectionToCart);
    clearCartButton.addEventListener('click',clearCart);
    orderForm.addEventListener('submit',handleOrderSubmit);
    resetButton.addEventListener('click',handleReset);
    orderForm.querySelectorAll('input, select, textarea').forEach(function(field){
        field.addEventListener('input',clearFieldErrorOnInteraction);
        field.addEventListener('change',clearFieldErrorOnInteraction);
    });
}
initializeOrderPage();
})();
/* ==================== OLD FAQ.JS ==================== */
/* Mazhit Nurasyl */
(function(){
	'use strict';
const faqAccordion=document.querySelector('#faq-accordion');
const faqData=[
    {
        id:'question-one',
        category:'order',
        question:'Can I order online?',
        keywords:['order','online','food']
    },
    {
        id:'question-two',
        category:'order',
        question:'Do you have delivery?',
        keywords:['delivery','order']
    },
    {
        id:'question-three',
        category:'menu',
        question:'Where can I see the menu?',
        keywords:['menu','food','price']
    },
    {
        id:'question-four',
        category:'restaurant',
        question:'What are your opening hours?',
        keywords:['hours','open','time']
    }
];
let faqSearchInput=null;
let faqCategorySelect=null;
let faqResultCount=null;
let faqNoResults=null;
let faqResetButton=null;
function findFaqById(id){
    return faqData.find(function(item){
        return item.id===id;
    });
}
function filterFaq(searchText,category){
    const cleanText=searchText.trim().toLowerCase();
    return faqData.filter(function(item){
        const questionMatches=cleanText===''||item.question.toLowerCase().includes(cleanText);
        const keywordMatches=cleanText===''||item.keywords.some(function(keyword){
            return keyword.includes(cleanText);
        });
        const categoryMatches=category==='all'||item.category===category;
        return (questionMatches||keywordMatches)&&categoryMatches;
    });
}
function getFaqCount(items){
    return items.length;
}
function createFaqSearch(){
    const controls=document.createElement('div');
    controls.id='faq-search-controls';
    controls.classList.add('row','g-3','align-items-end','mb-4');
    const searchColumn=document.createElement('div');
    searchColumn.classList.add('col-12','col-md-6');
    const searchLabel=document.createElement('label');
    searchLabel.classList.add('form-label');
    searchLabel.setAttribute('for','faq-search');
    searchLabel.textContent='Search FAQ';
    faqSearchInput=document.createElement('input');
    faqSearchInput.id='faq-search';
    faqSearchInput.type='search';
    faqSearchInput.classList.add('form-control');
    faqSearchInput.placeholder='Type order, delivery, menu...';
    searchColumn.append(searchLabel,faqSearchInput);
    const categoryColumn=document.createElement('div');
    categoryColumn.classList.add('col-12','col-md-3');
    const categoryLabel=document.createElement('label');
    categoryLabel.classList.add('form-label');
    categoryLabel.setAttribute('for','faq-category');
    categoryLabel.textContent='Category';
    faqCategorySelect=document.createElement('select');
    faqCategorySelect.id='faq-category';
    faqCategorySelect.classList.add('form-select');
    const categories=[
        { value:'all',label:'All categories' },
        { value:'order',label:'Order' },
        { value:'menu',label:'Menu' },
        { value:'restaurant',label:'Restaurant' }
    ];
    categories.forEach(function(category){
        const option=document.createElement('option');
        option.value=category.value;
        option.textContent=category.label;
        faqCategorySelect.append(option);
    });
    categoryColumn.append(categoryLabel,faqCategorySelect);
    const resetColumn=document.createElement('div');
    resetColumn.classList.add('col-12','col-md-3');
    faqResetButton=document.createElement('button');
    faqResetButton.type='button';
    faqResetButton.classList.add('btn','btn-outline-danger','w-100');
    faqResetButton.textContent='Reset';
    resetColumn.append(faqResetButton);
    faqResultCount=document.createElement('p');
    faqResultCount.classList.add('small','text-secondary','mb-2');
    faqNoResults=document.createElement('div');
    faqNoResults.classList.add('alert','alert-warning','d-none');
    faqNoResults.setAttribute('role','status');
    faqNoResults.textContent='No FAQ results found.';
    controls.append(searchColumn,categoryColumn,resetColumn);
    faqAccordion.parentNode.insertBefore(controls,faqAccordion);
    faqAccordion.parentNode.insertBefore(faqResultCount,faqAccordion);
    faqAccordion.parentNode.insertBefore(faqNoResults,faqAccordion);
    updateFaqDisplay(faqData);
}
function updateFaqDisplay(results){
    faqData.forEach(function(faqItem){
        const matchedItem=findFaqById(faqItem.id);
        const collapse=document.querySelector('#'+faqItem.id);
        if(matchedItem===undefined||collapse===null){
            return;
        }
        const accordionItem=collapse.closest('.accordion-item');
        const existsInResults=results.some(function(result){
            return result.id===faqItem.id;
        });
        if(existsInResults===true){
            accordionItem.classList.remove('d-none');
        }else{
            accordionItem.classList.add('d-none');
        }
    });
    const count=getFaqCount(results);
    faqResultCount.textContent='Results: '+count+' of '+faqData.length;
    if(count===0){
        faqNoResults.classList.remove('d-none');
    }else{
        faqNoResults.classList.add('d-none');
    }
}
function applyFaqFilters(){
    const results=filterFaq(faqSearchInput.value,faqCategorySelect.value);
    updateFaqDisplay(results);
}
function resetFaqSearch(){
    faqSearchInput.value='';
    faqCategorySelect.value='all';
    updateFaqDisplay(faqData);
    faqSearchInput.focus();
}
function initializeFaqPage(){
    if(faqAccordion===null){
        return;
    }
    createFaqSearch();
    faqSearchInput.addEventListener('input',applyFaqFilters);
    faqCategorySelect.addEventListener('change',applyFaqFilters);
    faqResetButton.addEventListener('click',resetFaqSearch);
}
initializeFaqPage();
})();

/* ==================== OLD MENU.JS  ==================== */
'use strict';

/*
    Alikhan Kuttybayev - Menu page JavaScript (menu.html)
*/

const menuCatalogue = [
    { id: 'chicken', name: 'Chicken Doner', category: 'doner', price: 1895, size: '390 g · Standard / Large (2195 ₸)', desc: 'Lavash, chicken, french fries, pickled cucumbers, signature sauce.', img: 'images/1.jpeg' },
    { id: 'beef', name: 'Beef Doner', category: 'doner', price: 2195, size: '390 g · Standard / Large (2495 ₸)', desc: 'Lavash, beef, french fries, pickled cucumbers, signature sauce.', img: 'images/2.jpeg' },
    { id: 'assorted', name: 'Assorted Doner', category: 'doner', price: 2095, size: '390 g · Standard / Large (2395 ₸)', desc: 'Lavash, beef and chicken, french fries, pickled cucumbers, sauce.', img: 'images/3.jpeg' },
    { id: 'cola', name: 'Coca-Cola', category: 'drink', price: 795, size: '500 ml (845 ₸)', desc: 'Chilled carbonated soft drink.', img: 'images/4.jpeg' },
    { id: 'ayran', name: 'Traditional Ayran', category: 'drink', price: 595, size: '300 ml', desc: 'Cold traditional sour-milk drink.', img: 'images/5.jpeg' },
    { id: 'bonaqua', name: 'Water', category: 'drink', price: 595, size: '500 ml', desc: 'Refreshing still drinking water.', img: 'images/6.jpeg' },
    { id: 'fries', name: 'Crispy Fries', category: 'extra', price: 895, size: '1 portion', desc: 'Hot golden french fries.', img: 'images/7.jpeg' },
    { id: 'extra-meat', name: 'Extra Chicken / Beef (50 g)', category: 'extra', price: 590, size: '50 g (Beef: 690 ₸)', desc: 'Additional portion of grilled halal meat.', img: 'images/8.jpeg' },
    { id: 'sauce', name: 'Signature Sauce / Peppers', category: 'extra', price: 200, size: '1 cup (Peppers: 100 ₸)', desc: 'Signature red/white sauce or spicy peppers.', img: 'images/9.jpeg' }
];

// Function 1: Filter and sort menu items
function filterMenuItems(items, query, category, sortOrder) {
    const cleanQuery = query.trim().toLowerCase();

    const filtered = items.filter(function (item) {
        const matchesName = cleanQuery === '' || item.name.toLowerCase().includes(cleanQuery);
        const matchesCategory = category === 'all' || item.category === category;
        return matchesName && matchesCategory;
    });

    if (sortOrder === 'asc') {
        filtered.sort(function (a, b) { return a.price - b.price; });
    } else if (sortOrder === 'desc') {
        filtered.sort(function (a, b) { return b.price - a.price; });
    }

    return filtered;
}

// Function 2: Pick a random item using Math.random()
function getRandomMenuItem(items) {
    if (items.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

// Function 3: Create a single card element with photo and price badge
function createMenuCard(item, selectedId, onSelect) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');

    const card = document.createElement('article');
    card.classList.add('card', 'h-100', 'border-0', 'shadow-sm', 'rounded-4', 'overflow-hidden');
    if (item.id === selectedId) {
        card.classList.add('selected');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.classList.add('card-img-top', 'img-fluid', 'rounded-4');

    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column', 'px-2', 'pb-2');

    const title = document.createElement('h4');
    title.classList.add('h5', 'fw-bold', 'mb-1');
    title.textContent = item.name;

    const info = document.createElement('p');
    info.classList.add('small', 'text-secondary', 'mb-1');
    info.textContent = item.size;

    const desc = document.createElement('p');
    desc.classList.add('small', 'text-muted', 'mb-3');
    desc.textContent = item.desc;

    const priceBadge = document.createElement('span');
    priceBadge.classList.add('badge', 'rounded-pill', 'text-bg-danger', 'fs-6', 'px-3', 'py-2', 'mt-auto', 'align-self-start');
    priceBadge.textContent = 'from ' + item.price + ' ₸';

    card.addEventListener('click', function () {
        onSelect(item.id);
    });

    body.append(title, info, desc, priceBadge);
    card.append(img, body);
    col.appendChild(card);
    return col;
}

// Menu Filter & Search inside #drinks section
function initMenuFilter() {
    const infoBox = document.querySelector('#price-row-info');
    if (infoBox !== null) {
        infoBox.classList.add('hidden');
    }

    const drinksSection = document.querySelector('#drinks');
    if (drinksSection === null) {
        return;
    }

    let selectedCardId = '';

    const wrapper = document.createElement('div');
    wrapper.classList.add('mt-3');

    const controls = document.createElement('div');
    controls.classList.add('row', 'g-2', 'mb-3');

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.classList.add('form-control');
    searchInput.placeholder = 'Search menu (e.g. chicken, ayran, fries)...';
    const col1 = document.createElement('div');
    col1.classList.add('col-12', 'col-md-4');
    col1.appendChild(searchInput);

    const categorySelect = document.createElement('select');
    categorySelect.classList.add('form-select');
    [
        { val: 'all', text: 'All Categories' },
        { val: 'doner', text: 'Doners' },
        { val: 'drink', text: 'Drinks' },
        { val: 'extra', text: 'Extras' }
    ].forEach(function (opt) {
        const o = document.createElement('option');
        o.value = opt.val;
        o.textContent = opt.text;
        categorySelect.appendChild(o);
    });
    const col2 = document.createElement('div');
    col2.classList.add('col-6', 'col-md-3');
    col2.appendChild(categorySelect);

    const sortSelect = document.createElement('select');
    sortSelect.classList.add('form-select');
    [
        { val: 'default', text: 'Default Sort' },
        { val: 'asc', text: 'Price: Low to High' },
        { val: 'desc', text: 'Price: High to Low' }
    ].forEach(function (opt) {
        const o = document.createElement('option');
        o.value = opt.val;
        o.textContent = opt.text;
        sortSelect.appendChild(o);
    });
    const col3 = document.createElement('div');
    col3.classList.add('col-6', 'col-md-3');
    col3.appendChild(sortSelect);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.classList.add('btn', 'btn-outline-dark', 'w-100');
    resetBtn.textContent = 'Reset';
    const col4 = document.createElement('div');
    col4.classList.add('col-12', 'col-md-2');
    col4.appendChild(resetBtn);

    controls.append(col1, col2, col3, col4);

    const topBar = document.createElement('div');
    topBar.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

    const countInfo = document.createElement('span');
    countInfo.classList.add('small', 'fw-bold', 'text-muted');

    const randomBtn = document.createElement('button');
    randomBtn.type = 'button';
    randomBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    randomBtn.textContent = 'Random Pick';

    topBar.append(countInfo, randomBtn);

    const emptyBox = document.createElement('p');
    emptyBox.classList.add('alert', 'alert-warning', 'hidden', 'mb-2');
    emptyBox.textContent = 'No items found. Try another search word.';

    const grid = document.createElement('div');
    grid.classList.add('row', 'g-4');

    wrapper.append(controls, topBar, emptyBox, grid);
    drinksSection.appendChild(wrapper);

    function render() {
        const results = filterMenuItems(
            menuCatalogue,
            searchInput.value,
            categorySelect.value,
            sortSelect.value
        );

        grid.replaceChildren();
        countInfo.textContent = 'Showing ' + results.length + ' of ' + menuCatalogue.length + ' items';

        if (results.length === 0) {
            emptyBox.classList.remove('hidden');
            return;
        }
        emptyBox.classList.add('hidden');

        for (let i = 0; i < results.length; i++) {
            grid.appendChild(createMenuCard(results[i], selectedCardId, function (id) {
                selectedCardId = id;
                render();
            }));
        }
    }

    searchInput.addEventListener('input', render);
    categorySelect.addEventListener('change', render);
    sortSelect.addEventListener('change', render);

    randomBtn.addEventListener('click', function () {
        const picked = getRandomMenuItem(menuCatalogue);
        if (picked !== null) {
            selectedCardId = picked.id;
            searchInput.value = '';
            categorySelect.value = 'all';
            render();
        }
    });

    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        categorySelect.value = 'all';
        sortSelect.value = 'default';
        selectedCardId = '';
        render();
    });

    render();
}

initMenuFilter();
