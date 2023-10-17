require('dotenv').config();
const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const PORT=process.env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use('/api', require('./api/routes'));

app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`);
})
