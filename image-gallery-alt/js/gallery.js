//DOM elements
let mainImgEl = $('.main-img'),
   thumbnailEls = $('.thumbnail'),
   selectedThumbnailEl = $('.selected-thumb'),
   leftBtn = $('.left-btn'),
   rightBtn = $('.right-btn');

let currentIndex = 0;

function init() {
   thumbnailEls.on('click', displayMainImage);
   leftBtn.on('click', () => {
       if(currentIndex != 0){
           currentIndex--;
       }else{
           currentIndex = thumbnailEls.length - 1;
       }
       $('#thumb-' + currentIndex).click();
   });
   rightBtn.on('click', () => {
       if(currentIndex != thumbnailEls.length -1){
           currentIndex++;
       }else{
           currentIndex = 0;
       }
       $('#thumb-' + currentIndex).click();
   });
}

function displayMainImage() {
   let thisThumbnailEl = $(this);
   mainImgEl.attr('src', thisThumbnailEl.attr('src').replace('120/80', '440/240'));
   thisThumbnailEl.addClass('selected-thumb');
   selectedThumbnailEl.removeClass('selected-thumb');
   selectedThumbnailEl = thisThumbnailEl;
}

init();