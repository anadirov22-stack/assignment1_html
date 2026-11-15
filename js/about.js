'use strict';

/*
 * Ali Nadirov — About page jQuery features.
 * jQuery 3.7.1 must be loaded before this file.
 */

$(function () {

    const products = [
        { id: 1, name: 'Chicken doner', category: 'doner', size: 'M', available: true },
        { id: 2, name: 'Beef doner', category: 'doner', size: 'M', available: true },
        { id: 3, name: 'Assorted doner', category: 'doner', size: 'M', available: true },
        { id: 4, name: 'Chicken doner', category: 'doner', size: 'S', available: true },
        { id: 5, name: 'Beef doner', category: 'doner', size: 'S', available: true },
        { id: 6, name: 'Assorted doner', category: 'doner', size: 'S', available: true },
        { id: 7, name: 'Coca-Cola Zero Sugar', category: 'drink', size: '450 ml', available: true },
        { id: 8, name: 'Coca-Cola', category: 'drink', size: '500 ml', available: true },
        { id: 9, name: 'Fanta', category: 'drink', size: '450 ml', available: true },
        { id: 10, name: 'Fuse Tea', category: 'drink', size: '450 ml', available: true },
        { id: 11, name: 'Sprite', category: 'drink', size: '450 ml', available: true },
        { id: 12, name: 'Coca-Cola Zero Sugar', category: 'drink', size: '500 ml', available: true },
        { id: 13, name: 'Fanta', category: 'drink', size: '500 ml', available: true },
        { id: 14, name: 'Sprite', category: 'drink', size: '500 ml', available: true },
        { id: 15, name: 'Fuse Tea', category: 'drink', size: '500 ml', available: true },
        { id: 16, name: 'Bonaqua', category: 'drink', size: '500 ml', available: true },
        { id: 17, name: 'Airyan', category: 'drink', size: '300 ml', available: true },
        { id: 18, name: 'Extra beef', category: 'addition', size: 'Extra portion', available: true },
        { id: 19, name: 'Extra chicken', category: 'addition', size: 'Extra portion', available: true },
        { id: 20, name: 'Peppers', category: 'addition', size: 'Extra portion', available: true },
        { id: 21, name: 'Red sauce', category: 'addition', size: 'Extra portion', available: true },
        { id: 22, name: 'White sauce', category: 'addition', size: 'Extra portion', available: true }
    ];


// DONER NA ABAYA — BRAND JOURNEY

(function () {

    // Prevent duplicate sections
    if ($('#dna-journey').length) {
        return;
    }

    // DOCUMENTED MILESTONES

    const history = [
        {
            year: '2024',
            label: 'The Brand',
            subtitle: 'A name becomes a registered trademark.',
            intro: 'A milestone connected with the DONER NA ABAYA name.',
            events: [
                {
                    date: '26 APRIL 2024',
                    category: 'TRADEMARK',
                    title: 'DONER NA ABAYA',
                    description:
                        'The DONER NA ABAYA trademark was registered in Class 43, covering food and restaurant services.',
                    detail: 'A documented trademark registration.'
                }
            ]
        },

        {
            year: '2025',
            label: 'Public Presence',
            subtitle: 'The brand appears in public and commercial records.',
            intro: 'Two documented moments connected with Doner na Abaya.',
            events: [
                {
                    date: '22 APRIL 2025',
                    category: 'BRAND RECORD',
                    title: 'Trademark Licence Agreement',
                    description:
                        'A trademark licence agreement concerning the DONER NA ABAYA name was recorded.',
                    detail: 'A documented agreement related to the brand.'
                },
                {
                    date: 'JUNE 2025',
                    category: 'APORT EAST',
                    title: 'Featured at Aport East',
                    description:
                        'Doner na Abaya appeared in the Aport East promotional catalogue. The listing presented the brand at the second-floor food court.',
                    detail: 'A public appearance in the Aport East catalogue.'
                }
            ]
        },

        {
            year: '2026',
            label: 'Astana',
            subtitle: 'A public listing connected with the brand in the city.',
            intro: 'A documented public-directory entry for Doner na Abaya Astana.',
            events: [
                {
                    date: '9 FEBRUARY 2026',
                    category: 'PUBLIC DIRECTORY',
                    title: 'Doner na Abaya Astana',
                    description:
                        'A public directory entry for Doner na Abaya Astana was recorded on 9 February 2026.',
                    detail: 'A dated public-directory record.'
                }
            ]
        }
    ];

    // SECTION

    const section = $('<section>', {
        id: 'dna-journey',
        'aria-label': 'Doner na Abaya documented milestones'
    });

    const container = $('<div>', {
        class: 'dna-container'
    });

    const heading = $(`
        <div class="dna-heading">
            <span class="dna-eyebrow">A CLOSER LOOK AT THE BRAND</span>

            <h2>Moments Along the Way</h2>

            <p>
                Explore selected milestones connected with
                Doner na Abaya, from its registered name
                to its public presence.
            </p>
        </div>
    `);

    // YEAR NAVIGATION

    const navigation = $('<div>', {
        class: 'dna-navigation',
        role: 'tablist',
        'aria-label': 'Choose a year'
    });

    history.forEach((item, index) => {

        const button = $('<button>', {
            type: 'button',
            class: 'dna-year-button',
            role: 'tab',
            'aria-selected': index === 0 ? 'true' : 'false',
            'aria-controls': 'dna-year-content',
            text: item.year
        }).attr('data-year-index', index);

        const label = $('<span>', {
            class: 'dna-year-label',
            text: item.label
        });

        button.append(label);
        navigation.append(button);
    });


    // CONTENT AREA

    const content = $('<div>', {
        id: 'dna-year-content',
        class: 'dna-content',
        role: 'tabpanel',
        tabindex: '0'
    });

    const contentHeader = $('<div>', {
        class: 'dna-content-header'
    });

    const yearTitle = $('<div>', {
        class: 'dna-year-title'
    });

    const yearNumber = $('<span>', {
        class: 'dna-year-number'
    });

    const yearSubtitle = $('<p>', {
        class: 'dna-year-subtitle'
    });

    yearTitle.append(yearNumber, yearSubtitle);

    const eventCount = $('<span>', {
        class: 'dna-event-count'
    });

    contentHeader.append(yearTitle, eventCount);

    const intro = $('<p>', {
        class: 'dna-intro'
    });

    const eventsContainer = $('<div>', {
        class: 'dna-events'
    });


    // BOTTOM NAVIGATION

    const controls = $(`
        <div class="dna-controls">

            <button type="button"
                    class="dna-control-button dna-previous">
                <span aria-hidden="true">←</span>
                Previous
            </button>

            <div class="dna-progress">
                <span class="dna-progress-current">01</span>
                <span class="dna-progress-line"></span>
                <span class="dna-progress-total">03</span>
            </div>

            <button type="button"
                    class="dna-control-button dna-next">
                Next
                <span aria-hidden="true">→</span>
            </button>

        </div>
    `);

    content.append(
        contentHeader,
        intro,
        eventsContainer,
        controls
    );


    // FOOTER NOTE

    const footer = $(`
        <div class="dna-footer">
            <span class="dna-footer-mark"></span>
            <p>
                Selected milestones from publicly documented records.
            </p>
        </div>
    `);

    container.append(
        heading,
        navigation,
        content,
        footer
    );

    section.append(container);

    // Insert before the branch section
    if ($('#branch').length) {
        section.insertBefore('#branch');
    } else {
        $('main').append(section);
    }


    // RENDER SELECTED YEAR

    let currentIndex = 0;

    function renderYear(index) {

        if (index < 0 || index >= history.length) {
            return;
        }

        currentIndex = index;

        const item = history[index];

        // Update year buttons
        navigation.find('.dna-year-button').each(function (i) {

            const active = i === index;

            $(this)
                .toggleClass('active', active)
                .attr('aria-selected', active ? 'true' : 'false');

        });

        // Update heading
        yearNumber.text(item.year);
        yearSubtitle.text(item.subtitle);
        intro.text(item.intro);

        // Update event count
        eventCount.text(
            item.events.length === 1
                ? '1 DOCUMENTED MOMENT'
                : item.events.length + ' DOCUMENTED MOMENTS'
        );

        // Clear previous events
        eventsContainer.empty();

        // Render events
        item.events.forEach((event, eventIndex) => {

            const card = $('<article>', {
                class: 'dna-event'
            });

            const date = $('<div>', {
                class: 'dna-event-date',
                text: event.date
            });

            const number = $('<span>', {
                class: 'dna-event-number',
                text: String(eventIndex + 1).padStart(2, '0')
            });

            const category = $('<span>', {
                class: 'dna-event-category',
                text: event.category
            });

            const title = $('<h3>', {
                class: 'dna-event-title',
                text: event.title
            });

            const description = $('<p>', {
                class: 'dna-event-description',
                text: event.description
            });

            const detail = $('<div>', {
                class: 'dna-event-detail'
            });

            const detailDot = $('<span>', {
                class: 'dna-detail-dot'
            });

            const detailText = $('<span>', {
                text: event.detail
            });

            detail.append(detailDot, detailText);

            const eventInfo = $('<div>', {
                class: 'dna-event-info'
            });

            eventInfo.append(
                category,
                title,
                description,
                detail
            );

            const eventTop = $('<div>', {
                class: 'dna-event-top'
            });

            eventTop.append(number, date);

            card.append(eventTop, eventInfo);

            eventsContainer.append(card);

        });

        // Update progress
        controls.find('.dna-progress-current')
            .text(String(index + 1).padStart(2, '0'));

        // Update previous / next buttons
        controls.find('.dna-previous')
            .prop('disabled', index === 0);

        controls.find('.dna-next')
            .prop('disabled', index === history.length - 1);

        // Update progress line
        const progress = ((index + 1) / history.length) * 100;

        controls.find('.dna-progress-line').css(
            '--dna-progress',
            progress + '%'
        );

    }


    // INTERACTIONS

    navigation.on('click', '.dna-year-button', function () {

        const index = Number($(this).attr('data-year-index'));

        renderYear(index);

    });

    controls.on('click', '.dna-previous', function () {

        if (currentIndex > 0) {
            renderYear(currentIndex - 1);
        }

    });

    controls.on('click', '.dna-next', function () {

        if (currentIndex < history.length - 1) {
            renderYear(currentIndex + 1);
        }

    });

    // Keyboard navigation
    navigation.on('keydown', '.dna-year-button', function (event) {

        if (event.key === 'ArrowRight') {

            event.preventDefault();

            const nextIndex = Math.min(
                currentIndex + 1,
                history.length - 1
            );

            renderYear(nextIndex);

            navigation.find('.dna-year-button')
                .eq(nextIndex)
                .trigger('focus');

        }

        if (event.key === 'ArrowLeft') {

            event.preventDefault();

            const previousIndex = Math.max(
                currentIndex - 1,
                0
            );

            renderYear(previousIndex);

            navigation.find('.dna-year-button')
                .eq(previousIndex)
                .trigger('focus');

        }

    });

    // Initial view
    renderYear(0);


    // STYLES

    if ($('#dna-journey-styles').length === 0) {

        $('<style>', {
            id: 'dna-journey-styles',
            text: `

                #dna-journey {
                    width: 100%;
                    padding: 75px 20px;
                    background: #FFFFFF;
                    color: #292929;
                    font-family: inherit;
                }

                #dna-journey * {
                    box-sizing: border-box;
                }

                #dna-journey .dna-container {
                    max-width: 1050px;
                    margin: 0 auto;
                }

                /* Heading */

                #dna-journey .dna-heading {
                    max-width: 650px;
                    margin: 0 auto 38px;
                    text-align: center;
                }

                #dna-journey .dna-eyebrow {
                    display: inline-block;
                    margin-bottom: 13px;
                    color: #B83B2D;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }

                #dna-journey .dna-heading h2 {
                    margin: 0 0 13px;
                    color: #292929;
                    font-size: clamp(27px, 4vw, 36px);
                    font-weight: 750;
                    line-height: 1.2;
                }

                #dna-journey .dna-heading p {
                    max-width: 570px;
                    margin: 0 auto;
                    color: #77716B;
                    font-size: 15px;
                    line-height: 1.8;
                }

                /* Year navigation */

                #dna-journey .dna-navigation {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    max-width: 760px;
                    margin: 0 auto 25px;
                    padding: 7px;
                    background: #F7F5F2;
                    border: 1px solid #EEEAE5;
                    border-radius: 12px;
                }

                #dna-journey .dna-year-button {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    min-height: 65px;
                    padding: 10px;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    background: transparent;
                    color: #77716B;
                    font-size: 19px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: .2s ease;
                }

                #dna-journey .dna-year-button:hover {
                    color: #B83B2D;
                    background: #FFFFFF;
                }

                #dna-journey .dna-year-button.active {
                    color: #B83B2D;
                    background: #FFFFFF;
                    border-color: #F0DAD5;
                    box-shadow: 0 2px 8px rgba(41,41,41,.04);
                }

                #dna-journey .dna-year-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: .5px;
                }

                /* Main content */

                #dna-journey .dna-content {
                    padding: 32px;
                    border: 1px solid #EAE5DE;
                    border-radius: 14px;
                    background: #FFFFFF;
                    box-shadow: 0 8px 28px rgba(41,41,41,.045);
                }

                #dna-journey .dna-content-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    padding-bottom: 22px;
                    border-bottom: 1px solid #EEEAE5;
                }

                #dna-journey .dna-year-number {
                    display: block;
                    margin-bottom: 5px;
                    color: #B83B2D;
                    font-size: 30px;
                    font-weight: 800;
                    line-height: 1.1;
                }

                #dna-journey .dna-year-subtitle {
                    margin: 0;
                    color: #77716B;
                    font-size: 14px;
                    line-height: 1.6;
                }

                #dna-journey .dna-event-count {
                    flex-shrink: 0;
                    padding: 8px 11px;
                    border-radius: 6px;
                    background: #FFF2EF;
                    color: #B83B2D;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: .7px;
                }

                #dna-journey .dna-intro {
                    margin: 22px 0 5px;
                    color: #55504B;
                    font-size: 14px;
                    line-height: 1.7;
                }

                /* Event cards */

                #dna-journey .dna-event {
                    display: grid;
                    grid-template-columns: 175px minmax(0, 1fr);
                    gap: 25px;
                    margin-top: 18px;
                    padding: 25px;
                    border: 1px solid #EEE8E3;
                    border-left: 4px solid #B83B2D;
                    border-radius: 11px;
                    background: #FFFFFF;
                    transition:
                        transform .22s ease,
                        box-shadow .22s ease,
                        border-color .22s ease;
                }

                #dna-journey .dna-event:hover {
                    transform: translateY(-3px);
                    border-color: #E8D2CC;
                    box-shadow: 0 9px 22px rgba(41,41,41,.065);
                }

                #dna-journey .dna-event-top {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }

                #dna-journey .dna-event-number {
                    color: #D7D0C9;
                    font-size: 25px;
                    font-weight: 800;
                    line-height: 1;
                }

                #dna-journey .dna-event-date {
                    display: inline-block;
                    padding: 8px 10px;
                    border-radius: 6px;
                    background: #FFF0ED;
                    color: #B83B2D;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: .7px;
                    line-height: 1.5;
                }

                #dna-journey .dna-event-category {
                    display: block;
                    margin-bottom: 8px;
                    color: #A39A92;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.3px;
                }

                #dna-journey .dna-event-title {
                    margin: 0 0 10px;
                    color: #292929;
                    font-size: 19px;
                    font-weight: 750;
                    line-height: 1.35;
                }

                #dna-journey .dna-event-description {
                    margin: 0;
                    color: #77716B;
                    font-size: 13px;
                    line-height: 1.8;
                }

                #dna-journey .dna-event-detail {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 15px;
                    padding-top: 12px;
                    border-top: 1px solid #F0ECE8;
                    color: #77716B;
                    font-size: 11px;
                    line-height: 1.5;
                }

                #dna-journey .dna-detail-dot {
                    width: 6px;
                    height: 6px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background: #B83B2D;
                }

                /* Previous / Next */

                #dna-journey .dna-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin-top: 28px;
                    padding-top: 20px;
                    border-top: 1px solid #EEEAE5;
                }

                #dna-journey .dna-control-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 9px 13px;
                    border: 1px solid #EAE5DE;
                    border-radius: 7px;
                    background: #FFFFFF;
                    color: #292929;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: .2s ease;
                }

                #dna-journey .dna-control-button:hover:not(:disabled) {
                    border-color: #B83B2D;
                    color: #B83B2D;
                    background: #FFF8F6;
                }

                #dna-journey .dna-control-button:disabled {
                    opacity: .35;
                    cursor: not-allowed;
                }

                #dna-journey .dna-progress {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #A39A92;
                    font-size: 11px;
                    font-weight: 800;
                }

                #dna-journey .dna-progress-current {
                    color: #B83B2D;
                }

                #dna-journey .dna-progress-line {
                    position: relative;
                    display: block;
                    width: 65px;
                    height: 3px;
                    overflow: hidden;
                    border-radius: 5px;
                    background: #EEEAE5;
                }

                #dna-journey .dna-progress-line::after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: var(--dna-progress, 33%);
                    height: 100%;
                    border-radius: 5px;
                    background: #B83B2D;
                    content: "";
                    transition: width .25s ease;
                }

                /* Footer */

                #dna-journey .dna-footer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    margin-top: 20px;
                }

                #dna-journey .dna-footer-mark {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #B83B2D;
                }

                #dna-journey .dna-footer p {
                    margin: 0;
                    color: #99918A;
                    font-size: 11px;
                    line-height: 1.6;
                }

                /* Focus */

                #dna-journey button:focus-visible {
                    outline: 3px solid rgba(184,59,45,.25);
                    outline-offset: 3px;
                }

                /* Mobile */

                @media (max-width: 650px) {

                    #dna-journey {
                        padding: 55px 15px;
                    }

                    #dna-journey .dna-heading {
                        margin-bottom: 28px;
                    }

                    #dna-journey .dna-navigation {
                        gap: 5px;
                        padding: 5px;
                    }

                    #dna-journey .dna-year-button {
                        min-height: 58px;
                        font-size: 17px;
                    }

                    #dna-journey .dna-year-label {
                        font-size: 9px;
                    }

                    #dna-journey .dna-content {
                        padding: 20px 15px;
                    }

                    #dna-journey .dna-content-header {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 12px;
                    }

                    #dna-journey .dna-year-number {
                        font-size: 27px;
                    }

                    #dna-journey .dna-event {
                        grid-template-columns: 1fr;
                        gap: 14px;
                        padding: 19px;
                    }

                    #dna-journey .dna-event-top {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }

                    #dna-journey .dna-event-number {
                        font-size: 21px;
                    }

                    #dna-journey .dna-event-title {
                        font-size: 17px;
                    }

                    #dna-journey .dna-controls {
                        gap: 8px;
                    }

                    #dna-journey .dna-control-button {
                        gap: 6px;
                        padding: 8px 9px;
                        font-size: 11px;
                    }

                    #dna-journey .dna-progress {
                        gap: 6px;
                        font-size: 10px;
                    }

                    #dna-journey .dna-progress-line {
                        width: 35px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {

                    #dna-journey *,
                    #dna-journey *::before,
                    #dna-journey *::after {
                        transition: none !important;
                        scroll-behavior: auto !important;
                    }

                }

            `
        }).appendTo('head');

    }

})();


// DONER NA ABAYA — GOOGLE MAPS

if ($('#doner-location-visual').length === 0) {

    const googleMapsLink =
        'https://www.google.com/maps/search/?api=1&query=Doner+na+Abaya+Astana';

    const section = $('<section>', {
        id: 'doner-location-visual'
    }).css({
        padding: '55px 0',
        background: '#FFFFFF'
    });

    const container = $('<div>', {
        class: 'container'
    });

    // Heading
    const heading = $('<div>').css({
        textAlign: 'center',
        marginBottom: '30px'
    });

    heading.append(
        $('<span>')
            .text('FIND US')
            .css({
                color: '#C9362A',
                fontWeight: '800',
                fontSize: '13px',
                letterSpacing: '3px'
            }),

        $('<h2>')
            .text('Find Doner na Abaya')
            .css({
                fontSize: 'clamp(30px, 4vw, 43px)',
                fontWeight: '800',
                color: '#292522',
                marginTop: '12px',
                marginBottom: '12px'
            }),

        $('<p>')
            .text('Explore our locations and find your nearest branch.')
            .css({
                color: '#77716B',
                fontSize: '16px'
            })
    );

    // Map container
const mapFrame = $('<div>').css({
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 'clamp(320px, 55vw, 560px)',
    overflow: 'hidden',
    borderRadius: '18px',
    border: '1px solid #DEDCD3',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    margin: '0 auto'
});

    // Real Google Maps
const map = $('<iframe>', {
    src: 'https://maps.google.com/maps?q=Doner%20na%20Abaya%20Astana&z=12&output=embed',
    loading: 'lazy',
    allowfullscreen: true,
    referrerpolicy: 'no-referrer-when-downgrade',
    title: 'Doner na Abaya locations on Google Maps'
}).css({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0',
    display: 'block'
});

    mapFrame.append(map);

    // Google Maps button
    const buttonWrapper = $('<div>').css({
        textAlign: 'center',
        marginTop: '25px'
    });

    const button = $('<a>', {
        href: googleMapsLink,
        target: '_blank',
        rel: 'noopener noreferrer'
    })
        .text('Explore Locations on Google Maps')
        .addClass('btn btn-danger rounded-3 px-4 py-3 fw-semibold');

    buttonWrapper.append(button);

    // Note
    const note = $('<p>')
        .text('Find our branches and get directions using Google Maps.')
        .css({
            textAlign: 'center',
            color: '#8A817A',
            fontSize: '13px',
            marginTop: '15px',
            marginBottom: '0'
        });

    container.append(
        heading,
        mapFrame,
        buttonWrapper,
        note
    );
    
    section.append(container);

$('#branch').after(section);}
});