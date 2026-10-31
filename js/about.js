'use strict';

/*
 * About page jQuery features for Doner na Abaya.
 * jQuery version: 3.7.1.
 * DOM-ready ensures that #about-message exists before the script uses it.
 * jQuery selectors, .on(), .append(), and .text() replace repeated
 * querySelector(), addEventListener(), appendChild(), and textContent calls.
 * The jQuery version is shorter and easier to read.
 */

$(function () {
    const products = [
        { id: 1, name: 'Chicken doner', category: 'doner', size: 'M', available: true },
        { id: 2, name: 'Beef doner', category: 'doner', size: 'M', available: true },
        { id: 3, name: 'Assorted doner', category: 'doner', size: 'M', available: true },
        { id: 4, name: 'Chicken doner', category: 'doner', size: 'S', available: true },
        { id: 5, name: 'Beef doner', category: 'doner', size: 'S', available: true },
        { id: 6, name: 'Assorted doner', category: 'doner', size: 'S', available: true },
        { id: 7, name: 'Coca-Cola Zero Sugar', category: 'drink', size: '450 ml', available: true },
        { id: 8, name: 'Coca-Cola', category: 'drink', size: '500 ml', available: true },
        { id: 9, name: 'Fanta', category: 'drink', size: '450 ml', available: true },
        { id: 10, name: 'Fuse Tea', category: 'drink', size: '450 ml', available: true },
        { id: 11, name: 'Sprite', category: 'drink', size: '450 ml', available: true },
        { id: 12, name: 'Coca-Cola Zero Sugar', category: 'drink', size: '500 ml', available: true },
        { id: 13, name: 'Fanta', category: 'drink', size: '500 ml', available: true },
        { id: 14, name: 'Sprite', category: 'drink', size: '500 ml', available: true },
        { id: 15, name: 'Fuse Tea', category: 'drink', size: '500 ml', available: true },
        { id: 16, name: 'Bonaqua', category: 'drink', size: '500 ml', available: true },
        { id: 17, name: 'Airyan', category: 'drink', size: '300 ml', available: true },
        { id: 18, name: 'Extra beef', category: 'addition', size: 'Extra portion', available: true },
        { id: 19, name: 'Extra chicken', category: 'addition', size: 'Extra portion', available: true },
        { id: 20, name: 'Peppers', category: 'addition', size: 'Extra portion', available: true },
        { id: 21, name: 'Red sauce', category: 'addition', size: 'Extra portion', available: true },
        { id: 22, name: 'White sauce', category: 'addition', size: 'Extra portion', available: true }
    ];

    const $aboutMessage = $('#about-message');

    if (!$aboutMessage.length) return;

    // Product helper functions.
    const countProductsByCategory = (items, category) =>
        items.filter(item => item.category === category).length;

    const findProductById = (items, id) =>
        items.find(item => item.id === id);

    const getAvailableProducts = items =>
        items.filter(item => item.available);

    const searchProducts = (items, query) => {
        const normalizedQuery = query.trim().toLowerCase();

        return items.filter(item =>
            item.name.toLowerCase().includes(normalizedQuery)
        );
    };

    const getRandomDoner = items => {
        const availableDoners = items.filter(
            item => item.category === 'doner' && item.available
        );

        return availableDoners.length
            ? availableDoners[Math.floor(Math.random() * availableDoners.length)]
            : null;
    };

    // Display product statistics in the browser console.
    const stats = {
        total: products.length,
        available: getAvailableProducts(products).length,
        doners: countProductsByCategory(products, 'doner'),
        drinks: countProductsByCategory(products, 'drink')
    };

    console.log('About page product statistics:', stats);
    console.log('Example product lookup:', findProductById(products, 3));

    /*
     * Rewritten with jQuery.
     * $('<element>'), .append(), .text(), and .addClass()
     * replace document.createElement(), appendChild(), textContent,
     * and classList.add(). The jQuery version is shorter and clearer.
     */

    // Build the search interface dynamically from JavaScript data.
    const $searchSection = $('<section>', {
        class: 'mt-4 mb-4',
        'aria-labelledby': 'product-search-heading'
    });

    const $heading = $('<h2>', {
        id: 'product-search-heading',
        class: 'h3 mb-3'
    }).text('Find a Product');

    const $label = $('<label>', {
        for: 'product-search',
        class: 'form-label'
    }).text('Search products in our menu for availability');

    const $searchInput = $('<input>', {
        type: 'search',
        id: 'product-search',
        class: 'form-control mb-3',
        placeholder: 'Enter a product name',
        autocomplete: 'off',
        'aria-label': 'Search menu products'
    });

    const $resultCount = $('<p>', {
        class: 'mt-3',
        'aria-live': 'polite'
    }).text('Start typing a product name to search.');

    const $searchResults = $('<ul>', {
        class: 'mt-2',
        'aria-live': 'polite'
    });

    const $emptyMessage = $('<p>', {
        class: 'hidden mt-2',
        role: 'status'
    }).text('No products match your search.');

    const $menuLink = $('<a>', {
        href: 'menu.html',
        class: 'btn btn-outline-danger'
    }).text('View the full menu and prices');

    const $recommendButton = $('<button>', {
        type: 'button',
        class: 'btn btn-warning'
    }).text('Get a Doner Recommendation');

    const $recommendationMessage = $('<p>', {
        class: 'mt-3',
        'aria-live': 'polite'
    });

    // Separate the buttons into a vertical group with spacing.
    const $buttonGroup = $('<div>', {
        class: 'd-flex flex-column align-items-start gap-3 mt-3'
    });

    $buttonGroup.append($menuLink, $recommendButton);

    // Three-method chain: build, style, hide, and insert the search section.
    // Chaining keeps related DOM operations together and reduces repeated calls.
    $searchSection
        .append(
            $heading,
            $label,
            $searchInput,
            $resultCount,
            $searchResults,
            $emptyMessage,
            $buttonGroup,
            $recommendationMessage
        )
        .addClass('border rounded p-3')
        .hide()
        .appendTo($aboutMessage);

    $aboutMessage.removeClass('hidden').fadeIn(250);
    $searchSection.slideDown(250);

    // Update search results when the visitor enters a product name.
    function updateSearchResults() {
        const query = $searchInput.val().trim();

        $searchResults.empty();

        if (!query) {
            $resultCount.text('Start typing a product name to search.');
            $emptyMessage.addClass('hidden');
            return;
        }

        const matches = searchProducts(products, query);

        $resultCount.text('Products found: ' + matches.length);
        $emptyMessage.toggleClass('hidden', matches.length > 0);

        // Build each result with .append(); .text() prevents HTML interpretation.
        $.each(matches, function (_, product) {
            const status = product.available
                ? 'Available'
                : 'Currently unavailable';

            $('<li>')
                .text(product.name + ' (' + product.size + ') — ' + status)
                .appendTo($searchResults);
        });
    }

    // Event 1: input.
    $searchInput.on('input', function () {
        updateSearchResults();

        $(this).toggleClass(
            'selected',
            $(this).val().trim().length > 0
        );
    });

    // Event 2: click.
    $recommendButton.on('click', function () {
        const $button = $(this);
        const recommendation = getRandomDoner(products);

        const message = recommendation
            ? "Today's Doner Recommendation: " +
              recommendation.name +
              ' (' + recommendation.size + ') — Available'
            : 'Sorry, no doners are currently available.';

        $recommendationMessage
            .stop(true, true)
            .text(message)
            .hide()
            .fadeIn(350, function () {
                $button.attr('aria-pressed', 'true');
            });

        $button.toggleClass('selected');
    });

    // Attribute selector and :not() filter demonstrate jQuery selectors.
    // :first selects the first matching menu link.
    $('a[href^="menu.html"]:not(.btn)')
        .filter(':first')
        .each(function () {
            $(this).attr('title', 'Open the menu page');
        });
});