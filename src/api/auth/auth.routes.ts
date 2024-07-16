import { Router } from 'express'
import { userSignin, userSignup } from './auth.controller'
import { decodeBasicAuth } from '../../middleware/auth.middleware';


const router = Router()

router.post('/signup', decodeBasicAuth, userSignup)
router.post('/signin', decodeBasicAuth, userSignin)

export default router
