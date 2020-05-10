const express = require('express');
const router = express.Router();
const postsController = require('../../controller/posts_controller');
const passport = require('passport');
router.post('/create',passport.checkAuthetication,postsController.createPost);
router.get('/single/:id',postsController.single_post);
router.get('/delete/:id',postsController.deletePost);
module.exports = router;