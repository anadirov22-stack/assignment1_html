'use strict';

/*
 * Gallery and Reviews page — jQuery version for Assignment 4.
 * jQuery 3.7.1 is loaded before this file. DOM-ready is required because the form,
 * review list, and status boxes must exist before the script attaches handlers.
 * Compared with plain JS, jQuery selectors/events and .append() reduce repeated
 * querySelector, addEventListener, appendChild, and classList operations.
 */

$(function () {
    const STORAGE_KEY = 'donerNaAbayaReviews';
    const initialReviews = [
        { id: 'review-1', name: 'Arman', doner: 'Assorted, standard', rating: 5, wait: 15, date: '2026-09-10', text: 'I liked this branch. The doner was fresh and filling, the order was prepared quickly, and the place was clean. I especially liked the sauce.' },
        { id: 'review-2', name: 'Araylym, staff member', doner: 'Beef, large', rating: 5, wait: 15, date: '2026-09-11', text: 'All our meat is halal. A lot of people come to us exactly for this reason.' },
        { id: 'review-3', name: "Our Team's Visit", doner: 'Assorted, standard', rating: 5, wait: 17, date: '2026-09-11', text: 'The place was clean and cozy, and the staff were polite. Like Arman, we found the doner fresh and filling. Preparation takes 15-20 minutes.' },
        { id: 'review-4', name: 'Alex', doner: 'Chicken, standard', rating: 5, wait: 15, date: '2026-09-10', text: 'The chicken doner was tasty and freshly prepared.' },
        { id: 'review-5', name: 'Dana', doner: 'Beef, standard', rating: 4, wait: 18, date: '2026-09-12', text: 'The beef doner was good, and the service was quick.' },
        { id: 'review-6', name: 'Emma', doner: 'Beef, large', rating: 3, wait: 22, date: '2026-09-22', text: 'The food was good, although the waiting time could improve.' }
    ];

    const $reviewList = $('#review-list');
    const $reviewCount = $('#review-count');
    const $reviewSummary = $('#review-summary');
    const $form = $('#feedback-form');
    const $name = $('#reviewer-name');
    const $email = $('#reviewer-email');
    const $phone = $('#reviewer-phone');
    const $date = $('#visit-date');
    const $wait = $('#wait-minutes');
    const $doner = $('#doner-choice');
    const $reviewText = $('#review-text');
    const $publish = $('#publish-ok');
    const $confirmBox = $('#review-confirmation');
    const $errorBox = $('#review-error');
    const $ratingGroup = $('#rating-group');

    if (!$reviewList.length || !$form.length) return;

// Prevent duplicate controls if this script is initialized more than once.
if ($('#review-controls').length || $('#review-search').length) return;

    // Traverse to the containing section and make the existing summary announce updates accessibly.
    $reviewList.parent().find('#review-summary').attr('aria-live', 'polite');

    let savedReviews = [];
    let activeReviewId = '';

    // Use .prop() for the DOM property, and .val() for form values.
    $form.prop('noValidate', true);

    function loadSavedReviews() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.warn('Saved reviews could not be read from this browser.');
            return [];
        }
    }

    function saveReviews(reviews) {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        } catch (error) {
            console.warn('Saved reviews could not be stored in this browser.');
        }
    }

    savedReviews = loadSavedReviews();

    function filterReviews(items, searchText, minRating) {
        const query = searchText.trim().toLowerCase();
        const minimum = Number(minRating);
        return items.filter(function (item) {
            const matchesText = !query || item.name.toLowerCase().includes(query) ||
                item.text.toLowerCase().includes(query) || item.doner.toLowerCase().includes(query);
            return matchesText && (minimum === 0 || item.rating >= minimum);
        });
    }

    function getAverageRating(items) {
        if (!items.length) return '0.0';
        const total = items.reduce(function (sum, item) { return sum + Number(item.rating); }, 0);
        return (total / items.length).toFixed(1);
    }

    // The card contents are built from a JS array; cards are not hard-coded in the HTML after render.
    function createReviewCard(item) {
        const $column = $('<div>', { class: 'col-12 col-md-6 col-lg-4' });
        const $card = $('<article>', {
            id: item.id,
            class: 'card h-100 border-top border-danger border-4 review-card',
            tabindex: '0',
            role: 'button',
            'aria-label': 'Select review by ' + item.name
        });
        if (item.id === activeReviewId) $card.addClass('active selected');

        const $body = $('<div>', { class: 'card-body d-flex flex-column' });
        const $title = $('<h3>', { class: 'card-title h5 review-name' }).text(item.name);
        const $meta = $('<p>', { class: 'small fw-bold text-danger mb-2' });
        // .html() is used only for fixed markup plus a numeric rating; user-provided text uses .text().
        $meta.html('Rating: <strong>' + Number(item.rating) + '/5</strong> · ' + $('<span>').text(item.doner).html());
        const $quote = $('<blockquote>', { class: 'mb-2' });
        const $quoteText = $('<p>', { class: 'fst-italic mb-0' }).text(item.text);
        const $date = $('<p>', { class: 'small text-muted mt-auto mb-0' })
            .text('Visit date: ' + item.date + ' (Wait: ~' + item.wait + ' min)');

        $quote.append($quoteText);
        // Chained DOM operations keep the card assembly together and readable.
        $body.append($title, $meta, $quote, $date).find('.review-name').attr('title', 'Review author: ' + item.name);
        $card.append($body);
        $column.append($card);
        return $column;
    }

    // Add filter controls and a show/hide button dynamically using jQuery.
    const $controls = $('<div>', { class: 'row g-2 mb-3', id: 'review-controls' });
    const $search = $('<input>', {
        type: 'search', id: 'review-search', class: 'form-control',
        placeholder: 'Search reviews...', 'aria-label': 'Search reviews'
    });
    const $searchColumn = $('<div>', { class: 'col-12 col-md-5' }).append($search);
    const $ratingFilter = $('<select>', { id: 'rating-filter', class: 'form-select', 'aria-label': 'Filter by minimum rating' })
        .append(
            $('<option>', { value: '0' }).text('All Ratings'),
            $('<option>', { value: '5' }).text('5 Stars Only'),
            $('<option>', { value: '4' }).text('4+ Stars'),
            $('<option>', { value: '3' }).text('3+ Stars')
        );
    const $ratingColumn = $('<div>', { class: 'col-6 col-md-3' }).append($ratingFilter);
    const $resetButton = $('<button>', { type: 'button', class: 'btn btn-outline-dark w-100' }).text('Reset filters');
    const $resetColumn = $('<div>', { class: 'col-6 col-md-2' }).append($resetButton);
    const $toggleButton = $('<button>', { type: 'button', class: 'btn btn-outline-danger w-100', 'aria-expanded': 'true' }).text('Hide reviews');
    const $toggleColumn = $('<div>', { class: 'col-12 col-md-2' }).append($toggleButton);
    $controls.append($searchColumn, $ratingColumn, $resetColumn, $toggleColumn).insertBefore($reviewSummary);

    const $emptyMessage = $('<p>', { class: 'alert alert-warning hidden', role: 'status' }).text('No reviews match your search.');
    $emptyMessage.insertBefore($reviewList);

    const $charCounter = $('<p>', { class: 'small text-muted mt-1 mb-0', 'aria-live': 'polite' }).text('Characters: 0 (min 10)');
    $charCounter.insertAfter($reviewText);

    function renderReviews() {
        const allReviews = savedReviews.concat(initialReviews);
        const filtered = filterReviews(allReviews, $search.val() || '', $ratingFilter.val());
        $reviewList.empty();
        $reviewCount.text(filtered.length + ' (Avg rating: ' + getAverageRating(filtered) + '/5)');

        if (!filtered.length) {
            $emptyMessage.removeClass('hidden').stop(true, true).fadeIn(200);
            return;
        }
        $emptyMessage.addClass('hidden').hide();
        $.each(filtered, function (_, review) {
            $reviewList.append(createReviewCard(review));
        });
        // :first and :last selectors are used to set helpful titles on the rendered list endpoints.
        $reviewList.find('.review-card:first').attr('data-position', 'first');
        $reviewList.find('.review-card:last').attr('data-position', 'last');
    }

    function fieldContainer($field) {
        if ($field.is('[name="rating"]') || $field.attr('id') === 'rating-group') {
            return $ratingGroup.closest('.col-12');
        }
        return $field.closest('.col-12, .col-md-6').first();
    }

    function clearFieldError($field) {
        const $container = fieldContainer($field);
        $container.find('.js-err').remove();
        $field.removeClass('error').removeAttr('aria-invalid');
        // .siblings() clears a message next to a control if markup is adjusted later.
        $field.siblings('.js-err').remove();
    }

    function showFieldError($field, message) {
        clearFieldError($field);
        $field.addClass('error').attr('aria-invalid', 'true');
        const $message = $('<div>', { class: 'js-err error small mt-1', role: 'alert' }).text(message);
        fieldContainer($field).append($message);
    }

    function validateForm() {
        const errors = [];
        const nameValue = String($name.val() || '').trim();
        const emailValue = String($email.val() || '').trim();
        const phoneValue = String($phone.val() || '').trim();
        const dateValue = String($date.val() || '').trim();
        const waitValue = String($wait.val() || '').trim();
        const donerValue = String($doner.val() || '').trim();
        const reviewValue = String($reviewText.val() || '').trim();
        const ratingValue = Number($('input[name="rating"]:checked').val() || 0);

        if (nameValue.length < 2) errors.push({ field: $name, message: 'Name must be at least 2 characters.' });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) errors.push({ field: $email, message: 'Please enter a valid email address.' });
        if (phoneValue && !/^\+?[0-9\s()\-]{7,20}$/.test(phoneValue)) errors.push({ field: $phone, message: 'Enter a valid phone number (7–20 digits/characters).'});
        if (!dateValue) {
            errors.push({ field: $date, message: 'Please select your visit date.' });
        } else if (new Date(dateValue + 'T00:00:00') > new Date()) {
            errors.push({ field: $date, message: 'Visit date cannot be in the future.' });
        }
        if (waitValue && (!/^\d+$/.test(waitValue) || Number(waitValue) < 0 || Number(waitValue) > 120)) {
            errors.push({ field: $wait, message: 'Waiting time must be a whole number from 0 to 120.' });
        }
        if (!donerValue) errors.push({ field: $doner, message: 'Please choose a doner.' });
        if (!ratingValue) errors.push({ field: $ratingGroup, message: 'Please select a rating.' });
        if (reviewValue.length < 10) {
            errors.push({ field: $reviewText, message: 'Review must be at least 10 characters.' });
        } else if (ratingValue > 0 && ratingValue <= 2 && reviewValue.length < 25) {
            errors.push({ field: $reviewText, message: 'For a rating of 1 or 2, explain in at least 25 characters.' });
        }
        if (!$publish.prop('checked')) errors.push({ field: $publish, message: 'Please agree to publish your review.' });
        return errors;
    }

    // Live filter uses input; rating dropdown uses change; reset uses click.
    $search.on('input', function () {
        renderReviews();
        $(this).toggleClass('selected', $(this).val().trim().length > 0);
    });
    $ratingFilter.on('change', function () {
        renderReviews();
        $(this).addClass('selected');
    });
    $resetButton.on('click', function () {
        $search.val('').removeClass('selected');
        $ratingFilter.val('0').removeClass('selected');
        activeReviewId = '';
        renderReviews();
        $emptyMessage.stop(true, true).fadeOut(150);
    });

    // Effect 1: slideToggle lets visitors hide or show the review cards without leaving the page.
    $toggleButton.on('click', function () {
        const $button = $(this);
        $reviewList.stop(true, true).slideToggle(250, function () {
            const isVisible = $reviewList.is(':visible');
            $button.text(isVisible ? 'Hide reviews' : 'Show reviews').attr('aria-expanded', String(isVisible));
        });
    });

    // Delegation: cards are recreated by renderReviews(), so direct click handlers would be lost.
    $reviewList.on('click keydown', '.review-card', function (event) {
        if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
        if (event.type === 'keydown') event.preventDefault();
        const $card = $(this); // $(this) points to the particular review card.
        const $name = $card.closest('.review-card').find('.review-name');
        activeReviewId = $card.attr('id') || '';
        $reviewList.find('.review-card').removeClass('selected active');
        $card.addClass('selected active');
        $reviewSummary.attr('title', 'Selected review: ' + $name.text());
    });

    // Clear an individual field error as the user fixes that field.
    $form.on('input change', 'input, select, textarea', function () {
        const $field = $(this);
        clearFieldError($field);
        $errorBox.stop(true, true).fadeOut(120, function () { $errorBox.addClass('hidden'); });
        if ($field.attr('id') === 'review-text') {
            $charCounter.text('Characters: ' + String($field.val()).trim().length + ' (min 10)');
        }
        if ($field.attr('name') === 'rating') clearFieldError($ratingGroup);
    });

    $form.on('submit', function (event) {
        // preventDefault stops the browser from navigating to reviews.html/reloading before custom validation.
        // Client-side checks improve usability, but real production systems must validate again on the server.
        event.preventDefault();
        $form.find('.js-err').remove();
        $form.find('.error').removeClass('error').removeAttr('aria-invalid');
        $errorBox.addClass('hidden').hide();
        $confirmBox.addClass('hidden').hide();

        const errors = validateForm();
        if (errors.length) {
            $.each(errors, function (_, item) { showFieldError(item.field, item.message); });
            $errorBox.text('Please fix the highlighted fields above.').removeClass('hidden').stop(true, true).fadeIn(250);
            errors[0].field.trigger('focus');
            return;
        }

        const ratingValue = Number($('input[name="rating"]:checked').val());
        const donerText = $doner.find('option:selected').text();
        const referenceNumber = 'REV-' + (Math.floor(Math.random() * 900) + 100);
        const newReview = {
            id: 'review-user-' + Date.now(),
            name: String($name.val()).trim(),
            doner: donerText,
            rating: ratingValue,
            wait: Number($wait.val()) || 15,
            date: String($date.val()) + ' (Added ' + new Date().toLocaleTimeString() + ')',
            text: String($reviewText.val()).trim()
        };
        savedReviews.unshift(newReview);
        saveReviews(savedReviews);
        activeReviewId = newReview.id;
        $search.val('');
        $ratingFilter.val('0');
        renderReviews();

        // Reset first: the reset handler clears old messages, so show success afterwards.
        $form[0].reset();
        $charCounter.text('Characters: 0 (min 10)');
        $form.find('input, select, textarea').removeClass('selected error').removeAttr('aria-invalid');
        $confirmBox.text('Demo confirmation ' + referenceNumber + ': Thank you, ' + newReview.name +
            '! Your review was added below. No data is sent to a server.')
            .removeClass('hidden').stop(true, true).fadeIn(300, function () {
                // Callback runs after the success message fades in.
                $confirmBox.attr('data-animation-complete', 'true');
            });
    });

    $form.on('reset', function () {
        $form.find('.js-err').remove();
        $form.find('.error').removeClass('error').removeAttr('aria-invalid');
        $errorBox.addClass('hidden').hide();
        $confirmBox.addClass('hidden').hide();
        $charCounter.text('Characters: 0 (min 10)');
    });

    // Attribute and :not selectors: make non-disabled form controls consistent for keyboard focus.
    $form.find('input:not([type="hidden"]), select, textarea').each(function () {
        if (!$(this).prop('disabled')) $(this).attr('autocomplete', $(this).attr('autocomplete') || 'on');
    });

    renderReviews();
});
