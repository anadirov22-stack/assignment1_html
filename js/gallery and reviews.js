'use strict';

/*
    Alikhan Kuttybayev & Ali Nadirov
    Gallery and Reviews  page JavaScript (gallery and reviews.html)
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