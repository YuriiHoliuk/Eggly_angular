angular.module('categories.bookmarks.edit', [

])

.config(function($stateProvider) {
    $stateProvider
        .state('eggly.categories.bookmarks.edit', {
            url: '/bookmarks/:bookmarkId/edit',
            templateUrl: 'app/categories/bookmarks/edit/bookmark-edit.tmpl.html',
            controller: 'BookmarksEditCtrl as bookmarksEditCtrl'

        })
})

.controller('BookmarksEditCtrl', function($state, $stateParams, BookmarksModel) {
    var bookmarksEditCtrl = this;

    function returnToBookmarks() {
        $state.go('eggly.categories.bookmarks', {
            category: $stateParams.category
        })
    }

    function cancelEditing() {
        returnToBookmarks();
    }

    function updateBookmark() {
        BookmarksModel.updateBookmark(bookmarksEditCtrl.editedBookmark);
        returnToBookmarks();
    }

    BookmarksModel.getBookmarkById($stateParams.bookmarkId).then(function(bookmark) {
        bookmarksEditCtrl.editedBookmark = angular.copy(bookmark);
    });

    bookmarksEditCtrl.cancelEditing = cancelEditing;
    bookmarksEditCtrl.updateBookmark = updateBookmark;
});