const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	lat: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	lng: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	rented: {
		type: mongoose.SchemaTypes.Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model('bike', UserSchema);
