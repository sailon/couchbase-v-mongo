'use strict';

var fs = require('fs');
var posts = require('../data/posts.json');
var _ = require('lodash');

var cats = posts.reduce(function (collection, post) {
	return _.union(collection, post.categories);
});

var catsJSON = JSON.stringify(cats.sort());
fs.writeFileSync('../data/cats.json', catsJSON);