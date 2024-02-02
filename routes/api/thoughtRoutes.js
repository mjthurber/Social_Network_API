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
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:ThoughtId/reactions
router.route('/:ThoughtId/reactions').post(createReaction)

// /api/Thoughts/:ThoughtId/reactions/:reactionID
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
