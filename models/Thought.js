const { Schema, model } = require('mongoose');


// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: String,
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
