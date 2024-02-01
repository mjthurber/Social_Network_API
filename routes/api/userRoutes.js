const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/UserController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser);

// /api/Users/:UserId/thoughts
router.route('/:UserId/thoughts').post(addFriend);

// /api/Users/:UserId/thoughts/:FriendId
router.route('/:UserId/thoughts/:FriendId').delete(removeFriend);

module.exports = router;
