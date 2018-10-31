// HTML Elements
// var thumbnails = $('.thumbnails');
// var thumbnailImgs = $('.thumbnails img');
// var imageContainer = $('.image-container');
// var firstThumbnail = $('.thumbnails img:first-child');
// var selectedThumbnail = $('.outline');
// var mainImg = $('.main-image');
// var leftArrow = $('.fa-chevron-left');
// var rightArrow = $('.fa-chevron-right');

// Image array
var imgArr = [
    'img/square100.png',
    'img/square200.png',
    'img/square300.png'
];

// Index counter to keep track of which thumbnail is selected
var selected = 0;

// Loads array of images and sets attributes
function loadImgArray(imgArr) {
    // Add thumbnails
    for (var i = 0; i < imgArr.length; i++) {
        var img = new Image();
        img.src = imgArr[i];
        $('.thumbnails').append(img);
    }
    var count = 0, thumbnails = $('.thumbnails img');
    thumbnails.each(function () {
        var dataId = $(this).attr('data-id');
        if (typeof dataId === typeof undefined) {
            $(this).attr('data-id', count++);
        };
    });
    // Load main image
    var mainImg = new Image();
    mainImg.src = imgArr[0];
    mainImg.className = "main-image";
    $('.image-container').prepend(mainImg);
    $('.thumbnails img:first-child').toggleClass('outline');
};

// Update selected thumbnail
function updateSelected(selected) {
    $('.outline').toggleClass('outline');
    // Get the element with data-id === selected
    var updatedImg = $(`img[data-id=${selected}]`);
    updatedImg.toggleClass('outline');
    var newSrc = updatedImg.attr('src');
    $('.main-image').attr('src', newSrc);
    return;
}

// When window is loaded, loads images and sets event listeners
$(document).ready(function () {
    loadImgArray(imgArr);
    $('.thumbnails img').click(function () {
        $('.outline').toggleClass('outline');
        $(this).toggleClass('outline');
        var newSrc = $(this).attr('src');
        $('.main-image').attr('src', newSrc);
    });
    $('.fa-chevron-left').click(function () {
        if (selected == 0) {
            selected = imgArr.length - 1;
            updateSelected(selected);
            return;
        }
        selected--;
        updateSelected(selected);
        return;
    });
    $('.fa-chevron-right').click(function () {
        if (selected == imgArr.length - 1) {
            selected = 0;
            updateSelected(selected);
            return;
        }
        selected++;
        updateSelected(selected);
        return;
    });
});