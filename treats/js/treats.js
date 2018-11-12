let screenLinks = $('.screen-link'),
    screens = $('.screen');

    /**
     * Initialise app
     */
    function init() {
        screenLinks.click(changeScreen);
    };

    /**
     * Changes the screen
     */
    function changeScreen() {
        screenLinks.removeClass('active');
        $(this).addClass('active');
        let screenId = $(this).data('screen');
        screens.removeClass('active');
        $('#'  + screenId).addClass('active');
    };

    init();