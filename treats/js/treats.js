// DOM Elements
let submitBtnEl = $('#submitBtn'),
    initialFormEl = $('#initialForm'),
    categoryDropdownEl = $('#categoryDropdown'),
    categoryDropdownItemEl = $('#categoryItem'),
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
        // treatCategoryData is an array of (category) objects
        treatCategoryData = categories;
        // Add categories to dropdown
        addCategoriesToDropdown(treatCategoryData.categories);
    });
    // FUNCTION: Add event listener to each category item and populate treatData dropdown
    // addCategoryClickListeners();
    categoryDropdownItemEl.on('click', function() {
        console.log("it werks");
        // https://jsfiddle.net/mjdwebdesign/v31kdggj/
    });

    // Deal with screen change
    submitBtnEl.click(changeScreen);
    newQuoteBtnEl.click(changeScreen);
};

/**
 * Gets the HTML string for each treat category item.
 * @param {Object} category
 */
function getCategoryHTML(category) {
    return `<option id="categoryItem" categoryId="${category.id}">${category.name}</option>`;
};

/**
 * Gets the HTML string for each treat item.
 * @param {Object} treat
 */
function getTreatHTML(treat) {
    return `<option id="treatItem" treatId="${treat.id}">${treat.name} ${treat.price}</option>`;
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
 * 
 */
function addCategoryClickListeners() {
    // ??????????????????
};



/**
 * Changes the screen.
 */
function changeScreen() {
    initialFormEl.toggleClass('active');
    quoteResultEl.toggleClass('active');
};

init();