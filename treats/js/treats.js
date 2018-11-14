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
        // treatCategoryData is an array of (category) objects
        treatCategoryData = categories;
        // Add categories to dropdown
        addCategoriesToDropdown(treatCategoryData.categories);
    });
    categoryDropdownEl.on('change', function () {
        // categoryEl is an object
        let categoryElId = $('.category-item:selected').data('categoryid');
        // console.log(categoryElId);
        getTreatsByCategory(categoryElId);
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
    return `<option class="category-item" data-categoryId="${category.id}">${category.name}</option>`;
};


/**
 * Gets the HTML string for each treat item.
 * @param {Object} treat
 */
function getTreatHTML(treat) {
    return `<option class="treat-item" data-treatId="${treat.id}">${treat.name}: ${treat.price}</option>`;
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
function getTreatsByCategory(categoryElId) {
    treatData = [];
    $.getJSON('json/treats.json', function (allTreats) {
        // If in the given category, add to array
        // $.each(allTreats.treats, function (i, treat) {
        //     if(treat.id == categoryElId) {
        //         treatData.push(treat);
        //     }
        // });
        // console.log(treatData);
        // Use filter!!! and grep???
        treatData = allTreats.treats.filter(function (treat) {
            return treat.id == categoryElId;
        });
        console.log(treatData);
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