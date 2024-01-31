const { Schema, Types } = require('mongoose');

const friendSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        friendId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        },
        friendName: {
        type: String,
        required: true,
        trim: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
    },
    {
        toJSON: {
        getters: true,
        },
        id: false,
    }
    );

module.exports = friendSchema;