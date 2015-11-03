'use strict';

/**
 * @ngdoc overview
 * @name uiApp
 * @description
 * # uiApp
 *
 * Main module of the application.
 */
angular
  .module('uiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-bind-html-compile', // Used to display the post HTML
    'restangular', // Used for making REST calls to Couchbase and Mongo
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          /**
           * Retrieves a list of blog posts
           * @param {object} PostDAO Data Acess Object for the posts
           * @returns {promise}
           */
          posts: function (PostDAO) {
            return PostDAO.find();
          },
          /**
           * Retrieves a list facet values and their counts
           * @param {object} PostDAO Data Acess Object for the posts
           * @returns {promise}
           */
          facets: function (PostDAO) {
            return PostDAO.facets();
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (Restangular) {
    Restangular.setBaseUrl('http://localhost:3000/api');
  });
