'use strict';

/*
    Alikhan Kuttybayev - Menu page JavaScript (menu.html)
*/

const menuCatalogue = [
    { id: 'chicken', name: 'Chicken Doner', category: 'doner', price: 1895, size: '390 g · Standard / Large (2195 ₸)', desc: 'Lavash, chicken, french fries, pickled cucumbers, signature sauce.', img: 'images/1.jpeg' },
    { id: 'beef', name: 'Beef Doner', category: 'doner', price: 2195, size: '390 g · Standard / Large (2495 ₸)', desc: 'Lavash, beef, french fries, pickled cucumbers, signature sauce.', img: 'images/2.jpeg' },
    { id: 'assorted', name: 'Assorted Doner', category: 'doner', price: 2095, size: '390 g · Standard / Large (2395 ₸)', desc: 'Lavash, beef and chicken, french fries, pickled cucumbers, sauce.', img: 'images/3.jpeg' },
    { id: 'cola', name: 'Coca-Cola', category: 'drink', price: 795, size: '500 ml (845 ₸)', desc: 'Chilled carbonated soft drink.', img: 'images/4.jpeg' },
    { id: 'ayran', name: 'Traditional Ayran', category: 'drink', price: 595, size: '300 ml', desc: 'Cold traditional sour-milk drink.', img: 'images/5.jpeg' },
    { id: 'bonaqua', name: 'Water', category: 'drink', price: 595, size: '500 ml', desc: 'Refreshing still drinking water.', img: 'images/6.jpeg' },
    { id: 'fries', name: 'Crispy Fries', category: 'extra', price: 895, size: '1 portion', desc: 'Hot golden french fries.', img: 'images/7.jpeg' },
    { id: 'extra-meat', name: 'Extra Chicken / Beef (50 g)', category: 'extra', price: 590, size: '50 g (Beef: 690 ₸)', desc: 'Additional portion of grilled halal meat.', img: 'images/8.jpeg' },
    { id: 'sauce', name: 'Signature Sauce / Peppers', category: 'extra', price: 200, size: '1 cup (Peppers: 100 ₸)', desc: 'Signature red/white sauce or spicy peppers.', img: 'images/9.jpeg' }
];

// Function 1: Calculate combo price with Ayran (595 KZT) and size difference
function calculateDonerDetails(standardPrice, largePrice) {
    return {
        diff: largePrice - standardPrice,
        combo: standardPrice + 595
    };
}

// Function 2: Filter and sort menu items
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

// Function 4: Create a single card element with photo and price badge
function createMenuCard(item, selectedId, onSelect) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');

    const card = document.createElement('article');
    card.classList.add('card', 'h-100', 'border-0', 'shadow-sm', 'rounded-4', 'overflow-hidden');
    if (item.id === selectedId) {
        card.classList.add('selected');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.classList.add('card-img-top', 'img-fluid', 'rounded-4');

    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column', 'px-2', 'pb-2');

    const title = document.createElement('h4');
    title.classList.add('h5', 'fw-bold', 'mb-1');
    title.textContent = item.name;

    const info = document.createElement('p');
    info.classList.add('small', 'text-secondary', 'mb-1');
    info.textContent = item.size;

    const desc = document.createElement('p');
    desc.classList.add('small', 'text-muted', 'mb-3');
    desc.textContent = item.desc;

    const priceBadge = document.createElement('span');
    priceBadge.classList.add('badge', 'rounded-pill', 'text-bg-danger', 'fs-6', 'px-3', 'py-2', 'mt-auto', 'align-self-start');
    priceBadge.textContent = 'from ' + item.price + ' ₸';

    card.addEventListener('click', function () {
        onSelect(item.id);
    });

    body.append(title, info, desc, priceBadge);
    card.append(img, body);
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
                ' ₸ (+' + stats.diff + ' ₸)' + ' ₸.';
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
    wrapper.classList.add('mt-3');

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
    topBar.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

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
    grid.classList.add('row', 'g-4');

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