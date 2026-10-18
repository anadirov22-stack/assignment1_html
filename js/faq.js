'use strict';

/*
    Mazhit Nurasyl
    FAQ page JavaScript
*/

const faqAccordion = document.querySelector('#faq-accordion');

const faqData = [
    {
        id: 'question-one',
        category: 'order',
        question: 'Can I order online?',
        keywords: ['order', 'online', 'food']
    },
    {
        id: 'question-two',
        category: 'order',
        question: 'Do you have delivery?',
        keywords: ['delivery', 'order']
    },
    {
        id: 'question-three',
        category: 'menu',
        question: 'Where can I see the menu?',
        keywords: ['menu', 'food', 'price']
    },
    {
        id: 'question-four',
        category: 'restaurant',
        question: 'What are your opening hours?',
        keywords: ['hours', 'open', 'time']
    }
];

let faqSearchInput = null;
let faqCategorySelect = null;
let faqResultCount = null;
let faqNoResults = null;
let faqResetButton = null;

function findFaqById(id) {
    return faqData.find(function (item) {
        return item.id === id;
    });
}

function filterFaq(searchText, category) {
    const cleanText = searchText.trim().toLowerCase();

    return faqData.filter(function (item) {
        const questionMatches =
            cleanText === ''
            || item.question.toLowerCase().includes(cleanText);

        const keywordMatches =
            cleanText === ''
            || item.keywords.some(function (keyword) {
                return keyword.includes(cleanText);
            });

        const categoryMatches =
            category === 'all'
            || item.category === category;

        return (questionMatches || keywordMatches) && categoryMatches;
    });
}

function getFaqCount(items) {
    return items.length;
}

function createFaqSearch() {
    const controls = document.createElement('div');
    controls.id = 'faq-search-controls';
    controls.classList.add(
        'row',
        'g-3',
        'align-items-end',
        'mb-4'
    );

    const searchColumn = document.createElement('div');
    searchColumn.classList.add('col-12', 'col-md-6');

    const searchLabel = document.createElement('label');
    searchLabel.classList.add('form-label');
    searchLabel.setAttribute('for', 'faq-search');
    searchLabel.textContent = 'Search FAQ';

    faqSearchInput = document.createElement('input');
    faqSearchInput.id = 'faq-search';
    faqSearchInput.type = 'search';
    faqSearchInput.classList.add('form-control');
    faqSearchInput.placeholder = 'Type order, delivery, menu...';

    searchColumn.append(searchLabel, faqSearchInput);

    const categoryColumn = document.createElement('div');
    categoryColumn.classList.add('col-12', 'col-md-3');

    const categoryLabel = document.createElement('label');
    categoryLabel.classList.add('form-label');
    categoryLabel.setAttribute('for', 'faq-category');
    categoryLabel.textContent = 'Category';

    faqCategorySelect = document.createElement('select');
    faqCategorySelect.id = 'faq-category';
    faqCategorySelect.classList.add('form-select');

    const categories = [
        { value: 'all', label: 'All categories' },
        { value: 'order', label: 'Order' },
        { value: 'menu', label: 'Menu' },
        { value: 'restaurant', label: 'Restaurant' }
    ];

    categories.forEach(function (category) {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.label;
        faqCategorySelect.append(option);
    });

    categoryColumn.append(categoryLabel, faqCategorySelect);

    const resetColumn = document.createElement('div');
    resetColumn.classList.add('col-12', 'col-md-3');

    faqResetButton = document.createElement('button');
    faqResetButton.type = 'button';
    faqResetButton.classList.add(
        'btn',
        'btn-outline-danger',
        'w-100'
    );
    faqResetButton.textContent = 'Reset';

    resetColumn.append(faqResetButton);

    faqResultCount = document.createElement('p');
    faqResultCount.classList.add('small', 'text-secondary', 'mb-2');

    faqNoResults = document.createElement('div');
    faqNoResults.classList.add(
        'alert',
        'alert-warning',
        'd-none'
    );
    faqNoResults.setAttribute('role', 'status');
    faqNoResults.textContent = 'No FAQ results found.';

    controls.append(searchColumn, categoryColumn, resetColumn);

    faqAccordion.parentNode.insertBefore(controls, faqAccordion);
    faqAccordion.parentNode.insertBefore(faqResultCount, faqAccordion);
    faqAccordion.parentNode.insertBefore(faqNoResults, faqAccordion);

    updateFaqDisplay(faqData);
}

function updateFaqDisplay(results) {
    faqData.forEach(function (faqItem) {
        const matchedItem = findFaqById(faqItem.id);
        const collapse = document.querySelector('#' + faqItem.id);

        if (matchedItem === undefined || collapse === null) {
            return;
        }

        const accordionItem = collapse.closest('.accordion-item');

        const existsInResults = results.some(function (result) {
            return result.id === faqItem.id;
        });

        if (existsInResults === true) {
            accordionItem.classList.remove('d-none');
        } else {
            accordionItem.classList.add('d-none');
        }
    });

    const count = getFaqCount(results);

    faqResultCount.textContent =
        'Results: ' +
        count +
        ' of ' +
        faqData.length;

    if (count === 0) {
        faqNoResults.classList.remove('d-none');
    } else {
        faqNoResults.classList.add('d-none');
    }
}

function applyFaqFilters() {
    const results = filterFaq(
        faqSearchInput.value,
        faqCategorySelect.value
    );

    updateFaqDisplay(results);
}

function resetFaqSearch() {
    faqSearchInput.value = '';
    faqCategorySelect.value = 'all';
    updateFaqDisplay(faqData);
    faqSearchInput.focus();
}

function initializeFaqPage() {
    if (faqAccordion === null) {
        return;
    }

    createFaqSearch();

    faqSearchInput.addEventListener('input', applyFaqFilters);
    faqCategorySelect.addEventListener('change', applyFaqFilters);
    faqResetButton.addEventListener('click', resetFaqSearch);
}

initializeFaqPage();
