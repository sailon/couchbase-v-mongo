'use strict';

/**
 * @ngdoc service
 * @name uiApp.PostDAO
 * @description
 * # PostDAO
 * Service in the uiApp.
 */
angular.module('uiApp')
  .service('PostDAO', function (Restangular) {
    var dao = {};

    /**
     * Find posts
     * @param {int} size
     * @param {int} page
     * @param {object} query
     * @returns {promise}
     */
    dao.find = function (size, page, query) {
      var params = {
        size: size || 25,
        page: page || 1,
        tag: query
      };

      return Restangular.all('posts').getList(params);
    };

    /**
     * Find facets
     * @param {int} size
     * @param {object} query
     * @returns {promise}
     */
    dao.facets = function (size, query) {
      var params = {
        size: size || 10,
        tag: query
      };

      return Restangular.all('posts').all('facets').getList(params);
    };

    return dao;
  });
