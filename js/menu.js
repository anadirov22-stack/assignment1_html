'use strict';

// Menu interactions use jQuery 3.7.1. Prices are per item, in KZT.
$(function () {
    const menuCatalogue = [
        { id: 'combo-1', name: 'Combo #1', category: 'combo', price: 2995, size: 'For 1 person', desc: 'Doner, french fries, Pepsi 0.5L, signature sauces, and jalapeños.', img: 'images/Combo1.jpeg' },
        { id: 'combo-2', name: 'Combo #2', category: 'combo', price: 4795, size: 'For 2 people', desc: '2 doners, 2 Ava Lemonades, white sauces, and jalapeños.', img: 'images/Combo2.jpeg' },
        { id: 'combo-3', name: 'Combo #3', category: 'combo', price: 2795, size: 'For 1 person', desc: 'Doner, french fries, Dala Ayran, signature sauces, and jalapeños.', img: 'images/Combo3.jpeg' },
        { id: 'chicken', name: 'Chicken Doner', category: 'doner', price: 1895, size: '390 g · Standard', desc: 'Lavash, chicken, french fries, pickled cucumbers, signature sauce.', img: 'images/1.jpeg' },
        { id: 'beef', name: 'Beef Doner', category: 'doner', price: 2195, size: '390 g · Standard', desc: 'Lavash, beef, french fries, pickled cucumbers, signature sauce.', img: 'images/2.jpeg' },
        { id: 'assorted', name: 'Assorted Doner', category: 'doner', price: 2095, size: '390 g · Standard', desc: 'Lavash, beef and chicken, french fries, pickled cucumbers, sauce.', img: 'images/3.jpeg' },
        { id: 'cola', name: 'Pepsi', category: 'drink', price: 795, size: '450 ml', desc: 'Chilled carbonated soft drink.', img: 'images/4.jpeg' },
        { id: 'ayran', name: 'Traditional Ayran', category: 'drink', price: 595, size: '300 ml', desc: 'Cold traditional sour-milk drink.', img: 'images/5.jpeg' },
        { id: 'bonaqua', name: 'Water', category: 'drink', price: 595, size: '500 ml', desc: 'Refreshing still drinking water.', img: 'images/6.jpeg' },
        { id: 'ava', name: 'AVA Lemonade', category: 'drink', price: 595, size: '450 ml', desc: 'Refreshing citrus lemonade in a chilled can.', img: 'images/AVA.jpeg' },
        { id: 'mirinda', name: 'Mirinda', category: 'drink', price: 595, size: '500 ml', desc: 'Bright and fizzy orange soda served cold.', img: 'images/Mirinda.jpeg' },
        { id: '7up', name: '7UP', category: 'drink', price: 595, size: '500 ml', desc: 'Crisp lemon-lime soda served chilled.', img: 'images/7up.jpeg' },
        { id: 'fries', name: 'Crispy Fries', category: 'extra', price: 895, size: '1 portion', desc: 'Hot golden french fries.', img: 'images/7.jpeg' },
        { id: 'extra-meat', name: 'Extra Chicken', category: 'extra', price: 590, size: '50 g', desc: 'Additional portion of grilled halal meat.', img: 'images/8.jpeg' },
        { id: 'sauce', name: 'Peppers', category: 'extra', price: 100, size: '1 portion', desc: 'Spicy peppers to go with your meal.', img: 'images/9.jpeg' }
    ];
    const cartStore = window.DonerCart;
    const categories = [['all', 'All'], ['combo', 'Combos'], ['doner', 'Doners'], ['drink', 'Drinks'], ['extra', 'Extras']];
    const $section = $('#drinks');
    let category = 'all';
    if (!$section.length) return;

    function money(value) {
        return Number(value).toLocaleString('ru-RU') + ' ₸';
    }

    function renderCart(items) {
        let count = 0;
        let total = 0;
        $.each(items, function (_, item) {
            count += item.qty;
            total += item.price * item.qty;
        });
        $('#menu-mini-cart').prop('hidden', count === 0);
        $('body').toggleClass('menu-has-cart', count > 0);
        $('#menu-cart-count').text(count + (count === 1 ? ' item in your order' : ' items in your order'));
        $('#menu-cart-total').text('Total · ' + money(total));
    }

    function refreshCart() {
        try {
            renderCart(cartStore.read());
            $('#menu-reset-saved-cart').prop('hidden', true);
            $('#menu-cart-message').text('');
        } catch (error) {
            renderCart([]);
            $('#menu-cart-message').text('Your saved cart could not be read. Reset it to start again, or allow browser storage if it is blocked.');
            $('#menu-reset-saved-cart').prop('hidden', false);
        }
    }

    const $toolbar = $('<div>').addClass('row g-3 align-items-center mb-4');
    const $pills = $('<div>').addClass('col-12 col-xl-6 d-flex flex-wrap gap-2').attr({ role: 'group', 'aria-label': 'Menu categories' });
    $.each(categories, function (_, entry) {
        $('<button>').attr({ type: 'button', 'data-category': entry[0], 'aria-pressed': String(entry[0] === category) })
            .addClass('btn btn-outline-secondary rounded-pill').toggleClass('btn-dark', entry[0] === category).toggleClass('btn-outline-secondary', entry[0] !== category).text(entry[1]).appendTo($pills);
    });
    const $search = $('<input>').attr({ id: 'menu-search', type: 'search', placeholder: 'Search your favourites', 'aria-label': 'Search menu' }).addClass('form-control');
    const $sort = $('<select>').attr({ id: 'menu-sort', 'aria-label': 'Sort menu by price' }).addClass('form-select');
    $.each([['default', 'Recommended'], ['asc', 'Price: low to high'], ['desc', 'Price: high to low']], function (_, entry) {
        $('<option>').val(entry[0]).text(entry[1]).appendTo($sort);
    });
    const $empty = $('<div>').addClass('text-center bg-white border rounded-4 p-4').prop('hidden', true).append(
        $('<h3>').addClass('h5 fw-bold').text('Nothing on the menu matches yet.'),
        $('<p>').addClass('text-secondary mb-3').text('Try a different search or category.'),
        $('<button>').attr('type', 'button').addClass('btn btn-outline-secondary rounded-pill').text('Reset filters').on('click', function () {
            category = 'all';
            $search.val('');
            $sort.val('default');
            renderMenu();
            $search.trigger('focus');
        })
    );
    const $grid = $('<div>').attr('id', 'menu-cards-grid').addClass('row g-4');
    $toolbar.append($pills, $('<div>').addClass('col-12 col-xl-6 d-flex flex-column flex-sm-row gap-2').append($search, $sort));
    $section.append($toolbar, $empty, $grid);

    function renderMenu() {
        const query = $search.val().trim().toLowerCase();
        const results = $.grep(menuCatalogue, function (item) {
            return (category === 'all' || item.category === category) &&
                (!query || (item.name + ' ' + item.size + ' ' + item.desc).toLowerCase().includes(query));
        });
        if ($sort.val() !== 'default') {
            results.sort(function (a, b) { return $sort.val() === 'asc' ? a.price - b.price : b.price - a.price; });
        }
        $pills.find('button').each(function () {
            const active = $(this).attr('data-category') === category;
            $(this).toggleClass('btn-dark', active).toggleClass('btn-outline-secondary', !active).attr('aria-pressed', String(active));
        });
        $empty.prop('hidden', results.length > 0);
        $grid.empty();
        $.each(results, function (_, item) {
            const $card = $('<article>').attr('data-id', item.id)
                .addClass('menu-card card h-100 shadow-sm border-0 rounded-3 overflow-hidden');
            const $image = $('<div>').addClass('position-relative').append($('<img>').attr({ src: item.img, alt: item.name, loading: 'lazy', width: '600', height: '220' }).addClass('card-img-top'));
            if (item.category === 'combo') $('<span>').addClass('badge text-bg-light position-absolute top-0 start-0 m-3 rounded-pill').text('Combo').appendTo($image);
            const $body = $('<div>').addClass('card-body d-flex flex-column p-4').append(
                $('<h3>').addClass('h5 fw-bold mb-2').text(item.name),
                $('<p>').addClass('small text-secondary mb-2').text(item.size),
                $('<p>').addClass('small text-secondary mb-3').text(item.desc),
                $('<div>').addClass('mt-auto d-flex justify-content-between align-items-center gap-2').append(
                    $('<strong>').text(money(item.price)),
                    $('<button>').attr({ type: 'button', 'data-id': item.id, 'aria-label': 'Add ' + item.name + ' to cart' }).addClass('btn btn-danger btn-sm add-to-cart').text('+ Add')
                )
            );
            $('<div>').addClass('col-12 col-sm-6 col-lg-4').append($card.append($image, $body)).appendTo($grid);
        });
    }

    // Native buttons handle mouse, Enter and Space without card-wide handlers.
    $grid.on('click', '.add-to-cart', function () {
        const $button = $(this);
        const item = $.grep(menuCatalogue, function (entry) { return entry.id === $button.attr('data-id'); })[0];
        try {
            const cart = cartStore.read();
            const id = 'menu-' + item.id;
            const existing = $.grep(cart, function (entry) { return entry.id === id; })[0];
            if (existing && existing.qty >= 10) {
                $('#menu-cart-message').text('Maximum 10 of this item. You can review quantities on the Order page.');
                $button.text('Max 10');
                return;
            }
            if (existing) { existing.qty += 1; existing.img = item.img; }
            else cart.push({ id: id, title: item.name, category: item.category, price: item.price, qty: 1, img: item.img });
            cartStore.write(cart);
            renderCart(cart);
            $('#menu-cart-message').text(item.name + ' added to your cart.');
            $('#menu-reset-saved-cart').prop('hidden', true);
            clearTimeout($button.data('feedbackTimer'));
            $button.text('Added ✓');
            $button.data('feedbackTimer', setTimeout(function () {
                $button.text('+ Add');
            }, 800));
        } catch (error) {
            $('#menu-cart-message').text('Your item could not be saved. Allow browser storage or reset the saved cart below.');
            $('#menu-reset-saved-cart').prop('hidden', false);
            $button.text('Not added');
        }
    });
    $pills.on('click', 'button', function () { category = $(this).attr('data-category'); renderMenu(); });
    $search.on('input', renderMenu);
    $sort.on('change', renderMenu);
    $('#menu-clear-cart, #menu-reset-saved-cart').on('click', function () {
        try {
            cartStore.write([]);
            renderCart([]);
            $('#menu-cart-message').text('Your cart was cleared.');
            $('#menu-reset-saved-cart').prop('hidden', true);
            $search.trigger('focus');
        } catch (error) {
            $('#menu-cart-message').text('Your cart could not be cleared. Please allow browser storage and try again.');
        }
    });
    $(window).on('storage pageshow', function (event) {
        if (event.type === 'pageshow' || event.originalEvent.key === cartStore.key || event.originalEvent.key === null) refreshCart();
    });
    renderMenu();
    refreshCart();
});
