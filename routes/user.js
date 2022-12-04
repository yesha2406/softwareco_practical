const express = require('express');
const router = express.Router();

const UserController = require('../apis/controllers/userController');
const { authorize } = require('../utils/middlewares/authMiddleware');

router.get('/', authorize('Read'), UserController.getAllUsers);
router.get('/:id', authorize('Read'), UserController.getUserById);
router.post('/', authorize('create'), UserController.createUser);
router.patch('/', authorize('update'), UserController.updateAllData);
router.patch('/different', authorize('update'), UserController.updateDifferentData);
router.patch('/:id', authorize('update'), UserController.updateUser);
router.delete('/:id', authorize('delete'), UserController.deleteUser);


module.exports = router;