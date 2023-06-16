const { QueryTypes } = require('sequelize');
const db = require('../models');
const { hashedpassword } = require('./passwordencrption')
const tasks = db.models.tasks;
const users = db.models.Users;
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
                    'INSERT INTO users (name, username, email, password, isactive_key) VALUES (?, ?, ?, ?, ?)',
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
            users.sequelize.query('SELECT * FROM users', {
                type: QueryTypes.SELECT
            }).then(data => {
                console.log(data);
                resolve(data);
            }).catch(err => {
                reject(err)

            })
        })
        //users.findAll().
        //    then(data=>{
        //        resolve(data);
        //    }).catch(err=>{
        //        reject(err);
        //    })
        //});
    },
    login_user: (useremail) => {


        return new Promise((resolve, reject) => {

            users.sequelize.query('SELECT * FROM users WHERE email=:email', {
                type: QueryTypes.SELECT,
                replacements: { email: useremail }
            })
                /*             users.findAll({
                                where: {
                                    email: useremail,
                                    password: password
                                }
                            }) */
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })


        });
    },

}
