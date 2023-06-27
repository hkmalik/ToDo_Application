const db = require('../models');
const { sign } = require('jsonwebtoken');
const helper = require('../services/userhelper');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
const user = require('../models/user');
const{config}=require('./config')
const { QueryTypes } = require('sequelize');
const mailGen= require('mailgen');
const{EMAIL,PASSWORD}= require('../env')// for gmail id
const url=require('url');
const { error } = require('console');

const  cron=require('node-cron');
const shell=require('shelljs')
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
    let { name, username, email, password, isActiveKey } = req.body;
 

    try {
        if (emailvalid(email)) {
            console.log("he1")
            let data = await helper.createuser(name, username, email, password, isActiveKey)
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
const userupdate=async(req,res)=>{

    try{
        console.log("check entering the try ")
        const data = await helper.updateuser(req.body,req.body.id)
        console.log(data)
         return res.status(200).send(data)

        
    }
    catch(error){

        return res.status(500).send(error)
    }

}
const passwordupdate=async(req,res)=>{
    try{
        console.log("check entering the try ")
        const data = await helper.updateUserPassword(req.body.email)
        let password= data[0].password
        let newpassword=(req.body.newpassword)
        console.log(password)
        console.log(req.body.password)
        console.log("bycrpting")
        if (await bcrypt.compare(req.body.password, password))
        {
            console.log("password updating1")
            const data= await helper.updateUserPassword2(req.body.email,newpassword)
           
            res.status(200).send(data)
        }
        else
        {
            res.status(500).send("couldn't update the password",errors)
        }
        res.status(200).send(data)
    }
catch(error){

   res.status(401).send("invalid creditional")
    }
}
const login = async (req, res) => {
    try {

        const data = await helper.login_user(req.body.email,req.body.role)

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

const resetpassword = async (req,res) => {
 console.log("entering the reset password")
     let newtoken=req.query.token// takin query token from url 
     let email=req.body.email
     let password=req.body.password

     try{
        console.log("Resetting password")
        const data=await helper.checktoken(newtoken)
        if(data.length>0)
        {

            console.log("updating the password...")
            const data=await helper.updateUserPassword2(email,password)
            if(data.length>0)
            {
                console.log("hello")
                const data1=await helper.deletetoken(newtoken)
                res.status(200).send(data1)
            }else{
            res.status(500).send("error")
            }
        }
        else{
            res.status(404).send("Not Found")
        }
     }
     catch(err) {
        res.status(500).send(err)
        
     }

   
}
const forgetPassword = async(req,res)=>{
    let useremail=req.body.email // the email in database
    console.log(useremail)
    let dummyemail=req.body.dummyemail// temp email from temp mail to use for temporarypupose
    //let name=req.body.username
    let url="http://localhost:3000/API/user/resetpassword"
    try{
        console.log("helo")
        console.log(dummyemail)
        let data =await helper.searchemail(useremail)
        if(data.length>0)
        {
            console.log("helo3")
            const jsontoken = sign({ result: data }, "hk12", { expiresIn: "1h" });
            //console.log(jsontoken)
            let data2 =await helper.inserttoken(useremail,jsontoken)
           console.log("helo5")
           console.log(data2.length)
           if(data2.length>0)
           {
            console.log("working")
            let config={
                service:'gmail',
                auth:{
                    user:EMAIL,
                    pass:PASSWORD
        
                }
            }
            console.log("working2")
            let transporter=nodemailer.createTransport(config);
            console.log("working3")
            let mailGenerator= new mailGen({
                theme:"default",
                product:{
                    name:"Timetodo",
                    link:"http://mailgen.js/"
        
                }
        
            })
            console.log("working4")
            let response={
                body:{
                
                    intro:"welcome to todolist",
                    table:{
                        data:[
                            {
                             link:`http//localhost:3000/API/users/restpassword`
                            }
                        ]
                    }
                }
                        
            }
            console.log("working5")
            let mail =mailGenerator.generate(response)
            console.log("working6")
             let message={
                from :EMAIL,
                to:dummyemail,
                subject:"place order",
                html: '<p>Click <a href="http://localhost:3000/API/user/resetpassword?token='+ jsontoken+'">here</a> to reset your password</p>'
            }
             console.log("working7")
            transporter.sendMail(message)
            .then(()=>{
        
                return res.status(201).json({
                    msg:"check your mail"

                })
            }).catch(err => {
            
                res.status(500).json({err})
            })
           }
           else
           {
            console.log("token not generated")
           }
            
        }
        else{
            console.log("data not available")
            res.status(200).send("enter a valid email address");

            
        }

    }
    catch(error){
        res.status(500).send(error);

    }

}
/*
const mailer=async(req,res)=>{
        console.log("hellomr")
        let testAccount =await nodemailer.createTestAccount();
        console.log("hellomr2")

        let transporter=nodemailer.createTransport({

            host:"smtp.ethereal.email",
            port:587,
            secure:false,
            auth:{
                user:testAccount.user,///USERNAME
                pass:testAccount.pass,///PASSWORD
            },
        
        });
        let message ={
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "sucessfully register with us", // plain text body
            html: "<b>Hello world?</b>", // html body 
        }
        transporter.sendMail(message)
        .then((info)=>{
            
            return res.status(201).
            json({msg:"you should an email",
            info:info.messageId,
            preview:nodemailer.getTestMessageUrl(info)
            })          
        }).catch(err => {
            
        return   res.status(500).json({err})
        })
       // res.status(201).json("signup sucessfully..!")

}*////working fine with ethereal
/*
  const mailer=async(req,res)=>{
    useremail=req.body.useremail
    let config={
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD

        }
    }

    let transporter=nodemailer.createTransport(config);

    let mailGenerator= new mailGen({
        theme:"default",
        product:{
            name:"Timetodo",
            link:"http://mailgen.js/"

        }

    })
    let response={
        body:{
        
            intro:"welcome to todolist",
            table:{
                data:[
                    {
                    item:"nodemailer stack book",
                    link:"http://google.com"
                    }
                ]
            }
        }
                
    }

    let mail =mailGenerator.generate(response)
     let message={
        from :EMAIL,
        to:useremail,
        subject:"place order",
        html:mail
     }

    transporter.sendMail(message)
    .then(()=>{

        return res.status(201).json({
            msg:"you should receive an email"
        })
    }).catch(err => {
    
        res.status(500).json({err})
    })






}*/
const deadlinereminder = async(req,res)=>{

    cron.schedule("******",function(){
        console.log("nod script working")
        res.status(200).send("starteed")
    })
    res.status(200).send("starteed")
}













module.exports =
{
    
    //mailer, // a simple function use for testing purpose.
    login,
    createUsers,
    getUsers,
    resetpassword,
    forgetPassword,
    userupdate,
    passwordupdate,
    deadlinereminder,
}
