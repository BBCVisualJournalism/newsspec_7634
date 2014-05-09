define(['lib/news_special/bootstrap'], function (news) {

    return {
        init: function () {
            news.pubsub.emit('istats', ['App initiated', true]);
            this.listenForEvents();
        },

        listenForEvents: function () {
            news.pubsub.on('navigation:click', function (navItem, tableID) {
                news.pubsub.emit('istats', ['Navigation clicked', tableID + ' selected.']);
            });
        }
    };

});