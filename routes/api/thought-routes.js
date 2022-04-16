const router = require('express').Router();

const { model } = require('mongoose');
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controller/thought-controller');

router.route('/')
    .get(getAllThoughts)
    .post(addThought);

router.route(':id')
    .get(getThoughtById)
    .post(updateThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;

