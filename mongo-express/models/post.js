
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Post Schema
 */

var PostSchema = new Schema({
  title: {type : String, default : '', trim : true},
  description: {type : String, default : '', trim : true},
  summary: {type : String, default : '', trim : true},
  pubdate  : {type : Date, default : Date.now},
  pubDate  : {type : Date, default : Date.now},
  link: {type : String, default : '', trim : true},
  guid: {type : String, default : ''},
  author: {type : String, default : '', trim : true},
  comments: {type : String, default : '', trim : true},
  origlink: {type : String, default : '', trim : true},
  image: {
    url: {type : String, default : '', trim : true}
  },
  source: {type : String, default : '', trim : true},
  categories: []
});

/**
 * Statics
 */

PostSchema.statics = {

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'pubdate': -1}) // sort by date, most recent first
      .limit(options.perPage)
      .skip((options.perPage * options.page) - options.perPage) // start on page 1
      .exec(cb);
  },

  /**
   * List facets
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  facets: function (options, cb) {

    this.aggregate([
      { $match: options.criteria },
      { $unwind: "$categories" },
      { $project: {
        tag: "$categories"
      }},
      { $group: {
          _id: "$tag",
          count: { $sum: 1 }
      }},
      { $sort: {
          count: -1,
          _id: 1
      }},
      { $limit: options.perPage }
    ]).exec(cb);
  }
}

mongoose.model('Post', PostSchema); // Expose the model
