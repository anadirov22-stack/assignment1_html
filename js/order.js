'use strict';
const products = [
    { id: 'chicken-standard', name: 'Chicken Doner — Standard', category: 'doner', price: 1895 },
    { id: 'chicken-large', name: 'Chicken Doner — Large', category: 'doner', price: 2195 },
    { id: 'beef-standard', name: 'Beef Doner — Standard', category: 'doner', price: 2195 },
    { id: 'beef-large', name: 'Beef Doner — Large', category: 'doner', price: 2495 },
    { id: 'assorted-standard', name: 'Assorted Doner — Standard', category: 'doner', price: 2095 },
    { id: 'assorted-large', name: 'Assorted Doner — Large', category: 'doner', price: 2395 }
];
const drinks = [
    { id: 'coca-cola-450', name: 'Coca-Cola 450 ml', category: 'drink', price: 795 },
    { id: 'coca-cola-500', name: 'Coca-Cola 500 ml', category: 'drink', price: 845 },
    { id: 'coca-cola-zero-450', name: 'Coca-Cola Zero Sugar 450 ml', category: 'drink', price: 795 },
    { id: 'coca-cola-zero-500', name: 'Coca-Cola Zero Sugar 500 ml', category: 'drink', price: 845 },
    { id: 'fanta-450', name: 'Fanta 450 ml', category: 'drink', price: 795 },
    { id: 'fanta-500', name: 'Fanta 500 ml', category: 'drink', price: 845 },
    { id: 'sprite-450', name: 'Sprite 450 ml', category: 'drink', price: 795 },
    { id: 'sprite-500', name: 'Sprite 500 ml', category: 'drink', price: 845 },
    { id: 'fuse-tea-450', name: 'Fuse Tea 450 ml', category: 'drink', price: 795 },
    { id: 'fuse-tea-500', name: 'Fuse Tea 500 ml', category: 'drink', price: 845 },
    { id: 'bonaqua-500', name: 'Bonaqua 500 ml', category: 'drink', price: 595 },
    { id: 'ayran-300', name: 'Ayran 300 ml', category: 'drink', price: 595 }
];
const extras = [
    { id: 'extra-chicken', name: 'Extra chicken 50 g', category: 'extra', price: 590 },
    { id: 'extra-beef', name: 'Extra beef 50 g', category: 'extra', price: 690 },
    { id: 'extra-fries', name: 'Fries', category: 'extra', price: 895 },
    { id: 'extra-sauce', name: 'Sauce', category: 'extra', price: 200 },
    { id: 'extra-peppers', name: 'Peppers', category: 'extra', price: 100 }
];
const cart = [];
const orderForm = document.querySelector('#order-form');
const donerSelect = document.querySelector('#doner-product');
const donerQuantity = document.querySelector('#doner-quantity');
const addDonerButton = document.querySelector('#add-doner');
const drinkSelect = document.querySelector('#drink-product');
const drinkQuantity = document.querySelector('#drink-quantity');
const addDrinkButton = document.querySelector('#add-drink');
const extraSelect = document.querySelector('#extra-product');
const extraQuantity = document.querySelector('#extra-quantity');
const addExtraButton = document.querySelector('#add-extra');
const cartEmpty = document.querySelector('#cart-empty');
const cartItems = document.querySelector('#cart-items');
const cartSummary = document.querySelector('#cart-summary');
const clearCartButton = document.querySelector('#clear-cart');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#order-date');
const timeInput = document.querySelector('#order-time');
const confirmInput = document.querySelector('#confirm');
const submitButton = document.querySelector('#submit-order');
const resetButton = document.querySelector('#reset-order');
const confirmationBox = document.querySelector('#order-confirmation');
const errorBox = document.querySelector('#order-error');
function findItemById(items, id) {
    return items.find(function (item) {
        return item.id === id;
    });
}
function calculateItemTotal(price, quantity) {
    return price * quantity;
}
function calculateCartTotal() {
    return cart.reduce(function (total, item) {
        return total + calculateItemTotal(item.price, item.quantity);
    }, 0);
}
function calculateTotalQuantity() {
    return cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);
}
function createDemoReference() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return 'DNA-' + randomNumber;
}
function getOrderType() {
    const selectedType =
        document.querySelector('input[name="type"]:checked');
    if (selectedType === null) {
        return '';
    }
    return selectedType.value;
}
function clearMessages() {
    confirmationBox.textContent = '';
    errorBox.textContent = '';
    confirmationBox.classList.add('state-hidden');
    errorBox.classList.add('state-hidden');
}
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove('state-hidden');
}
function showConfirmation(message) {
    confirmationBox.textContent = message;
    confirmationBox.classList.remove('state-hidden');
}
function clearFieldErrors() {
    const errors = document.querySelectorAll('.js-field-error');
    errors.forEach(function (error) {
        error.remove();
    });
    const invalidFields = orderForm.querySelectorAll('.is-invalid');
    invalidFields.forEach(function (field) {
        field.classList.remove('is-invalid');
    });
}
function addFieldError(field, message, container) {
    field.classList.add('is-invalid');
    const error = document.createElement('div');
    error.classList.add('js-field-error', 'text-danger', 'small', 'mt-1');
    error.textContent = message;
    if (container !== undefined && container !== null) {
        container.append(error);
    } else {
        field.insertAdjacentElement('afterend', error);
    }
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    return /^\+?[0-9]{10,15}$/.test(cleanPhone);
}
function isPastDate(dateValue) {
    if (dateValue === '') {
        return false;
    }
    const selectedDate = new Date(dateValue + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
}
function isFridayBreak(dateValue, timeValue) {
    if (dateValue === '' || timeValue === '') {
        return false;
    }
    const selectedDate = new Date(dateValue + 'T00:00:00');
    return (
        selectedDate.getDay() === 5
        && timeValue >= '12:30'
        && timeValue < '14:00'
    );
}
function validateQuantity(quantityInput) {
    const quantity = Number(quantityInput.value);
    return (
        Number.isNaN(quantity) !== true
        && quantity >= 1
        && quantity <= 10
    );
}
function addOrUpdateCartItem(item, quantity) {
    const existingItem = cart.find(function (cartItem) {
        return cartItem.id === item.id;
    });
    if (existingItem !== undefined) {
        existingItem.quantity = Math.min(
            existingItem.quantity + quantity,
            10
        );
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: quantity
        });
    }
}
function addItemFromSelector(items, selectElement, quantityElement, itemLabel) {
    clearMessages();
    clearFieldErrors();
    if (selectElement.value === '') {
        addFieldError(
            selectElement,
            'Please choose a ' + itemLabel + '.'
        );
        selectElement.focus();
        return;
    }
    if (validateQuantity(quantityElement) !== true) {
        addFieldError(
            quantityElement,
            'Quantity must be from 1 to 10.'
        );
        quantityElement.focus();
        return;
    }
    const item = findItemById(items, selectElement.value);
    if (item === undefined) {
        showError('The selected item could not be found.');
        return;
    }
    const quantity = Number(quantityElement.value);
    addOrUpdateCartItem(item, quantity);
    renderCart();
    showConfirmation(
        item.name +
        ' × ' +
        quantity +
        ' added to the cart.'
    );
    selectElement.value = '';
    quantityElement.value = 1;
}
function createCartItemElement(item, index) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(
        'border',
        'rounded',
        'p-3',
        'mb-3',
        'bg-body-tertiary'
    );
    const topRow = document.createElement('div');
    topRow.classList.add(
        'd-flex',
        'flex-wrap',
        'justify-content-between',
        'gap-2'
    );
    const name = document.createElement('h3');
    name.classList.add('h6', 'mb-1');
    name.textContent = item.name;
    const category = document.createElement('span');
    category.classList.add('badge', 'text-bg-secondary');
    category.textContent = item.category;
    topRow.append(name, category);
    const price = document.createElement('p');
    price.classList.add('mb-2');
    price.textContent =
        item.price +
        ' KZT × ' +
        item.quantity +
        ' = ' +
        calculateItemTotal(item.price, item.quantity) +
        ' KZT';
    const controls = document.createElement('div');
    controls.classList.add(
        'd-flex',
        'flex-wrap',
        'align-items-center',
        'gap-2'
    );
    const decreaseButton = document.createElement('button');
    decreaseButton.type = 'button';
    decreaseButton.classList.add('btn', 'btn-outline-dark', 'btn-sm');
    decreaseButton.textContent = '−';
    const quantityBadge = document.createElement('span');
    quantityBadge.classList.add('badge', 'text-bg-dark');
    quantityBadge.textContent = String(item.quantity);
    const increaseButton = document.createElement('button');
    increaseButton.type = 'button';
    increaseButton.classList.add('btn', 'btn-outline-dark', 'btn-sm');
    increaseButton.textContent = '+';
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
    removeButton.textContent = 'Remove';
    decreaseButton.addEventListener('click', function () {
        if (item.quantity > 1) {
            item.quantity -= 1;
            renderCart();
        }
    });
    increaseButton.addEventListener('click', function () {
        if (item.quantity < 10) {
            item.quantity += 1;
            renderCart();
        }
    });
    removeButton.addEventListener('click', function () {
        cart.splice(index, 1);
        renderCart();
        showConfirmation(item.name + ' was removed from the cart.');
    });
    controls.append(
        decreaseButton,
        quantityBadge,
        increaseButton,
        removeButton
    );
    wrapper.append(topRow, price, controls);
    return wrapper;
}
function renderCart() {
    cartItems.replaceChildren();
    if (cart.length === 0) {
        cartEmpty.classList.remove('d-none');
        cartSummary.textContent = '';
        clearCartButton.disabled = true;
        return;
    }
    cartEmpty.classList.add('d-none');
    clearCartButton.disabled = false;
    cart.forEach(function (item, index) {
        cartItems.append(
            createCartItemElement(item, index)
        );
    });
    cartSummary.textContent =
        'Total items: ' +
        calculateTotalQuantity() +
        ' | Final total: ' +
        calculateCartTotal() +
        ' KZT';
}
function clearCart() {
    cart.length = 0;
    renderCart();
    clearMessages();
    showConfirmation('Cart cleared.');
}
function validateCheckout() {
    clearFieldErrors();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const orderType = getOrderType();
    let valid = true;
    let firstInvalidField = null;
    if (cart.length === 0) {
        showError('Your cart is empty. Add at least one item before checkout.');
        valid = false;
    }
    if (name === '') {
        addFieldError(nameInput, 'Please enter your name.');
        firstInvalidField = nameInput;
        valid = false;
    }
    if (email === '' || isValidEmail(email) !== true) {
        addFieldError(emailInput, 'Please enter a valid email address.');
        if (firstInvalidField === null) {
            firstInvalidField = emailInput;
        }
        valid = false;
    }
    if (phone === '' || isValidPhone(phone) !== true) {
        addFieldError(phoneInput, 'Please enter a valid phone number.');
        if (firstInvalidField === null) {
            firstInvalidField = phoneInput;
        }
        valid = false;
    }
    if (dateInput.value === '') {
        addFieldError(dateInput, 'Please choose an order date.');
        if (firstInvalidField === null) {
            firstInvalidField = dateInput;
        }
        valid = false;
    } else if (isPastDate(dateInput.value) === true) {
        addFieldError(dateInput, 'The order date cannot be in the past.');
        if (firstInvalidField === null) {
            firstInvalidField = dateInput;
        }
        valid = false;
    }
    if (timeInput.value === '') {
        addFieldError(timeInput, 'Please choose a preferred time.');
        if (firstInvalidField === null) {
            firstInvalidField = timeInput;
        }
        valid = false;
    } else if (
        isFridayBreak(dateInput.value, timeInput.value) === true
    ) {
        addFieldError(
            timeInput,
            'Friday break is from 12:30 to 14:00. Please choose another time.'
        );
        if (firstInvalidField === null) {
            firstInvalidField = timeInput;
        }
        valid = false;
    }
    if (orderType === '') {
        const pickupInput = document.querySelector('#pickup');
        const orderTypeContainer = pickupInput.closest('.col-12');
        addFieldError(
            pickupInput,
            'Please choose Pickup or Delivery.',
            orderTypeContainer
        );
        if (firstInvalidField === null) {
            firstInvalidField = pickupInput;
        }
        valid = false;
    }
    if (confirmInput.checked !== true) {
        const confirmContainer = confirmInput.closest('.col-12');
        addFieldError(
            confirmInput,
            'Please confirm your order information.',
            confirmContainer
        );
        if (firstInvalidField === null) {
            firstInvalidField = confirmInput;
        }
        valid = false;
    }
    return {
        valid: valid,
        field: firstInvalidField
    };
}
function createOrderSummary() {
    return cart.map(function (item) {
        return item.name + ' × ' + item.quantity;
    }).join(', ');
}
function handleOrderSubmit(event) {
    event.preventDefault();
    clearMessages();
    const validation = validateCheckout();
    if (validation.valid !== true) {
        if (errorBox.textContent === '') {
            showError('Please correct the highlighted fields before checkout.');
        }
        if (validation.field !== null) {
            validation.field.focus();
        }
        return;
    }
    const reference = createDemoReference();
    const message =
        'Demo confirmation ' +
        reference +
        ' for ' +
        nameInput.value.trim() +
        '. Order: ' +
        createOrderSummary() +
        '. Total items: ' +
        calculateTotalQuantity() +
        '. Final total: ' +
        calculateCartTotal() +
        ' KZT. Order type: ' +
        getOrderType() +
        '. Date: ' +
        dateInput.value +
        ', time: ' +
        timeInput.value +
        '. No data was sent to a server and no real restaurant order was created.';
    showConfirmation(message);
}
function handleReset(event) {
    event.preventDefault();
    orderForm.reset();
    cart.length = 0;
    clearMessages();
    clearFieldErrors();
    renderCart();
    showConfirmation('Order form and cart were reset.');
}
function clearFieldErrorOnInteraction(event) {
    const field = event.target;
    if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
    }
    const nextElement = field.nextElementSibling;
    if (
        nextElement !== null
        && nextElement.classList.contains('js-field-error')
    ) {
        nextElement.remove();
    }
}
function setMinimumOrderDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.min = year + '-' + month + '-' + day;
}
function initializeOrderPage() {
    if (orderForm === null) {
        return;
    }
    setMinimumOrderDate();
    renderCart();
    addDonerButton.addEventListener('click', function () {
        addItemFromSelector(
            products,
            donerSelect,
            donerQuantity,
            'doner'
        );
    });
    addDrinkButton.addEventListener('click', function () {
        addItemFromSelector(
            drinks,
            drinkSelect,
            drinkQuantity,
            'drink'
        );
    });
    addExtraButton.addEventListener('click', function () {
        addItemFromSelector(
            extras,
            extraSelect,
            extraQuantity,
            'extra'
        );
    });
    clearCartButton.addEventListener('click', clearCart);
    orderForm.addEventListener('submit', handleOrderSubmit);
    resetButton.addEventListener('click', handleReset);
    const fields = orderForm.querySelectorAll(
        'input, select, textarea'
    );
    fields.forEach(function (field) {
        field.addEventListener(
            'input',
            clearFieldErrorOnInteraction
        );
        field.addEventListener(
            'change',
            clearFieldErrorOnInteraction
        );
    });
}
initializeOrderPage();