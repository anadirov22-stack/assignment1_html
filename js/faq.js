'use strict';

$(function () {
    const faqData = [
        { id: 'question-one', category: 'order', keywords: 'order online food' },
        { id: 'question-two', category: 'order', keywords: 'delivery order pickup' },
        { id: 'question-three', category: 'menu', keywords: 'menu food price doner drink' },
        { id: 'question-four', category: 'restaurant', keywords: 'hours open time friday break' },
        { id: 'question-five', category: 'restaurant', keywords: 'halal certificate certified meat ingredients' }
    ];
    const $accordion = $('#faq-accordion');
    if (!$accordion.length) return;

    // Keep the questions in HTML; build only the existing search controls.
    const $controls = $('<div id="faq-search-controls" class="row g-3 align-items-end mb-4">').append(
        $('<div class="col-12 col-md-6">').append(
            '<label class="form-label" for="faq-search">Search FAQ</label>',
            '<input id="faq-search" type="search" class="form-control" placeholder="Type order, delivery, menu...">'
        ),
        $('<div class="col-12 col-md-3">').append(
            '<label class="form-label" for="faq-category">Category</label>',
            '<select id="faq-category" class="form-select"><option value="all">All categories</option><option value="order">Order</option><option value="menu">Menu</option><option value="restaurant">Restaurant</option></select>'
        ),
        $('<div class="col-12 col-md-3">').append('<button id="faq-reset" type="button" class="btn btn-outline-danger w-100">Reset</button>')
    );
    const $count = $('<p id="faq-result-count" class="small text-secondary mb-2" role="status">');
    const $empty = $('<div id="faq-no-results" class="alert alert-warning" role="status" hidden>').text('No FAQ results found.');
    $accordion.before($controls, $count, $empty);
    const $search = $('#faq-search');
    const $category = $('#faq-category');

    function filterFaq() {
        const query = $search.val().trim().toLowerCase();
        let count = 0;
        $.each(faqData, function (_, item) {
            const $answer = $('#' + item.id);
            const $item = $answer.closest('.accordion-item');
            const matches = ($category.val() === 'all' || $category.val() === item.category) &&
                ($item.text() + ' ' + item.keywords).toLowerCase().includes(query);
            $item.prop('hidden', !matches);
            if (matches) count++;
        });
        $count.text('Results: ' + count + ' of ' + faqData.length);
        $empty.prop('hidden', count > 0);
    }

    function resetSearch() {
        $search.val('').trigger('focus');
        $category.val('all');
        filterFaq();
    }
    $search.on('input', filterFaq).on('keydown', function (event) {
        if (event.key === 'Escape') resetSearch();
    });
    $category.on('change', filterFaq);
    $('#faq-reset').on('click', resetSearch);
    $accordion.on('shown.bs.collapse hidden.bs.collapse', '.accordion-collapse', function (event) {
        $(this).closest('.accordion-item').toggleClass('border-danger', event.type === 'shown');
    });
    filterFaq();

    const $question = $('#question-text');
    $question.on('input', function () {
        $('#question-counter').text($(this).val().length + ' / 300');
        $(this).removeClass('is-invalid').removeAttr('aria-invalid');
        $('#question-error, #question-success').prop('hidden', true);
    });
    $('#question-form').on('submit', function (event) {
        event.preventDefault();
        const length = $question.val().trim().length;
        const valid = length >= 10 && length <= 300;
        $('#question-error').prop('hidden', valid);
        $('#question-success').prop('hidden', !valid);
        $question.toggleClass('is-invalid', !valid).attr('aria-invalid', String(!valid));
        if (!valid) { $question.trigger('focus'); return; }
        this.reset();
        $question.removeAttr('aria-invalid');
        $('#question-counter').text('0 / 300');
    });
});
