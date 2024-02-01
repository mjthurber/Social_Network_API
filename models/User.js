const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend');

// Schema to create user model
const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [friendSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }

);

const User = model('user', userSchema);

module.exports = User;
