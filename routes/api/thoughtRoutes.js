const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router
  .route('/')
  .get(getThoughts)
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought)
  

// /api/Thoughts/:ThoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);
  module.exports = router;
