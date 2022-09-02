const express=require('express')
const mongoose=require('mongoose')
const newTask=new mongoose.Schema({
    taskName:{type:String,required:true},
    //importance:{type:String,required:true}
})

module.exports=mongoose.model("todo",newTask)