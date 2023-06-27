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
        let name = req.body.rolename;

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
    gettaskdetails:async(req,res)=>{
        
        let userid=req.body.id// change if it is not right

        try{
            const data2 = await helper.verifyassign(userid)
            let role2 = data2[0].rolename
            if(role2=='admin')
            {
            console.log("helo")
             const data =await helper.getdetailassigntask(userid);//admin purpose
             res.status(200).send(data)
            }else
            {
                const data=await helper.getusertaskassigndetails(userid)// user purpose
                res.status(200).send(data)
            }
        }
        catch(err){
            res.status(500).send("user not available plaese choose a valid user ")


    }

},
   getdeadlinedetails:async(req,res)=>{

    let id=req.body.id
    try{
        console.log("helo")
         const data = await helper.getdeadlineinfo(id)
         res.status(200).send(data)

    }
    catch(err){
        res.status(500).send(err.message)
    }

 },
 gettaskstatusinfo:async(req,res)=>{
    
    let id=req.body.id
    let status=req.body.status
    console.log(status)
    try{
        console.log("status")
        const data= await helper.getinfostatus(id,status)
        res.status(200).send(data)
    }
    catch(err)
    {

        res.status(500).send(err.message)
    }



 },


}