//DOM elements
let videoListEl = $('.video-list'),
    titleSearchBox = $('#titleSearchBox'),
    player = $('#player'),
    categoryListEl = $('.category-list');

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
            displayVideosByTitle($(this).val());
        });
    });
    // Get categories
    $.getJSON('json/categories.json', function(categories) {
        categoryData = categories;
        displayCategories(categoryData.categories);
    });
};

/**
* Filters and displays videos that match a given title.
* @param {String} title
*/
function displayVideosByTitle(title) {
    let filteredVideos = videoData.videos.filter(function (video) {
        return video.title.toLowerCase().includes(title.toLowerCase());
    });
    displayVideos(filteredVideos);
};

/**
 * Filters and displays videos by a given category.
 * @param {Number} categoryid
 */
function displayVideosByCategory(categoryid) {
    let filteredVideos = videoData.videos.filter(function (video) {
        return video.categoryId === categoryid;
    });
    displayVideos(filteredVideos);
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
        playVideo($(this).data('id'));
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
    console.log(categoryItems);
    categoryItems.on('click', function() {
        console.log('clicked');
        displayVideosByCategory($(this).data('categoryid'));
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

init();