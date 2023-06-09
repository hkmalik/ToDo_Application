const pool = require("../config/database")

module.exports = {
    create: (data, callBack) => {

        pool.query(
            "INSERT INTO users (name,username,email, password,isactive_key) VALUES (?, ?, ?, ?,?)",
            [
                data.name,
                data.username,
                data.email,
                data.password,
                data.isActiveKey
            ],
            (error, results) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    get_Users: (callBack) => {
        pool.query
            (
                `SELECT  * from users LIMIT 1,1`,
                [],
                (error, result, field) => {
                    if (error) {
                        callBack(error)
                    }
                    return callBack(null, result);

                }
            );

    },
    getLoginUser: (email, callBack) => {
        pool.query('SELECT * FROM users WHERE email= ?',
            [email],
            (error, results, field) => {
                if (error) {
                    return (error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    createTask: (data, callBack) => {
        pool.query(
            "INSERT INTO tasks (user_id,task_name,description,status) VALUES (?, ?, ?, ?)",
            [
                data.user_id,
                data.task_name,
                data.description,
                data.status,
            ],
            (error, results) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    get_Task: (callBack) => {
        pool.query(
            "SELECT * FROM tasks LIMIT 2"
       ,
            [],
            (error, results, field) => {
                if (error) {
                    callBack(error)
                }
                else {
                    callBack(null, results)
                }
            }
            )
    },
     getTaskBy_Id: (id, callBack) => {
      
        pool.query(
            `SELECT user_id, task_name, description, status FROM tasks WHERE user_id = '${id}' LIMIT 2`,
            [],
            (error, result, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    update_Task:(data, callBack) => {
        pool.query(
                'UPDATE tasks SET task_name = ?,description=?,status=? WHERE id = ?',
                [
                    data.task_name,
                    data.description,
                    data.status,
                    data.id
                ],
                (error,results,fields) => {
                    if(error)
                    {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
             )
    },
    delete_User:(data,callBack) => {
        pool.query('DELETE FROM users WHERE id = ?',
        [data.id],
        (error,results,fields) => {
            if(error)
            {
                callBack(error);
                return
            }
            return callBack(null, results);
        }
        );
    
    
    },
    deleteTask:(data, callBack) => {
        pool.query(
             'DELETE FROM tasks WHERE id = ?',
             [data.id],
             (error,results,fields) => {
             if(error){
                callBack(error);
                return;
             }
             return callBack(null, results);

            }  
        )   
    
    },
    getFilter_Status:(status, callBack) => {
        console.log("enter");
        pool.query( 

            `SELECT user_id, task_name, description, status FROM tasks WHERE status = '${status}' limit 2,2`,
            [],
            (error,results,fields) => {
            if(error)
            {
                callBack(error);
                return;
            }
            return callBack(null, results);
            }
        )
    },
    getSortedBy_Name:(callBack) =>{
        pool.query(

            `SELECT id,user_id, task_name, description ,status FROM tasks Order by id ASC`,
        [],
        (error,results,fields) => {
            if(error){
                callBack(error);
                return;
            }
            return callBack(null,results);       
        }

        )
    },
    getSortedByIdt:(callback) =>{
        pool.query(

            `SELECT id,user_id, task_name, description ,status FROM tasks Order by id ASC`,
        [],
        (error,results,fields) => {
            if(error){
               
                return callback(error, null);
            }
            
            callback(null,results);       
        }

        )
    }
  
}
