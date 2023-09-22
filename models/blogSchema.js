const mongoose=require('mongoose')
const blogSchema=mongoose.Schema({
    heading:{
        type:String,
        default:"nature and beyond"
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"users",
    },
    content:{
        type:String,
        
    },
    images:[]
})
const blogs =mongoose.model("blogs",blogSchema)
module.exports=blogs