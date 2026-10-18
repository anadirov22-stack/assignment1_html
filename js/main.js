'use strict';

function setCurrentPageNavigation() {
const currentPage = window.location.pathname.split('/').pop();
const navigationLinks = document.querySelectorAll('nav a');

```
navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
        link.setAttribute('aria-current', 'page');
    } else if (link.getAttribute('aria-current') === 'page') {
        link.removeAttribute('aria-current');
    }
});
```

}

function initializeSharedFeatures() {
setCurrentPageNavigation();
}

initializeSharedFeatures();
