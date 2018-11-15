// DOM Elements
let submitBtnEl = $('#submitBtn'),
    initialFormEl = $('#initialForm'),
    categoryDropdownEl = $('#categoryDropdown'),
    treatDropdownEl = $('#treatDropdown'),
    eventNameInputEl = ('#eventNameInput'),
    noOfAttendeesInputEl = $('#noOfAttendeesInput'),
    quoteResultEl = $('#quoteResult'),
    newQuoteBtnEl = $('#newQuoteBtn'),
    selectedCategoryEl, selectedTreatEl; // Might need to set these to null or something

// Global data variables
let treatCategoryData, treatData;


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
        let selectedCategoryElId = selectedCategoryEl.data('categoryid');
        getTreatsByCategory(selectedCategoryElId);
        treatDropdownEl.removeClass('hidden');
    });

    // Deal with screen change
    submitBtnEl.on('click', changeScreen);
    submitBtnEl.on('click', function (){
        // Need to check type of attendees input value
        selectedTreatEl = $('.treat-item:selected');
        console.log(selectedTreatEl);
        let totalPrice = parseInt(noOfAttendeesInputEl.val()) * selectedTreatEl.price;
        console.log(totalPrice);

    });
    newQuoteBtnEl.on('click', function() {
        treatDropdownEl.addClass('hidden');
        // Reset dropdown
        changeScreen();
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
    return `<option class="treat-item" data-treatId="${treat.id}">${treat.name}: $${(treat.price).toFixed(2)}</option>`;
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
    // Need to add click event listeners to each category item (new function from init!)
};




/**
 * Populates the treatData array with treat objects of the given category
 * @param {Object} category 
 */
function getTreatsByCategory(selectedCategoryElId) {
    treatData = [];
    $.getJSON('json/treats.json', function (allTreats) {
        // If in the given category, add to array
        treatData = allTreats.treats.filter(function (treat) {
            return treat.categoryId == selectedCategoryElId;
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
 * Changes the screen.
 */
function changeScreen() {
    initialFormEl.toggleClass('active');
    quoteResultEl.toggleClass('active');
};

/**
 * 
 */
function calcPrice () {

};

init();