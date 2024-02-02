const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a Thought
  async getSingleThought(req, res) {
    try {

      const thought = await Thought.findOne({ _id: req.params.ThoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a Thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndRemove({ _id: req.params.ThoughtId });
      if (!deletedThought) {
        res.status(404).json({ message: 'No Thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a Thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction stored in a single thought's `reactions` array field
  async createReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Pull and remove a reaction by the reaction's `reactionId` value
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};