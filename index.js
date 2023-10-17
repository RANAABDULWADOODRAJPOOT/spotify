require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;

app.use('/api/auth/login', require('./api/auth/login'));
app.use('/api/auth/callback', require('./api/auth/callback'));
app.use('/api/spotify/recommendation', require('./api/spotify/recommendation'));
app.use('/api/auth/logout', require('./api/auth/logout'));

app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`);
})
