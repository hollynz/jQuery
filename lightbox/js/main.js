let imgGridImgEls = $('.image-grid__img'),
    modalCloseBtn = $('.modal-overlay__close');

$(document).ready(function () {

    imgGridImgEls.click(function() {
        var selectedImg = $(this);
        var modalImg = $('.modal__img');
        var newSrc = selectedImg.attr('src').replace('300/200', '560/360');
        console.log(newSrc);
        modalImg.attr('src', newSrc);
        $('.closed').removeClass('closed');
    });

    modalCloseBtn.click(function() {
        $('.modal-overlay').addClass('closed');
        $('.modal').addClass('closed');
    });

});