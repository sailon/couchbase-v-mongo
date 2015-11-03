var express = require('express');
var mongoose = require('mongoose');
var Posts = mongoose.model('Post');
var router = express.Router();

/*
 * List posts
 * /api/posts?size={size}&page={page}&tag={tag1,tag2}
 */
router.get('/', function (req, res) {
	var options = {
		criteria: {},
		perPage: parseInt(req.query.size) || 10,
		page: parseInt(req.query.page) || 1
	};

	/*
	 * Formatting the query.
	 * For a single tag:
	 *	{ categories: :tag }
	 *
	 * For multiple tags, use logical AND:
	 *	{ $and: [ { categories: :tag }, { categories: :tag } ] }
	*/
	if (req.query.tag) {
		var tags = req.query.tag.split(',').map(function (tag) {
			return { categories: tag }
		});
		options.criteria = (tags.length > 1) ? { $and: tags } : tags[0];
	}

	console.log(options);
  return Posts.list(options, function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});

/*
 * List facets
 * /api/posts/facets?size={size}&tag={tag1,tag2}
 */
router.get('/facets', function (req, res) {
	var options = {
		criteria: {},
		perPage: parseInt(req.query.size) || 10
	};

	if (req.query.tag) {
		var tags = req.query.tag.split(',').map(function (tag) {
			return { categories: tag }
		});
		options.criteria = (tags.length > 1) ? { $and: tags } : tags[0];
	}

  return Posts.facets(options, function (err, facets) {
  	if (!err) {
  		return res.send(facets);
  	} else {
  		return console.log(err);
  	}
  });
});


module.exports = router;