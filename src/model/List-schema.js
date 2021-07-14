const mongoose = require('mongoose');
const validate = require('validator');

const modelName = 'email-content';
const Schema = mongoose.Schema;

const email_contentSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    mobile: {
        type: Number,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: validate.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    email_delivered_status: { type: Boolean, default: false },
    content: { type: String },
    created_date: { type: Date , default: new Date()},
    deliver_date: { type: Date },
    email_delivered_flag: { type: Number, default: 0}
})

module.exports = mongoose.model(modelName, email_contentSchema)