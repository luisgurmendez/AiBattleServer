var User = require('./models').User;

create_user_instance = function(username, password, name, lastname, role, email, money){
	return new User({'username':username, 'password':password, 'name':name, 'lastname':lastname, 'role':role, 'email':email, 'money':money});
}

get_user_by_username = function(username, callback_function){
	User.findOne({'username':username}, function(err, user){
		if (err) throw err;
		callback_function(user);
	});
}

get_all_users = function(callback_function){
	User.find(function (err, users){
		if (err) throw err;
		callback_function(users);
	});
}

update_user_information = function(username, user){
	// Get user by username first
	get_user_by_username(username, function(actual_user){
		for (var field in User.schema.paths) {
           if ((field !== '_id') && (field !== '__v')) {
              if (user[field] !== undefined) {
                 actual_user[field] = user[field];
              }
           }  
        }
        actual_user.save(function(err){
        	if (err) throw err;
		});
	});
}

remove_user = function(username){
	User.remove({'username':username}, function(err){
		if (err) throw err;
	});
}

update_user_money = function(username, money){
	// Get user by username first
	get_user_by_username(username, function(actual_user){
		actual_user.money = money;
        actual_user.save(function(err){
        	if (err) throw err;
		});
	});
}

var exports = module.exports = {};

// Export methods
exports.create_user_instance = create_user_instance
exports.get_user_by_username = get_user_by_username;
exports.get_all_users = get_all_users;
exports.update_user_information = update_user_information;
exports.remove_user = remove_user;
exports.update_user_money = update_user_money;