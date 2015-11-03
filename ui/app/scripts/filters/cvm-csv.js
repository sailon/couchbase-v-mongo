'use strict';

/**
 * @ngdoc filter
 * @name uiApp.filter:cvmCsv
 * @function
 * @description
 * # cvmCsv
 * Filter in the uiApp.
 */
angular.module('uiApp')
  .filter('cvmCsv', function () {
    return function (input) {
      return input.replace(/,/g, ', ');
    };
  });
