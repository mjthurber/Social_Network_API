const { Schema, Types } = require('mongoose');

const friendSchema = new Schema(
    {
        friendName: String,
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'friend',
            },
        ],
    },
    {
        toJSON: {
        getters: true,
        },
        id: false,
    }
    );

module.exports = friendSchema;