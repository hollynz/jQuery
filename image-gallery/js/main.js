// Image array
var imgArr = [
    'img/square100.png',
    'img/square200.png',
    'img/square300.png'
];

function loadImgArray(imgArr) {
    // Add thumbnails
    for(var i = 0; i < imgArr.length; i++) {
        var img = new Image();
        img.src = imgArr[i];
       $('.thumbnails').append(img);
    }
    // Add main image
    var mainImg = new Image();
    mainImg.src = imgArr[0];
    mainImg.className = "main-image";
    $('.image-container').prepend(mainImg);
};

$(document).ready(function () {
    loadImgArray(imgArr);
    $('.thumbnails img').click(function () {
        if(!$(this).hasClass('outline')) {
            $('.outline').toggleClass('outline');
            $(this).toggleClass('outline');
        }
        var oldSrc = $('.main-image').attr('src');
        var newSrc = $(this).attr('src');
        $('.main-image').attr('src', newSrc);
    });
});