var exports = module.exports = {};

exports.insert_instance = function(instance){
	var element = instance;
	instance.save(function (err, element){
		if (err) throw err;
		return;
	})
}

