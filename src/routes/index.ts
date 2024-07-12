import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res
    .json({message: 'You are going to be a fullStack developer soon'})
});


export default router

