#! /usr/bin/env node

console.log('This script removes all items and tags from the database');

var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const async = require('async');
const Item = require('./models/Item');
const Tag = require('./models/Tag');

async.parallel([
    function(callback) {
        Item.deleteMany(callback);
    },
    function(callback) {
        Tag.deleteMany(callback);
    }
], function(err) {
    if (err)
    {
        console.log(err);
    }

    mongoose.connection.close();
});
