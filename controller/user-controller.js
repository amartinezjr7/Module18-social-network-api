const {User} = require('../models');
const { param } = require('../routes/api/user-routes');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).JSON(err);
            });
    },

    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).JSON({message:'No user found woth this id!'});
            }
            res.JSON(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).JSON(err);
        });
    },
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.JSON(dbUserData))
            .catch(err =>{
                res.status(400).JSON(err);})
    }, 

    updateUser({ params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404)({message: 'No user found with this id!'});
                return;
            }
            res.JSON(dbUserData);
        })
        .catch(err => res.status(400).JSON(err));
    },

    deleteUser({ params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404)({message: 'No user found with this id!'});
                return;
            }
            res.JSON(dbUserData);
        })
        .catch(err => res.status(400).JSON(err));
    },

        addFriend({ params }, res) {
            User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this id!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },
 
        removeFriend({ params }, res) {
            User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this id!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },
}

module.exports = userController;