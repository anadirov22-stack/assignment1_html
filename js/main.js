'use strict';

/*
 * Shared navigation behavior rewritten with jQuery for Assignment 4.
 * jQuery version: 3.7.1.
 * DOM-ready ensures that navigation links exist before they are selected.
 * $('nav a[href]') and .each() replace querySelectorAll() and forEach().
 * .attr() and .removeAttr() replace getAttribute() and setAttribute().
 * The jQuery version is shorter and easier to read.
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
    $link.attr('aria-current', 'page');
} else {
    $link.removeAttr('aria-current');
}

$link.removeClass('selected');
    });

    // Chaining: select the links, find the current one, and set its accessibility state.
    // This keeps related DOM changes together and avoids repeated selectors.
    $('nav a[href]').filter('[aria-current="page"]').first().attr('aria-label', function () {
        return $(this).text().trim() + ' (current page)';
    });
});
