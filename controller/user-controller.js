const newTask=require('../model/task')
const express=require('express')
const app=express();
const hbs=require('express-handlebars');
const { append } = require('express/lib/response');
app.use(express.json())
app.use(express.urlencoded());

app.set('view engine', 'hbs')
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'index',
    layoutsDir:'../views'
}))

const addTask=async (req,res,next)=>{
    let task;
    try {
        task=new newTask(req.body);
        task.save().then(()=>{})
    } catch (error) {
        return next(error)
    }
    return res.render('index',{task:task.taskName})
}

const getAll=async (req,res,next)=>{
    let All;
    try {
        All=await newTask.find({},{_id:0,__v:0})//.toString();
    } catch (error) {
        return next(error)
    }
    if(!All){
        res.send("No task were found")
    }
    else {
       // res.send(All)
        res.render('index',{all:All.toString()});
       
    }
}

const updateTask=async (req,res,next)=>{
    let Old=req.body.old;
    let New=req.body.newOne;
    let text=`${Old} was changed to ${New}`
    try {
       let tasks= await newTask.findOne({taskName:Old})
       if(!tasks){
           res.render('index',{task2:'That task doesnt exit'})
       }
       else
       await newTask.updateMany({taskName:req.body.old},{taskName:req.body.newOne}).then(()=>{
            res.render('index',{task2:text})
        })
    } catch (error) {
        return next(error)
    }
}

const Delete=async (req,res,next)=>{
    let {toBeDeleted}=req.body;
    try {
       //let data=
        await (await newTask.findOne({taskName:toBeDeleted},{_id:0,__v:0})).delete({taskName:toBeDeleted})
       console.log(data)
       //await newTask.delete({taskName:data})
      
    } catch (error) {
       //return res.send(error)
        return res.render('index',{Deleted:`Couldn't be deleted`})
    }
    if(!data){
        res.render('index',{Deleted:'The task doesnt exit'})
    }
 else {
 return res.render('index',{Deleted:`${toBeDeleted} task was succesfully deleted`})
 }
}



exports.addTask=addTask;
exports.getAll=getAll;
exports.updateTask=updateTask;
exports.Delete=Delete;
