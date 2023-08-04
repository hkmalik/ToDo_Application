const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/taskhelper');
const { compareSync } = require('bcrypt');
const multer = require("multer")
const fs = require('fs');
const path = require("path");
const { json } = require('sequelize');
const tasks = db.models.tasks;
function randomNumber() {
    let size = 100000
    let arr = [size]
    let num = Math.floor(Math.random() * 10000);
    let n = 0
    console.log("random")
    for (let i = 0; i <= size; i++) {
        if (num === arr[i]) {
            n = 1
        }
    }
    if (n !== 1) {
        console.log("hi")
        //console.log(num)
        arr.push(num);
        return num
    } else {
        console.log("calling random number again")
        let num3 = randomNumber()
        return num3
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }

})
////// attachments not completed image is upload fine but have to add s somemore functionality
//and further improvements for the completion of the function

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }

})


module.exports = {

    createTasks: async (req, res) => {

        console.log('create tasks');
        let user_id = req.body.ID
        let task_name = req.body.taskName
        let description = req.body.description
        let status = req.body.status
        let assign = req.body.assignedid
        let deadline = req.body.deadline
        let activeflag = req.body.activeflag
      
        try {

            console.log('create tasks1');
            const data = await helper.createtask(user_id, task_name, description, status, assign, deadline, activeflag)
            res.status(200).send(data);

        }
        catch (err) {
            res.status(500).send(err)
        }
    }, ///getting tasks
    getTasks: async (req, res) => {

        try {
            const data = await helper.gettask()
            console.log(data)
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err)
        }

    },
    getTaskByUserId: async (req, res) => {
        try {
                console.log("start get task1")
            const data = await helper.gettask_byuserid(req.params.ID)
            console.log(data)
            res.status(200).send(data)

        }
        catch (err) {
            res.status(500).send(err)
        }

    },
    getTaskById: async (req, res) => {
        try {
                console.log("start get task2")
            const data = await helper.gettask_byid(req.params.ID)
      
            res.status(200).json(data)

        }
        catch (err) {
            res.status(500).send(err)
        }

    },
    updateTask: async (req, res) => {

        console.log(req.params.ID)
        // console.log("heli")
        try {
            console.log("try")
            const data = await helper.updatetask(req.body,req.params.ID);
            res.status(200).send(data)

        } catch (err) {
            res.status(500).send(err)
        }
    },
    deleteTask: async (req, res) => {


        try {

            console.log("delete")
            const data = await helper.deletetask(req.params.ID);
        
            res.status(200).json({
                result:"success fully data deleted"
            })
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    getFilterByStatus: async (req, res) => {

        try {

            let data = await helper.getTaskByStatus(req.params.status)

            res.status(200).send(data);

        } catch (err) {

            res.status(500).send(err);
        }
    },

    getTasksortedByName: async (req, res) => {
        try {
            let data = await helper.getTasksortedByName();
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getTaskSortedByUserId: async (req, res) => {
        try {
            let data = await helper.getTaskSortedById1();
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).res.send(err);
        }
    },

    updateTaskStatus: async (req, res) => {
        try {
            let id = req.body.id;
            let taskStatus = req.body.status

            const data = await helper.updateStatus(id, taskStatus)
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).res.send(err);
        }
    },

    uploadimage: async (req, res) => {
     console.log("uploading")
        let newPathToFile
        let fname = req.file.filename
        let number = randomNumber()
        let text = number.toString()

        let id = req.body.id
        console.log(req.file.filename)

        const filePath = path.join('D://ToDoApplication//uploads', req.file.filename);
        const extension = fname.split('.').pop();
        if (extension === 'jpg') {
            newPathToFile = path.join('D://ToDoApplication//uploads', `${text}.jpg`)
        } else if (extension === 'png') {
            newPathToFile = path.join('D://ToDoApplication//uploads', `${text}.png`)
        } else if (extension === 'pdf') {
            newPathToFile = path.join('D://ToDoApplication//uploads', `${text}.pdf`)
        } else if (extension === 'txt') {
            newPathToFile = path.join('D:/ToDoApplication/uploads', `${text}.txt`)
        }
        else {
            console.log("not a valid extension")
        }


        let file = newPathToFile
        newfilename = file.split("\\").pop()
        fs.rename(filePath, newPathToFile, function (err) {
            if (err) {
                throw err
            } else {
                console.log("file has been renamed!")
            }
        })
      try {
            console.log("inuploadimagefunction")
            const data = await helper.addimageinfo(id, newfilename)
            res.status(200).send(data)
        } catch (err) {
            res.status(500).send(err)
        }

    }

}