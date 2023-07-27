const express = require('express');
const app = express();
const router = require('./api/userRouter');
const db = require('./models');
const  cros =require('node-cron');
const cors =require("cors")


//app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use("/api/user", router);

//port

app.listen(3001, () => {
    console.log(`Example app listening on port 3000`)
});


