const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of Users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

// Aggregate function for getting the overall grade using $avg
const grade = async (UserId) =>
  User.aggregate([
    // only include the given User by using $match
    { $match: { _id: new ObjectId(UserId) } },
    {
      $unwind: '$reactions',
    },
    {
      $group: {
        _id: new ObjectId(UserId),
        overallGrade: { $avg: '$reactions.score' },
      },
    },
  ]);

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const Users = await User.find();

      const UserObj = {
        Users,
        Email: await headCount(),
      };

      res.json(UserObj);
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

  // Add an reaction to a User
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $addToSet: { reactions: req.body } },
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
  // Remove reaction from a User
  async removeReaction(req, res) {
    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
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

