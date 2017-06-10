var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema;
var activitySchema;
var userActivitySchema;
var userActivityHistorySchema;

create_schemas = function(){
	userSchema = new Schema({ 
		username: {type: String, unique: true, required: true},
		password: {type: String, required: true},
		name: String,
		lastname: String,
		role: String,
		email: String,
		money: Number
	});

	activitySchema = new Schema({
		name: {type: String, required: true},
		coaches: [String],
		description: String,
		credit: {type: Number, required: true},
		dayOfTheWeek: {type: String, required: true},
		hourIn: {type: Number, required: true}, // Minutes from midnight
		hourOut: {type: Number, required: true} // Minutes from midnight
	});

	// timestampIn & timestampOut are only filled in when the user just takes the class once
	userActivitySchema = new Schema({
		userId: {type: mongoose.Schema.ObjectId, required: true},
		activityId: {type: mongoose.Schema.ObjectId, required: true},
		timestampIn: Date,
		timestampOut: Date
	});

	// It is used to keep history of each activity done by each student
	userActivityHistorySchema = new Schema({
		userId: {type: mongoose.Schema.ObjectId, required: true},
		activityId: {type: mongoose.Schema.ObjectId, required: true},
		timestampIn: Date, 
		timestampOut: Date,
		year: Number,
		month: Number
	});

}

// Get exports dictionary
var exports = module.exports = {};

create_models = function(){
	// Assign value to key User
	exports.User = mongoose.model('user', userSchema);
	exports.Activity = mongoose.model('activity', activitySchema);
	exports.UserActivity = mongoose.model('user_activity', userActivitySchema);
	exports.UserActivityHistory = mongoose.model('user_activity_history', userActivityHistorySchema);
}

create_schemas();
create_models();

