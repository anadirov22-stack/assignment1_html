# Doner na Abaya — Restaurant Website

## Project Overview

This project is a responsive restaurant website for **Doner na Abaya**, located in Astana, Kazakhstan.

The website was developed as a complete multi-page restaurant website using HTML5, CSS3, Bootstrap 5.3.8, and a JavaScript-ready HTML structure.

The goal of the project is to create a coherent real-world website where visitors can view the restaurant information, menu, reviews, gallery, FAQ, and place an order.

---

## Restaurant Information

| Field         | Details                          |
| ------------- | -------------------------------- |
| Restaurant    | Doner na Abaya                   |
| Address       | 51 Mangilik El Avenue, Astana, Kazakhstan |
| Website       | doner-na-abaya.kz                |
| Price         | Doners from 1795 ₸               |
| Opening hours | 24/7                             |
| Friday break  | 12:30–14:00                      |
| Phone         | +7 708 804 39 37                 |
| Instagram     | @doner_na_abaya_astanaa          |

---

## Website Pages

| Page     | File            | Responsible Team Member |
| -------- | --------------- | ----------------------- |
| Home     | `index.html`    | Team                    |
| Menu     | `menu.html`     | Alikhan Kuttybayev      |
| Gallery  | `gallery.html`  | Ali Nadirov             |
| About    | `about.html`    | Ali Nadirov             |
| Reviews  | `reviews.html`  | Alikhan Kuttybayev      |
| Order    | `order.html`    | Nurasyl Mazhit          |
| FAQ      | `faq.html`      | Nurasyl Mazhit          |
| Colophon | `colophon.html` | Team                    |

---

## User Journeys

### Journey 1 — Find Restaurant Information

1. Visitor opens the Home page.
2. Visitor uses the navigation menu.
3. Visitor opens the About page.
4. Visitor can view the restaurant information, address, opening hours, phone number, and branch information.
5. Visitor can continue to other pages using the common navigation.

**Result:** The visitor can find the important restaurant information without assistance.

### Journey 2 — Browse the Menu

1. Visitor opens the Home page.
2. Visitor selects **Menu** from the navigation.
3. Visitor views the available food and drinks.
4. Visitor can review prices and available options.
5. Visitor can continue to the Order page.

**Result:** The visitor can browse the restaurant menu and continue toward ordering.

### Journey 3 — Place an Order

1. Visitor opens the Order page.
2. Visitor selects the required order options.
3. Visitor enters the required information.
4. Visitor submits the order form.
5. The page provides a visible place for the result or confirmation.

**Result:** One visitor can complete the ordering flow without staff, admin, database, or server interaction.

---

## JavaScript Readiness

The HTML structure was prepared so that JavaScript can be added later without rebuilding the pages.

Forms, inputs, buttons, and changing content areas use consistent lowercase IDs and classes.

Interactive areas include:

- Form IDs
- Input IDs
- Button IDs
- Result containers
- Error containers
- Success containers
- Empty containers for dynamically generated content

CSS state classes are also prepared:

- `.hidden`
- `.active`
- `.selected`
- `.error`
- `.success`

JavaScript is not required for the current midterm stage, but the existing HTML structure is ready for future interaction.

---

## Responsive Design

Bootstrap 5.3.8 is used for responsive layout and components.

The pages were checked on desktop and smaller screen sizes.

The pages use Bootstrap containers, rows, columns, responsive images, navigation, forms, buttons, and spacing utilities.

The layout is designed to avoid horizontal overflow on mobile devices.

---

## CSS Structure

| File                         | Purpose                                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `css/base.css`               | Common styles used throughout the website: site background and text colors, link styling, keyboard focus styling, footer link styling, common visual rules |
| `css/Ali-Nadirov.css`        | Page-specific styles for **Ali Nadirov's pages: About and Gallery**                                                                                      |
| `css/Nurasyl.css`            | Page-specific styles for **Nurasyl Mazhit's pages: FAQ and Order**                                                                                       |
| `css/Alikhan-Kuttybayev.css` | Page-specific styles for **Alikhan Kuttybayev's pages: Menu and Reviews**                                                                                |

Bootstrap 5.3.8 handles the majority of the layout and component styling, while the personal CSS files are used only for additional page-specific corrections and requirements.

---

## Validation and Technical Checks

### W3C HTML Validation

The **About** and **Gallery** pages were validated using the W3C Markup Validation Service.

| Page    | File           | HTML Errors | HTML Warnings | Result   |
| ------- | -------------- | ----------: | ------------: | -------- |
| About   | `about.html`   |           0 |             0 | ✓ Passed |
| Gallery | `gallery.html` |           0 |             0 | ✓ Passed |
| FAQ   | `faq.html`   |           0 |             0 | ✓ Passed |
| Order | `order.html` |           0 |             0 | ✓ Passed |
| Menu    | `menu.html`   |           0 |             0 | ✓ Passed |
| Reviews | `reviews.html` |           0 |             0 | ✓ Passed |
| Home    | `index.html`   |           0 |             0 | ✓ Passed |
| Colophon | `colophon.html` |           0 |             0 | ✓ Passed |


The validation errors previously found on these pages were fixed before the final check.

Examples of fixes included:

- Replacing an unnecessary `<section>` without a heading with a `<div>`.
- Correcting the structure of the Gallery page's key-term content.
- Removing unnecessary HTML `hidden` attributes and using the prepared `.hidden` CSS state instead.

### CSS Validation

The CSS files used for the completed pages were checked with the W3C CSS Validator.

| CSS File              | Errors | Warnings | Result   |
| --------------------- | -----: | -------: | -------- |
| `css/base.css`        |      0 |        0 | ✓ Passed |
| `css/Ali-Nadirov.css` |      0 |        0 | ✓ Passed |
| `css/Nurasyl.css`     |      0 |        0 | ✓ Passed |
| `css/Alikhan-Kuttybatev.css`  |      0 |        0 | ✓ Passed |

### Browser Testing

The completed pages were checked in a desktop browser using the browser developer tools.

The browser console was checked for errors. No red JavaScript or website errors were found.

A Microsoft Edge privacy/bounce-tracking warning was observed during testing. This is a browser privacy notice and is not an error in the website's HTML, CSS, or JavaScript.

---

## Quality Pass

Each team member checked pages created by another team member as part of the final quality pass.

### Cross-Testing

| Tester             | Pages Checked                | Date       | Browser |
| ------------------ | ---------------------------- | ---------- | ------- |
| Nurasyl Mazhit     | `about.html`, `gallery.html` | 03.10.2026 | Chrome  |
| Alikhan Kuttybayev | `faq.html`, `order.html`     | 03.10.2026 | Chrome  |
| Ali Nadirov        | `menu.html`, `reviews.html`  | 03.10.2026 | Chrome  |

### Pages Tested

The cross-testing covered all six individually assigned pages.

| Page           | Responsible Member | Tested By          | Result   |
| -------------- | ------------------ | ------------------ | -------- |
| `about.html`   | Ali Nadirov        | Nurasyl Mazhit     | ✓ Passed |
| `gallery.html` | Ali Nadirov        | Nurasyl Mazhit     | ✓ Passed |
| `faq.html`     | Nurasyl Mazhit     | Alikhan Kuttybayev | ✓ Passed |
| `order.html`   | Nurasyl Mazhit     | Alikhan Kuttybayev | ✓ Passed |
| `menu.html`    | Alikhan Kuttybayev | Ali Nadirov        | ✓ Passed |
| `reviews.html` | Alikhan Kuttybayev | Ali Nadirov        | ✓ Passed |

The Home and Colophon pages are team pages and were reviewed as part of the overall website navigation check.

### Quality Checklist

| Check                              | Result   |
| ---------------------------------- | -------- |
| All navigation links checked       | ✓ Passed |
| All tested pages opened correctly  | ✓ Passed |
| Images checked                     | ✓ Passed |
| Forms checked where applicable     | ✓ Passed |
| Responsive layout checked          | ✓ Passed |
| No horizontal overflow found       | ✓ Passed |
| No broken links found              | ✓ Passed |
| No broken images found             | ✓ Passed |
| No unfinished pages found          | ✓ Passed |
| Browser console checked for errors | ✓ Passed |

### Findings

| Finding                           | Pages                        | Result   |
| --------------------------------- | ---------------------------- | -------- |
| No issues found                   | `about.html`, `gallery.html` | ✓ Passed |
| No issues found                   | `faq.html`, `order.html`     | ✓ Passed |
| No issues found                   | `menu.html`, `reviews.html`  | ✓ Passed |
| No broken links or images found   | All tested pages             | ✓ Passed |
| No responsive layout issues found | All tested pages             | ✓ Passed |

---

# AI Usage Log

**Project:** Doner na Abaya Website
**Course:** Introduction to Web Technologies

---

## Ali Nadirov — AI Usage Log

In this project, I used AI tools such as ChatGPT mainly to understand the midterm requirements, review my HTML and CSS structure, understand Bootstrap concepts, identify validation problems, and prepare the pages for future JavaScript functionality.

I did not rely on AI to complete the project without understanding the code. I wrote and edited my assigned pages, `about.html` and `gallery.html`, myself. AI was mainly used to explain concepts, identify possible problems, and help me understand how to improve my own implementation according to the assignment requirements.

### Prompt 1

**AI Tool:** ChatGPT

**Prompt:**
*"What does the requirement that the website must be JavaScript-ready mean if JavaScript is not required yet?"*

**Why I asked:**
The midterm requires the website to be prepared for JavaScript even though JavaScript is not implemented at this stage. I wanted to understand what should already exist in my HTML before JavaScript is added later.

**How I used the answer:**
ChatGPT explained that the HTML should already contain the elements that JavaScript will later control, such as forms, inputs, buttons, result containers, error messages, and elements that may change dynamically. I used this explanation to review my About and Gallery pages and make sure interactive elements had appropriate IDs and that result and error containers already existed.

### Prompt 2

**AI Tool:** ChatGPT

**Prompt:**
*"What should I check to make sure a multi-page website is consistent across all pages?"*

**Why I asked:**
The midterm requires the website to work as one coherent site rather than as separate pages. I needed to understand what parts of my About and Gallery pages should match the other team members' pages.

**How I used the answer:**
I learned that the navigation, header, footer, button styles, colors, typography, spacing, and naming conventions should remain consistent. I used this when reviewing my About and Gallery pages and comparing their navigation and common elements with the rest of the project.

### Prompt 3

**AI Tool:** ChatGPT

**Prompt:**
*"Why can W3C report a warning or error when a section element does not contain a heading?"*

**Why I asked:**
During HTML validation, I found a problem with a `<section>` element that was being used only for layout and did not have its own heading. I wanted to understand why the validator considered this a problem.

**How I used the answer:**
ChatGPT explained that a `<section>` represents a meaningful thematic section and normally should have a heading. Since the element on my About page was only being used as a layout container for an image, I changed it to a `<div>`. After the change, the page passed HTML validation with 0 errors and 0 warnings.

### Prompt 4

**AI Tool:** ChatGPT

**Prompt:**
*"What is the correct structure for a description list using HTML dt and dd elements?"*

**Why I asked:**
My Gallery page contained a Key Terms block using `<dl>`, `<dt>`, and `<dd>`. The original structure produced a validation problem because the elements were nested incorrectly.

**How I used the answer:**
ChatGPT explained the required structure of a description list and helped me understand why the original nested layout was invalid. I changed the Key Terms content to a Bootstrap card/grid structure using headings and paragraphs instead of forcing the content into an invalid `<dl>` structure. I then checked the page again with the W3C validator.

### Prompt 5

**AI Tool:** ChatGPT

**Prompt:**
*"How can Bootstrap classes be used for responsive images and layout without writing a large amount of custom CSS?"*

**Why I asked:**
The midterm requires Bootstrap to handle the main layout and responsive behavior, while custom CSS should remain a small correction layer. I wanted to understand how to use Bootstrap appropriately instead of creating unnecessary custom rules.

**How I used the answer:**
I used Bootstrap containers, rows, columns, spacing utilities, responsive components, and image classes where appropriate. I kept my personal CSS limited to page-specific corrections such as maintaining image aspect ratios with `.gallery-photo` and `.about-photo`. This helped keep the custom stylesheet small while allowing Bootstrap to handle the main responsive layout.

### Prompt 6

**AI Tool:** ChatGPT

**Prompt:**
*"What should I check when testing a responsive website before submitting a midterm project?"*

**Why I asked:**
The assignment requires the website to work on different screen sizes and specifically warns about horizontal overflow and broken layouts. I wanted to understand what should be included in the final quality check.

**How I used the answer:**
I used the explanation to check the navigation, images, containers, forms, spacing, and page width on different screen sizes. I also checked for horizontal scrolling, broken images, broken links, and browser console errors. These checks were included in the final quality pass for my About and Gallery pages.

---

## Alikhan Kuttybayev — AI Usage Log

In this project, our team used AI tools such as Gemini and ChatGPT to understand Bootstrap layout, responsive design, HTML structure, CSS behavior, and JavaScript-ready requirements for the midterm website.

I worked mainly on the `menu.html` and `reviews.html` pages. AI was used as a learning and debugging tool to understand how specific web technologies work and how to meet the project requirements. The final HTML and CSS implementation was written and edited by me.

### Prompt 1

**AI Tool:** Gemini

**Prompt:**
*"How does Bootstrap grid work and how can I use rows and columns to create a responsive menu layout?"*

**Why we asked:**
The Menu page contains several groups of food and drink items. We needed to understand how Bootstrap's responsive grid could be used instead of creating separate layouts for different screen sizes.

**How we used the answer:**
Gemini explained the relationship between containers, rows, and columns and how responsive column classes work at different breakpoints. I used this knowledge to structure the menu content with Bootstrap's grid system so that menu items can adapt to smaller screens.

### Prompt 2

**AI Tool:** ChatGPT

**Prompt:**
*"How can Bootstrap cards be made responsive without writing a lot of custom CSS?"*

**Why we asked:**
The Menu page contains repeated food items, and we wanted the cards to remain visually consistent while adapting to different screen widths.

**How we used the answer:**
ChatGPT explained how Bootstrap's grid, spacing, and card classes can be combined to create responsive repeated content. I used Bootstrap classes for the main layout and kept custom CSS limited to page-specific corrections.

### Prompt 3

**AI Tool:** Gemini

**Prompt:**
*"How should a review form be structured so that it is ready for JavaScript later?"*

**Why we asked:**
The midterm requires forms to be prepared for future JavaScript even though JavaScript is not implemented yet. The Reviews page contains interactive form elements.

**How we used the answer:**
Gemini explained that form elements should have clear IDs and that the page should already contain places where validation messages, errors, and successful results can later be displayed. I used this understanding when reviewing the form structure and its IDs and result containers.

### Prompt 4

**AI Tool:** ChatGPT

**Prompt:**
*"What is the difference between using Bootstrap utility classes and writing custom CSS?"*

**Why we asked:**
The assignment requires Bootstrap to handle the main layout while custom CSS should remain a small correction layer. I wanted to understand when a Bootstrap utility class was more appropriate than adding another custom CSS rule.

**How we used the answer:**
ChatGPT explained that Bootstrap utilities can handle common properties such as spacing, display, alignment, and responsive behavior. I used Bootstrap utilities where possible and kept custom CSS for page-specific visual adjustments.

---

## Nurasyl Mazhit — AI Usage Log

In this project, I used AI tools such as Gemini to understand CSS, Bootstrap, responsive layouts, forms, and JavaScript-ready HTML requirements for the midterm assignment.

I worked mainly on the `faq.html` and `order.html` pages. AI was used to explore and understand web development concepts and to help identify possible implementation problems. The main HTML and CSS code and project content were written and edited by me.

### Prompt 1

**AI Tool:** Gemini

**Prompt:**
*"How can Bootstrap accordion components be used to create a responsive FAQ section?"*

**Why we asked:**
The FAQ page needs to present several questions and answers in a clear way. I wanted to understand how Bootstrap components could be used to organize this content without creating a large amount of custom CSS.

**How we used the answer:**
Gemini explained how Bootstrap's accordion component works and how its classes and attributes control the expandable sections. This helped me understand how to structure the FAQ content using Bootstrap while keeping the page responsive.

### Prompt 2

**AI Tool:** Gemini

**Prompt:**
*"How should an HTML form be structured for a restaurant order page?"*

**Why we asked:**
The Order page needs to allow a visitor to enter information and select order options. I wanted to understand how to organize labels, inputs, selections, buttons, and form sections correctly.

**How we used the answer:**
Gemini explained how labels should be associated with form controls and how different input types can be used for different kinds of information. I used this knowledge to organize the Order form and make the fields clear for visitors.

### Prompt 3

**AI Tool:** Gemini

**Prompt:**
*"What makes an HTML form ready for JavaScript validation?"*

**Why we asked:**
The midterm does not require JavaScript yet, but every form must already contain the elements that future JavaScript can control.

**How we used the answer:**
Gemini explained that inputs and buttons should have clear IDs and that containers should already exist for validation errors, successful results, and generated messages. I used this knowledge to review the IDs and result/error containers on the Order page.

### Prompt 4

**AI Tool:** Gemini

**Prompt:**
*"How can Bootstrap form classes make a form responsive on smaller screens?"*

**Why we asked:**
The Order page needs to work on both desktop and mobile screens. I wanted to understand how Bootstrap's containers, rows, columns, and form utilities can be used to prevent the form from becoming too wide or difficult to use.

**How we used the answer:**
Gemini explained how Bootstrap's responsive grid and form classes can be combined to organize form controls at different screen sizes. I used this approach when checking the Order page's responsive structure.

### Prompt 5

**AI Tool:** Gemini

**Prompt:**
*"What is the difference between display flex and Bootstrap flex utility classes?"*

**Why we asked:**
Some elements on the FAQ and Order pages need horizontal or vertical alignment. I wanted to understand whether Bootstrap utilities could be used instead of writing additional custom CSS.

**How we used the answer:**
Gemini explained that Bootstrap provides utility classes that apply Flexbox properties without requiring separate CSS rules. I used Bootstrap utilities where appropriate to keep the custom stylesheet smaller and let Bootstrap handle the main layout.

---
# Screenshots

<img width="1252" height="1018" alt="image" src="https://github.com/user-attachments/assets/ee596a81-eb85-4ca4-9bd6-38b9825121b0" />
<img width="1311" height="1020" alt="about-375px" src="https://github.com/user-attachments/assets/d13679de-990e-4c66-9549-35a790daa44b" />
<img width="1261" height="1018" alt="image" src="https://github.com/user-attachments/assets/6c23d689-67d0-4c82-ae1e-32160ba5102d" />
<img width="1542" height="1017" alt="about-1366px-3" src="https://github.com/user-attachments/assets/256c5162-fdc8-45fb-9004-5bea23c1441b" />
<img width="1337" height="1013" alt="about-375px-4" src="https://github.com/user-attachments/assets/95857741-883c-44db-b71a-9af3fbd27cb5" />
<img width="1253" height="1014" alt="about-375px-5" src="https://github.com/user-attachments/assets/f9067486-565a-48d6-b866-3b4f8f0bf960" />
<img width="1289" height="1015" alt="about-375px-6" src="https://github.com/user-attachments/assets/80891db8-ca26-49d7-b299-3a9c72263a5f" />
<img width="1268" height="1014" alt="about-375px-7" src="https://github.com/user-attachments/assets/0c657d21-94ba-4a6f-8820-7e2113520bca" />

<img width="480" height="960" alt="image" src="https://github.com/user-attachments/assets/1da32d1e-01bd-49f9-b145-66ff812e5893" />
<img width="481" height="961" alt="image" src="https://github.com/user-attachments/assets/a00bb75b-2266-4b2d-ba84-4da25db78377" />
<img width="473" height="955" alt="image" src="https://github.com/user-attachments/assets/9b5053a2-ec1d-47e6-9352-03f461a1ce2d" />
<img width="478" height="961" alt="image" src="https://github.com/user-attachments/assets/9a53eb54-d9c2-429c-a11e-6ac30cee59c3" />
<img width="476" height="966" alt="image" src="https://github.com/user-attachments/assets/9b5df1d3-ef18-404b-8521-0dfd2c83a5f8" />
<img width="484" height="963" alt="image" src="https://github.com/user-attachments/assets/4792ac8a-f2a3-43c7-94a4-bbaa2ca07093" />
<img width="481" height="963" alt="image" src="https://github.com/user-attachments/assets/e4926258-a17d-4e5e-bc4f-11329ef926c7" />
<img width="479" height="963" alt="image" src="https://github.com/user-attachments/assets/c2e0862a-7174-491c-b4e7-b4674c99d2d1" />


<img width="1543" height="1014" alt="image" src="https://github.com/user-attachments/assets/ae4958c5-d78c-4a82-9455-280ca1872090" />
<img width="1542" height="1015" alt="about-1366px-2" src="https://github.com/user-attachments/assets/571f1779-42be-4266-892d-ba3e339c0a88" />
<img width="1542" height="1017" alt="about-1366px-3" src="https://github.com/user-attachments/assets/ea8b4ece-5041-4041-ad7b-185834b65f74" />
<img width="1544" height="1020" alt="about-1366px-4" src="https://github.com/user-attachments/assets/82928ac8-60bf-4a98-bd4c-9b61b1e2ae0d" />

<img width="1542" height="1014" alt="image" src="https://github.com/user-attachments/assets/6c3cdd98-f0d2-4468-9aa4-7a8594468660" />
<img width="1542" height="1018" alt="image" src="https://github.com/user-attachments/assets/90eb5542-4625-43ac-9963-838cc99e0a81" />
<img width="1540" height="1016" alt="image" src="https://github.com/user-attachments/assets/3562663c-cd72-49cd-be7c-5df527bfeb0c" />
<img width="1545" height="1017" alt="image" src="https://github.com/user-attachments/assets/c0fce829-d2d8-45d4-91a1-eaa17e806a28" />
<img width="1548" height="1017" alt="image" src="https://github.com/user-attachments/assets/50d86363-c8a7-4ed8-a333-1c15a5eeb361" />

---

# Final Project Freeze

Before the final submission, the team must:

1. Complete all pages.
2. Perform the cross-testing quality pass.
3. Fix all discovered issues.
4. Check the repository.
5. Make the final commit.
6. Create the final Git tag: `midterm`

The `midterm` tag marks the final version submitted for the midterm assessment.

---

# Technologies

- HTML5
- CSS3
- Bootstrap 5.3.8
- JavaScript-ready HTML structure
- Git
- GitHub
- W3C Validator

---

# Project Status

| Item                    | Status                                   |
| ----------------------- | ---------------------------------------- |
| Overall project         | ✓ Complete                               |
| About page              | ✓ Complete                               |
| Gallery page            | ✓ Complete                               |
| FAQ page                | ✓ Complete                               |
| Order page              | ✓ Complete                               |
| Menu page               | ✓ Complete                               |
| Reviews page            | ✓ Complete                               |
| About HTML validation   | ✓ Passed — 0 errors, 0 warnings          |
| Gallery HTML validation | ✓ Passed — 0 errors, 0 warnings          |
| Relevant CSS validation | ✓ Passed — 0 errors, 0 warnings          |
| Responsive check        | ✓ Passed                                 |
| Cross-testing           | ✓ Passed                                 |
| Quality pass            | ✓ Passed                                 |
| Final project freeze    | Ready for final commit and `midterm` tag |
