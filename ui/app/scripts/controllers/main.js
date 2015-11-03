'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('MainCtrl', function ($scope, posts, facets, PostDAO) {
    var _this = this;
    var tags = [];

    _this.facetSize = 10;
    _this.posts = posts;
    _this.facets = facets;

    /**
     * Add or remove constraint to the search
     * @param {string} tag
     */
		_this.toggleFacet = function (tag) {
			var tagIndex = _.indexOf(tags, tag); // Check if the toggled tag is being used

			if (tagIndex > -1) { // It's being used, remove it
				_.pullAt(tags, tagIndex);
			} else { // Not being used, add it
				tags.push(tag);
			}

			_updatePosts();
			_updateFacets();
		};

		/**
     * Returns true if the tag value is selected
     * @param {string} tag
     * @returns {boolean}
     */
		_this.isSelected = function (tag) {
			return (tags.indexOf(tag) > -1);
		};

		/**
     * Shows more facet values
     */
		_this.showMore = function () {
			_this.facetSize += 20;
			_updateFacets();
		};

		/**
     * Shows fewer facet values
     */
		_this.showLess = function () {
			_this.facetSize -= 20;
			_updateFacets();
		};

		function _updatePosts () {
			PostDAO.find(50, 1, (tags.join(',') || ''))
				.then(function (res) {
					_this.posts = res;
				});
		}

		function _updateFacets () {
			PostDAO.facets(_this.facetSize, tags.join(','))
				.then(function (res) {
					_this.facets = res;
				});
		}
  });
