const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addReaction,
  removeReaction,
} = require('../../controllers/UserController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser);

// /api/Users/:UserId/thoughts
router.route('/:UserId/thoughts').post(addReaction);

// /api/Users/:UserId/thoughts/:ReactionId
router.route('/:UserId/thoughts/:ReactionId').delete(removeReaction);

module.exports = router;
