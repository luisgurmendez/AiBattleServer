var exports = module.exports = {};

var database_host = 'localhost';
var database_port = 27017;
var database_name = 'test';
exports.database_url = "mongodb://" + database_host + ":" + database_port + "/" + database_name;

