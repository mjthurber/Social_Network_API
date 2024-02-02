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
      const user = await User.findOne({ _id: req.params.UserId }).select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new User
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a User
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No User found with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },



  // Delete a User and remove them from the Thought
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({ _id: req.params.UserId });
      if (!deletedUser) {
        return res.status(404).json({ message: 'No such User exists' });
      }

      const updatedThought = await Thought.findOneAndUpdate(
        { Users: req.params.UserId },
        { $pull: { Users: req.params.UserId } },
        { new: true }
      );

      if (!updatedThought) {
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

  // Add a Friend to a User
  async addFriend(req, res) {
    console.log('You are adding a Friend');
    console.log(req.body);

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove Friend from a User
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};