const express=require('express')
const{ doSignUp,loginPage,showSignup,doLogin,getHomepage,detailedView,logout} = require('../controllers/userController')
const router=express.Router()
const userAuth=require('../middlewares/userAuth')


router.get('/',loginPage)
router.get('/signup',showSignup)
router.post('/register',doSignUp)
router.post('/login',doLogin)
router.get('/home',userAuth,getHomepage)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',logout)

module.exports=router