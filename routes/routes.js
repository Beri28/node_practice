const express=require('express');
const app=express()
const router=express.Router();
const {addTask}=require('../controller/user-controller')
const {getAll}=require('../controller/user-controller')
const {Delete}=require('../controller/user-controller')
const {updateTask}=require('../controller/user-controller')
const hbs=require('express-handlebars');




router.get('/',(req,res)=>{
    res.render('index')
})
router.post('/addTask',addTask)
router.get('/getAll',getAll)
router.post('/update',updateTask)
router.post('/delete',Delete)

module.exports=router