const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {node 
      const Thoughts = await Thought.find();
      res.json(Thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try {
      const Thought = await Thought.findOne({ _id: req.params.ThoughtId });

      if (!Thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const Thought = await Thought.create(req.body);
      res.json(Thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const Thought = await Thought.findOneAndDelete({ _id: req.params.ThoughtId });

      if (!Thought) {
        res.status(404).json({ message: 'No Thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: Thought.Users } });
      res.json({ message: 'Thoughts and Users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const Thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!Thought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // create a reaction stored in a single thought's `reactions` array field
    async createReaction(req, res) {
      try {
        const Thought = await Thought.findOneAndUpdate(
          { _id: req.params.ThoughtId },
          { $push: { reactions: req.body } },
          { runValidators: true, new: true }
        );

        if (!Thought) {
          res.status(404).json({ message: 'No Thought with this id!' });
        }

        res.json(Thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // pull and remove a reaction by the reaction's `reactionId` value

    async deleteReaction(req, res) {
      try {
        const Thought = await Thought.findOneAndUpdate(
          { _id: req.params.ThoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );

        if (!Thought) {
          res.status(404).json({ message: 'No Thought with this id!' });
        }

        res.json(Thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

  };
