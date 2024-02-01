const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
  // Get a single User
  async getSingleUser(req, res) {
    try {
      const User = await User.findOne({ _id: req.params.UserId })
        .select('-__v');

      if (!User) {
        return res.status(404).json({ message: 'No User with that ID' })
      }

      res.json({
        User,
        grade: await grade(req.params.UserId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const User = await User.create(req.body);
      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove them from the Thought
  async deleteUser(req, res) {
    try {
      const User = await User.findOneAndRemove({ _id: req.params.UserId });

      if (!User) {
        return res.status(404).json({ message: 'No such User exists' });
      }

      const Thought = await Thought.findOneAndUpdate(
        { Users: req.params.UserId },
        { $pull: { Users: req.params.UserId } },
        { new: true }
      );

      if (!Thought) {
        return res.status(404).json({
          message: 'User deleted, but no Thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an Friend to a User
  async addFriend(req, res) {
    console.log('You are adding an Friend');
    console.log(req.body);

    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!User) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove Friend from a User
  async removeFriend(req, res) {
    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!User) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

