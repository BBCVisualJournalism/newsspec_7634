define(['lib/news_special/bootstrap', 'nav', 'istats_controller'], function (news, nav, istatsController) {

    return {
        init: function (storyPageUrl) {
            istatsController.init();
            nav.init();
        }
    };

});