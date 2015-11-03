'use strict';

/**
 * @ngdoc filter
 * @name uiApp.filter:cvmJoin
 * @function
 * @description
 * # cvmJoin
 * Filter in the uiApp.
 */
angular.module('uiApp')
  .filter('cvmJoin', function () {
    return function (input) {
      return input.join(', ');
    };
  });
