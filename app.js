const express = require('express');
const app = express();
const router = require('./api/userRouter');
const db = require('./models');
const  cros =require('node-cron');
const cors =require("cors")
const bodyParser = require('body-parser'); 


//app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
/* app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); */
app.use("/api/user", router);

//port

app.listen(3001, () => {
    console.log(`Example app listening on port 3000`)
});


