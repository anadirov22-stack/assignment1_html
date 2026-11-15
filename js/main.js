'use strict';

// One cart contract for Menu and Order. Read older name/quantity records too.
window.DonerCart = (function () {
    const key = 'donerNaAbayaCart';

    function normalize(items) {
        if (!Array.isArray(items)) throw new Error('Invalid cart');
        const ids = new Set();
        return $.map(items, function (item) {
            if (!item || typeof item !== 'object') throw new Error('Invalid cart item');
            const title = item.title === undefined ? item.name : item.title;
            const qty = item.qty === undefined ? item.quantity : item.qty;
            if (typeof item.id !== 'string' || !item.id.trim() || ids.has(item.id) ||
                typeof title !== 'string' || !title.trim() ||
                !Number.isSafeInteger(item.price) || item.price <= 0 ||
                !Number.isInteger(qty) || qty < 1 || qty > 10) throw new Error('Invalid cart item');
            ids.add(item.id);
            return { id: item.id, title: title.trim(), price: item.price, qty: qty,
                img: /^images\/[\w -]+\.(jpeg|jpg|png|webp)$/i.test(item.img || '') ? item.img : '',
                category: typeof item.category === 'string' ? item.category : '' };
        });
    }

    return {
        key: key,
        read: function () { return normalize(JSON.parse(window.localStorage.getItem(key) || '[]')); },
        write: function (items) {
            const cart = normalize(items);
            window.localStorage.setItem(key, JSON.stringify(cart));
            return cart;
        }
    };
})();

// Keep identical headers in HTML; set the current page with jQuery.
$(function () {
    function decodePage(value) {
        try {
            return decodeURIComponent(value);
        } catch (error) {
            return value;
        }
    }

    const currentPage = decodePage(window.location.pathname.split('/').pop() || 'menu.html');
    $('.site-navbar .navbar-nav .nav-link').each(function () {
        const $link = $(this);
        const linkPage = decodePage($link.attr('href').split(/[?#]/)[0]);
        const active = linkPage === currentPage;
        $link.toggleClass('active', active);
        if (active) $link.attr('aria-current', 'page');
        else $link.removeAttr('aria-current');
    });
});
