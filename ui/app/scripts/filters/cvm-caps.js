'use strict';

/**
 * @ngdoc filter
 * @name uiApp.filter:cvmCaps
 * @function
 * @description
 * # cvmCaps
 * Filter in the uiApp.
 */
angular.module('uiApp')
  .filter('cvmCaps', function () {
    return function (input) {
      return _.capitalize(input);
    };
  });
