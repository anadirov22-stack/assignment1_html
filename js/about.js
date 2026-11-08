'use strict';

/*
 * Ali Nadirov — About page jQuery features.
 * jQuery 3.7.1 must be loaded before this file.
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

    function getAvailableProducts(items) {
        return items.filter(function (product) {
            return product.available === true;
        });
    }

    function countProductsByCategory(items, category) {
        return items.filter(function (product) {
            return product.category === category;
        }).length;
    }

    function searchProducts(items, searchText) {
        const query = searchText.trim().toLowerCase();

        return items.filter(function (product) {
            return (product.name + ' ' + product.size + ' ' + product.category)
                .toLowerCase().includes(query);
        });
    }

    function getRandomDoner(items) {
        const availableDoners = getAvailableProducts(items).filter(function (product) {
            return product.category === 'doner';
        });

        if (!availableDoners.length) return null;

        return availableDoners[
            Math.floor(Math.random() * availableDoners.length)
        ];
    }

    const stats = {
        total: products.length,
        available: getAvailableProducts(products).length,
        doners: countProductsByCategory(products, 'doner'),
        drinks: countProductsByCategory(products, 'drink'),
        additions: countProductsByCategory(products, 'addition')
    };

    const $section = $('<section>', {
        id: 'product-search-section',
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

    const $input = $('<input>', {
        type: 'search',
        id: 'product-search',
        class: 'form-control',
        placeholder: 'Enter a product name',
        autocomplete: 'off',
        'aria-label': 'Search products'
    });

    const $stats = $('<p>', {
        class: 'small text-muted mt-2',
        'aria-live': 'polite'
    }).text(
        'Catalog: ' + stats.total + ' products — ' +
        stats.doners + ' doners, ' +
        stats.drinks + ' drinks, ' +
        stats.additions + ' additions.'
    );

    const $count = $('<p>', {
        class: 'mt-3',
        'aria-live': 'polite'
    }).text('Start typing a product name to search.');

    const $results = $('<ul>', {
        id: 'product-search-results',
        class: 'list-group mt-2',
        'aria-live': 'polite'
    });

    const $empty = $('<p>', {
        class: 'alert alert-warning mt-2',
        role: 'status'
    }).text('No products match your search.').hide();

    const $menuLink = $('<a>', {
        href: 'menu.html',
        class: 'btn btn-outline-danger mt-3'
    }).text('View the full menu and prices');

    const $recommendButton = $('<button>', {
        type: 'button',
        id: 'recommend-doner',
        class: 'btn btn-warning mt-3 ms-2'
    }).text('Get a Doner Recommendation');

    const $recommendation = $('<p>', {
        id: 'doner-recommendation',
        class: 'mt-3',
        'aria-live': 'polite'
    });

    $section.append(
        $heading,
        $label,
        $input,
        $stats,
        $count,
        $results,
        $empty,
        $menuLink,
        $recommendButton,
        $recommendation
    );

    if (!$('#product-search-section').length) {
        $aboutMessage
            .append($section)
            .removeClass('hidden')
            .hide()
            .fadeIn(250);
    }

    function renderSearchResults(query) {
        $results.empty();

        if (!query) {
            $count.text('Start typing a product name to search.');
            $empty.stop(true, true).hide();
            return;
        }

        const matches = searchProducts(products, query);

        $count.text('Products found: ' + matches.length);

        if (!matches.length) {
            $empty.stop(true, true).fadeIn(150);
            return;
        }

        $empty.stop(true, true).hide();

        $.each(matches, function (_, product) {
            const availability = product.available
                ? 'Available'
                : 'Currently unavailable';

            const $item = $('<li>', {
                class: 'list-group-item product-result',
                tabindex: '0',
                role: 'button',
                'data-product-id': product.id
            }).text(
                product.name + ' (' + product.size + ') — ' + availability
            );

            $results.append($item);
        });
    }

    $input.on('input', function () {
        renderSearchResults(
            String($(this).val() || '').trim()
        );

        $(this).toggleClass(
            'selected',
            String($(this).val()).trim().length > 0
        );
    });

    // Delegated event handler for dynamically created search results.
    $aboutMessage.on(
        'click keydown',
        '.product-result',
        function (event) {
            if (
                event.type === 'keydown' &&
                event.key !== 'Enter' &&
                event.key !== ' '
            ) {
                return;
            }

            if (event.type === 'keydown') {
                event.preventDefault();
            }

            const productId = Number(
                $(this).attr('data-product-id')
            );

            const product = products.find(function (item) {
                return item.id === productId;
            });

            if (product) {
                $results.find('.product-result').removeClass('selected');

                $(this).addClass('selected');

                $input.val(product.name);

                $count.text(
                    'Selected: ' +
                    product.name +
                    ' (' + product.size + ').'
                );
            }
        }
    );

    $recommendButton.on('click', function () {
        const product = getRandomDoner(products);

        if (!product) {
            $recommendation.text(
                'Sorry, no doners are currently available.'
            );
            return;
        }

        $recommendation
            .text(
                "Today's Doner Recommendation: " +
                product.name +
                ' (' + product.size + ') — Available'
            )
            .addClass('selected')
            .hide()
            .fadeIn(250);
    });

    $('a[href="menu.html"]')
        .filter(':first')
        .attr('title', 'Open the full menu');
});
