'use strict';

var fs = require('fs');
var _ = require('lodash');
var posts = require('../data/posts.json');

var newPosts = posts.map(function (post) {
	return {
		title: post.title,
		description: post.description,
		summary: post.summary,
		date: post.date,
		pubdate: post.pubdate,
		pubDate: post.pubDate,
		link: post.link,
		guid: post.guid,
		author: post.author,
		comments: post.comments,
		origlink: post.origlink,
		image: {
		    url: post.image.url
		},
		source: post.source,
		categories: post.categories
	}
});

var configJSON = JSON.stringify(_.uniq(newPosts, 'title'));
fs.writeFileSync('../data/newPosts.json', configJSON);