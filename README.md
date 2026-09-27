# Doner na Abaya Website

## Introduction

This project is a multi-page website for **Doner na Abaya**, a restaurant in Astana.

The website was created for the course **Introduction to Web Technologies**.

**Assignment 3** continues the same project and focuses on **Bootstrap responsive design, the Bootstrap grid system, containers, typography, buttons, utility classes, and components**.

The same team, theme, pages, and Git repository from the previous assignments are used.

---

## Team Members

- **Ali Nadirov**
- **Alikhan Kuttybayev**
- **Mazhit Nurasyl**

---

## Team Responsibilities

### Ali Nadirov
Main pages:
- `about.html`
- `gallery.html`

Additional project pages:
- `index.html`
- `colophon.html`

Personal stylesheet:
- `css/Ali-Nadirov.css`

### Alikhan Kuttybayev
Pages:
- `menu.html`
- `reviews.html`

Personal stylesheet:
- `css/Alikhan-Kuttybayev.css`

### Mazhit Nurasyl
Pages:
- `order.html`
- `faq.html`

Personal stylesheet:
- `css/Nurasyl.css`

---

## Website Pages

The project contains eight main HTML pages:

- `index.html` — Home page
- `menu.html` — Restaurant menu
- `reviews.html` — Customer reviews
- `about.html` — Information about the restaurant
- `gallery.html` — Restaurant and food gallery
- `order.html` — Order information and order form
- `faq.html` — Frequently Asked Questions
- `colophon.html` — Project information

---

## Assignment 3 — Bootstrap

For Assignment 3, the existing website is being adapted to Bootstrap without creating a new project or new pages.

Bootstrap is used for the main page structure and responsive behaviour, while custom CSS is kept as a small correction layer for branding and details.

### Bootstrap Version

The project uses:

**Bootstrap 5.3.8**

Bootstrap is connected through a CDN.

Custom stylesheets are linked after Bootstrap so project-specific styles can override Bootstrap where necessary.

---

## Responsive Design

The website is designed to work at three main screen widths:

- Phone — approximately **375px**
- Tablet — approximately **768px**
- Desktop — normal desktop width

Bootstrap responsive classes are used so layouts can change depending on screen size.

Examples include:

- `col-12`
- `col-md-6`
- `col-lg-4`
- `d-none`
- `d-md-inline-block`
- `text-center`
- `text-md-start`

The navigation collapses into a Bootstrap navbar toggler on smaller screens.

---

## Bootstrap Containers and Grid

The project uses both:

- `.container`
- `.container-fluid`

`.container` is used for readable page content with a responsive maximum width.

`.container-fluid` is used where full viewport width is more suitable, such as the navigation area.

The Bootstrap grid system is built with:

- `.row`
- `.col-*`
- responsive column classes
- gutter classes such as `.g-3` and `.g-4`

Nested Bootstrap grids are also used in the project.

---

## Bootstrap Components and Utilities

The project uses Bootstrap classes for layout, spacing, typography, forms, buttons, tables, borders, shadows, and responsive behaviour.

Examples include:

- `btn`
- `btn-danger`
- `btn-outline-danger`
- `btn-lg`
- `form-control`
- `form-select`
- `form-check`
- `table`
- `table-striped`
- `table-bordered`
- `table-hover`
- `badge`
- `card`
- `alert`
- `shadow-sm`
- `border`
- `rounded`
- `mb-*`
- `p-*`
- `d-flex`
- `gap-*`

A Bootstrap **Accordion** component is used on the FAQ page for restaurant questions and answers.

---

## Order Page

The Order page includes:

- Responsive Bootstrap layout
- Order information
- Responsive images
- Pickup and Delivery information
- Popular Food table
- Bootstrap form controls
- Submit, Reset, Menu, and disabled payment buttons
- Responsive columns for form fields
- Bootstrap utility classes for spacing and alignment

---

## FAQ Page

The FAQ page includes:

- Responsive Bootstrap layout
- Restaurant information
- Bootstrap Accordion component
- Responsive information cards
- Buttons and badges
- Responsive images
- Bootstrap utility classes for spacing, alignment, borders, and shadows

---

## Custom CSS

Bootstrap performs most of the layout and responsive work in Assignment 3.

The custom stylesheets are kept small and are used mainly for:

- Brand colours
- Small visual corrections
- Project-specific borders
- Small component adjustments

The project does not use custom JavaScript.

---

## Project Structure

```text
assignment1_html/
│
├── css/
│   ├── base.css
│   ├── Ali-Nadirov.css
│   ├── Alikhan-Kuttybayev.css
│   └── Nurasyl.css
│
├── images/
│   └── restaurant and food images
│
├── screenshots/
│   └── responsive screenshots
│
├── index.html
├── menu.html
├── reviews.html
├── about.html
├── gallery.html
├── order.html
├── faq.html
├── colophon.html
│
├── AI Log.pdf
├── CSS checklist.pdf
└── README.md
```

The repository may also contain files from previous assignments because Assignment 3 continues the same project.

---

## Screenshots

For Assignment 3, responsive screenshots are taken at:

1. Phone width — approximately **375px**
2. Tablet width — approximately **768px**
3. Desktop width
4. Phone width with the **collapsed Bootstrap navbar**

These screenshots show how the page changes at different Bootstrap breakpoints.

---

## AI Usage

AI tools were used only for permitted support such as:

- Understanding Bootstrap concepts
- Understanding responsive classes
- Understanding Bootstrap components
- Troubleshooting
- Checking assignment requirements
- Reviewing student-written code

AI usage is documented in the project **AI Log**.

---

## Validation

Before final submission:

- HTML pages should pass the **W3C HTML Validator with zero errors**
- Links and Bootstrap components should work correctly
- The website should not have horizontal overflow at phone width
- The responsive navbar should work correctly

---

## How to Open the Project

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Use the navigation menu to move between pages.

An internet connection is required to load Bootstrap from the CDN.

---

## Repository

This project uses the same Git repository from the previous assignments.

All team members commit their own work from their own GitHub accounts.

---

## Course

**Course:** Introduction to Web Technologies  
**Project:** Doner na Abaya Website  
**Assignment:** Assignment 3 — Bootstrap Responsive Design  
**Year:** 2026
