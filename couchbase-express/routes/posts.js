var express = require('express');
var router = express.Router();
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
var bucket = cluster.openBucket('cvm');

// Setup Query
var N1qlQuery = couchbase.N1qlQuery;

/**
 * Loops through the tags passed in through the REST parameter and filters the result set.
 * @param {object | string} tagParam
 * @returns {string}
 */
function whereClause (tagParam) {
	var whereClause = tagParam.split(',').map(function (tag, k) {
			return (k > 0) ? ' AND "' + tag + '" IN cvm.categories' : ' WHERE "' + tag + '" IN cvm.categories';
		});

	return (whereClause + '').replace(/,/g, '');
}


/*
 * List posts
 * /api/posts?size={size}&page={page}&tag={tag1,tag2}
 */
router.get('/', function (req, res) {
	var options = {
		perPage: parseInt(req.query.size) || 10,
		page: parseInt(req.query.page) || 1
	};

	var str = 'SELECT DISTINCT title, author, date, categories, description FROM `cvm` ';

	if (req.query.tag) {
		str += whereClause(req.query.tag);
	}

	var pagination = (' GROUP BY title ORDER BY date DESC LIMIT ' + options.perPage + ' OFFSET ' + (options.page * options.perPage - options.perPage));
	str += pagination;

	var query = N1qlQuery.fromString(str);

	bucket.query(query,[],function(err,posts){
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
		perPage: parseInt(req.query.size) || 10
	};

	var str = 'SELECT _id, COUNT(*) as count FROM `cvm` UNNEST categories as _id ';

	if (req.query.tag) {
		str += whereClause(req.query.tag);
	}

	var aggregation = ' GROUP BY _id ORDER BY count DESC ';
	var pagination = ' LIMIT ' + options.perPage;
	str += aggregation + pagination;

	var query = N1qlQuery.fromString(str);

	bucket.query(query,[],function(err,posts){
		if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
	});
});


module.exports = router;