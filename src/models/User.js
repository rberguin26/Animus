const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	photo: {
		type: String,
		required: true,
		default: '/IMG/Img.png'
	},

	username: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	cell: {
		type: String,
		required: true
	},

	isTeacher: {
		type: Boolean,
		required: true,
		default: false
	},

	mainClass: {
		type: String,
		required: true
	},

	secondClass: {
		type: String,
		required: true
	}
}, {collection: 'users'});

mongoose.model('User', UserSchema);