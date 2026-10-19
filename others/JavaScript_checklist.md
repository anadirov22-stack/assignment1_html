# JavaScript Implementation Checklist

**Project:** Doner na Abaya Website
**Course:** Introduction to Web Technologies
**Assignments:** Assignment 4 and Assignment 5
**Team Members:** Ali Nadirov, Alikhan Kuttybayev, Nurasyl Mazhit

**Status: Completed**

## 1. JavaScript Fundamentals

* [x] JavaScript code uses strict mode (`'use strict';`).
* [x] Variables are declared using `const` and `let`.
* [x] Arrays store collections of related data.
* [x] Objects represent individual data records with meaningful properties.
* [x] Loops process collections of data.
* [x] Conditional statements control program logic.
* [x] Logical operators combine conditions.
* [x] Strict equality operators (`===` and `!==`) are used.
* [x] Reusable functions accept parameters and return values.
* [x] Functions call other functions where appropriate.
* [x] Array methods such as `filter()`, `find()`, and `forEach()` process data.
* [x] Arithmetic operations are used where required.
* [x] Random selection is used for the product recommendation feature.

## 2. Shared JavaScript — `main.js`

* [x] Shared JavaScript functionality is implemented.
* [x] The current page is identified using `window.location.pathname`.
* [x] Navigation links are selected using `querySelectorAll()`.
* [x] The current page is identified by comparing link destinations.
* [x] The `aria-current="page"` attribute is applied to the active navigation link.
* [x] The attribute is removed from links that are no longer active.
* [x] Shared functionality is initialized through a reusable function.

## 3. About Page — `about.js`

* [x] Product information is stored in an array of objects.
* [x] Product objects contain IDs, names, categories, sizes, and availability.
* [x] `getAvailableProducts()` filters available products.
* [x] `findProductById()` finds a product using its ID.
* [x] `countProductsByCategory()` counts products in a selected category.
* [x] `getProductStatistics()` returns product statistics.
* [x] `filterProducts()` filters products by category and availability.
* [x] `searchProducts()` searches products by text.
* [x] `getRandomDoner()` selects a random available doner.
* [x] Functions handle cases where no suitable product is found.
* [x] Product statistics are calculated using JavaScript.
* [x] Product cards are generated dynamically.
* [x] DOM elements are created using `document.createElement()`.
* [x] Product information is inserted using `textContent`.
* [x] Search functionality responds to the `input` event.
* [x] Category filtering responds to the `change` event.
* [x] Availability filtering responds to the `change` event.
* [x] The reset button responds to the `click` event.
* [x] Product selection displays a message.
* [x] Random recommendation functionality is implemented.
* [x] The number of matching products is updated.
* [x] An empty-result message is displayed when no products match.
* [x] The reset function restores the catalogue's default state.
* [x] CSS classes are changed using `classList`.
* [x] Event listeners control the catalogue interactions.

## 4. Gallery Page — `gallery.js`

* [x] JavaScript selects the review form and its input fields.
* [x] Required form elements are checked before initialization.
* [x] An array stores predefined sample reviews.
* [x] `renderInitialReviews()` displays the predefined reviews.
* [x] `addReviewCard()` creates and displays an individual review card.
* [x] Review cards display the visitor's name, rating, food choice, review text, and visit date.
* [x] `validateName()` validates the visitor's name.
* [x] `validateEmail()` validates the email address.
* [x] `validatePhone()` validates the phone number.
* [x] `validateRating()` checks the rating.
* [x] `validateReview()` checks the review text length.
* [x] A cross-field validation rule requires longer text for low ratings.
* [x] `validateVisitDate()` validates the visit date.
* [x] Future visit dates are rejected.
* [x] `showFieldError()` displays field-specific error messages.
* [x] `clearFieldErrors()` removes existing validation messages.
* [x] `clearFieldError()` clears an individual field's error.
* [x] The character counter updates as the visitor types.
* [x] Form submission is handled using the `submit` event.
* [x] The default form submission is prevented.
* [x] All required fields are validated.
* [x] Invalid fields receive appropriate error messages.
* [x] Focus moves to the first invalid field.
* [x] Successful validation displays a confirmation message.
* [x] A review card is created when publication consent is given.
* [x] The form explains that submitted information is not sent to a server.
* [x] The reset event is handled.
* [x] Review text is inserted using safe DOM methods and `textContent`.

## 5. Menu Page — `menu.js`

* [x] Product data is organized for JavaScript processing.
* [x] Product information is processed using reusable functions.
* [x] Product display is handled through JavaScript where required.
* [x] Product categories are handled appropriately.
* [x] Search and filtering logic is addressed.
* [x] Matching product counts are handled.
* [x] Empty-result states are handled.
* [x] Reset behavior is implemented where required.
* [x] Product selection is handled where required.
* [x] Menu interactions are coordinated with the ordering functionality.

## 6. Reviews Page — `reviews.js`

* [x] Review data is organized for processing.
* [x] Review entries are displayed consistently.
* [x] Reusable functions handle repeated review content.
* [x] Review input is validated where required.
* [x] Invalid input produces useful feedback.
* [x] Successful submission produces appropriate feedback.
* [x] Review content is inserted safely.
* [x] Review-related event listeners are implemented where required.
* [x] Review functionality is coordinated with the Gallery page.

## 7. Order Page — `order.js`

* [x] Order form input is processed using JavaScript.
* [x] Required fields are validated.
* [x] Invalid values produce appropriate feedback.
* [x] Valid input produces a confirmation message.
* [x] Product selections are handled where required.
* [x] Cart data is managed where a cart is implemented.
* [x] Quantity changes are handled where applicable.
* [x] Item removal and cart clearing are handled where applicable.
* [x] Subtotals and totals are recalculated where applicable.
* [x] Empty-cart behavior is handled where applicable.
* [x] The interface distinguishes a demonstration order from a real order.

## 8. FAQ Page — `faq.js`

* [x] JavaScript handles FAQ interactions where required.
* [x] Interactive questions respond to user actions.
* [x] Event listeners are used for supported interactions.
* [x] Interface states are updated where applicable.
* [x] FAQ functionality is handled without unnecessary code duplication.

## 9. JavaScript Events and Error Handling

* [x] `submit` events handle form submission.
* [x] `click` events handle button interactions.
* [x] `input` events update search results and character counters.
* [x] `change` events handle selection controls.
* [x] Keyboard events are handled where required.
* [x] Event listeners are used instead of inline event handlers.
* [x] Missing required elements are handled where necessary.
* [x] Empty arrays and missing search results are handled.
* [x] Invalid form values are handled.
* [x] Dynamic interface messages are updated appropriately.

## 10. JavaScript Testing

* [x] Shared navigation functionality has been implemented.
* [x] Product filtering and searching have been implemented.
* [x] Empty search results have been handled.
* [x] Catalogue reset behavior has been implemented.
* [x] Random product recommendation has been implemented.
* [x] Empty review form submission has been handled.
* [x] Valid review submission has been handled.
* [x] Review validation messages have been implemented.
* [x] Character counter functionality has been implemented.
* [x] Dynamic product and review rendering has been implemented.
* [x] User input is handled safely.
* [x] JavaScript functionality is organized into reusable functions.

---

## Final Status

**Shared JavaScript:** Completed
**Home Page JavaScript:** Completed
**Menu Page JavaScript:** Completed
**Gallery Page JavaScript:** Completed
**About Page JavaScript:** Completed
**Reviews Page JavaScript:** Completed
**Order Page JavaScript:** Completed
**FAQ Page JavaScript:** Completed

**Overall JavaScript Checklist: Completed**