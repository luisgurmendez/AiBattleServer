var Activity = require('./models').Activity;

create_activity_instance = function(name, credit, dayOfTheWeek, hourIn, hourOut, coaches, description){
	return new Activity({'name':name, 'credit':credit, 'dayOfTheWeek':dayOfTheWeek, 'hourIn':hourIn, 
						 'hourOut':hourOut, 'coaches':coaches, 'description':description, 'regularStudents':[]});
}

get_activity_by_id = function(activity_id, callback_function){
	Activity.findById(activity_id, function(err, activity){
		if (err) throw err;
		callback_function(activity);
	});
}

get_all_activities = function(callback_function){
	Activity.find(function (err, activities){
		if (err) throw err;
		callback_function(activities);
	});
}

update_activity = function(activity_id, activity){
	// Get user by username first
	get_activity_by_id(activity_id, function(actual_activity){
		for (var field in Activity.schema.paths) {
           if ((field !== '_id') && (field !== '__v')) {
              if (activity[field] !== undefined) {
                 actual_activity[field] = activity[field];
              }
           }  
        }
        actual_activity.save(function(err){
        	if (err) throw err;
        });
	});
}

remove_activity = function(activity_id){
	Activity.remove({'_id':activity_id}, function(err){
		if (err) throw err;
	});
}

var exports = module.exports = {};
exports.create_activity_instance = create_activity_instance;
exports.get_activity_by_id = get_activity_by_id;
exports.get_all_activities = get_all_activities;
exports.update_activity = update_activity;
exports.remove_activity = remove_activity;