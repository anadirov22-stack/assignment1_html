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

    function getAvailableProducts(items) {
        return items.filter(function (product) {
            return product.available === true;
        });
    }

    function getRandomDoner(items, previousId) {
        const availableDoners = getAvailableProducts(items).filter(function (product) {
            return product.category === 'doner' &&
                product.id !== previousId;
        });

        if (!availableDoners.length) return null;

        const randomIndex = Math.floor(
            Math.random() * availableDoners.length
        );

        return availableDoners[randomIndex];
    }

    let previousDonerId = null;

    // Recommendation section
    const $section = $('<section>', {
        id: 'doner-recommendation-section',
        class: 'py-5'
    }).css('background-color', '#F1F0EC');

    const $container = $('<div>', {
        class: 'container'
    });

    const $card = $('<div>', {
        class: 'card border-0 shadow rounded-4 overflow-hidden'
    });

    const $body = $('<div>', {
        class: 'card-body text-center p-4 p-md-5'
    });

    const $badge = $('<span>', {
        class: 'badge text-bg-danger mb-3 p-2'
    }).text('A LITTLE FOOD INSPIRATION');

    const $heading = $('<h2>', {
        class: 'display-5 fw-bold mb-3'
    }).text('Can’t Decide What to Eat?');

    const $description = $('<p>', {
        class: 'lead text-secondary mb-4'
    }).text('Let us help you find your perfect doner!');

    const $button = $('<button>', {
        type: 'button',
        id: 'recommend-doner',
        class: 'btn btn-danger btn-lg px-5'
    }).text('Surprise Me!');

    const $result = $('<div>', {
        id: 'doner-recommendation-result',
        class: 'mt-4',
        'aria-live': 'polite'
    });

    $body.append(
        $badge,
        $heading,
        $description,
        $button,
        $result
    );

    $card.append($body);
    $container.append($card);
    $section.append($container);

    // Place the recommendation before the branch section.
    const $branch = $('#branch');

    if ($branch.length && !$('#doner-recommendation-section').length) {
        $branch.before($section);
    }

    // Random recommendation button.
    $button.on('click', function () {

        const product = getRandomDoner(products, previousDonerId);

        if (!product) {
            $result
                .text('Sorry, no doners are currently available.')
                .addClass('text-danger');

            return;
        }

        previousDonerId = product.id;

        const $resultCard = $('<div>', {
            class: 'bg-light border rounded-4 p-4 mx-auto',
            style: 'max-width: 450px;'
        });

        const $icon = $('<div>', {
            class: 'display-3 mb-2'
        }).text('🌯');

        const $resultTitle = $('<h3>', {
            class: 'h3 fw-bold text-dark mb-2'
        }).text(product.name);

        const $size = $('<p>', {
            class: 'text-secondary mb-2'
        }).text('Size: ' + product.size);

        const $availability = $('<span>', {
            class: 'badge text-bg-success p-2'
        }).text('Available');

        const $menuButton = $('<a>', {
            href: 'menu.html',
            class: 'btn btn-outline-danger mt-3'
        }).text('View Menu');

        $resultCard.append(
            $icon,
            $resultTitle,
            $size,
            $availability,
            $('<br>'),
            $menuButton
        );

        $result
            .empty()
            .append($resultCard)
            .hide()
            .fadeIn(300);
    });

    $('a[href="menu.html"]')
        .filter(':first')
        .attr('title', 'Open the full menu');

});