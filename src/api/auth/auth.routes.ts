import { Router } from 'express'
import { userSignin, userSignup, userSignout } from './auth.controller'
import { decodeBasicAuth, verifyToken } from '../../middleware/auth.middleware';


const router = Router()

router.post('/signup', decodeBasicAuth, userSignup)
router.post('/signin', decodeBasicAuth, userSignin)
router.delete('/signout', verifyToken, userSignout)

export default router
