'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('NavController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };
  });
