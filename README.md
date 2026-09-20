# Doner na Abaya — Web Technologies Project

This repository contains our team project for the **Web Technologies** course.

The website is about **Doner na Abaya** restaurant in Astana.  
Assignment 1 focused on HTML structure and semantic elements.  
Assignment 2 extends the same project with CSS styling, layouts, selectors, cascade and specificity.

## Team Members

- **Alikhan Kuttybayev**
- **Ali Nadirov**
- **Mazhit Nurasyl**

## Student Responsibilities

### Alikhan Kuttybayev
- `menu.html`
- `reviews.html`
- personal stylesheet: `css/Alikhan-Kuttybayev.css`

### Ali Nadirov
- `about.html`
- `gallery.html`
- `index.html`
- `colophon.html`
- personal stylesheet: `css/Ali-Nadirov.css`

### Mazhit Nurasyl
- `order.html`
- `faq.html`
- personal stylesheet: `css/Nurasyl.css`

## Project Pages

- `index.html` — home page
- `about.html` — information about the restaurant
- `gallery.html` — restaurant and food gallery
- `menu.html` — menu and prices
- `reviews.html` — customer reviews
- `order.html` — order information and order form
- `faq.html` — frequently asked questions
- `colophon.html` — project information

## Project Structure

```text
assignment1_html/
├── css/
│   ├── base.css
│   ├── Ali-Nadirov.css
│   ├── Alikhan-Kuttybayev.css
│   └── Nurasyl.css
├── images/
├── screenshots/
├── sketches/
├── about.html
├── colophon.html
├── faq.html
├── gallery.html
├── index.html
├── menu.html
├── order.html
├── reviews.html
├── AI Log.pdf
├── Assignment1_Report_DonerNaAbaya.pdf
├── CSS checklist.pdf
└── README.md
```

## CSS Structure

The project uses one shared stylesheet and personal stylesheets.

- `base.css` contains common styles used by the whole team.
- `Ali-Nadirov.css` contains styles for Ali Nadirov's pages.
- `Alikhan-Kuttybayev.css` contains styles for Alikhan Kuttybayev's pages.
- `Nurasyl.css` contains styles for Mazhit Nurasyl's pages.

The shared stylesheet is linked first and the personal stylesheet is linked after it.

Example:

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/Nurasyl.css">
```

## Main CSS Features

Assignment 2 includes:

- type, class and ID selectors
- descendant, child and adjacent sibling selectors
- attribute selectors
- universal selector
- pseudo-classes such as `:hover`, `:focus` and `:nth-child()`
- pseudo-elements such as `::before`
- reusable classes and unique IDs
- Flexbox layouts
- CSS Grid layouts
- `repeat()`, `minmax()`, `fr` and `gap`
- static, relative, absolute and fixed positioning
- float and clear
- different centering methods
- cascade examples
- specificity experiment without using `!important` to solve the conflict
- shared color palette and typography

## Screenshots

The `screenshots/` folder contains screenshots of pages **before CSS** and **after CSS**.

Examples include:

- About — before and after
- Gallery — before and after
- Menu — before and after
- Reviews — before and after
- Order — before and after
- FAQ — before and after

These screenshots show the visual changes made in Assignment 2.

## Sketches

The `sketches/` folder contains hand-drawn page sketches created before CSS styling.

The sketches show the planned layout of the pages and are part of the Assignment 2 design process.

## Images

The `images/` folder contains local images used on the website, including restaurant, food, menu and order-related images.

All website images use relative paths.

## Forms

The project contains forms for educational purposes.

The forms demonstrate different HTML input types and CSS form styling.  
There is no backend server, so the forms do not send real orders or reviews.

## CSS Checklist

`CSS checklist.pdf` contains the required CSS topics, selectors/properties, line numbers and student information.

It includes requirements such as:

- selectors
- Flexbox
- Grid
- positioning
- float and clear
- centering
- specificity
- cascade

## AI Log

`AI Log.pdf` contains the AI usage log for the project.

It records questions and help used during the assignments.

## Assignment 1 Report

`Assignment1_Report_DonerNaAbaya.pdf` contains the report from Assignment 1.

## Validation

Before submission, the team checks:

- HTML pages with the **W3C HTML Validator**
- CSS files with the **W3C CSS Validator**

The goal is to have **0 validation errors**.

## Git and GitHub

The team uses Git and GitHub to manage the project.

Each team member commits their own work.  
The repository contains commit history for HTML, CSS, screenshots, documentation and other project files.

## How to Open the Website

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Use the navigation menu to move between pages.

## Contact

Restaurant phone: **+7 708 804 39 37**

## Copyright

© 2026 Doner na Abaya
