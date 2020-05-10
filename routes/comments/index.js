const express = require('express');
const router = express.Router();
const commentsController = require('../../controller/comments_controller');

router.post('/create',commentsController.create);
router.get('/delete/:id',commentsController.delete);

module.exports = router;