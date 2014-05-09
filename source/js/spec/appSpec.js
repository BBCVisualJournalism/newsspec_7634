define(['lib/news_special/bootstrap', 'app', 'spec/helpers/fixtureData'],  function (news, app, fixtureData) {

    news.$('body').append(fixtureData);

    describe('the non JS version', function () {
        it('should have all the tables visible without the need for interaction', function () {
            iExpect(all('.table').toHaveTheDisplayProperty('table'));
        });

        it('should have headings before each table, to provide context', function () {
            iExpect(all('.tableset__title').toHaveTheDisplayProperty('block'));
        });
    });

    describe('calling the javascript', function () {
        // hack - otherwise app.init() seems to run before the nonJS tests are called.
        setTimeout(function () {
            app.init();
        }, 100);

        waitsFor(function () {
            return news.$('.navigation').length > 0;
        }, 'the navigation to have been generated', 3000);
    });

    describe('the interactive version default view', function () {

        it('should hide the table headings', function () {
            iExpect(all('.tableset__title').toHaveTheDisplayProperty('none'));
        });

        it('should only show the first table', function () {
            var firstTableToBeVisible  = news.$('.table:first').toHaveTheDisplayProperty('table'),
                otherTablesToBeHidden  = news.$('.table:not(:first)').toHaveTheDisplayProperty('none');

            iExpect(firstTableToBeVisible && otherTablesToBeHidden);
        });

        it('should have a corresponding nav element for each table', function () {
            var navigationLinks = all('.navigation:first .navigation__item').attributeArray('data-linkedtable'),
                tables          = all('.table').attributeArray('id'),
                index;
            
            expect(navigationLinks.length).toEqual(tables.length);

            index = navigationLinks.length;
            while (index-- > 0) {
                expect(navigationLinks[index]).toEqual(tables[index]);
            }
        });
    });

    describe('the interactive version behaviour', function () {

        it('should let the user switch tables by clicking the navigation', function () {
            var secondNavElement = news.$('.navigation__item:nth-child(2)'),
                linkedTable      = secondNavElement.attr('data-linkedtable');

            secondNavElement.click();

            var linkedTableToBeVisible = news.$('#' + linkedTable).toHaveTheDisplayProperty('table'),
                otherTablesToBeHidden  = news.$('.table:not(#' + linkedTable + ')').toHaveTheDisplayProperty('none');

            iExpect(linkedTableToBeVisible && otherTablesToBeHidden);
        });

    });


    // helper methods

    var iExpect = function (conditional) {
        expect(conditional).toBeTruthy();   // the iExpect call is more readable than native jasmine
    };

    var all = function (selector) {
        return news.$(selector);
    };

    news.$.fn.extend({
        toHaveTheDisplayProperty: function (property) {
            var hasTheProperty = true;
            this.each(function () {
                if (news.$(this).css('display') !== property) {
                    hasTheProperty = false;
                }
            });
            return hasTheProperty;
        },
        attributeArray: function (attribute) {
            var results = [];
            this.each(function () {
                results.push(news.$(this).attr(attribute));
            });
            return results;
        }
    });
});