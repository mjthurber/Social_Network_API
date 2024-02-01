const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactions: {
      type: Schema.Types.ObjectId,
      ref: 'reaction',
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
