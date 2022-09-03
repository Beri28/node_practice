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
    let Arrays=[];
    try {
        All=await newTask.find({},{_id:0,__v:0})//.toString();
    } catch (error) {
        return next(error)
    }
    if(!All){
        res.send("No task were found")
    }
    else {
        for(let i=0;i<All.length;i++){
            Arrays.push(All[i].taskName);
        }
        let names=Arrays.toString();
        res.render('index',{all:names.split(',')});
      
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
       let found=  await newTask.findOne({taskName:toBeDeleted}).then( async()=>{
        await newTask.deleteOne({taskName:toBeDeleted}).then(()=>{
            res.render('index',{Deleted:"Deleted"})
        }).catch(()=>{res.render('index',{Deleted:'Couldnt find task'})})
       }).catch(()=>{res.render('index',{Deleted:'Couldnt find task'})})
      
            /*if(!found){
                res.send("Couldn't find task")
             }
             else{
                newTask.deleteOne({taskName:toBeDeleted}).then(()=>{
                    res.send("Deleted")
             })}*/
            }
     catch (error) {
       //return res.send(error)
        return res.render('index',{Deleted:`Couldn't be deleted`})
    }
}

const DeleteTask=async (req,res,next)=>{
    try {
        await newTask.deleteMany({taskName:req.head.id}).then(()=>{
            res.send("succesfully deleted")
        }
        )
    } catch (error) {
        return res.send(error)
    }
}



exports.addTask=addTask;
exports.getAll=getAll;
exports.updateTask=updateTask;
exports.Delete=Delete;
exports.DeleteTask=DeleteTask;

