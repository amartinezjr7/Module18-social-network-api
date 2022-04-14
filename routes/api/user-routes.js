const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controller/user-controller');

router.route('/').get().post();

router.route

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

router.route('/')
    .get(getAllUsers)
    .post(createUser)

module.exports = router;