var UserActivity = require('./models').UserActivity;

add_user_to_activity_permanently = function(user_id, activity_id){
	var instance = new UserActivity({'userId':user_id, 'activityId':activity_id});
	instance.save(function(err){
		if (err) throw err;
	})
}

add_user_to_activity_once = function(user_id, activity_id, timestampIn, timestampOut){
	var instance = new UserActivity({'userId':user_id, 'activityId':activity_id, 'timestampIn':timestampIn, 'timestampOut':timestampOut});
	instance.save(function(err){
		if (err) throw err;
	})
}

remove_permanent_user_from_activity = function(user_id, activity_id){
	UserActivity.remove({'userId':user_id, 'activityId':activity_id}, function(err){
		if (err) throw err;
	});
}

remove_one_time_user_from_activity = function(user_id, activity_id, timestampIn, timestampOut){
	UserActivity.remove({'userId':user_id, 'activityId':activity_id, 'timestampIn':timestampIn, 'timestampOut':timestampOut}, function(err){
		if (err) throw err;
	});
}

get_user_permanent_activities = function(user_id, callback_function){
	UserActivity.find({'userId': user_id, 'timestampIn': {$exists: false}}, function(err, activities){
		if (err) throw err;
		callback_function(activities);
	});
}

get_user_one_time_activities = function(user_id, callback_function){
	UserActivity.find({'userId': user_id, 'timestampIn': {$exists: true}}, function(err, activities){
		if (err) throw err;
		callback_function(activities);
	});
}

get_all_activities_by_user = function(user_id, callback_function){
	UserActivity.find({'userId': user_id}, function(err, activities){
		if (err) throw err;
		callback_function(activities);
	});
}

var exports = module.exports = {};
exports.add_user_to_activity_permanently = add_user_to_activity_permanently;
exports.add_user_to_activity_once = add_user_to_activity_once;
exports.remove_permanent_user_from_activity = remove_permanent_user_from_activity;
exports.remove_one_time_user_from_activity = remove_one_time_user_from_activity;
exports.get_user_permanent_activities = get_user_permanent_activities;
exports.get_user_one_time_activities = get_user_one_time_activities;
exports.get_all_activities_by_user = get_all_activities_by_user;