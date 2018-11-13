// DOM Elements
let submitBtnEl = $('#submitBtn'),
    initialFormEl = $('#initialForm'),
    categoryDropdownEl = $('#categoryDropdown'),
    treatDropdownEl = $('#treatDropdown'),
    quoteResultEl = $('#quoteResult'),
    newQuoteBtnEl = $('#newQuoteBtn');

// Global data variables
let treatCategoryData, treatData;


/**
 * Initialise app
 */
function init() {
    treatData = null;
    // Get treat categories
    $.getJSON('json/categories.json', function (categories) {
        treatCategoryData = categories;
        // Add to dropdown
        addCategoriesToDropdown(treatCategoryData.categories);
    });
    // FUNCTION: Add event listener to each category item and populate treatData dropdown


    // TEST
    // getTreatsByCategory(treatCategoryData.category);
    // addTreatsToDropdown;




    // Deal with screen change
    submitBtnEl.click(changeScreen);
    newQuoteBtnEl.click(changeScreen);
};

/**
 * Gets the HTML string for each treat category item.
 * @param {Object} category
 */
function getCategoryHTML(category) {
    return `<option categoryId="${category.id}">${category.name}</option>`;
};

/**
 * Gets the HTML string for each treat item.
 * @param {Object} treat
 */
function getTreatHTML(treat) {
    return `<option treatId="${treat.id}">${treat.name} ${treat.price}</option>`;
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
    categoryDropdownEl.html(htmlString);
    // Need to add click event listeners to each category item (new function from init!)
};

/**
 * Populates the treatData array with treat objects of the given category
 * @param {Object} category 
 */
function getTreatsByCategory(category) {
    treatData = [];
    $.getJSON('json/treats.json', function (treats) {
        // If in the given category, add to dropdown
        $.each(treats, function (i, treat) {
            if(treat.id === category.id) {
                treatData.push(treat);
            }
        });
    });
}

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
 * Changes the screen.
 */
function changeScreen() {
    initialFormEl.toggleClass('active');
    quoteResultEl.toggleClass('active');
};

init();