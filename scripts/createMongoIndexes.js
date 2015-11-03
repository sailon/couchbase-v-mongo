'use strict';

var conn = new Mongo(); // Connect to MongoDB
var db = conn.getDB('cvm'); // Grab the cvm database

db.posts.createIndex( { categories: 1 } );
db.posts.createIndex( { pubDate: -1 } );
