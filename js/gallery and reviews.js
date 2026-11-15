'use strict';

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

    const $form = $('#feedback-form');
    const $list = $('#review-list');
    if (!$form.length || !$list.length) return;
    const $name = $('#reviewer-name');
    const $email = $('#reviewer-email');
    const $date = $('#visit-date');
    const $doner = $('#doner-choice');
    const $text = $('#review-text');
    const $rating = $('#rating-group');
    const $filter = $('#rating-filter');
    const $error = $('#review-error');
    const $success = $('#review-confirmation');
    let activeReviewId = '';

    function today() {
        return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Almaty' });
    }
    function validDate(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const date = new Date(value + 'T00:00:00Z');
        return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }
    function readReviews() {
        try {
            const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            if (!Array.isArray(saved)) throw new Error('Invalid reviews');
            const ids = new Set(initialReviews.map(function (item) { return item.id; }));
            const valid = $.grep(saved, function (item) {
                if (!item || typeof item.id !== 'string' || !item.id || ids.has(item.id) ||
                    typeof item.name !== 'string' || !item.name.trim() ||
                    typeof item.text !== 'string' || typeof item.doner !== 'string' ||
                    !Number.isInteger(item.rating) || item.rating < 1 || item.rating > 5 || !validDate(item.date)) return false;
                ids.add(item.id);
                return true;
            });
            if (valid.length !== saved.length) $error.text('Some saved reviews could not be loaded.').prop('hidden', false);
            return valid;
        } catch (error) {
            $error.text('Saved reviews could not be loaded. Please check your browser storage settings.').prop('hidden', false);
            return [];
        }
    }
    let savedReviews = readReviews();

    function createReviewCard(item) {
        const $card = $('<article>').attr({ id: item.id, tabindex: '0', role: 'button', 'aria-label': 'Select review by ' + item.name })
            .addClass('card h-100 border-0 border-top border-danger border-4 rounded-4 shadow-sm review-card')
            .toggleClass('active selected', item.id === activeReviewId);
        const $body = $('<div class="card-body d-flex flex-column p-4">');
        const $title = $('<h3 class="card-title h5 review-name mb-1">').text(item.name);
        const $stars = $('<p class="text-warning fs-5 mb-3">').attr('aria-label', item.rating + ' out of 5 stars')
            .text('★'.repeat(item.rating) + '☆'.repeat(5 - item.rating));
        const $quote = $('<blockquote class="border-start border-3 border-danger ps-3 text-secondary mb-3">')
            .append($('<p class="fst-italic mb-0">').text(item.text));
        const wait = Number.isInteger(item.wait) && item.wait >= 0 ? ' · Waiting time: ~' + item.wait + ' min' : '';
        $body.append(
            $('<div class="d-flex justify-content-between align-items-start gap-2">').append($title),
            $stars, $('<p class="small text-danger fw-semibold mb-2">').text(item.doner), $quote,
            $('<p class="small text-muted mt-auto mb-0">').text('Visit date: ' + item.date + wait)
        );
        return $('<div class="col-12 col-md-6 col-lg-4">').append($card.append($body));
    }

    function renderReviews() {
        const all = savedReviews.concat(initialReviews);
        const filtered = $.grep(all, function (item) { return item.rating >= Number($filter.val()); });
        const average = all.reduce(function (sum, item) { return sum + item.rating; }, 0) / all.length;
        $('#average-rating').text(all.length ? average.toFixed(1) : '0.0');
        $('#review-count').text(all.length);
        $('#review-total-label').text(filtered.length);
        $('#reviews-empty').prop('hidden', filtered.length > 0);
        $list.empty();
        $.each(filtered, function (_, item) { $list.append(createReviewCard(item)); });
    }

    function clearErrors() {
        $form.find('.js-err').remove();
        $form.find('.error').removeClass('error').removeAttr('aria-invalid');
        $error.prop('hidden', true);
        $success.prop('hidden', true);
    }
    function validateForm() {
        const errors = [];
        const rating = Number($form.find('[name="rating"]:checked').val());
        const date = $date.val();
        if ($name.val().trim().length < 2) errors.push([$name, 'Name must be at least 2 characters.']);
        if (!$email[0].validity.valid || !$email.val().trim()) errors.push([$email, 'Please enter a valid email address.']);
        if (!validDate(date) || date > today()) errors.push([$date, 'Choose today or a past visit date.']);
        if (!$doner.val()) errors.push([$doner, 'Please choose a doner.']);
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.push([$rating, 'Please select a rating.']);
        const minimum = rating <= 2 && rating > 0 ? 25 : 10;
        if ($text.val().trim().length < minimum) errors.push([$text, 'Write at least ' + minimum + ' characters.']);
        return errors;
    }

    $filter.on('change', function () {
        $(this).toggleClass('selected', $(this).val() !== '0');
        activeReviewId = '';
        renderReviews();
    });
    $('#reset-review-filters').on('click', function () {
        $filter.val('0').removeClass('selected');
        activeReviewId = '';
        renderReviews();
    });
    $('#toggle-reviews').on('click', function () {
        const hidden = !$list.prop('hidden');
        $list.prop('hidden', hidden);
        $(this).text(hidden ? 'Show Reviews' : 'Hide Reviews').attr('aria-expanded', String(!hidden));
    });
    $list.on('click keydown', '.review-card', function (event) {
        if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
        if (event.type === 'keydown') event.preventDefault();
        activeReviewId = $(this).attr('id');
        $list.find('.review-card').removeClass('selected active');
        $(this).addClass('selected active');
    });
    $form.on('input change', 'input, select, textarea', function () {
        const $field = $(this).is('[name="rating"]') ? $rating : $(this);
        $field.removeClass('error').removeAttr('aria-invalid').closest('.col-12').find('.js-err').remove();
        $error.prop('hidden', true);
        $success.prop('hidden', true);
        $('#review-char-counter').text('Characters: ' + $text.val().trim().length + ' (min 10)');
    });
    $form.on('submit', function (event) {
        event.preventDefault();
        clearErrors();
        $date.attr('max', today());
        const errors = validateForm();
        if (errors.length) {
            $.each(errors, function (_, entry) {
                entry[0].addClass('error').attr('aria-invalid', 'true').closest('.col-12')
                    .append($('<div class="js-err small mt-1" role="alert">').text(entry[1]));
            });
            $error.text('Please fix the highlighted fields above.').prop('hidden', false);
            (errors[0][0].is('fieldset') ? errors[0][0].find('input').first() : errors[0][0]).trigger('focus');
            return;
        }
        const review = {
            id: 'review-user-' + Date.now(), name: $name.val().trim(), doner: $doner.find('option:selected').text(),
            rating: Number($form.find('[name="rating"]:checked').val()), date: $date.val(), text: $text.val().trim()
        };
        const next = [review].concat(savedReviews);
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (error) {
            $error.text('Your review could not be saved. Allow browser storage and try again.').prop('hidden', false);
            return;
        }
        savedReviews = next;
        activeReviewId = review.id;
        $filter.val('0').removeClass('selected');
        $list.prop('hidden', false);
        $('#toggle-reviews').text('Hide Reviews').attr('aria-expanded', 'true');
        renderReviews();
        this.reset();
        $success.text('Thank you, ' + review.name + '! Your review was added below.').prop('hidden', false);
    });
    $form.on('reset', function () {
        clearErrors();
        $('#review-char-counter').text('Characters: 0 (min 10)');
    });
    $date.attr('max', today());
    renderReviews();
});
