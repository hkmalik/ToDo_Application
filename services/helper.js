const db = require('../models');
const tasks = db.models.tasks;
const users = db.models.Users;
module.exports = {
    createuser:(name,username,email,password, isactive_key) =>{
        
        return new Promise((resolve,reject)=>{
           users.create( {name,username, email, password, isactive_key})
            .then(data=>{
                console.log(data);
                resolve(data);
        }).catch(err=>{
            reject(err);
        })
    });

    },
    getuser:()=>{
        return new Promise((resolve,reject)=>{

        users.findAll().
            then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        });
    },
    createtask:(user_id,task_name ,description,status)=>{
        return new Promise((resolve,reject) =>{

            tasks.create({user_id,task_name ,description,status})
            .then(data=>{
             resolve(data);

            }).catch(err=>{
                reject(err);
        })
        })
        
    },
    gettask:()=>{
        return new Promise((resolve,reject)=>{

            tasks.findAll()
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject(err);   
            })
        })

    },
    gettask_byuserid:(id)=>{
        
        return new Promise((resolve,reject)=>{
           tasks.findAll({
                where: {
                    user_id: id
                }
        
            }).then(data=>{
             
                resolve(data);

            })
            .catch(err=>{
             reject(err);   
            })
        })
    },
    updatetask:(body,id)=>{
        console.log("updatetask")
        return new Promise((resolve,reject)=>{
            console.log("updatetask2")
            tasks.update(body, {

                where: {
                    id: id
                }

        }).then(data=>{
            console.log(data)
            resolve(data);
        }).catch(err=>{
            reject(err);   
        })
    })

    },
    deletetask:(id)=>{
        return new Promise((resolve,reject)=>{
             tasks.destroy({
                where: {
                    id: id
                }
        }).then(data=>{
            resolve(data);

        })
        .catch(err=>{
           reject(err);   
        })
    });

    },
    login_user:( useremail,password)=>{
        

        return new Promise((resolve,reject)=>{
          

            users.findAll({
                where: {
                    email: useremail,
                    password: password
                }
            }).then(data=>{

             resolve(data);   
            }).catch(err=>{
                
             reject(err);    
            })


        });

    },
    getTaskByStatus: (status) => {
        return new Promise((resolve, reject) => {
            tasks.findAll({
                where: {
                    status: status
                }
            }).then(data => {
                console.log(data)
                resolve(data);

            })
                .catch(err => {
                    console.log("invalid response")
                    reject(err);

                })

        });

    },
    getTasksortedByName: () => {
        return new Promise((resolve, reject) => {
            tasks.findAll({
                order: [
                    ['task_name', 'ASC']
                ]
            }).then((data) => {
                resolve(data);
            }).catch((err) => {

                reject(err);
            })
        });
    },
    getTaskSortedById1:()=>{
      return new Promise((resolve, reject) => 
      {
            tasks.findAll({
                order:[
                    ['user_id', 'ASC']
                ]                
            }).then((data) =>{
                resolve(data);
            }).catch((err) =>{
                reject(err);
            })
      })
    }



}