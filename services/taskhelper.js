const { QueryTypes } = require('sequelize');
const db = require('../models');
const tasks = db.models.tasks;
module.exports = {
    createtask: (user_id, task_name, description, status) => {
        return new Promise((resolve, reject) => {

            tasks.sequelize.query('INSERT INTO tasks (user_id,task_name, description, status) VALUES (?,?,?,?)',{
                type:QueryTypes.INSERT,
                replacements:[user_id,task_name,description,status]
             }).then((result) => {
                
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
    gettask: () => {
        return new Promise((resolve, reject) => {

            tasks.sequelize.query("SELECT * FROM tasks",{
                type: QueryTypes.SELECT
            }).then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })

    },
    gettask_byuserid: (id) => {

        return new Promise((resolve, reject) => {

            tasks.sequelize.query("SELECT * FROM tasks where user_id =:id",{
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
          //  tasks.findAll({
            //    order: [
              //      ['user_id', 'ASC']
              //  ]
           // })
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
}