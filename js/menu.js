'use strict';

/*
    Alikhan Kuttybayev - Menu page jQuery (menu.html)
    jQuery version: 3.7.1.
    Why $(function () { ... }) is needed: it waits until the DOM tree is fully loaded
    before running our code, so selectors like $('#drinks') always find their elements.
*/
$(function () {
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

    let selectedCardId = '';
    const $drinksSection = $('#drinks');
    if ($drinksSection.length === 0) {
        return;
    }

    /*
        REWRITTEN FEATURE 1 (Building Cards from Array):
        jQuery $('<tag>'), .addClass(), .attr(), .text(), .html() and .appendTo() replaced plain JS
        document.createElement(), classList.add(), setAttribute() and appendChild().
        The jQuery version is shorter and clearer because chaining removes temporary variables.
    */
    function createMenuCard(item) {
        const $col = $('<div>').addClass('col-12 col-md-4 menu-item-col');

        // Method chain of 4 links: create <article>, add classes, set data-id attribute, and toggle .selected
        const $card = $('<article>')
            .addClass('card h-100 border-0 shadow-sm rounded-4 overflow-hidden menu-card')
            .attr('data-id', item.id)
            .toggleClass('selected', item.id === selectedCardId);

        $('<img>')
            .attr({ src: item.img, alt: item.name })
            .addClass('card-img-top img-fluid rounded-4')
            .appendTo($card);

        const $body = $('<div>').addClass('card-body d-flex flex-column px-2 pb-2');
        $('<h4>').addClass('h5 fw-bold mb-1').text(item.name).appendTo($body);
        $('<p>').addClass('small text-secondary mb-1').text(item.size).appendTo($body);
        $('<p>').addClass('small text-muted mb-3').text(item.desc).appendTo($body);

        // .html() is used intentionally for the static HTML currency entity (&nbsp;&#8376;)
        $('<span>')
            .addClass('badge rounded-pill text-bg-danger fs-6 px-3 py-2 mt-auto align-self-start')
            .html('from ' + item.price + '&nbsp;&#8376;')
            .appendTo($body);

        $card.append($body).appendTo($col);
        return $col;
    }

    /*
        REWRITTEN FEATURE 2 (Show/Hide Filter Panel & Empty State with Effects):
        jQuery .slideToggle(), .fadeIn(), .fadeOut() and .empty() replaced plain JS
        classList.toggle('hidden') and replaceChildren(). It is shorter and adds smooth animations.
    */
    const $toggleBtn = $('<button>')
        .attr('type', 'button')
        .addClass('btn btn-sm btn-outline-danger mt-3 mb-2')
        .text('Hide Filters');

    const $filterForm = $('<form>').attr({ id: 'menu-filter-form', novalidate: 'novalidate' }).addClass('row g-2 mb-3');

    const $searchInput = $('<input>')
        .attr({ type: 'search', id: 'menu-search', placeholder: 'Search menu (e.g. chicken, ayran)...', required: 'required' })
        .addClass('form-control');

    const $categorySelect = $('<select>').attr('id', 'menu-category').addClass('form-select');
    $.each([
        { val: 'all', text: 'All Categories' },
        { val: 'doner', text: 'Doners' },
        { val: 'drink', text: 'Drinks' },
        { val: 'extra', text: 'Extras' }
    ], function (i, opt) {
        $('<option>').val(opt.val).text(opt.text).appendTo($categorySelect);
    });

    const $sortSelect = $('<select>').attr('id', 'menu-sort').addClass('form-select');
    $.each([
        { val: 'default', text: 'Default Sort' },
        { val: 'asc', text: 'Price: Low to High' },
        { val: 'desc', text: 'Price: High to Low' }
    ], function (i, opt) {
        $('<option>').val(opt.val).text(opt.text).appendTo($sortSelect);
    });

    const $resetBtn = $('<button>').attr('type', 'button').addClass('btn btn-outline-dark w-100').text('Reset');

    // Checkbox to demonstrate .prop('checked') vs .attr()
    const $budgetCheck = $('<input>').attr({ type: 'checkbox', id: 'budget-only' }).addClass('form-check-input me-2');
    const $budgetLabel = $('<label>').attr('for', 'budget-only').addClass('form-check-label small text-muted').text('Under 1000 ₸ only');
    const $checkWrap = $('<div>').addClass('col-12').append($budgetCheck, $budgetLabel);

    $('<div>').addClass('col-12 col-md-4').append($searchInput).appendTo($filterForm);
    $('<div>').addClass('col-6 col-md-3').append($categorySelect).appendTo($filterForm);
    $('<div>').addClass('col-6 col-md-3').append($sortSelect).appendTo($filterForm);
    $('<div>').addClass('col-12 col-md-2').append($resetBtn).appendTo($filterForm);
    $filterForm.append($checkWrap);

    const $topBar = $('<div>').addClass('d-flex justify-content-between align-items-center mb-3');
    const $countInfo = $('<span>').addClass('small fw-bold text-muted');
    const $randomBtn = $('<button>').attr('type', 'button').addClass('btn btn-sm btn-outline-danger').text('Random Pick');
    $topBar.append($countInfo, $randomBtn);

    const $emptyBox = $('<p>').addClass('alert alert-warning hidden mb-2').text('No items found. Try another search word.');
    const $grid = $('<div>').attr('id', 'menu-cards-grid').addClass('row g-4');

    $drinksSection.append($toggleBtn, $filterForm, $topBar, $emptyBox, $grid);

    /*
        REWRITTEN FEATURE 3 (Filtering, Search Validation & Rendering):
        jQuery .val(), $.trim(), .prop('checked'), .parent() and .find() replaced plain JS
        input.value.trim() and checkbox.checked.
        Note: Browser validation never replaces server validation because users can disable JS in DevTools.
    */
    function renderMenu() {
        const cleanQuery = $.trim($searchInput.val()).toLowerCase();
        const category = $categorySelect.val();
        const sortOrder = $sortSelect.val();
        const under1000 = $budgetCheck.prop('checked');

        // Clear search error as soon as visitor fixes input
        $searchInput.removeClass('error').parent().find('.js-err').remove();

        const results = menuCatalogue.filter(function (item) {
            const matchName = cleanQuery === '' || item.name.toLowerCase().includes(cleanQuery) || item.desc.toLowerCase().includes(cleanQuery);
            const matchCat = category === 'all' || item.category === category;
            const matchBudget = !under1000 || item.price <= 1000;
            return matchName && matchCat && matchBudget;
        });

        if (sortOrder === 'asc') {
            results.sort(function (a, b) { return a.price - b.price; });
        } else if (sortOrder === 'desc') {
            results.sort(function (a, b) { return b.price - a.price; });
        }

        $grid.empty();
        $countInfo.text('Showing ' + results.length + ' of ' + menuCatalogue.length + ' items');

        if (results.length === 0) {
            if ($emptyBox.hasClass('hidden')) {
                $emptyBox.removeClass('hidden').hide().fadeIn(300);
            }
            return;
        }

        if (!$emptyBox.hasClass('hidden')) {
            $emptyBox.fadeOut(150, function () {
                $(this).addClass('hidden');
            });
        }

        $.each(results, function (i, item) {
            $grid.append(createMenuCard(item));
        });

        // Filter selector (:first) example
        $grid.find('.menu-card:first').attr('data-first', 'true');
    }

    // Effect with duration (300ms) and callback
    $toggleBtn.on('click', function () {
        const $btn = $(this);
        $filterForm.slideToggle(300, function () {
            $btn.text($(this).is(':visible') ? 'Hide Filters' : 'Show Filters');
        });
    });

    /*
        DELEGATED EVENT HANDLER:
        Bound to #menu-cards-grid (existing parent) and catches clicks on .menu-card.
        Direct binding ($('.menu-card').on('click', ...)) would NOT work because cards are
        recreated dynamically by renderMenu() on every search or sort.
    */
    $grid.on('click', '.menu-card', function () {
        const $clicked = $(this);
        selectedCardId = $clicked.attr('data-id');

        /*
            CHAINING EXPLANATION (4 links):
            1. $clicked.closest('.menu-item-col') — climbs up to the card's column wrapper;
            2. .siblings() — finds all other columns in the grid;
            3. .find('.menu-card') — finds the card inside each sibling column;
            4. .removeClass('selected') — removes the red outline from all other cards.
        */
        $clicked.closest('.menu-item-col').siblings().find('.menu-card').removeClass('selected');
        $clicked.toggleClass('selected');
    });

    // Validate search input on form submit (when user presses Enter)
    $filterForm.on('submit', function (event) {
        // Without event.preventDefault(), pressing Enter would reload the page
        event.preventDefault();
        const val = $.trim($searchInput.val());
        $searchInput.parent().find('.js-err').remove();

        if (val.length === 1) {
            $searchInput.addClass('error');
            $('<div>').addClass('js-err error small mt-1').text('Please enter at least 2 characters to search.').appendTo($searchInput.parent());
            return;
        }
        renderMenu();
    });

    $searchInput.on('input keyup', renderMenu);
    $categorySelect.on('change', renderMenu);
    $sortSelect.on('change', renderMenu);
    $budgetCheck.on('change', renderMenu);

    // Element + attribute selector ('table tr[data-doner]') with .each() and .siblings()
    $('table tr[data-doner]').each(function () {
        $(this).on('mouseenter', function () {
            $(this).addClass('active').siblings().removeClass('active');
        }).on('mouseleave', function () {
            $(this).removeClass('active');
        });
    });

    $randomBtn.on('click', function () {
        const picked = menuCatalogue[Math.floor(Math.random() * menuCatalogue.length)];
        selectedCardId = picked.id;
        $searchInput.val('');
        $categorySelect.val('all');
        $budgetCheck.prop('checked', false);
        renderMenu();
    });

    $resetBtn.on('click', function () {
        $filterForm.find('input:not([type="checkbox"])').val('').removeClass('error');
        $filterForm.find('.js-err').remove();
        $categorySelect.val('all');
        $sortSelect.val('default');
        $budgetCheck.prop('checked', false);
        selectedCardId = '';
        renderMenu();
    });

    renderMenu();
});