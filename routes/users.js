const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/:username', userController.getUser);
router.post('/add', userController.addUser);
router.patch('/modify/:id', userController.modifyUser);
router.put('/update/:id', userController.updateUser);
router.delete('/remove/:id', userController.removeUser);

module.exports = router;
