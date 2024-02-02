const { schema, types } = require('mongoose');

const friendSchema = new schema(
    {
        friendId: {
        type: schema.Types.ObjectId,
        default: () => new types.ObjectId(),
        },
        friendName: {
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
        getters: true,
        },
        id: false,
    }
    );

    module.exports = friendSchema;