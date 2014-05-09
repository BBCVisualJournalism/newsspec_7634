define(['lib/news_special/bootstrap', 'lib/news_special/template_engine', 'nav_item_template'], function (news, templateEngine, htmlNavItemTemplate) {

    var Nav = function () {

    };

    Nav.prototype = {
        
        init: function () {
            this.createNav();
            this.publishEvents();
            this.subscribeToEvents();
            this.showFirstTableAndHideOthers();
        },

        createNav: function () {
            news.$('.main').prepend('<div class="navigation selfclear"></div>');
            news.$('.main').append('<div class="navigation selfclear"></div>');
            this.navItems = this.createNavItems();
        },

        createNavItems: function () {
            var self = this,
                nav = news.$('.navigation'),
                tableHeader;

            news.$('.tableset__title').each(function () {
                tableHeader = news.$(this);
                nav.append(self.createNavItem(tableHeader));
            });

            return news.$('.navigation__item');
        },

        createNavItem: function (tableHeader) {
            var link  = tableHeader.attr('data-linkedTable'),
                title = tableHeader.html();
            
            return templateEngine(htmlNavItemTemplate, {
                link:  link,
                title: title
            });
        },

        publishEvents: function () {
            this.navItems.on('click', function (e) {
                var navItem = news.$(this),
                    tableID = navItem.attr('data-linkedTable');
                
                news.pubsub.emit('navigation:click', [navItem, tableID]);

                e.preventDefault();
                return false;
            });
        },

        subscribeToEvents: function () {
            var self = this;
            news.pubsub.on('navigation:click', function (navItem, tableID) {
                self.highlightNavItem(navItem);
                self.showTable(tableID);
            });
        },

        showFirstTableAndHideOthers: function () {
            var firstNavItem = this.navItems.first(),
                firstTable   = firstNavItem.attr('data-linkedTable');
            
            news.$('.tableset__title').hide();
            this.highlightNavItem(firstNavItem);
            this.showTable(firstTable);
        },

        highlightNavItem: function (navItem) {
            var linkedTable = navItem.attr('data-linkedtable'),
                navItemsThatLinkToTheTable = news.$('.navigation__item[data-linkedtable=' + linkedTable + ']');
            this.navItems.removeClass('navigation__item--selected');
            navItemsThatLinkToTheTable.addClass('navigation__item--selected');
        },

        showTable: function (tableID) {
            news.$('.table').hide();
            news.$('#' + tableID).show();
        }
    };

    return new Nav();
});