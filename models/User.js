const { Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,

  },
}
);

const User = model('User', UserSchema);

module.exports = User;