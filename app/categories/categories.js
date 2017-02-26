 angular.module('categories', [
     'eggly.models.categories'
 ])

 .config(function($stateProvider) {
     $stateProvider
         .state('eggly.categories', {
             url: '/',
             views: {
                 'categories@': {
                     templateUrl: 'app/categories/categories.tmpl.html',
                     controller: 'CategoriesListCtrl as categoriesListCtrl'
                 },
                 'bookmarks@': {
                     templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
                     controller: 'BookmarksListCtrl'
                 }
             }
         })
 })

 .controller('CategoriesListCtrl', function CategoriesListCtrl($scope, CategoriesModel) {
     var categoriesListCtrl = this;
     categoriesListCtrl.categories = CategoriesModel.getCategories();
 });