const express = require('express')
const app = express()
app.use(express.json());
const dotenv = require('dotenv')
dotenv.config()
const cron =require('./services/cronService')

const db = require('./config/dbconfig');

const router = require('./routes/userRoute');

db.sync({ force: false })
    .then(e => console.log("Table Created"))
    .catch(e => console.log("error", e));

    require('./model/userModel')

    app.use('/api',router)
    
const port = 6000
app.listen(port,()=>
{
    console.log('server connected at port 6000 Successfully!')
})
cron.start();