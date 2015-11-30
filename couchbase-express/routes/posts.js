var express = require('express');
var router = express.Router();
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
var bucket = cluster.openBucket('cvm');

// Setup Query
var N1qlQuery = couchbase.N1qlQuery;


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

	var str = 'SELECT title, author, date, categories, description FROM `cvm` ';
	if (req.query.tag) {
		var whereClause = req.query.tag.split(',').map(function (tag, k) {
			return (k > 0) ? ' AND "' + tag + '" IN categories' : ' WHERE "' + tag + '" IN categories';
		});
		whereClause = (whereClause + '').replace(/,/g, '');
		str += whereClause;
	}

	var pagination = (' LIMIT ' + options.perPage + ' OFFSET ' + (options.page * options.perPage - options.perPage));
	str += pagination;

	console.log('Query: ' + str);
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
		criteria: {},
		perPage: parseInt(req.query.size) || 10
	};

	var str = 'SELECT _id, COUNT(*) as count FROM `cvm` UNNEST categories as _id GROUP BY _id ORDER BY count DESC';
	// if (req.query.tag) {
	// 	var whereClause = req.query.tag.split(',').map(function (tag, k) {
	// 		return (k > 0) ? ' AND "' + tag + '" IN categories' : ' WHERE "' + tag + '" = tag';
	// 	});
	// 	whereClause = (whereClause + '').replace(/,/g, '');
	// 	str += whereClause;
	// }

	var pagination = ' LIMIT ' + options.perPage;
	str += pagination;

	console.log('Query: ' + str);
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