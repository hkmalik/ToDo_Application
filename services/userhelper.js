const { QueryTypes } = require('sequelize');
const db = require('../models');
const { hashedpassword } = require('./passwordencrption');
const database = require('../config/dbconfig');
const users = db.models.Users;
const task = db.models.tasks
module.exports = {
    createuser: (name, username, email, password, isactive_key) => {
        console.log("he2")
        return new Promise(async (resolve, reject) => {
            console.log("he3")
            try {
                console.log("he4")
                let passwordData = await hashedpassword(password);
                console.log("password in user", passwordData);
                // console.log("how", name, email, password, isactive_key);
                console.log("he5")

                const data = await users.sequelize.query(
                    'INSERT INTO users (name, username, email, password, isActiveKey) VALUES (?, ?, ?, ?, ?)',
                    {
                        type: QueryTypes.INSERT,
                        replacements: [name, username, email, passwordData, isactive_key],
                    }
                )
                console.log("he6.1")
                data.name = name;
                data.username = username;
                data.password = passwordData;
                data.isactive_key = isactive_key;
                console.log(data);
                console.log("he7")
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    getuser: () => {
        return new Promise((resolve, reject) => {
            console.log("hello");
            users.sequelize.query('SELECT * FROM users JOIN role  ON users.id=role.roleId', {
                type: QueryTypes.SELECT
            }).then(data => {
                console.log(data);
                resolve(data);
            }).catch(err => {
                reject(err)

            })
        })
       
    },
    updateuser: (body, id) => {

        console.log("updating the user...");
        return new Promise((resolve, reject) => {
            //   console.log("updatetask2")
            users.sequelize.query(`UPDATE users SET name =?, username =?,email =? WHERE id=${id}`, {
                type: QueryTypes.UPDATE,
                replacements: [body.name, body.username, body.email]
            }).then(data => {
                console.log(data)
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })

    },
    updateUserPassword: (useremail) => {
        console.log("update password")
        return new Promise((resolve, reject) => {
            console.log("update password 2")
            users.sequelize.query('SELECT * FROM users WHERE email=:email', {
                type: QueryTypes.SELECT,
                replacements: { email: useremail }
            }).
                then(data => {
                    //console.log(data[0].password)
                    resolve(data)
                }).catch(err => {
                    reject(err);
                })
        })
    },
    updateUserPassword2: (email, userpassword) => {
        console.log("update password 2")
        return new Promise(async (resolve, reject) => {
            try {
                    console.log("update password2 functions")
                let passwordData = await hashedpassword(userpassword);
                console.log(passwordData)
                console.log("update password 2")
                const data = await users.sequelize.query(
                    `UPDATE users SET password=? WHERE email=? `, {
                    type: QueryTypes.UPDATE,
                    replacements: [passwordData, email]
                })
                resolve(data)
            }
            catch (err) {
                reject(err);
            }
        })
    },
    login_user: (useremail, role) => {


        return new Promise((resolve, reject) => {

            users.sequelize.query('SELECT * FROM users WHERE email=?,role=?', {
                type: QueryTypes.SELECT,
                replacements: [useremail, role]
            })
                
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })


        });
    },
    searchemail: (email) => {
        return new Promise(async (resolve, reject) => {
            console.log("helo2")
            await users.sequelize.query(`SELECT * FROM users WHERE email=? `, {

                type: QueryTypes.SELECT,
                replacements: [email]

            }).then(data => {


                resolve(data);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    inserttoken: (useremail, token) => {
        return new Promise(async (resolve, reject) => {
            console.log("helo4")
            console.log(useremail)
            users.sequelize.query("update users SET  token=?  WHERE email= ? ", {
                type: QueryTypes.INSERT,
                replacements: [token, useremail]

            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err);
            })

        })

    },
    checktoken: (token) => {
        console.log("Resetting password1")
        //console.log(token)
        return new Promise(async (resolve, reject) => {
            console.log("Resetting password2")
            users.sequelize.query("SELECT *  FROM users WHERE token=?", {
                type: QueryTypes.SELECT,
                replacements: [token]
            }).then(data => {
                resolve(data)
            }).catch(err => {

                reject(err);
            })

        })

    },
    deletetoken: (token) => {

        console.log("deleting the token")
        return new Promise(async (resolve, reject) => {
            await users.sequelize.query("UPDATE users SET token= 0 WHERE token=?", {
                type: QueryTypes.UPDATE,
                replacements: [token]


            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err);
            })
        })
    },

    checkdeadeline: (date) => {

        return new Promise(async (resolve, reject) => {
            task.sequelize.query("SELECT deadline,assignedid FROM tasks WHERE deadline=? AND  activeflag=1", {
                type: QueryTypes.SELECT,
                replacements: [date]
            }).then(data => {

                resolve(data)
            }).catch(err => {
                reject(err);
            })
        })

    },
    checkdeadlinedate: (id, date) => {
        ///console.log("hjhd")
        console.log(id)
        console.log(date)
        return new Promise(async (resolve, reject) => {
            task.sequelize.query(`SELECT u.name,u.email,t.taskName,t.description,t.deadline FROM users u JOIN tasks t on u.id=t.assignedid WHERE t.assignedid =? AND t.deadline=?`, {
                type: QueryTypes.SELECT,
                replacements: [id, date]

            }).then(data => {
                //console.log(data)
                resolve(data)
            }).catch(err => {
                reject(err)
            })


        })

    }
}
