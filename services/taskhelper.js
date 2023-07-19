const { QueryTypes } = require('sequelize');
const db = require('../models');
const tasks = db.models.tasks;
module.exports = {
    createtask: (user_id, task_name, description, status,assign,deadline) => {
                 
console.log('create tasks3');
        return new Promise((resolve, reject) => {
            console.log(assign)
            console.log('create tasks4');
            tasks.sequelize.query('INSERT INTO tasks (user_id,taskName, description,status,assignedid,deadline) VALUES (?,?,?,?,?,?)',{
                type:QueryTypes.INSERT,
                replacements:[user_id,task_name,description,status,assign,deadline]
             }).then((result) => {
                
                         
console.log('create tasks5');
                    resolve(result);       
        }).catch((err) => {
            reject(err)
        }
        )
        });
         
    },
    gettask: () => {
        return new Promise((resolve, reject) => {
                console.log('getTask')
            tasks.sequelize.query("SELECT * FROM tasks",{
                type: QueryTypes.SELECT
            }).then(data => {
                console.log("data",data);
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })

    },
    gettask_byuserid: (id) => {

        return new Promise((resolve, reject) => {

            tasks.sequelize.query("SELECT * FROM tasks  where user_id =:id OR assignedid=:id",{
                type:QueryTypes.SELECT,
                replacements:{id:id}
            })
            .then(data => {

                resolve(data);

            })
                .catch(err => {
                    reject(err);
                })
        })
    },
    updatetask: (body, id) => {
       // console.log(body.task_name)
       // console.log("updatetask")
        return new Promise((resolve, reject) => {
         //   console.log("updatetask2")
         tasks.sequelize.query(`UPDATE tasks SET task_name =?,description =?,status =? where id=${id}`,{
            type:QueryTypes.UPDATE,
            replacements:[body.task_name,body.description,body.status],
         }).then(data => {
                console.log(data)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })

    },
    deletetask: (id) => {
        console.log("delete2")
        return new Promise((resolve, reject) => {
            console.log("delete3")
            tasks.sequelize.query(`DELETE FROM tasks WHERE id=:id`,
            {
                type:QueryTypes.DELETE,
                replacements:{id:id}
            })
            .then(data => {
                resolve(data);

            })
                .catch(err => {
                    reject(err);
                })
        });

    },
  
    getTasksortedByName: () => {
        return new Promise((resolve, reject) => {
            tasks.sequelize.query(`SELECT * FROM tasks ORDER BY task_name ASC`,
            {
                type:QueryTypes.SELECT
            }).then((data) => {
                resolve(data);
            }).catch((err) => {

                reject(err);
            })
        });
    },
    getTaskSortedById1: () => {
        return new Promise((resolve, reject) => {
            tasks.sequelize.query(`SELECT * FROM tasks ORDER BY user_id ASC`,{
                type:QueryTypes.SELECT
            })
            .then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
      getTaskByStatus: (status) => {
        return new Promise((resolve, reject) => {

                tasks.sequelize.query( `SELECT * FROM tasks WHERE status=:status`,{
                    type:QueryTypes.SELECT,
                    replacements:{status:status}
                })
            .then(data => {
                console.log(data)
                resolve(data);

            })
                .catch(err => {
                    console.log("invalid response")
                    reject(err);

                })

        });

    },
    updateStatus:(id,status)=>{
        console.log("entering the status")
        
        return new Promise((resolve, reject) => {
            console.log("updating status")

            tasks.sequelize.query( `UPDATE tasks SET status=:status WHERE id=:id`,{
                type:QueryTypes.UPDATE,
                replacements:{status:status, id:id}
            }).then((data) => {
                
             resolve(data);   
            }).catch((err) => {
                
             reject(err);   
            })

        })
    },
    searchTaskbyidformatdate:(email,id,format)=>{

       return new Promise((resolve, reject) => {
        tasks.sequelize.query(`SELECT  taskName,description,deadline From tasks JOIN users ON users.email=?WHERE assignedid=? AND deadline=?`,{
            type:QueryTypes.SELECT,
            replacements:[email,id,format]
        }).then((results) =>
         resolve(results)
        ).catch(err => 
            reject(err))
        
       })

    },
    gettaskbyassignedid:(id,findid)=>{
        return new Promise(async(resolve, reject) => {
            tasks.sequelize.query(`SELECT u.id,u.name,t.taskName,t.description,t.deadline,t.createdAt,t.updatedAt FROM tasks t 
            JOIN users u ON u.id=t.assignedid WHERE t.user_id=? AND t.assignedid=? And t.status="completed"`,{
                type:QueryTypes.SELECT,
                replacements:[id,findid]
        }).then((results) =>
        resolve(results)
        ).catch(err =>
            reject(err))
            
          })
    },/// adding info regarding the image 
    addimageinfo:(id ,number)=>{
        console.log("addimages")
         return new Promise(async(resolve, reject)=>{
            console.log("entering..")
            tasks.sequelize.query(`UPDATE tasks SET attachmentid = ? WHERE id = ?;`,
                {
                  type: QueryTypes.UPDATE,
                  replacements: [number, id]             
              
            }).then((data)=>{
              
                resolve(data);
            }).catch((err)=>{
             reject(err)   
            })
            
    })
        }
    }
