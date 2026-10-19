# AI Usage Log

**Project:** Doner na Abaya Website
**Course:** Introduction to Web Technologies
**Assignments:** Assignment 4 and Assignment 5
**Team Members:** Ali Nadirov, Alikhan Kuttybayev, Nurasyl Mazhit

---

## Ali Nadirov — AI Usage Log

In this project, I used ChatGPT mainly to understand the JavaScript requirements, review my implementation, troubleshoot problems, and learn how to connect JavaScript functionality to existing HTML elements.

My main responsibility was working on the `about.html` and `gallery.html` pages and their JavaScript files, `about.js` and `gallery.js`. I also worked on the shared `main.js` file.

I used AI as a learning and debugging tool rather than treating it as a replacement for understanding the code. I reviewed the explanations, tested the relevant functionality, and made decisions about which changes were appropriate for my pages.

### Prompt 1

**AI Tool:** ChatGPT

**Prompt:** *"How can I organize JavaScript code for a multi-page website so that shared functionality and page-specific functionality do not interfere with each other?"*

**Why I asked:** Our project contains seven HTML pages. I wanted to understand how to organize the JavaScript files so that common functionality could be reused while each page could maintain its own behavior.

**How I used the answer:** ChatGPT explained the difference between shared scripts and page-specific scripts. I used this understanding when organizing `main.js`, `about.js`, and `gallery.js`. I kept shared navigation behavior in `main.js` and placed the catalogue and review form functionality in their respective page scripts.

### Prompt 2

**AI Tool:** ChatGPT

**Prompt:** *"How can I use an array of objects to represent restaurant products and filter them by category, availability, and search text?"*

**Why I asked:** The About page contains several types of products, including doners, drinks, and additions. I wanted to represent this information consistently and understand how JavaScript array methods could be used to filter the data.

**How I used the answer:** ChatGPT explained how product objects can contain properties such as ID, name, category, size, and availability. I used this approach in the `products` array and implemented reusable functions for filtering products, searching by text, finding products by ID, and counting products by category.

### Prompt 3

**AI Tool:** ChatGPT

**Prompt:** *"How can I generate product cards dynamically with JavaScript without rewriting the existing HTML structure?"*

**Why I asked:** The assignment restricts changes to the existing HTML and CSS. I needed to understand how to display repeated product content dynamically while respecting those restrictions.

**How I used the answer:** ChatGPT explained how to create elements using DOM methods and insert product information with `textContent`. I used this approach in the About page's catalogue rendering function. I also added dynamic controls and result messages through JavaScript instead of manually duplicating product cards in the HTML.

### Prompt 4

**AI Tool:** ChatGPT

**Prompt:** *"How should a JavaScript form validate several fields and display errors next to the fields that need correction?"*

**Why I asked:** The Gallery page contains a review form with multiple fields. I wanted to understand how to validate the input, display useful messages, and guide the visitor toward correcting the first invalid field.

**How I used the answer:** ChatGPT explained how to validate each field separately, collect validation errors, clear outdated messages, and focus the first invalid control. I used these ideas when implementing validation for the visitor's name, email, phone number, rating, visit date, and review text.

### Prompt 5

**AI Tool:** ChatGPT

**Prompt:** *"How can I test JavaScript interactions systematically, including empty search results, invalid form submissions, valid submissions, and reset behavior?"*

**Why I asked:** A feature may appear to work under normal conditions but fail when the input is empty or invalid. I wanted a systematic way to test both normal and edge cases before submission.

**How I used the answer:** ChatGPT helped me identify different test scenarios for the catalogue and review form. I tested a search with no matching products, restored the catalogue using the reset control, checked the empty form state, and tested a valid review submission. I used the same approach to identify additional checks that should be repeated after the final team merge.

---

## Alikhan Kuttybayev — AI Usage Log

In this project, I used AI tools such as Gemini and ChatGPT to understand JavaScript concepts, work with product data, improve responsive behavior, and investigate possible implementation problems.

My main responsibility was working on the `menu.html` and `reviews.html` pages. I used AI to clarify technical concepts and explore possible solutions while remaining responsible for understanding and checking the code used in my part of the project.

### Prompt 1

**AI Tool:** Gemini

**Prompt:** *"How can JavaScript arrays of objects be used to represent menu products and display them consistently on a restaurant website?"*

**Why I asked:** The Menu page contains multiple products with different names and categories. I wanted to understand how to keep the product information organized and avoid repeating similar code for every item.

**How I used the answer:** Gemini explained how each product can be represented as an object and how an array can store the complete collection. I used this concept when considering how menu data should be organized and how repeated product content could be rendered consistently.

### Prompt 2

**AI Tool:** ChatGPT

**Prompt:** *"How can search and category filters work together when displaying a list of products in JavaScript?"*

**Why I asked:** Visitors should be able to find menu items without manually looking through the entire list. I wanted to understand how multiple conditions could be combined to determine which products should be displayed.

**How I used the answer:** ChatGPT explained how filtering conditions can be combined and how the displayed results can be updated when a search term or category changes. This helped me understand the logic required for interactive product lists and how to test combinations of filters.

### Prompt 3

**AI Tool:** Gemini

**Prompt:** *"How can JavaScript form validation improve a review form while keeping error messages understandable for users?"*

**Why I asked:** The Reviews page needs to provide useful feedback when visitors leave required fields empty or enter invalid information.

**How I used the answer:** Gemini explained the importance of checking individual fields, displaying clear messages, and allowing visitors to correct their input. I used these concepts when reviewing the validation requirements and considering how the review form should respond to invalid and valid submissions.

### Prompt 4

**AI Tool:** ChatGPT

**Prompt:** *"What should I check when debugging JavaScript events and dynamically generated content on a multi-page website?"*

**Why I asked:** JavaScript functionality may depend on whether an element exists on the current page and whether an event listener is attached to the correct element. I wanted to understand how to identify common problems before submitting the project.

**How I used the answer:** ChatGPT explained how to check element selectors, event listeners, script loading, browser console messages, and dynamically created elements. I used this information as a debugging guide and to identify the types of tests that should be performed on the Menu and Reviews pages.

---

## Nurasyl Mazhit — AI Usage Log

In this project, I used AI tools such as Gemini and ChatGPT to understand JavaScript form handling, validation, responsive design, and interactive components.

My main responsibility was working on the `faq.html` and `order.html` pages. AI was used to clarify concepts and investigate possible approaches to implementing the required functionality. I remained responsible for reviewing and understanding the implementation used in my part of the project.

### Prompt 1

**AI Tool:** Gemini

**Prompt:** *"How can JavaScript work with an existing Bootstrap accordion without replacing the HTML structure?"*

**Why I asked:** The FAQ page uses an organized question-and-answer layout. I wanted to understand how JavaScript could support interactive behavior while preserving the existing page structure and Bootstrap styling.

**How I used the answer:** Gemini explained how JavaScript can work with existing elements and how interface states should be handled carefully. I used this knowledge to understand how interactive FAQ controls should behave and what should be checked during testing.

### Prompt 2

**AI Tool:** Gemini

**Prompt:** *"How should a restaurant order form validate required fields and display errors before accepting a submission?"*

**Why I asked:** The Order page collects information from visitors. I wanted to understand how to prevent incomplete or invalid input from being treated as a valid order.

**How I used the answer:** Gemini explained how to validate required fields, check input values, display error messages, and provide feedback after validation. I used these concepts when considering the order form's validation rules and test scenarios.

### Prompt 3

**AI Tool:** ChatGPT

**Prompt:** *"How can a simple JavaScript shopping cart update quantities, remove items, and calculate totals correctly?"*

**Why I asked:** A restaurant ordering interface may need to display selected products and calculate the total amount. I wanted to understand how product quantities and prices should be represented and updated.

**How I used the answer:** ChatGPT explained how cart items can be represented using objects and how calculations should be repeated whenever the cart changes. This helped me understand the logic required for a demonstration cart and the importance of testing quantity changes, item removal, and the empty-cart state. Any cart functionality included in the final submission must be verified against the actual implementation.

### Prompt 4

**AI Tool:** Gemini

**Prompt:** *"How can Bootstrap form classes and responsive grid utilities help an order form work on desktop and mobile screens?"*

**Why I asked:** The Order page should remain readable and usable on smaller screens without requiring a separate layout for every device.

**How I used the answer:** Gemini explained how containers, rows, columns, and form utilities can organize form fields at different breakpoints. I used this understanding when reviewing the page layout and considering how to test its responsiveness.

### Prompt 5

**AI Tool:** ChatGPT

**Prompt:** *"How can I test an order form using empty, invalid, and valid inputs, and how should a front-end demonstration explain its limitations?"*

**Why I asked:** A form may accept valid-looking information without actually sending it to a server. I wanted to understand how to test the form and how to avoid giving visitors the impression that a real restaurant order had been placed.

**How I used the answer:** ChatGPT explained how to test different submission states and how to distinguish client-side validation from actual order processing. I used these ideas to identify the checks required for the Order page and the need for a clear demonstration message if no backend service is connected.

---

## Team Statement

The team used AI tools as supplementary learning and debugging resources during development. AI assistance was used to clarify requirements, explain programming concepts, identify possible issues, and support testing.

The final project must reflect the team's actual implementation and understanding. Each member is responsible for reviewing their own contribution, verifying the accuracy of this log, and being able to explain the code they submit.

The prompts and descriptions in this document should be checked by each team member before submission to ensure that they accurately represent the AI tools used and the work performed.