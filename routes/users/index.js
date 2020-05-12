const express = require('express');
const router = express.Router();
const userController = require('../../controller/user_controller');
const passport = require('passport');

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.get('/signout',userController.signout);
router.post('/create-user',userController.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}
),userController.createSession);

router.get('/profile',userController.profile);
router.post('/update/:id',userController.updateUser);

module.exports = router;