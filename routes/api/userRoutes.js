const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/Users/:UserId/friends
router.route('/:UserId/friends').post(addFriend);

// /api/Users/:UserId/friends/:FriendId
router.route('/:UserId/friends/:friendId').delete(removeFriend);

module.exports = router;
