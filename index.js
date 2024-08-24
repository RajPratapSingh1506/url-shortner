const express=require('express');
const mongoose=require('mongoose');
const urlRouters=require('./routes/urlRoutes');

const app=express();


mongoose.connect('mongodb://127.0.0.1:27017/myapp',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connected"); 
}).catch((err)=>{
    console.log(`Database connection failed due to error:${err}`);
    
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url',urlRouters);


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server started at PORT:${3000}`);  
})