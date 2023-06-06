const express = require('express');
const app = express();
const router = require('./api/user');



app.use(express.json());
app.use("/api/user", router);

//port

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});

