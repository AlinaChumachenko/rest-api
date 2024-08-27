const {Schema, model} = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError.js');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    password: {
      type: String,
      minlength: 3,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  }, { versionKey: false, timestamps: true });

  userSchema.post('save', handleMongooseError);

  const User = model('user', userSchema);

  module.exports = User;