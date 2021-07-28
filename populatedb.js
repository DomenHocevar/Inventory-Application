#! /usr/bin/env node

console.log('This script populates some items and tags to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/database_name?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Item = require('./models/Item')
var Tag = require('./models/Tag')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var tags = [];


function tagCreate(name, description, cb) {
  let tagDetail = {name: name};
  if (description != false) tagDetail.description = description;
  const tag = new Tag(tagDetail);
  tag.save(function(err) {
    if (err) {
      cb(err, null);
    }

    console.log("New Tag: " + tag);
    tags.push(tag);
    cb(null, tag);
  });
}

function itemCreate(name, description, tags, price, numberInStock, cb) {
  let itemDetail = {name: name, price: price, numberInStock: numberInStock};
  if (description != false) itemDetail.description = description;
  if (tags != false) itemDetail.tags = tags;
  
  const item = new Item(itemDetail);

  item.save(function(err) {
    if (err) {
      cb(err, null);
    }

    console.log("New item: " + item);
    items.push(item);
    cb(null, item);
  });
}




function createTags(cb) {
    async.series([
        function(callback) {
          tagCreate("Computer", false, callback);
        },
        function(callback) {
          tagCreate("Laptop", "A mobile computer", callback)
        },
        function(callback) {
          tagCreate("Food", false, callback);
        },
        function(callback) {
          tagCreate("Croissant", "Sweetened pastry popular in French cuisine", callback);
        },
        function(callback) {
          tagCreate("Spaghetti", false, callback);
        },
        function(callback) {
          tagCreate("Homemade", "Made at home", callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate("Computo", "A decent computer", [tags[0]], 499.99, 41, callback);
        },
        function(callback) {
          itemCreate("Compunator", "A powerful computer", [tags[0]], 999.99, 7, callback);
        },
        function(callback) {
          itemCreate("Normal laptop", false, [tags[0], tags[1]], 599.99, 27, callback);
        },
        function(callback) {
          itemCreate("THE Croissant", false, [tags[2], tags[3], tags[5]], 1.05, 231, callback);
        },
        function(callback) {
          itemCreate("Trash", "Complete trash", false, 0.01, 99999, callback);
        },
        ],
        // optional callback
        cb);
}




async.series([
    createTags,
    createItems,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

