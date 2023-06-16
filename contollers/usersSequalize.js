const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/userhelper');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
const users = db.models.Users;
const tasks = db.models.tasks;
//1.create users
function emailvalid(email) {
    let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return email.match(emailFormat) ? true : false;
}
/*function isPasswordStrong(password)
{
    let passwordFormat = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z]).{8,16}$/
    if(password.match(passwordFormat))
    {
        return true;
    }////////////////////////////////////////THIS FUNCTIONS IS NOT TESTED YET TEST IT AFTER PERFORMING
    \//////////////////////////////////////// THE OTHER TASK
    else{
        console.error("Invalid password")
        return false;
    }
}*/

const createUsers = async (req, res) => {
    let { name, username, email, password, isactive_key } = req.body;

    try {
        if (emailvalid(email)) {
            console.log("he1")
            let data = await helper.createuser(name, username, email, password, isactive_key)
            return res.status(201).json(data)
        } else {
            // return res.status(422).send('Email is invalid');
            // throw new Error('Email is invalid')
            return res.status(401).send('The Entered Email is Invalid')
        }
    }
    catch (err) {
        return res.status(500).send("invalid")
    }
}
const login = async (req, res) => {
    try {

        const data = await helper.login_user(req.body.email)

        let hiddenpassword = data[0].password
        //console.log(req.body.password)
        // console.log("hi", hiddenpassword)

        if (await bcrypt.compare(req.body.password, hiddenpassword)) {

            if (data.length > 0) {
                console.log("login4")

                const jsontoken = sign({ result: data }, "hk12", { expiresIn: "1h" });
                res.status(201).json({ token: jsontoken });
            }
            else {
                console.log("Invalid email and password")
            }

        }
        else {

            res.status(401).send("password incorrect")
        }
    }
    catch (err) {
        res.status(401).send("invalid creditional")
    }

}
const getUsers = async (req, res) => {

    try {
        console.log("Getting users...")
        const data = await helper.getuser()
        res.status(200).json(data);
    }
    catch (err) {
        console.log("Getting users...1")

        res.status(500).send(err)
    }

}

const resetpassword = async (name, email, token) => {

    try {
        //connect with smtp server
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            require: true,
            auth: {
                user: "",
                pass: '',
            },
        });
        let info = await transporter.sendMail({

            from: "", // sender address
            to: email, // list of receivers
            subject: "Rest Your Password", // Subject line
            html: '<p>Welcome ' + name + ',click on the link  and <a href="http://localhost:3000/API/user//resetpassword?token' + token + '">reset your password '




        })
        console.log("Message sent: %s", info.messageId);
        res.json(info);

        res.send("password reset")
    }
    catch (err) {
        res.status(500).send({ sucess: false, msg: console.error.messsage });
    }
}
/*const forgetPassword = async(res,req)=>{
   //connect with smtp server
   let transporter= nodemailer.createTransport({
       host: "smtp.ethereal.email",
       auth: {
           user: 'hettie.auer@ethereal.email',
           pass: 'tuZZ7G5Vnb8sYruFDU'
       },
   });
     let info= await transporter.sendMail({

       from: '"hamza" <Todo@gmail.com>', // sender address
       to: "rasgul309@gmail.com", // list of receivers
       subject: "Rest Your Password", // Subject line
       text: "https://www.google.com/", // plain text body
       html: " <link rel='stylesheet' href='https://www.google.com/'> ", // html body



     })
     console.log("Message sent: %s", info.messageId);
     res.json(info);
    
   res.send("password reset"-*/













module.exports =
{
    login,
    createUsers,
    getUsers,
    resetpassword
}
