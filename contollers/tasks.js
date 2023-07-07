const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/taskhelper');
const tasks = db.models.tasks;
module.exports = {

  createTasks :async (req, res) => {
 
console.log('create tasks');
    let user_id = req.body.user_id
    let task_name = req.body.taskName
    let description = req.body.description
    let assign=req.body.assignedid
    let deadline=req.body.deadline
    let status = req.body.status

    try {
         
console.log('create tasks1');
        const data = await helper.createtask(user_id, task_name, description, status)
        res.status(200).send(data);

    }
    catch (err) {
        res.status(500).send(err)
    }
},
     getTasks : async (req, res) => {

    try {
        const data = await helper.gettask()
        console.log(data)
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err)
    }

},
 getTaskByUserId :  async (req, res) => {
    try {

        const data = await helper.gettask_byuserid(req.body.user_id)
        res.status(200).send(data)

    }
    catch (err) {
        res.status(500).send(err)
    }

},
 updateTask : async (req, res) => {

    //console.log(id)
    // console.log("heli")
    try {
        console.log("try")
        const data = await helper.updatetask(req.body, req.body.id);
        res.status(200).send(data)


    } catch (err) {
        res.status(500).send(err)
    }
},
deleteTask : async (req, res) => {


    try {

        console.log("delete")
        const data = await helper.deletetask(req.body.id);
        res.sendStatus(200).send(data)
    }
    catch (err) {
        res.status(500).send(err)
    }
},

 getFilterByStatus :async (req, res) => {

    try {

        let data = await helper.getTaskByStatus(req.body.status)
        
        res.status(200).send(data);

    } catch (err) {
        
        res.status(500).send(err);
    }
},

 getTasksortedByName : async (req, res) => {
    try {
        let data = await helper.getTasksortedByName();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
},
getTaskSortedByUserId : async (req, res) => {
    try {
        let data = await helper.getTaskSortedById1();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).res.send(err);
    }
    },

    updateTaskStatus:async(req,res)=>{
        try{
            let id =req.body.id;
            let taskStatus=req.body.status

            const data=await helper.updateStatus(id,taskStatus)
            res.status(200).json(data); 
        }
        catch(err){
            res.status(500).res.send(err);
        }



    },
    uploadimage:async(req,res)=>{
         console.log("uploading images")
        console.log(req.file)
        res.status(200).send(req.file);
    }

}