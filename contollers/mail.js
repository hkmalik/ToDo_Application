const mailGen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env')// for gmail id
const nodemailer = require("nodemailer");
module.exports = {
    mailer: async (req, res) => {
        useremail = req.body.useremail
        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD

            }
        }

        let transporter = nodemailer.createTransport(config);

        let mailGenerator = new mailGen({
            theme: "default",
            product: {
                name: "Timetodo",
                link: "http://mailgen.js/"

            }

        })
        let response = {
            body: {

                intro: "welcome to todolist",
                table: {
                    data: [
                        {
                            item: "nodemailer stack book",
                            link: "http://google.com"
                        }
                    ]
                }
            }

        }

        let mail = mailGenerator.generate(response)
        let message = {
            from: EMAIL,
            to: useremail,
            subject: "place order",
            html: mail
        }

        transporter.sendMail(message)
            .then(() => {

                return res.status(201).json({
                    msg: "you should receive an email"
                })
            }).catch(err => {

                res.status(500).json({ err })
            })
    }
}