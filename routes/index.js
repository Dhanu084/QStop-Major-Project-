const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');

router.get('/',homeController.home);
router.use('/user',require('./users'));
router.use('/post',require('./posts'));
router.use('/comment',require('./comments'));
router.use('/likes',require('./likes'));
module.exports = router;