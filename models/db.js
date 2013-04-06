var settings = require('../settings.js');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connetion = mongodb.Connetion;
var Server = mongodb.Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port, {}), {safe:false});