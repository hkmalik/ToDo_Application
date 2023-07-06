const { QueryTypes } = require('sequelize');
const db = require('../models');
const { errorMonitor, promises } = require('nodemailer/lib/xoauth2');
const role = require('../models/role');

const admin = db.models.admin;
const task = db.models.tasks;
const user = db.models.Users;
module.exports =
{
    createrole: (roleId, rolename) => {

        return new Promise(async (resolve, reject) => {
            console.log("he3")
            try {

                console.log("he5")

                const data = await admin.sequelize.query(
                    'INSERT INTO role (roleId,rolename) VALUES (?, ?)',
                    {
                        type: QueryTypes.INSERT,
                        replacements: [roleId, rolename],
                    }
                )
                console.log("he6.1")
                console.log(data);
                console.log("he7")
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    assignedtask: (id) => {
        return new Promise(async (resolve, reject) => {
            console.log("gheloo2")

            console.log("gheloo3")
            const data = await admin.sequelize.query(`SELECT rolename FROM role JOIN users ON role.roleId=users.id WHERE users.id=${id} `,
                {
                    type: QueryTypes.SELECT,
                    // replacements: [roleid]
                }
            ).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        });
    },
    verifyassign: (id) => {
        return new Promise(async (resolve, reject) => {

            console.log("verifyassign")
            await admin.sequelize.query(`SELECT rolename FROM role WHERE role.roleId=${id}`, {
                type: QueryTypes.SELECT

            }).then(data => {
                console.log(data)
                resolve(data);

            }).catch(error => {
                reject(error)
            }
            )


        })

    },
    createassignedtask: (user_id, task_name, description, status, assign, deadline) => {

        console.log('create tasks3');
        return new Promise((resolve, reject) => {
            console.log(task_name)
            console.log('create tasks4');
            console.log(user_id, task_name, description, status, assign, deadline)
            task.sequelize.query('INSERT INTO tasks (user_id,taskName, description,status, assignedid ,deadline) VALUES (?,?,?,?,?,?)', {
                type: QueryTypes.INSERT,
                replacements: [user_id, task_name, description, status, assign, deadline]
            }).then((result) => {


                console.log('create tasks5');
                resolve(result);
            }).catch((err) => {
                reject(err)
            }
            )
        });
        // tasks.create({ user_id, task_name, description, status })
        //     .then(data => {
        //         resolve(data);

        //      }).catch(err => {
        //         reject(err);
        //     })
        // })

    },
    getdetailassigntask: (id) => {
        return new Promise(async (resolve, reject) => {
            console.log('getdetailassigntask')
            await user.sequelize.query(`SELECT  name, taskName, description,status,deadline FROM tasks Join USERS ON tasks.user_id=users.id WHERE users.id!=tasks.assignedid `, {
                type: QueryTypes.SELECT


            }).then(data => {
                console.log(data);
                resolve(data);

            }).catch(err => {
                reject(err);
            })





        })
    },
    getusertaskassigndetails:(id)=> {
        return new Promise(async (resolve, reject) => {

            console.log('getdetailassigntask')
            await user.sequelize.query(`SELECT name,taskName, description,deadline FROM tasks join users on tasks.user_id=users.id WHERE assignedid=${id} AND user_id!=${id}`, {
                type: QueryTypes.SELECT


            }).then(data => {
                console.log(data);
                resolve(data);

            }).catch(err => {
                reject(err);
            })
        })

    },
    getdeadlineinfo:(id)=> {//user admin can know which task are in given by him
        console.log("helo2")

        return new Promise(async (resolve, reject) => {
            console.log("helo3")

            
         task.sequelize.query(` SELECT name,taskName ,tasks.deadline FROM tasks JOIN users  ON tasks.assignedid = users.id
         WHERE tasks.assignedid != tasks.user_id AND tasks.user_id=${id};
         `,{
            type:QueryTypes.SELECT
         }).then(data => {
          resolve(data);

         }).catch(err => {
            reject(err);
        })          
       
        })

    },
    getinfostatus:(id,status)  => {

          return new Promise(async(resolve, reject) => {  

            task.sequelize.query(` SELECT u1.name AS adminname, u2.name AS AssignedTaskto ,t.taskName,t.status,t.deadline FROM tasks t JOIN  users  u1 ON t.user_id=u1.id  JOIN users u2  ON t.assignedid=u2.id WHERE t.status =?AND t.user_id=${id} AND t.assignedid !=u1.id `,{
                type:QueryTypes.SELECT,
                replacements:[status]
            }
            ).then(data => {
             resolve(data);   
            }).catch(err => {
                reject(err);
            });
        
          })
    },
    getaveragetaskreport:(id)=>{
        console.log('getaveragetaskreport')
        return new Promise(async(resolve, reject) => {
            console.log('getaveragetaskreport2')
            task.sequelize.query(`SELECT t.createdAt,t.updatedAt FROM tasks t  WHERE t.assignedid=? AND t.user_id!= ? AND t.status="completed"`,{
                type:QueryTypes.SELECT,
                replacements:[id,id]
            }).then(result=>{
                resolve(result);
            }).catch(err => {
                reject(err)
            })
           
        })

    }

}



