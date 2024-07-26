import {Router} from "express";
import * as userController from './user.controller'

const router = Router()

router.get('/',userController.getUsers)
router.post('/create',userController.createUser)
router.get('/:uuid',userController.getUserById)
router.put('/:uuid',userController.updateUser)
router.delete('/delete',userController.deleteUser)

export default router
