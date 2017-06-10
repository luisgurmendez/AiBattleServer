var UserActivityHistory = require('./models').UserActivityHistory;

add_user_activity_one_time_record = function(user_id, activity_id, timestampIn, timestampOut){
	var instance = new UserActivityHistory({'userId':user_id, 'activityId':activity_id, 'timestampIn':timestampIn, 'timestampOut':timestampOut});
	instance.save(function(err){
		if (err) throw err;
	})
}

add_user_activity_monthly_record = function(user_id, activity_id, year, month){
	var instance = new UserActivityHistory({'userId':user_id, 'activityId':activity_id, 'year':year, 'month':month});
	instance.save(function(err){
		if (err) throw err;
	})
}

var exports = module.exports = {};
exports.add_user_activity_one_time_record = add_user_activity_one_time_record;
exports.add_user_activity_monthly_record = add_user_activity_monthly_record;