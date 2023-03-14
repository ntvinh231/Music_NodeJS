const mongoose = require('mongoose');

const userDetails = new mongoose.Schema(
	{
		email: { type: String, unique: true },
		password: String,
	},
	{
		collection: 'UserInfo',
	}
);

const User = mongoose.model('UserInfo', userDetails);
module.exports = User;
