const { Schema, Types } = require('mongoose');

function dateFormat(createdAtVal) {
  return createdAtVal.toDateString();
}


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),

    },
  },
    {
      toJSON: {
        getter: true,
      },
      id: false,
    }
 );

module.exports = reactionSchema;
