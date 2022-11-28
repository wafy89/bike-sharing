const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	password: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	rentedBike: {
		type: mongoose.SchemaTypes.ObjectId,
		default: null,
	},
});

module.exports = mongoose.model('user', UserSchema);
