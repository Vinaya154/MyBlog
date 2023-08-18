const express=require('express')
const router=express.Router()
const {uploadPage,createBlog}=require('../controllers/adminController')
router.get('/',(req,res)=>{
    res.send("hai this is admin")
})
router.get('/uploads',uploadPage)
router.post('/createBlog',createBlog)
module.exports=router