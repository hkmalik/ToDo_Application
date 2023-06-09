const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/helper');
const users = db.models.Users;
const tasks = db.models.tasks;
//1.create users
const createUsers = async (req, res) => {

    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let isactive_key = req.body.isactive_key
    console.log(name, email, password, isactive_key)

    try {
        console.log("hello")
        let data = await helper.createuser(name, username, email, password, isactive_key)
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).send(err)
        console.log("hi")
    }
}
const login = async (req, res) => {
    try{
        
        const data=await helper.login_user(req.body.email, req.body.password)
        
        if (data.length > 0) {
            //console.log("login4")

            const jsontoken = sign({ result: data }, "hk12", { expiresIn: "1h" });
            res.status(200).json({ token: jsontoken });
        }
        else {
            console.log("invalid email and password")
        }
        res.status(200).send(data)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
    
}
const getUsers = async (req, res) => {

    try {
        const data = await helper.getuser()
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).send(err)
    }

}
const createTasks = async (req, res) => {


    let user_id = req.body.user_id
    let task_name = req.body.task_name
    let description = req.body.description
    let status = req.body.status

    try{
        const data =await helper.createtask(user_id, task_name, description, status)
        res.status(200).send(data);

    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const getTasks = async (req, res) => {

    try{
        const data=await helper.gettask()
        res.status(200).json(data);
    }catch(err)
    {
        res.status(500).send(err)
    }
    
}
const getTaskByUserId = async (req, res) => {
    try{
     
        const data=await helper.gettask_byuserid(req.body.user_id)
        res.status(200).send(data)

    }
    catch(err){
        res.status(500).send(err)
    }

}
const updateTask = async (req, res) => {

    //console.log(id)
    // console.log("heli")
    try
    {
        console.log("try")
       const  data = await helper.updatetask(req.body,req.body.id);
        res.status(200).send(data)
    

    }catch(err){
        res.status(500).send(err)
    }
}
const deleteTask = async (req, res) => {
    
    
    try{
        const data = await helper.deletetask(req.body.id);
        res.sendStatus(200).send(data)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
   


}

const getFilterByStatus = async (req, res) => {

    try {

        let data = await helper.getTaskByStatus(req.body.status)
        console.log('>>', data);

        res.status(200).send(data);

    } catch (err) {
        console.log('>>', err);
        res.send(500)
    }

}

const getTasksortedByName = async (req, res) => {

    try {
        let data = await helper.getTasksortedByName();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).res.send(err);
    }

}
const getTaskSortedByUserId = async (req, res) => {

    try {
        let data = await helper.getTaskSortedById1();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).res.send(err);
    }
}


module.exports =
{
    login,
    createUsers,
    getUsers,
    createTasks,
    getTasks,
    getTaskByUserId,
    updateTask,
    deleteTask,
    //login
    getFilterByStatus,
    getTasksortedByName,
    getTaskByUserId,
    getTaskSortedByUserId
}
