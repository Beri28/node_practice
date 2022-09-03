const express=require('express');
const newTask=require('../model/task')
const app=express()
const router=express.Router();
const {addTask}=require('../controller/user-controller')
const {getAll}=require('../controller/user-controller')
const {Delete}=require('../controller/user-controller')
const {DeleteTask}=require('../controller/user-controller')
const {updateTask}=require('../controller/user-controller')
const hbs=require('express-handlebars');




router.get('/',(req,res)=>{
    res.render('index')
})
router.post('/addTask',addTask)
router.get('/getAll',getAll)
router.post('/update',updateTask)
router.post('/delete',Delete)
router.get('/All',getAll)
router.get('/:id',async (req,res)=>{
    try {
        await newTask.deleteOne({taskName:req.params.id}).then(()=>{res.send("deleted")})
    } catch (error) {
        return res.send(error)
    }
   // res.send(req.params.id)
})


module.exports=router