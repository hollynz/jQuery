// DOM Elements
let submitBtnEl = $('#submitBtn'),
    initialFormEl = $('#initialForm'),
    categoryDropdownEl = $('#categoryDropdown'),
    treatDropdownEl = $('#treatDropdown'),
    eventNameInputEl = $('#eventNameInput'),
    noOfAttendeesInputEl = $('#noOfAttendeesInput'),
    quoteSummaryEl = $('#quoteSummary'),
    quoteSummaryContentEl = $('#quoteSummaryContent'),
    newQuoteBtnEl = $('#newQuoteBtn'),
    selectedCategoryEl; // Might need to set these to null or something

// Global data variables
let treatCategoryData, treatData, selectedTreatId;


/**
 * Initialise app
 */
function init() {
    treatData = null;
    selectedCategoryEl = null;
    selectedTreatEl = null;
    // Get treat categories
    $.getJSON('json/categories.json', function (categories) {
        // treatCategoryData is an array of (category) objects
        treatCategoryData = categories;
        // Add categories to dropdown
        addCategoriesToDropdown(treatCategoryData.categories);
    });
    categoryDropdownEl.on('change', function () {
        selectedCategoryEl = $('.category-item:selected');
        let selectedCategoryId = selectedCategoryEl.data('categoryid');
        getTreatsByCategory(selectedCategoryId);
        treatDropdownEl.removeClass('hidden');
    });

    // Deal with screen change on submit
    submitBtnEl.on('click', function () {
        // Need to check type of attendees input value before calling calcPrice!!!!!!!!!!!!
        let totalPrice = calcPrice();
            displayQuoteSummaryScreen(totalPrice);
    });
    // Reset initial form
    newQuoteBtnEl.on('click', function () {
        displayNewQuoteScreen();
    });
};


/**
 * Gets the HTML string for each treat category item.
 * @param {Object} category
 */
function getCategoryHTML(category) {
    return `<option class="category-item" data-categoryId="${category.id}">${category.name}</option>`;
};


/**
 * Gets the HTML string for each treat item.
 * @param {Object} treat
 */
function getTreatHTML(treat) {
    return `<option class="treat-item" value="${treat.id}">${treat.name}: $${(treat.price).toFixed(2)}</option>`;
};

/**
 * Gets the HTML string for each quote summary heading.
 * @param {string} text
 */
function getSummaryHTML(totalPrice) {
    return `<h1 class="event-heading">${eventNameInputEl.val()}</h1>
            <h2>$${totalPrice}</h2>
            <h2>${eventNameInputEl.val()}</h2>
            <h2>${eventNameInputEl.val()}</h2>`;
};


/**
 * Adds an array of objects to a dropdown menu.
 * @param {Array} data 
 */
function addCategoriesToDropdown(categories) {
    let htmlString = '';
    $.each(categories, function (i, category) {
        htmlString += getCategoryHTML(category);
    });
    categoryDropdownEl.html(`<option value="" disabled selected>Select category</option>` + htmlString);
};



/**
 * Populates the treatData array with treat objects of the given category
 * @param {Object} category 
 */
function getTreatsByCategory(selectedCategoryId) {
    treatData = [];
    $.getJSON('json/treats.json', function (allTreats) {
        // If in the given category, add to array
        treatData = allTreats.treats.filter(function (treat) {
            return treat.categoryId == selectedCategoryId;
        });
        addTreatsToDropdown();
    });
};

/**
 * 
 */
function addTreatsToDropdown() {
    let htmlString = "";
    $.each(treatData, function (i, treat) {
        htmlString += getTreatHTML(treat);
    });
    treatDropdownEl.html(htmlString);
};


/**
 * Changes to quote summary screen.
 */
function displayQuoteSummaryScreen(totalPrice) {
    let htmlString = getSummaryHTML(totalPrice);
    quoteSummaryContentEl.html(htmlString);
    changeScreen();
};


/**
* Changes to new quote screen.
*/
function displayNewQuoteScreen() {
    treatDropdownEl.addClass('hidden');
    eventNameInputEl.val('');
    noOfAttendeesInputEl.val('');
    categoryDropdownEl.val('');
    treatDropdownEl.val('');
    changeScreen();
};

/**
 * Changes the screen.
 */
function changeScreen() {
    initialFormEl.toggleClass('active');
    quoteSummaryEl.toggleClass('active');
};

/**
 * 
 */
function calcPrice() {
    selectedTreatId = treatDropdownEl.val();
    let selectedTreatPrice = treatData.filter(function (treat) {
        return treat.id == selectedTreatId;
    })[0].price;
    let noOfAttendees = noOfAttendeesInputEl.val();
    let totalPrice = parseInt(noOfAttendees) * selectedTreatPrice;
    return totalPrice;
};

init();