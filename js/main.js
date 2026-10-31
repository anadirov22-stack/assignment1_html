'use strict';

/*
 * Shared navigation behavior rewritten with jQuery for Assignment 4.
 * jQuery version: 3.7.1 (CDN is linked in each page that uses this file).
 * DOM-ready is needed because the navigation links must exist before selection.
 */

$(function () {
    // ID/class/element/attribute selectors are demonstrated across this project.
    const $navigationLinks = $('nav a[href]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // .each() visits each link; $(this) wraps the current DOM element as a jQuery object.
    $navigationLinks.each(function () {
        const $link = $(this);
        const linkPage = $link.attr('href');

        if (linkPage === currentPage) {
            $link.attr('aria-current', 'page').addClass('selected');
        } else {
            $link.removeAttr('aria-current').removeClass('selected');
        }
    });

    // Chaining: select the links, find the current one, and set its accessibility state.
    // This keeps related DOM changes together and avoids repeated selectors.
    $('nav a[href]').filter('[aria-current="page"]').first().attr('aria-label', function () {
        return $(this).text().trim() + ' (current page)';
    });
});
