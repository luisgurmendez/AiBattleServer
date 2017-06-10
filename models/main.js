const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const conf = require('./configuration');
const models = require('./models');
const utils = require('./utils');
const user_functions = require('./user');
const activity_functions = require('./activity');
const user_activity_functions = require('./user_activity');

// Connects to database
mongoose.connect(conf.database_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// On open the function gets executed 
db.once('open', function(){
	/*
	instance = activity_functions.create_activity_instance('asfa', 234, 'Monday', 23, 2330, [], 'asfasf');
	utils.insert_instance(instance);
*/
/*
	user_activity_functions.add_user_to_activity_once(new ObjectId("593b6b52169b521c9419fde5"), new ObjectId("593b6d26897e6f182c97d389"), 235235235, 23523523);
*/


	user_activity_functions.get_all_activities_by_user(new ObjectId("593b6b52169b521c9419fde5"), function(activities){
		console.log(activities);
	});

});