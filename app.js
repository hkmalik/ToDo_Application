const express = require('express');
const app = express();
const router = require('./api/userRouter');
const db = require('./models');
const  cron =require('node-cron');

app.use(express.json());
app.use("/api/user", router);

//port

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});


