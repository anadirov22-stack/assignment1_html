'use strict';
// Get the review form
const reviewForm = document.getElementById('review-form');

// Get form fields
const visitorName = document.getElementById('visitor-name');
const visitorEmail = document.getElementById('visitor-email');
const visitorPhone = document.getElementById('visitor-phone');
const rating = document.getElementById('rating');
const visitDate = document.getElementById('visit-date');
const reviewText = document.getElementById('review');
const publishReview = document.getElementById('publish-review');
const foodChoice = document.getElementById('food-choice');

// Get result and error containers
const reviewResult = document.getElementById('review-result');
const reviewError = document.getElementById('review-error');

// Create a character counter
const characterCounter = document.createElement('p');
characterCounter.classList.add('mt-2');
characterCounter.textContent = 'Characters: 0';
characterCounter.setAttribute('aria-live', 'polite');

// Create the reviews container
const reviewsContainer = document.createElement('div');
reviewsContainer.id = 'published-reviews';
reviewsContainer.classList.add('row', 'g-3', 'mt-3');
reviewsContainer.setAttribute('aria-live', 'polite');

// Create a demonstration notice
const demoNotice = document.createElement('p');
demoNotice.classList.add('alert', 'alert-info', 'mt-3');
demoNotice.textContent =
    'Demonstration reviews: these are sample entries created for this educational project, not verified customer testimonials.';
demoNotice.setAttribute('role', 'status');

// Storage key used by this page
const STORAGE_KEY = 'donerNaAbayaReviews';

// Sample reviews
const initialReviews = [
    {
        name: 'Alex',
        rating: 5,
        food: 'Chicken doner',
        review: 'The chicken doner was tasty and freshly prepared.',
        date: '2026-09-10'
    },
    {
        name: 'Dana',
        rating: 4,
        food: 'Beef doner',
        review: 'The beef doner was good, and the service was quick.',
        date: '2026-09-12'
    },
    {
        name: 'Sam',
        rating: 5,
        food: 'Assorted doner',
        review: 'I enjoyed the meal and the comfortable dining area.',
        date: '2026-09-15'
    },
    {
        name: 'Mia',
        rating: 4,
        food: 'Chicken doner',
        review: 'The portion was satisfying, and the food was delicious.',
        date: '2026-09-18'
    },
    {
        name: 'Daniel',
        rating: 5,
        food: 'Drink',
        review: 'The drink was refreshing, and the visit was pleasant.',
        date: '2026-09-20'
    },
    {
        name: 'Emma',
        rating: 3,
        food: 'Beef doner',
        review: 'The food was good, although the waiting time could improve.',
        date: '2026-09-22'
    }
];

// Store reviews submitted by visitors
let savedReviews = [];

// Check that the required elements exist
const formElementsExist =
    reviewForm !== null &&
    visitorName !== null &&
    visitorEmail !== null &&
    visitorPhone !== null &&
    rating !== null &&
    visitDate !== null &&
    reviewText !== null &&
    publishReview !== null &&
    foodChoice !== null &&
    reviewResult !== null &&
    reviewError !== null;

if (formElementsExist) {
    console.log('Gallery review form is ready.');

    // Use custom JavaScript validation
    reviewForm.noValidate = true;

    // Place the character counter below the review field
    reviewText.insertAdjacentElement('afterend', characterCounter);

    // Place the reviews container after the form
    reviewForm.insertAdjacentElement('afterend', reviewsContainer);

    // Place the notice before the reviews
    reviewsContainer.insertAdjacentElement('beforebegin', demoNotice);
} else {
    console.error('Some review form elements were not found.');
}

// Validate the visitor's name
function validateName(name) {
    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
        return 'Name must contain at least 2 characters.';
    }

    return '';
}

// Validate the email address
function validateEmail(email) {
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
        return 'Please enter a valid email address.';
    }

    return '';
}

// Validate the phone number
function validatePhone(phone) {
    const digits = phone.trim().replace(/\D/g, '');

    if (digits.length < 10 || digits.length > 15) {
        return 'Phone number must contain between 10 and 15 digits.';
    }

    return '';
}

// Validate the rating
function validateRating(value) {
    const numericRating = Number(value);

    if (
        value.trim() === '' ||
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
    ) {
        return 'Rating must be a whole number from 1 to 5.';
    }

    return '';
}

// Validate review text and its relationship with the rating
function validateReview(text, ratingValue) {
    const trimmedText = text.trim();
    const numericRating = Number(ratingValue);

    if (trimmedText.length < 10) {
        return 'Review must contain at least 10 characters.';
    }

    if (trimmedText.length > 500) {
        return 'Review must not exceed 500 characters.';
    }

    if (numericRating <= 2 && trimmedText.length < 30) {
        return 'For a rating of 1 or 2, please explain your experience in at least 30 characters.';
    }

    return '';
}

// Validate the visit date
function validateVisitDate(dateValue) {
    if (dateValue === '') {
        return 'Please select your visit date.';
    }

    const selectedDate = new Date(dateValue + 'T00:00:00');
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
        return 'Please enter a valid visit date.';
    }

    if (selectedDate > today) {
        return 'Visit date cannot be in the future.';
    }

    return '';
}

// Display an error message below a form field
function showFieldError(field, message) {
    const errorMessage = document.createElement('p');

    errorMessage.classList.add('text-danger', 'small', 'mt-1');
    errorMessage.textContent = message;
    errorMessage.setAttribute('role', 'alert');

    field.classList.add('error');
    field.insertAdjacentElement('afterend', errorMessage);
}

// Clear previous field errors
function clearFieldErrors() {
    const errorMessages = document.querySelectorAll(
        '#review-form .text-danger.small'
    );

    errorMessages.forEach(function (message) {
        message.remove();
    });

    const fields = [
        visitorName,
        visitorEmail,
        visitorPhone,
        rating,
        visitDate,
        reviewText,
        foodChoice
    ];

    fields.forEach(function (field) {
        field.classList.remove('error');
    });
}

// Clear the error message for one field
function clearFieldError(field) {
    field.classList.remove('error');

    const nextElement = field.nextElementSibling;

    if (
        nextElement !== null &&
        nextElement.matches('.text-danger.small')
    ) {
        nextElement.remove();
    }
}

// Read saved reviews from localStorage
function loadSavedReviews() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData === null) {
            return [];
        }

        const parsedData = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            return [];
        }

        return parsedData;
    } catch (error) {
        console.error('Could not load saved reviews:', error);
        return [];
    }
}

// Save reviews to localStorage
function saveReviewsToStorage(reviews) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(reviews)
        );

        return true;
    } catch (error) {
        console.error('Could not save reviews:', error);
        return false;
    }
}

// Compare reviews to prevent identical submissions
function isDuplicateReview(newReview, existingReviews) {
    return existingReviews.some(function (existingReview) {
        return (
            existingReview.name.trim().toLowerCase() ===
                newReview.name.trim().toLowerCase() &&
            existingReview.email.trim().toLowerCase() ===
                newReview.email.trim().toLowerCase() &&
            existingReview.phone.replace(/\D/g, '') ===
                newReview.phone.replace(/\D/g, '') &&
            Number(existingReview.rating) === Number(newReview.rating) &&
            existingReview.food.trim().toLowerCase() ===
                newReview.food.trim().toLowerCase() &&
            existingReview.review.trim().toLowerCase() ===
                newReview.review.trim().toLowerCase() &&
            existingReview.date === newReview.date &&
            existingReview.orderType === newReview.orderType
        );
    });
}

// Create one review card
function addReviewCard(
    name,
    ratingValue,
    food,
    review,
    date,
    publishedAt
) {
    const cardColumn = document.createElement('div');
    cardColumn.classList.add('col-12', 'col-md-6');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'p-3');

    const title = document.createElement('h3');
    title.classList.add('h5', 'card-title');
    title.textContent = name;

    const ratingInfo = document.createElement('p');
    ratingInfo.classList.add('mb-2');
    ratingInfo.textContent = `Rating: ${ratingValue}/5`;

    const foodInfo = document.createElement('p');
    foodInfo.classList.add('mb-2');
    foodInfo.textContent = `Order: ${food}`;

    const reviewInfo = document.createElement('p');
    reviewInfo.classList.add('card-text');
    reviewInfo.textContent = review;

    const dateInfo = document.createElement('p');
    dateInfo.classList.add('text-muted', 'small', 'mb-0');
    dateInfo.textContent = `Visit date: ${date}`;

    const publicationInfo = document.createElement('p');
    publicationInfo.classList.add('text-muted', 'small', 'mb-0');

    publicationInfo.textContent =
        `Published: ${publishedAt || new Date().toLocaleString()}`;

    card.append(
        title,
        ratingInfo,
        foodInfo,
        reviewInfo,
        dateInfo,
        publicationInfo
    );

    cardColumn.appendChild(card);
    reviewsContainer.appendChild(cardColumn);
}

// Display sample reviews and reviews saved by visitors
function renderAllReviews() {
    reviewsContainer.replaceChildren();

    initialReviews.forEach(function (review) {
        addReviewCard(
            review.name,
            review.rating,
            review.food,
            review.review,
            review.date
        );
    });

    savedReviews.forEach(function (review) {
        addReviewCard(
            review.name,
            review.rating,
            review.food,
            review.review,
            review.date,
            review.publishedAt
        );
    });
}

// Load previously saved reviews when the page opens
savedReviews = loadSavedReviews();

// Display all reviews
renderAllReviews();

// Handle review form submission
if (formElementsExist) {
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        clearFieldErrors();

        reviewError.textContent = '';
        reviewResult.textContent = '';

        reviewError.classList.add('hidden');
        reviewResult.classList.add('hidden');

        // Collect validation errors
        const errors = [];

        const nameError = validateName(visitorName.value);
        const emailError = validateEmail(visitorEmail.value);
        const phoneError = validatePhone(visitorPhone.value);
        const ratingError = validateRating(rating.value);

        const reviewValidationError = validateReview(
            reviewText.value,
            rating.value
        );

        const dateError = validateVisitDate(visitDate.value);

        // Check the selected order type
        const selectedOrderType = document.querySelector(
            'input[name="order-type"]:checked'
        );

        let orderTypeError = '';

        if (selectedOrderType === null) {
            orderTypeError = 'Please select an order type.';
        }

        // Check the food choice
        let foodChoiceError = '';

        if (foodChoice.value === '') {
            foodChoiceError = 'Please select a food option.';
        }

        // Collect all validation errors
        if (nameError !== '') {
            errors.push(nameError);
        }

        if (emailError !== '') {
            errors.push(emailError);
        }

        if (phoneError !== '') {
            errors.push(phoneError);
        }

        if (ratingError !== '') {
            errors.push(ratingError);
        }

        if (dateError !== '') {
            errors.push(dateError);
        }

        if (reviewValidationError !== '') {
            errors.push(reviewValidationError);
        }

        if (orderTypeError !== '') {
            errors.push(orderTypeError);
        }

        if (foodChoiceError !== '') {
            errors.push(foodChoiceError);
        }

        // Display field errors if validation fails
        if (errors.length > 0) {
            if (nameError !== '') {
                showFieldError(visitorName, nameError);
            }

            if (emailError !== '') {
                showFieldError(visitorEmail, emailError);
            }

            if (phoneError !== '') {
                showFieldError(visitorPhone, phoneError);
            }

            if (ratingError !== '') {
                showFieldError(rating, ratingError);
            }

            if (dateError !== '') {
                showFieldError(visitDate, dateError);
            }

            if (reviewValidationError !== '') {
                showFieldError(reviewText, reviewValidationError);
            }

            if (foodChoiceError !== '') {
                showFieldError(foodChoice, foodChoiceError);
            }

            if (orderTypeError !== '') {
                const firstOrderType = document.querySelector(
                    'input[name="order-type"]'
                );

                if (firstOrderType !== null) {
                    showFieldError(firstOrderType, orderTypeError);
                }
            }

            reviewError.textContent =
                'Please correct the errors highlighted in the form.';

            reviewError.classList.remove('hidden');

            // Focus the first invalid field
            if (nameError !== '') {
                visitorName.focus();
            } else if (emailError !== '') {
                visitorEmail.focus();
            } else if (phoneError !== '') {
                visitorPhone.focus();
            } else if (ratingError !== '') {
                rating.focus();
            } else if (dateError !== '') {
                visitDate.focus();
            } else if (reviewValidationError !== '') {
                reviewText.focus();
            } else if (orderTypeError !== '') {
                const firstOrderType = document.querySelector(
                    'input[name="order-type"]'
                );

                if (firstOrderType !== null) {
                    firstOrderType.focus();
                }
            } else if (foodChoiceError !== '') {
                foodChoice.focus();
            }

            return;
        }

        // A review is only published if the visitor agrees
        if (!publishReview.checked) {
            reviewResult.textContent =
                'You did not agree to publish your review. No review was saved.';

            reviewResult.classList.remove('hidden');
            return;
        }

        // Create the new review object
        const newReview = {
            name: visitorName.value.trim(),
            email: visitorEmail.value.trim(),
            phone: visitorPhone.value.trim(),
            rating: Number(rating.value),
            food: foodChoice.options[foodChoice.selectedIndex].text,
            review: reviewText.value.trim(),
            date: visitDate.value,
            orderType: selectedOrderType.value,
            publishedAt: new Date().toLocaleString()
        };

        // Prevent identical submissions
        if (isDuplicateReview(newReview, savedReviews)) {
            reviewError.textContent =
                'This review has already been saved. Duplicate reviews are not allowed.';

            reviewError.classList.remove('hidden');
            reviewResult.classList.add('hidden');

            return;
        }

        // Save the review before displaying its card
        const updatedReviews = [...savedReviews, newReview];

        if (!saveReviewsToStorage(updatedReviews)) {
            reviewError.textContent =
                'The review could not be saved in this browser. Please try again.';

            reviewError.classList.remove('hidden');
            return;
        }

        // Update the saved reviews and refresh the cards
        savedReviews = updatedReviews;
        renderAllReviews();

        // Display the confirmation message
        reviewResult.textContent =
            'Your review has been saved in this browser and added to the page. ' +
            'It will remain after a page reload, but it is not sent to a server.';

        reviewResult.classList.remove('hidden');

        // Reset the form after successful submission
        reviewForm.reset();
        characterCounter.textContent = 'Characters: 0';
    });

    // Handle input events
    reviewForm.addEventListener('input', function (event) {
        clearFieldError(event.target);

        reviewError.textContent = '';
        reviewError.classList.add('hidden');

        // Update the character counter
        characterCounter.textContent =
            'Characters: ' + reviewText.value.length;
    });

    // Handle changes to select and radio fields
    reviewForm.addEventListener('change', function (event) {
        clearFieldError(event.target);

        reviewError.textContent = '';
        reviewError.classList.add('hidden');
    });

    // Handle the form reset button
    reviewForm.addEventListener('reset', function () {
        clearFieldErrors();

        reviewError.textContent = '';
        reviewResult.textContent = '';

        reviewError.classList.add('hidden');
        reviewResult.classList.add('hidden');

        characterCounter.textContent = 'Characters: 0';
    });
}
