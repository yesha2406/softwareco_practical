const express = require('express');
const router = express.Router();

const RoleController = require('../apis/controllers/roleController');
const { authorize } = require('../utils/middlewares/authMiddleware');

router.get('/', authorize('Read'), RoleController.getAllRoles);
router.get('/:id', authorize('Read'), RoleController.getRoleById);
router.post('/', authorize('create'), RoleController.createRole);
router.patch('/:id', authorize('update'), RoleController.updateRole);
router.delete('/:id', authorize('delete'), RoleController.deleteRole);
router.patch('/insert-access-module/:id', authorize('update'), RoleController.insertAccessModule);
router.patch('/remove-access-module/:id', authorize('update'), RoleController.removeAccessModule);


module.exports = router;