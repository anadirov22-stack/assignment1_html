'use strict';

/*
 * Gallery and Reviews page — jQuery version.
 * Reviews are stored in this browser with localStorage; no server is used.
 */

$(function () {
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

    const $reviewList = $('#review-list');
    const $reviewCount = $('#review-count');
    const $reviewTotalLabel = $('#review-total-label');
    const $averageRating = $('#average-rating');
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
    const $ratingFilter = $('#rating-filter');
    const $resetFilters = $('#reset-review-filters');
    const $toggleButton = $('#toggle-reviews');
    const $emptyMessage = $('#reviews-empty');
    const $charCounter = $('#review-char-counter');

    if (!$reviewList.length || !$form.length) {
        return;
    }

    // Prevent duplicate event handlers if the script is initialized more than once.
    if ($form.data('reviewsInitialized')) {
        return;
    }
    $form.data('reviewsInitialized', true);

    let savedReviews = [];
    let activeReviewId = '';

    $form.prop('noValidate', true);

    function loadSavedReviews() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            const reviews = raw ? JSON.parse(raw) : [];
            return Array.isArray(reviews) ? reviews : [];
        } catch (error) {
            console.warn('Saved reviews could not be read.');
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

    function getAllReviews() {
        return savedReviews.concat(initialReviews);
    }

    function filterReviews(items, minRating) {
        const minimum = Number(minRating);
        return items.filter(function (item) {
            return minimum === 0 || Number(item.rating) >= minimum;
        });
    }

    function getAverageRating(items) {
        if (!items.length) {
            return '0.0';
        }

        const total = items.reduce(function (sum, item) {
            return sum + Number(item.rating);
        }, 0);

        return (total / items.length).toFixed(1);
    }

    function createReviewCard(item) {
        const $column = $('<div>', {
            class: 'col-12 col-md-6 col-lg-4'
        });

        const $card = $('<article>', {
            id: item.id,
            class: 'card h-100 border-0 border-top border-danger border-4 rounded-4 shadow-sm review-card',
            tabindex: '0',
            role: 'button',
            'aria-label': 'Select review by ' + item.name
        });

        if (item.id === activeReviewId) {
            $card.addClass('active selected');
        }

        const $body = $('<div>', {
            class: 'card-body d-flex flex-column p-4'
        });

        const $top = $('<div>', {
            class: 'd-flex justify-content-between align-items-start gap-2'
        });

        const $title = $('<h3>', {
            class: 'card-title h5 review-name mb-1'
        }).text(item.name);

        const $rating = $('<span>', {
            class: 'badge bg-danger-subtle text-danger rounded-pill'
        }).text(Number(item.rating) + '/5');

        const $stars = $('<p>', {
            class: 'text-warning fs-5 mb-3',
            'aria-label': item.rating + ' out of 5 stars'
        }).text('★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating)));

        const $doner = $('<p>', {
            class: 'small text-danger fw-semibold mb-2'
        }).text(item.doner);

        const $quote = $('<blockquote>', {
            class: 'border-start border-3 border-danger ps-3 text-secondary mb-3'
        });

        const $quoteText = $('<p>', {
            class: 'fst-italic mb-0'
        }).text(item.text);

        const $meta = $('<p>', {
            class: 'small text-muted mt-auto mb-0'
        }).text('Visit date: ' + item.date + ' · Waiting time: ~' + item.wait + ' min');

        $top.append($title, $rating);
        $quote.append($quoteText);
        $body.append($top, $stars, $doner, $quote, $meta);
        $card.append($body);
        $column.append($card);

        return $column;
    }

    function renderReviews() {
        const allReviews = getAllReviews();
        const filtered = filterReviews(allReviews, $ratingFilter.val());

        $reviewList.empty();

        const average = getAverageRating(allReviews);
        $averageRating.text(average);
        $reviewCount.text(allReviews.length);
        $reviewTotalLabel.text(allReviews.length);

        $reviewSummary.find('strong').text(filtered.length);

        if (!filtered.length) {
            $emptyMessage.removeClass('hidden').hide().fadeIn(180);
            return;
        }

        $emptyMessage.stop(true, true).fadeOut(120, function () {
            $(this).addClass('hidden');
        });

        $.each(filtered, function (_, review) {
            $reviewList.append(createReviewCard(review));
        });

        $reviewList.find('.review-card:first').attr('data-position', 'first');
        $reviewList.find('.review-card:last').attr('data-position', 'last');
    }

    function fieldContainer($field) {
        if ($field.is('[name="rating"]') || $field.attr('id') === 'rating-group') {
            return $ratingGroup.closest('.col-12');
        }

        if ($field.attr('id') === 'publish-ok') {
            return $field.closest('.col-12');
        }

        return $field.closest('.col-12, .col-md-6').first();
    }

    function clearFieldError($field) {
        const $container = fieldContainer($field);
        $container.find('.js-err').remove();
        $field.removeClass('error').removeAttr('aria-invalid');
        $field.siblings('.js-err').remove();
    }

    function showFieldError($field, message) {
        clearFieldError($field);
        $field.addClass('error').attr('aria-invalid', 'true');

        const $message = $('<div>', {
            class: 'js-err error small mt-1',
            role: 'alert'
        }).text(message);

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

        if (nameValue.length < 2) {
            errors.push({ field: $name, message: 'Name must be at least 2 characters.' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            errors.push({ field: $email, message: 'Please enter a valid email address.' });
        }

        const phoneDigits = phoneValue.replace(/\D/g, '');
        if (!phoneValue || !/^\+?[0-9\s()\\-]+$/.test(phoneValue) ||
            phoneDigits.length < 7 || phoneDigits.length > 15) {
            errors.push({ field: $phone, message: 'Enter a valid phone number.' });
        }

        const visitDate = new Date(dateValue + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!dateValue || Number.isNaN(visitDate.getTime())) {
            errors.push({ field: $date, message: 'Please select a valid visit date.' });
        } else if (visitDate > today) {
            errors.push({ field: $date, message: 'Visit date cannot be in the future.' });
        }

        if (!/^\d+$/.test(waitValue) || Number(waitValue) < 0 || Number(waitValue) > 120) {
            errors.push({ field: $wait, message: 'Waiting time must be a whole number from 0 to 120.' });
        }

        if (!donerValue) {
            errors.push({ field: $doner, message: 'Please choose a doner.' });
        }

        if (!ratingValue) {
            errors.push({ field: $ratingGroup, message: 'Please select a rating.' });
        }

        if (reviewValue.length < 10) {
            errors.push({ field: $reviewText, message: 'Review must be at least 10 characters.' });
        } else if (ratingValue > 0 && ratingValue <= 2 && reviewValue.length < 25) {
            errors.push({
                field: $reviewText,
                message: 'For a rating of 1 or 2, explain in at least 25 characters.'
            });
        }

        if (!$publish.prop('checked')) {
            errors.push({ field: $publish, message: 'Please agree to publish your review.' });
        }

        return errors;
    }

    // Rating filter, reset and show/hide controls.
    $ratingFilter.on('change', function () {
        $(this).toggleClass('selected', $(this).val() !== '0');
        activeReviewId = '';
        renderReviews();
    });

    $resetFilters.on('click', function () {
        $ratingFilter.val('0').removeClass('selected');
        activeReviewId = '';
        renderReviews();
    });

    $toggleButton.on('click', function () {
        const $button = $(this);

        $reviewList.stop(true, true).slideToggle(250, function () {
            const isVisible = $reviewList.is(':visible');
            $button.text(isVisible ? 'Hide Reviews' : 'Show Reviews');
            $button.attr('aria-expanded', String(isVisible));
        });
    });

    // Delegated events work for review cards created dynamically by renderReviews().
    $reviewList.on('click keydown', '.review-card', function (event) {
        if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        if (event.type === 'keydown') {
            event.preventDefault();
        }

        const $card = $(this);
        const selectedName = $card.find('.review-name').text();

        activeReviewId = $card.attr('id') || '';
        $reviewList.find('.review-card').removeClass('selected active');
        $card.addClass('selected active');
        $reviewSummary.attr('title', 'Selected review: ' + selectedName);
    });

    // Clear field errors as the visitor edits the form.
    $form.on('input change', 'input, select, textarea', function () {
        const $field = $(this);

        clearFieldError($field);
        $errorBox.stop(true, true).fadeOut(120, function () {
            $(this).addClass('hidden');
        });

        if ($field.attr('id') === 'review-text') {
            $charCounter.text('Characters: ' + String($field.val()).trim().length + ' (min 10)');
        }

        if ($field.attr('name') === 'rating') {
            clearFieldError($ratingGroup);
        }
    });

    $form.on('submit', function (event) {
        event.preventDefault();

        $form.find('.js-err').remove();
        $form.find('.error').removeClass('error').removeAttr('aria-invalid');
        $errorBox.addClass('hidden').hide();
        $confirmBox.addClass('hidden').hide();

        const errors = validateForm();

        if (errors.length) {
            $.each(errors, function (_, item) {
                showFieldError(item.field, item.message);
            });

            $errorBox.text('Please fix the highlighted fields above.')
                .removeClass('hidden')
                .stop(true, true)
                .fadeIn(250);

            errors[0].field.trigger('focus');
            return;
        }

        const ratingValue = Number($('input[name="rating"]:checked').val());
        const donerText = $doner.find('option:selected').text();
        const newReview = {
            id: 'review-user-' + Date.now(),
            name: String($name.val()).trim(),
            doner: donerText,
            rating: ratingValue,
            wait: Number($wait.val()),
            date: String($date.val()),
            text: String($reviewText.val()).trim()
        };

        savedReviews.unshift(newReview);
        saveReviews(savedReviews);
        activeReviewId = newReview.id;

        $ratingFilter.val('0').removeClass('selected');
        renderReviews();

        // Reset the form before showing the success message.
        $form[0].reset();
        $charCounter.text('Characters: 0 (min 10)');
        $form.find('input, select, textarea').removeClass('selected error').removeAttr('aria-invalid');

        const referenceNumber = 'REV-' + (Math.floor(Math.random() * 900) + 100);

        $confirmBox.text('Confirmation ' + referenceNumber + ': Thank you, ' +
            newReview.name + '! Your review was added below. It is saved in this browser only.')
            .removeClass('hidden')
            .stop(true, true)
            .fadeIn(300, function () {
                $(this).attr('data-animation-complete', 'true');
            });
    });

    $form.on('reset', function () {
        $form.find('.js-err').remove();
        $form.find('.error').removeClass('error').removeAttr('aria-invalid');
        $errorBox.addClass('hidden').hide();
        $confirmBox.addClass('hidden').hide();
        $charCounter.text('Characters: 0 (min 10)');
    });

    // Set useful autocomplete values for enabled controls.
    $form.find('input:not([type="hidden"]), select, textarea').each(function () {
        if (!$(this).prop('disabled')) {
            $(this).attr('autocomplete', $(this).attr('autocomplete') || 'on');
        }
    });

    renderReviews();
});