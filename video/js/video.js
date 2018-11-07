//DOM elements
let videoListEl = $('.video-list'),
    titleSearchBox = $('#titleSearchBox'),
    player = $('#player'),
    categoryListEl = $('.category-list'),
    modalCloseBtn = $('.modal-overlay__close'),
    avLink = $('.advanced-search'),
    avTitleSearchBox = $('#avTitleSearchBox'),
    avCategorySearchBox = $('#avCategorySearchBox'),
    avSubmitBtn = $('#avSubmitBtn'),
    avContainer = $('.advanced-search-container');

let videoData;

/**
* Initialise the app.
*/
function init() {
    // Get videos
    $.getJSON('json/videos.json', function(videos) {
        videoData = videos;
        displayVideos(videoData.videos);
        titleSearchBox.on('keyup', function () {
            let title = $(this).val();
            let filteredVideos = filterByTitle(videoData.videos, title);
            displayVideos(filteredVideos);
            // displayVideosByTitle($(this).val());
        });
    });
    // Get categories
    $.getJSON('json/categories.json', function(categories) {
        categoryData = categories;
        displayCategories(categoryData.categories);
    });
    // Advanced Search Link
    avLink.on('click', function() {
        avContainer.toggle();
    });
    avSubmitBtn.on('click', doAdvancedSearch);
};

/**
* Filters and displays videos that match a given title.
* @param {String} title
*/
// function displayVideosByTitle(title) {
//     let filteredVideos = videoData.videos.filter(function (video) {
//         return video.title.toLowerCase().includes(title.toLowerCase());
//     });
//     displayVideos(filteredVideos);
// };

/**
 * Filters an array of videos by title.
 * @param {Array} videos
 * @param {String} title
 */
function filterByTitle(videos, title) {
    return videos.filter(function (video) {
        return video.title.toLowerCase().includes(title.toLowerCase());
    });
};



/**
 * Filters and displays videos by a given category.
 * @param {Number} categoryid
 */
// function displayVideosByCategory(categoryid) {
//     let filteredVideos = videoData.videos.filter(function (video) {
//         return video.categoryId === categoryid;
//     });
//     displayVideos(filteredVideos);
// }

/**
 * Filters an array of videos by category id.
 * @param {Array} videos
 * @param {Number} categoryId
 */
function filterByCategory(videos, categoryId) {
    return videos.filter(function (video) {
        return video.categoryId == categoryId;
    });
}

/**
* Get the HTML string for one video list item.
* @param {Object} video
*/
function getVideoItemHTML(video) {
    return `<div data-id="${video.id}" class="video-item">
               <img src="https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg">
               <h3>${video.title}</h3>
           </div>`;
};

/**
* Get the HTML string for one category list item.
* @param {Object} video
*/
function getCategoryItemHTML(category) {
    return `<li data-categoryid="${category.id}" class="category-item">
                ${category.title}
            </li>`;
};

/**
 * Displays a list of videos.
* @param {Array} videos
*/
function displayVideos(videos) {
    let htmlString = '';
    $.each(videos, function (i, video) {
        htmlString = htmlString + getVideoItemHTML(video);
    });
    videoListEl.html(htmlString);
    // Add click event listener to each video item
    let videoItems = $('.video-item');
    videoItems.on('click', function() {
        var selectedVideo = $(this);
        var modalImg = $('.modal__img');
        playVideo($(this).data('id'));
        $('.closed').removeClass('closed');
    });
    modalCloseBtn.click(function() {
        $('.modal-overlay').addClass('closed');
        $('.modal').addClass('closed');
    });
};

/**
 * Displays list of video categories.
 * @param {Object} categories
 */
function displayCategories(categories) {
    let htmlString = '';
    $.each(categories, function (i, category) {
        htmlString = htmlString + getCategoryItemHTML(category);
    });
    categoryListEl.html(htmlString);
    // Add click event listener to each category item
    let categoryItems = $('.category-item');
    categoryItems.on('click', function() {
        if($(this).data('categoryid') === 0) {
            displayVideos(videoData.videos);
        }else{
            let categoryId = $(this).data('categoryid');
            let filteredVideos = filterByCategory(videoData.videos, categoryId);
            displayVideos(filteredVideos);
            // displayVideosByCategory($(this).data('categoryid'));
        }
    });
};

/**
 * Plays given video.
 * @param {String} videoId
 */
function playVideo(videoId) {
    let youtubeId = videoData.videos[videoId].youtubeId;
    player.attr('src', 'http://www.youtube.com/embed/' + youtubeId + '?autoplay=1');
};

/**
 * 
 */
function doAdvancedSearch() {
    let title = avTitleSearchBox.val();
    let category = avCategorySearchBox.val();
    let filteredVideos = filterByTitle(videoData.videos, title);
    filteredVideos = filterByCategory(filteredVideos, category);
    displayVideos(filteredVideos);
};

init();