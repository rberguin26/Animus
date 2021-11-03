const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
	label: {
		type: String,
		required: true
	}
}, {collection : 'class'})

mongoose.model('Class', ClassSchema);