const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/rolehelper');
const helper2 = require('../services/taskhelper')
const bcrypt = require('bcrypt');
const user = require('../models/user');
const { config } = require('./config')
const { QueryTypes } = require('sequelize');
const { assign } = require('nodemailer/lib/shared');
const admins = db.models.admin
module.exports =
{
    assignedrole: async (req, res) => {
        let roleId = req.body.roleId;
        let name = req.body.role;
        
        try {
            // console.log(body)

            console.log("he1")
            let data = await helper.createrole(roleId, name)
            res.status(200).send(data)

        }
        catch (err) {
            return res.status(500).send("invalid")
        }
    },
    assignedtask: async (req, res) => {
        let userid = req.body.id;
        let name = req.body.taskName;
        let description = req.body.description;
        let status = req.body.status;
        let assign = req.body.assignedid
        let deadline = req.body.deadline

        console.log(userid, name, description, status, assign, deadline)
        try {
            //  console.log("gheloo1")
            const data = await helper.assignedtask(userid)
            // console.log(data)
            let role = data[0].rolename
            if (role === "admin") {
                let assignid = req.body.assignedid
                //   console.log(assignid)
                const data = await helper.verifyassign(assignid)
                let role2 = data[0].rolename
                if (role2 === "user") {
                    //    console.log("hello admin")
                    const data = await helper.createassignedtask(userid, name, description, status, assign, deadline)
                    res.status(200).send(data)
                }
                else {
                    res.status(401).send("You do not have permission to assign task to admin")
                }
            } else {

                if (assign == userid) {
                    const data2 = await helper2.createtask(userid, name, description, status, assign, deadline)
                    res.status(200).send(data2)
                }
                else {
                    res.status(401).send("You do not have permission to assign task")
                }
            }
        } catch (err) {
            res.status(500).send(err)

        }
    },
    gettaskreports: async (req, res) => {
        let userid = req.body.user_id
        let findid = req.body.id
        console.log(userid)
        let role
        let role2
        try {


            const data = await helper.assignedtask(userid)
            console.log("data1")
            role = data[0].rolename
            console.log("data2")
            const data2 = await helper.assignedtask(findid)
            console.log("data3")
            let difference
            role2 = data2[0].rolename
            const num1 = []
            if (role === 'admin') {
                if (role2 === 'user') {
                    const data = await helper2.gettaskbyassignedid(userid, findid)
                    for (let i = 0; i < data.length; i++) {
                        difference = data[i].updatedAt - data[i].createdAt
                        let num = difference / (1000 * 60 * 60 * 24)
                        num1[i] = Math.floor(num)
                        console.log(num1[i], "days have passed")

                    }
                    res.status(200).json({
                        info: data,
                        msg: "days have passed",
                        result: num1,
                    })
                } else {
                    res.status(500).send("we can't check tasks of other admins")
                }
            } else {
                res.status(500).send("you can't get task reports as users")
            }
        } catch (err) {
            res.status(500).send(err)
        }

    },
    gettaskdetails: async (req, res) => {

        let userid = req.body.id// change if it is not right

        try {
            const data2 = await helper.verifyassign(userid)
            let role2 = data2[0].rolename
            if (role2 == 'admin') {
                console.log("helo")
                const data = await helper.getdetailassigntask(userid);//admin purpose
                res.status(200).send(data)
            } else {
                const data = await helper.getusertaskassigndetails(userid)// user purpose
                res.status(200).send(data)
            }
        }
        catch (err) {
            res.status(500).send("user not available plaese choose a valid user ")


        }

    },
    //getting the deadline details regarding the task
    getdeadlinedetails: async (req, res) => {

        let id = req.body.id
        try {
            console.log("helo")
            const data = await helper.getdeadlineinfo(id)
            res.status(200).send(data)

        }
        catch (err) {
            res.status(500).send(err.message)
        }

    },
    //getting the info of the status regarding task
    gettaskstatusinfo: async (req, res) => {

        let id = req.body.id
        let status = req.body.status
        console.log(status)
        try {
            console.log("status")
            const data = await helper.getinfostatus(id, status)
            res.status(200).send(data)
        }
        catch (err) {

            res.status(500).send(err.message)
        }



    },
    //getting the average task report by a user 
    averagetaskreport: async (req, res) => {

        let id = req.body.id
        let role
        let average = 0
        const total = []
        try {
            console.log("role")
            const data1 = await helper.assignedtask(id)
            console.log("data1")
            role = data1[0].rolename
            if (role === "user") {
                const data = await helper.getaveragetaskreport(id)
                let datalength = data.length
                console.log(datalength)
                let num1

                for (let i = 0; i < datalength; i++) {
                    data[i].updatedAt.setHours(12, 0, 0, 0)
                    data[i].createdAt.setHours(12, 0, 0, 0)
                    total[i] = Math.abs(data[i].updatedAt - data[i].createdAt)

                    total[i] = total[i] / (1000 * 60 * 60 * 24)
                    average = average + total[i]

                }
                average = average / datalength
                console.log(average)
                res.status(200).json({
                    msg: "average days taking to complete a task",
                    result: average
                })
            } else {
                res.status(401).send("not authorize")
            }

        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}