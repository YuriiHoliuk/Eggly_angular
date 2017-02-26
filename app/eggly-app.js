angular.module('Eggly', [
    'ui.router',
    'categories',
    'categories.bookmarks'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('eggly', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/');


    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
})

.controller('MainCtrl', function($scope, $state) {

    //-------------------------------------------------------------------------------------------------
    // MODEL
    //-------------------------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------------------------
    // CURRENT ELEMENT
    //-------------------------------------------------------------------------------------------------

    $scope.currentCategory = null;

    function setCurrentCategory(category) {
        $scope.currentCategory = category;

        // $state.go('eggly.categories.bookmarks', { category: category.name })

        cancelCreating();
        cancelEditing();
    }

    function isCurrentCategory(category) {
        return $scope.currentCategory !== null && $scope.currentCategory.name === category.name;
    }

    function isSelectedBookmark(bookmarkId) {
        return $scope.isEditing && $scope.editedBookmark.id === bookmarkId;
    }

    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;
    $scope.isSelectedBookmark = isSelectedBookmark;

    //-------------------------------------------------------------------------------------------------
    // CREATING AND EDITING STATES
    //-------------------------------------------------------------------------------------------------

    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;
    }

    function startEditing(bookmark) {
        $scope.isCreating = false;
        $scope.isEditing = true;

        setEditedBookmark(bookmark);
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function cancelEditing() {
        $scope.isEditing = false;
    }

    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing && $scope.isCreating;
    }

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    $scope.startCreating = startCreating;
    $scope.startEditing = startEditing;
    $scope.cancelCreating = cancelCreating;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;

    //-------------------------------------------------------------------------------------------------
    // CRED
    //-------------------------------------------------------------------------------------------------

    //Creating

    function addBookmark(bookmark) {
        bookmark.id = $scope.bookmarks.length;
        bookmark.category = $scope.currentCategory.name;

        $scope.bookmarks.push(bookmark);

        $scope.newBookmark = {
            title: '',
            url: ''
        };

        cancelCreating();
    }

    $scope.addBookmark = addBookmark;

    //Editing

    function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {
        var index = _.findIndex($scope.bookmarks, function(b) {
            return b.id === bookmark.id;
        });

        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null;
        $scope.isEditing = false;
    }

    $scope.updateBookmark = updateBookmark;

    //Deleting

    function removeBookmark(bookmark) {
        _.remove($scope.bookmarks, function(b) {
            return b.id === bookmark.id;
        });
    }

    $scope.removeBookmark = removeBookmark;
});