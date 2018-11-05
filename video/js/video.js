//DOM elements
let videoListEl = $('.video-list'),
   titleSearchBox = $('#titleSearchBox');

let videoData = {
   "videos": [
       {
           "id": "9XVasMSJSoU",
           "title": "The Developer Show (TL;DR 081)"
       },
       {
           "id": "Di7RvMlk9io",
           "title": "Top 10 Programming Languages to Learn in 2018"
       }
   ]
};

/**
* Initialise the app.
*/
function init() {
   displayVideos(videoData.videos);
   titleSearchBox.on('keyup', function () {
       displayVideosByTitle($(this).val());
   });
}

/**
* Display the videos that match a title.
* @param {String} title
*/
function displayVideosByTitle(title) {
   let filteredVideos = videoData.videos.filter(function (video) {
       return video.title.toLowerCase().includes(title.toLowerCase());
   });
   displayVideos(filteredVideos);
}

/**
* Get the HTML string for one video list item.
* @param {Object} video
*/
function getVideoItemHTML(video) {
   return `<div>
               <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg">
               <h3>${video.title}</h3>
           </div>`;
}
/**
* Display a list of videos.
*/
function displayVideos(videos) {
   let htmlString = '';
   $.each(videos, function (i, video) {
       htmlString = htmlString + getVideoItemHTML(video);
   });
   videoListEl.html(htmlString);
}

init();