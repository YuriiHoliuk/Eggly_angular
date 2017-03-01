angular.module('categories.bookmarks.create', [

])

.config(function($stateProvider) {
    $stateProvider
        .state('eggly.categories.bookmarks.create', {
            url: '/bookmarks/create',
            templateUrl: 'app/categories/bookmarks/create/bookmark-create.tmpl.html',
            controller: 'BookmarksCreateCtrl as bookmarksCreateCtrl'
        })
})

.controller('BookmarksCreateCtrl', function($state, $stateParams, BookmarksModel) {
    var bookmarksCreateCtrl = this;

    function returnToBookmarks() {
        $state.go('eggly.categories.bookmarks', {
            category: $stateParams.category
        })
    }

    function createBookmark() {
        BookmarksModel.createBookmark(bookmarksCreateCtrl.newBookmark);
        returnToBookmarks();
    }

    function cancelCreating() {
        returnToBookmarks();
    }

    function resetForm() {
        bookmarksCreateCtrl.newBookmark = {
            title: '',
            url: '',
            category: $stateParams.category
        }
    }

    bookmarksCreateCtrl.createBookmark = createBookmark;
    bookmarksCreateCtrl.cancelCreating = cancelCreating;

    resetForm();

});