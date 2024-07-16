import {Router} from "express";
import * as userController from './user.controller'

const router = Router()

router.get('/',userController.getUsers)
router.post('/create',userController.createUser)
router.get('/:id',userController.getUserById)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)

export default router
