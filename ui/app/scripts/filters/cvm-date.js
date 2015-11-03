'use strict';

/**
 * @ngdoc filter
 * @name uiApp.filter:cvmDate
 * @function
 * @description
 * # cvmDate
 * Filter in the uiApp.
 */
angular.module('uiApp')
  .filter('cvmDate', function () {
    return function (input) {
    	var date = input.split('T')[0];
      return new Date(date).toLocaleDateString('us-en');
    };
  });
