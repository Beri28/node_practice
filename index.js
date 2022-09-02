const express=require('express');
const mongoose=require('mongoose');
const app=express();
const router=require('./routes/routes')
const hbs=require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/todo').then(()=>{console.log("succesfully connected")}).catch((err)=>{console.log(err)})

//Code below not needed, because i handled thta endpoint in the routes module already/////

app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'index',
    layoutsDir:__dirname+'/views/'
}))
app.set('view engine', 'hbs');

/*app.get('/',(req,res)=>{
    let title="The beautiful todo list"
    res.render('index',{title})
})*/

app.use('/',router)

app.listen(3000,()=>{console.log("You just hit port 3000...")})

