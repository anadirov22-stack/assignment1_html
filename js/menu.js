'use strict';

/*
    Alikhan Kuttybayev - Menu page JavaScript (menu.html)
*/

const menuCatalogue = [
    { id: 'chicken', name: 'Chicken Doner', category: 'doner', price: 1895, size: 'Standard / Large (2195 ₸)' },
    { id: 'beef', name: 'Beef Doner', category: 'doner', price: 2195, size: 'Standard / Large (2495 ₸)' },
    { id: 'assorted', name: 'Assorted Doner', category: 'doner', price: 2095, size: 'Standard / Large (2395 ₸)' },
    { id: 'cola', name: 'Coca-Cola / Fanta / Sprite', category: 'drink', price: 795, size: '450 ml / 500 ml (845 ₸)' },
    { id: 'ayran', name: 'Traditional Ayran', category: 'drink', price: 595, size: '300 ml' },
    { id: 'bonaqua', name: 'Bonaqua Water', category: 'drink', price: 595, size: '500 ml' },
    { id: 'fries', name: 'Crispy Fries', category: 'extra', price: 895, size: '1 portion' },
    { id: 'extra-meat', name: 'Extra Chicken / Beef (50 g)', category: 'extra', price: 590, size: '50 g (Beef: 690 ₸)' },
    { id: 'sauce', name: 'Signature Sauce / Peppers', category: 'extra', price: 200, size: '1 cup (Peppers: 100 ₸)' }
];

// Function 1: Calculate combo price with Ayran (595 KZT) and size difference
function calculateDonerDetails(standardPrice, largePrice) {
    const difference = largePrice - standardPrice;
    const comboWithAyran = standardPrice + 595;
    return {
        diff: difference,
        combo: comboWithAyran
    };
}

// Function 2: Filter and sort menu items (calls Array.filter and Array.sort)
function filterMenuItems(items, query, category, sortOrder) {
    const cleanQuery = query.trim().toLowerCase();

    const filtered = items.filter(function (item) {
        const matchesName = cleanQuery === '' || item.name.toLowerCase().includes(cleanQuery);
        const matchesCategory = category === 'all' || item.category === category;
        return matchesName && matchesCategory;
    });

    if (sortOrder === 'asc') {
        filtered.sort(function (a, b) { return a.price - b.price; });
    } else if (sortOrder === 'desc') {
        filtered.sort(function (a, b) { return b.price - a.price; });
    }

    return filtered;
}

// Function 3: Pick a random item using Math.random()
function getRandomMenuItem(items) {
    if (items.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

// Function 4: Create a single card element (reusable DOM builder)
function createMenuCard(item, selectedId, onSelect) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');

    const card = document.createElement('article');
    card.classList.add('card', 'h-100', 'shadow-sm');
    if (item.id === selectedId) {
        card.classList.add('selected');
    }

    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column');

    const title = document.createElement('h4');
    title.classList.add('h6', 'fw-bold', 'mb-1');
    title.textContent = item.name;

    const info = document.createElement('p');
    info.classList.add('small', 'text-muted', 'mb-2');
    info.textContent = item.size + ' — from ' + item.price + ' ₸';

    const btn = document.createElement('a');
    btn.href = 'order.html';
    btn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'mt-auto');
    btn.textContent = 'Order (' + item.price + ' ₸)';

    card.addEventListener('click', function () {
        onSelect(item.id);
    });

    body.append(title, info, btn);
    card.appendChild(body);
    col.appendChild(card);
    return col;
}

// Feature 1: Interactive Price Table rows
function initPriceTable() {
    const rows = document.querySelectorAll('#price-table .price-row');
    const infoBox = document.querySelector('#price-row-info');
    if (rows.length === 0 || infoBox === null) {
        return;
    }

    rows.forEach(function (row) {
        row.addEventListener('click', function () {
            rows.forEach(function (r) { r.classList.remove('selected'); });
            row.classList.add('selected');

            const name = row.getAttribute('data-doner');
            const std = Number(row.getAttribute('data-price-standard'));
            const lrg = Number(row.getAttribute('data-price-large'));
            const stats = calculateDonerDetails(std, lrg);

            infoBox.textContent =
                name + ': Standard is ' + std + ' ₸, Large is ' + lrg +
                ' ₸ (+' + stats.diff + ' ₸). Standard combo with Ayran: ' + stats.combo + ' ₸.';
            infoBox.classList.add('success');
        });
    });
}

// Feature 2: Menu Filter & Search inside #drinks section
function initMenuFilter() {
    const drinksSection = document.querySelector('#drinks');
    if (drinksSection === null) {
        return;
    }

    let selectedCardId = '';

    const wrapper = document.createElement('div');
    wrapper.classList.add('mt-4', 'pt-3', 'border-top');

    const controls = document.createElement('div');
    controls.classList.add('row', 'g-2', 'mb-3');

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.classList.add('form-control');
    searchInput.placeholder = 'Search menu (e.g. chicken, ayran, fries)...';
    const col1 = document.createElement('div');
    col1.classList.add('col-12', 'col-md-4');
    col1.appendChild(searchInput);

    const categorySelect = document.createElement('select');
    categorySelect.classList.add('form-select');
    [
        { val: 'all', text: 'All Categories' },
        { val: 'doner', text: 'Doners' },
        { val: 'drink', text: 'Drinks' },
        { val: 'extra', text: 'Extras' }
    ].forEach(function (opt) {
        const o = document.createElement('option');
        o.value = opt.val;
        o.textContent = opt.text;
        categorySelect.appendChild(o);
    });
    const col2 = document.createElement('div');
    col2.classList.add('col-6', 'col-md-3');
    col2.appendChild(categorySelect);
    

    const sortSelect = document.createElement('select');
    sortSelect.classList.add('form-select');
    [
        { val: 'default', text: 'Default Sort' },
        { val: 'asc', text: 'Price: Low to High' },
        { val: 'desc', text: 'Price: High to Low' }
    ].forEach(function (opt) {
        const o = document.createElement('option');
        o.value = opt.val;
        o.textContent = opt.text;
        sortSelect.appendChild(o);
    });
    const col3 = document.createElement('div');
    col3.classList.add('col-6', 'col-md-3');
    col3.appendChild(sortSelect);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.classList.add('btn', 'btn-outline-dark', 'w-100');
    resetBtn.textContent = 'Reset';
    const col4 = document.createElement('div');
    col4.classList.add('col-12', 'col-md-2');
    col4.appendChild(resetBtn);

    controls.append(col1, col2, col3, col4);

    const topBar = document.createElement('div');
    topBar.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

    const countInfo = document.createElement('span');
    countInfo.classList.add('small', 'fw-bold', 'text-muted');

    const randomBtn = document.createElement('button');
    randomBtn.type = 'button';
    randomBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    randomBtn.textContent = 'Random Pick';

    topBar.append(countInfo, randomBtn);

    const emptyBox = document.createElement('p');
    emptyBox.classList.add('alert', 'alert-warning', 'hidden', 'mb-2');
    emptyBox.textContent = 'No items found. Try another search word.';

    const grid = document.createElement('div');
    grid.classList.add('row', 'g-3');

    wrapper.append(controls, topBar, emptyBox, grid);
    drinksSection.appendChild(wrapper);

    function render() {
        const results = filterMenuItems(
            menuCatalogue,
            searchInput.value,
            categorySelect.value,
            sortSelect.value
        );

        grid.replaceChildren();
        countInfo.textContent = 'Showing ' + results.length + ' of ' + menuCatalogue.length + ' items';

        if (results.length === 0) {
            emptyBox.classList.remove('hidden');
            return;
        }
        emptyBox.classList.add('hidden');

        for (let i = 0; i < results.length; i++) {
            grid.appendChild(createMenuCard(results[i], selectedCardId, function (id) {
                selectedCardId = id;
                render();
            }));
        }
    }

    searchInput.addEventListener('input', render);
    categorySelect.addEventListener('change', render);
    sortSelect.addEventListener('change', render);

    randomBtn.addEventListener('click', function () {
        const picked = getRandomMenuItem(menuCatalogue);
        if (picked !== null) {
            selectedCardId = picked.id;
            searchInput.value = '';
            categorySelect.value = 'all';
            render();
        }
    });

    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        categorySelect.value = 'all';
        sortSelect.value = 'default';
        selectedCardId = '';
        render();
    });

    render();
}

initPriceTable();
initMenuFilter();