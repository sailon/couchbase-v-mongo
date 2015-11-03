'use strict';

var request = require('request');
var FeedParser = require('feedparser');
var Iconv = require('iconv').Iconv;
var zlib = require('zlib');
var fs = require('fs');

function fetch(feed) {
  // Define our streams
  var req = request(feed, {timeout: 10000, pool: false});
  req.setMaxListeners(50);

  var feedparser = new FeedParser();

  // Define our handlers
  req.on('error', done);
  req.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    var encoding = res.headers['content-encoding'] || 'identity'
      , charset = getParams(res.headers['content-type'] || '').charset;
    res = decompress(res, encoding);
    res = translate(res, charset);
    res.pipe(feedparser);
  });

  feedparser.on('error', done);
  feedparser.on('end', done);
  feedparser.on('readable', function() {
    var post;
    while (post = this.read()) {
		  appendObject(post);
    }
  });

}

function decompress (res, encoding) {
  var decompress;
  if (encoding.match(/\bdeflate\b/)) {
    decompress = zlib.createInflate();
  } else if (encoding.match(/\bgzip\b/)) {
    decompress = zlib.createGunzip();
  }
  return decompress ? res.pipe(decompress) : res;
}

function translate (res, charset) {
  var iconv;
  // Use iconv if its not utf8 already.
  if (!iconv && charset && !/utf-*8/i.test(charset)) {
    try {
      iconv = new Iconv(charset, 'utf-8');
      console.log('Converting from charset %s to utf-8', charset);
      iconv.on('error', done);
      // If we're using iconv, stream will be the output of iconv
      // otherwise it will remain the output of request
      res = res.pipe(iconv);
    } catch(err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function done(err) {
  if (err) {
    console.log(err, err.stack);
    return process.exit(1);
  }
  process.exit();
}

function appendObject(obj){
  var configFile = fs.readFileSync('../data/posts.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('../data/posts.json', configJSON);
}


fetch('http://feeds.feedburner.com/TechCrunch/fundings-exits');
fetch('http://feeds.feedburner.com/TechCrunch/social');
fetch('http://feeds.feedburner.com/Mobilecrunch');
fetch('http://feeds.feedburner.com/crunchgear');
fetch('http://feeds.feedburner.com/TechCrunch/gaming');
fetch('http://feeds.feedburner.com/TechCrunchIT');
fetch('http://feeds.feedburner.com/TechCrunch/greentech');
fetch('http://feeds.feedburner.com/TechCrunch/startups');

