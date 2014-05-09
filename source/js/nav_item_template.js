define(function () {
    return '<a href="#" class="navigation__item" data-linkedTable="<%= link %>">' +
                '<span class="navigation__item__icon navigation__item__icon--<%= link %>"></span>' +
                '<span class="navigation__item__text"><%= title %></span>' +
            '</a>';
});