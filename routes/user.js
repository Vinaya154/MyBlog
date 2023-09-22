const express=require('express')
const{ doSignUp,loginPage,showSignup,doLogin,getHomepage,detailedView,logout,addBlogData} = require('../controllers/userController')
const router=express.Router()
const userAuth=require('../middlewares/userAuth')
const { createBlog } = require('../controllers/adminController')


router.get('/',loginPage)
router.get('/signup',showSignup)
router.post('/register',doSignUp)
router.post('/login',doLogin)
router.get('/home',userAuth,getHomepage)
router.get('/detailedView',userAuth,detailedView)
router.get('/logout',logout)
router.get('/createBlog',userAuth,createBlog)
router.post('/createBlog',userAuth,addBlogData)

module.exports=router