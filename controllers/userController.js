const mongoose=require('mongoose')
const USER=require('../models/userModel').users
const BLOGS=require('../models/blogSchema')
const jwt =require('jsonwebtoken')
const multer = require("multer");


const loginPage=((req,res)=>{
    if(req.cookies.userJwt){
        res.redirect('/home')
    }
    res.render('user/login.hbs')
})
const showSignup=((req,res)=>{
    res.render('user/signup.hbs')
})

const doSignUp=(req,res)=>{
    console.log(req.body)
    
    USER({
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    }).save().then((res)=>{
        res.json({signup:true})
    })
    .catch(()=>{
        res.json({signup:false})
    })
}
const doLogin=(req,res)=>{
    USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length>0){
            const token =jwt.sign({userId:response[0]._id},"process.env.JWT_KEY",{
                expiresIn:'2d'
            })
            res.cookie('userJwt',token,{
                httpOnly:true,
                samSite:'lax',
                secure:false,
                maxAge:24*60*60*1000
            })
            res.status(200).json({login:true})
    }else{
        res.json({login:false})
    }
})
}
const getHomepage=(req,res)=>{
    BLOGS.find().then((response)=>{
        res.render('user/home.hbs',{data:response})
    })
    
}
const detailedView=(req,res)=>{
    
    BLOGS.find({_id:req.query.id})
    .populate({
        path:'createdBy',
        select:['name','email']
    }).then(response=>{
        console.log(response)
        res.render('user/detailedView.hbs',{data:response[0]})
    })
    
}
const createBlog=(req,res)=>{
    res.render('user/upload.hbs')
}
const addBlogData=(req,res)=>{
    console.log(req.query,"*********");
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"public/uploads");
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now()+"-"+files.originalname)
        }
    })
    const upload=multer({storage:fileStorage}).array("images",4)
    upload(req,res,(err)=>{
        console.log(req.files);
        BLOGS({heading:req.body.category,
        content:req.body.content,
    images:req.files,
    createdBy:req.query.id
}).save().then(response=>{
    res.redirect('/createBlog')
})
    })
}


const logout=(req,res)=>{
    res.cookie('userJwt',null,{
httpOnly:true,
samSite:'lax',
secure:false,
maxAge:1
})
res.cookies.userJwt=n
res.redirect('/')
}
module.exports={doSignUp,loginPage,showSignup,doLogin,getHomepage,detailedView,logout,createBlog,addBlogData}