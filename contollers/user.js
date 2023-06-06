const { create, get_Users, getLoginUser, createTask, get_Task, getTaskBy_Id, update_Task, deleteTask,
     getFilter_Status, getSortedBy_Name,getSortedByIdt,delete_User} = require('../services/user')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
module.exports = {
    createUser: (req, res) => {
        const body = req.body
        
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getUsers: (req, res) => {
        get_Users((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    deleteUsers: (req, res) => 
    {
        const data = req.body;
        delete_User(data, (error, result) => {
            if (error) {
                console.log(error)
                return
            }
            return res.json({
                success: 1,
                message: " User sucessfully deleted"

            })
        })
    },
    login: (req, res) => {
        const body = req.body;

        getLoginUser(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid credentials"
                });
            }
            //console.log(results.password);

            if (body.password === results.password) {
                ///console.log("this is  ",results.password)
                results.password = undefined;
                const jsontoken = sign({ result: results }, "hk12", {
                    expiresIn: "1h"
                });// three paarmeter 1.objects and 2.encryption key 3 optional parameter

                return res.json({
                    success: 1,
                    message: "login successful",
                    token: jsontoken,


                });
            }   //console.log(body.password);
            //console.log(results.password;
            else {
                return res.json({
                    success: 0,
                    data: "Invalid username and password provided"
                });

            }
        });
    },
    //creating tasks
    create_Task: (req, res) => {
        const body = req.body
        createTask(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    success: 1,
                    message: "database connection not established"
                })
            }
            return res.status(200).json({
                success: 1,
                message: results
            })

        })
    },
    getTask: (req, res) => {
        get_Task((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    getTaskById: (req, res) => {
        const id = req.params.id;
        getTaskBy_Id(id, (error, result) => {
            if (error) {
                console.log(error)
                return error
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "the result was not found"
                });
            }
            return res.json({
                success: 1,
                data: result
            });
        })
    },
    updateTasks: (req, res) => {
        const body = req.body;
        update_Task(body, (error, result) => {
            if (error) {
                console.log(error)
                return
            }
            return res.json({
                success: 1,
                message: "sucessfully updated"
            })
        })
    },
    deleteTask: (req, res) => {
        const data = req.body;
        deleteTask(data, (error, result) => {
            if (error) {
                console.log(error)
                return
            }
            return res.json({
                success: 1,
                message: " Data sucessfully deleted"

            })


        })

    },
    getFilterStatus: (req, res) => {
        const status = req.query.status
    
        getFilter_Status(status, (error, result) => {
            if (error) {
                console.log(error)
                return error
            }
            if (!result) {
                res.json({
                    success: 0,
                    message: "Data not found"
                })
            }
            return res.json({
                success: 1,
                data: result
            });


        });
    },
    getSortedByName:(req, res) => {
        getSortedBy_Name((error,result)=>{
            if(error)
            {
                console.log(error)
                return
            }
            return res.json({
                success:1,
                data: result
            });
        });

    },
    getSortedById:(req, res) => {
        getSortedByIdt((error,result) =>{
           
            if(error)
            {
                console.log(error)
                return
            }
            return res.json({ 
                success:1,
                data: result
            });
        })
    }
}