// DOM Elements
let submitBtnEl = $('#submitBtn'),
    initialFormEl = $('#initialForm'),
    categoryDropdownEl = $('#categoryDropdown'),
    treatDropdownEl = $('#treatDropdown'),
    eventNameInputEl = $('#eventNameInput'),
    noOfAttendeesInputEl = $('#noOfAttendeesInput'),
    quoteSummaryEl = $('#quoteSummary'),
    quoteSummaryContentEl = $('#quoteSummaryContent'),
    priceSummaryEl = $('#priceSummary'),
    newQuoteBtnEl = $('#newQuoteBtn'),
    selectedCategoryEl;

// Global data variables
let treatCategoryData, treatData, selectedTreatId, noOfAttendees;


/**
 * Initialise app.
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
    // Screen change on submit
    submitBtnEl.on('click', function () {
        selectedTreatId = treatDropdownEl.val();
        noOfAttendees = noOfAttendeesInputEl.val();
        if(Math.floor(noOfAttendees) == +noOfAttendees && $.isNumeric(noOfAttendees)) {
            let totalPrice = calcPrice();
            displayQuoteSummaryScreen(totalPrice);
        } else {
            alert('Please enter an integer value of attendees!');
        }
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
    return `<option class="treat-item" value="${treat.id}">${treat.name}: $${treat.price.toFixed(2)}</option>`;
};

/**
 * Gets the HTML string for each quote summary heading.
 */
function getQuoteSummaryHTML() {
    let selectedTreat = treatData.filter(function (treat) {
        return treat.id == selectedTreatId;
    })[0];
    return `<h2 class="event-heading">${eventNameInputEl.val()}</h2>
            <h2 class="attendees-heading">${noOfAttendeesInputEl.val()}</h2>
            <h2 class="treat-heading">${selectedTreat.name}</h2>`;
};

/**
 * Gets the HTML string for the total price for quote.
 * @param {number} totalPrice
 */
function getPriceSummaryHTML(totalPrice) {
    console.log(typeof totalPrice);
    return `<h2>$${totalPrice.toFixed(2)}</h2>`;
};

/**
 * Adds an array of objects to a dropdown menu.
 * @param {Array} categories 
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
 * @param {Object} selectedCategoryId 
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
 * Populates the treat dropdown with all treat data.
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
    let quoteSummary = getQuoteSummaryHTML();
    quoteSummaryContentEl.html(quoteSummary);
    let priceSummary = getPriceSummaryHTML(totalPrice);
    priceSummaryEl.html(priceSummary);
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
 * Calculates the total price for selected treat given the number of attendees.
 */
function calcPrice() {
    let selectedTreatPrice = treatData.filter(function (treat) {
        return treat.id == selectedTreatId;
    })[0].price;
    let totalPrice = parseInt(noOfAttendees) * selectedTreatPrice;
    return totalPrice;
};

init();