'use strict';

$(function () {
    const cartStore = window.DonerCart;
    const $form = $('#order-form');
    const $items = $('#cart-items');
    const $error = $('#cart-error');
    let cart = [];
    let storageValid = true;
    if (!$form.length) return;

    function money(value) { return value.toLocaleString('ru-RU') + ' ₸'; }
    function total() { return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0); }
    function branchNow() { return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Almaty', hour12: false }).slice(0, 16).replace(' ', 'T'); }

    // The shared cart reader also accepts older name/quantity records.
    function loadCart() {
        try {
            cart = cartStore.read();
            storageValid = true;
            $error.prop('hidden', true);
        } catch (error) {
            cart = [];
            storageValid = false;
            $error.text('Your saved cart could not be read. Allow browser storage or use Clear Cart to start again.').prop('hidden', false);
        }
        renderCart();
        return storageValid;
    }

    // Save before updating the screen so failed writes never pretend to succeed.
    function saveCart(next) {
        try {
            cart = cartStore.write(next);
            storageValid = true;
            $error.prop('hidden', true);
            $('#order-confirmation').prop('hidden', true);
            renderCart();
        } catch (error) {
            $error.text('Cart changes could not be saved. Allow browser storage and try again.').prop('hidden', false);
        }
    }

    // Older carts did not save images, so match their product IDs as a fallback.
    function itemImage(item) {
        if (/^images\/[\w -]+\.(jpeg|jpg|png|webp)$/i.test(item.img || '')) return item.img;
        const files = { 'combo-1': 'Combo1', 'combo-2': 'Combo2', 'combo-3': 'Combo3', chicken: '1', beef: '2', assorted: '3', cola: '4', ayran: '5', bonaqua: '6', fries: '7', 'extra-meat': '8', sauce: '9', ava: 'AVA', mirinda: 'Mirinda', '7up': '7up', 'coca-cola': '4', 'coca-cola-zero': '4', 'extra-chicken': '8', 'extra-beef': '8', 'extra-fries': '7', 'extra-sauce': '9', 'extra-peppers': '9' };
        const key = item.id.replace(/^menu-/, '').split(':')[0];
        const file = files[key] || files[key.replace(/-(standard|large|450|500|300)$/, '')];
        return file ? 'images/' + file + '.jpeg' : '';
    }

    function renderCart() {
        $items.empty();
        $('#cart-empty').prop('hidden', cart.length > 0);
        $('#clear-cart').prop('disabled', !cart.length && storageValid);
        $('#submit-order').prop('disabled', !cart.length || !storageValid);
        $('#cart-summary').prop('hidden', !cart.length);
        $('#cart-total').text(money(total()));
        $.each(cart, function (_, item) {
            const $row = $('<div>').addClass('list-group-item px-0 py-3 d-flex flex-wrap align-items-center gap-3').attr('data-id', item.id);
            const image = itemImage(item);
            if (image) $('<img>').attr({ src: image, alt: '', width: '60', height: '60' }).addClass('cart-thumb flex-shrink-0').appendTo($row);
            else $('<span>').addClass('cart-thumb bg-body-tertiary d-inline-flex align-items-center justify-content-center flex-shrink-0 text-secondary').attr('aria-hidden', 'true').text('—').appendTo($row);
            $('<div>').addClass('flex-grow-1 overflow-hidden').append(
                $('<h3>').addClass('h6 mb-1 text-break').text(item.title),
                $('<span>').addClass('small text-secondary').text(money(item.price) + ' each')
            ).appendTo($row);
            const $controls = $('<div>').addClass('d-flex align-items-center gap-2 ms-auto');
            const $quantity = $('<div>').addClass('d-flex align-items-center border rounded-pill overflow-hidden');
            $.each([['decrease', '−'], ['increase', '+']], function (_, action) {
                if (action[0] === 'increase') $('<span>').addClass('px-2 small').text(item.qty).appendTo($quantity);
                $('<button>').attr({ type: 'button', 'data-action': action[0], 'aria-label': action[0] + ' ' + item.title })
                    .addClass('btn btn-light btn-sm border-0 px-2').text(action[1])
                    .prop('disabled', (action[0] === 'decrease' && item.qty === 1) || (action[0] === 'increase' && item.qty === 10)).appendTo($quantity);
            });
            $controls.append($quantity, $('<button>').attr({ type: 'button', 'data-action': 'remove', 'aria-label': 'remove ' + item.title, title: 'Remove item' }).addClass('btn btn-link text-secondary text-decoration-none p-1 fs-5').text('×'));
            $row.append($controls).appendTo($items);
        });
    }

    $items.on('click', 'button[data-action]', function () {
        const id = $(this).closest('[data-id]').attr('data-id');
        const action = $(this).attr('data-action');
        if (!loadCart()) return;
        const next = $.map(cart, function (item) { return $.extend({}, item); });
        const index = next.findIndex(function (item) { return item.id === id; });
        if (index < 0) return;
        if (action === 'remove') next.splice(index, 1);
        else next[index].qty = Math.max(1, Math.min(10, next[index].qty + (action === 'increase' ? 1 : -1)));
        saveCart(next);
        const $focus = $items.find('button').filter(function () {
            return $(this).closest('[data-id]').attr('data-id') === id && $(this).attr('data-action') === action && !$(this).prop('disabled');
        }).first();
        ($focus.length ? $focus : $('#clear-cart:enabled, #cart-menu-link:visible').first()).trigger('focus');
    });
    $('#clear-cart').on('click', function () { saveCart([]); });

    function toggleAddress() {
        const delivery = $('#delivery').prop('checked');
        $('#delivery-address-group').prop('hidden', !delivery);
        $('#delivery-address').prop({ required: delivery, disabled: !delivery });
    }
    $('[name="type"]').on('change', toggleAddress);

    function timeError(date, time, now) {
        if (!date || !time) return '';
        const selected = new Date(date + 'T00:00:00Z');
        if (Number.isNaN(selected.getTime()) || selected.toISOString().slice(0, 10) !== date) return 'Choose a valid order date.';
        if (date + 'T' + time <= now) return 'Choose a future date and time.';
        if (selected.getUTCDay() === 5 && time >= '12:30' && time < '14:00') return 'Friday break is 12:30–14:00. Choose another time.';
        return '';
    }

    $form.on('submit', function (event) {
        event.preventDefault();
        $('#order-confirmation').prop('hidden', true);
        if (!loadCart() || !cart.length) return;
        toggleAddress();
        const now = branchNow();
        $('#order-date').attr('min', now.slice(0, 10));
        $('#name')[0].setCustomValidity($('#name').val().trim() ? '' : 'Enter your name.');
        $('#phone')[0].setCustomValidity(/^\+?\d{10,15}$/.test($('#phone').val().replace(/[\s()-]/g, '')) ? '' : 'Enter a valid phone number.');
        $('#delivery-address')[0].setCustomValidity($('#delivery').prop('checked') && !$('#delivery-address').val().trim() ? 'Enter the delivery address.' : '');
        const message = timeError($('#order-date').val(), $('#order-time').val(), now);
        $('#order-time')[0].setCustomValidity(message);
        $('#time-error').text(message || 'Choose a preferred time.');
        $form.addClass('was-validated');
        if (!$form[0].checkValidity()) { $form.find(':invalid').first().trigger('focus'); return; }
        const summary = $.map(cart, function (item) { return item.title + ' × ' + item.qty; }).join(', ');
        const address = $('#delivery').prop('checked') ? ' Address: ' + $('#delivery-address').val().trim() + '.' : '';
        $('#order-confirmation').text('Order details for ' + $('#name').val().trim() + ': ' + summary + '. Total: ' + money(total()) + '. ' + $('[name="type"]:checked').val() + ', ' + $('#order-date').val() + ' at ' + $('#order-time').val() + ' (Astana).' + address + ' Please call +7 708 804 39 37 to place this order.').prop('hidden', false);
    });
    $form.on('input change', 'input, textarea', function () { this.setCustomValidity(''); $('#order-confirmation').prop('hidden', true); });
    $form.on('reset', function () {
        $form.removeClass('was-validated').find('input, textarea').each(function () { this.setCustomValidity(''); });
        $('#order-confirmation').prop('hidden', true);
        // Reset clears checkout fields only; Clear Cart is the separate cart action.
        setTimeout(toggleAddress, 0);
    });
    $(window).on('storage pageshow', function (event) {
        if (event.type === 'pageshow' || event.originalEvent.key === cartStore.key || event.originalEvent.key === null) {
            $('#order-confirmation').prop('hidden', true);
            loadCart();
        }
    });
    $('#order-date').attr('min', branchNow().slice(0, 10));
    toggleAddress();
    loadCart();
});
