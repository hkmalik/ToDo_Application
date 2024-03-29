const multer = require("multer")

const { createUsers, getUsers, login, resetpassword, forgetPassword, userupdate, passwordupdate, deadlinereminder,gettoken } = require('../contollers/usersSequalize')
const { createTasks, getTasks,getTaskById, getTaskByUserId, updateTask, deleteTask, getFilterByStatus, getTasksortedByName, getTaskSortedByUserId, updateTaskStatus, uploadimage } = require('../contollers/tasks')
const { assignedrole, assignedtask, gettaskdetails, getdeadlinedetails, gettaskstatusinfo, gettaskreports, averagetaskreport } = require('../contollers/role')
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }

})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }

})

const { checkToken } = require('../helper/tokenValidation');
console.log("router startings")

router.post('/create', createUsers)///
router.get('/get', getUsers);///
router.post("/upload", upload.single("File"), uploadimage)//not working properly and 
router.post('/tasks', checkToken,createTasks)///
router.get('/gettask'/* ,  checkToken, */,  getTasks);///
router.get('/task/:ID',checkToken,getTaskById)///
router.get('/gettoken/:email',checkToken ,gettoken)///
router.get('/id/:ID', checkToken, getTaskByUserId)//
router.patch('/update/:ID', checkToken, updateTask)///
router.delete('/delete/:ID', checkToken, deleteTask)///
router.get('/status/:status', checkToken, getFilterByStatus)///
router.get('/name', /*checkToken, */getTasksortedByName)
router.get('/sortid', /*checkToken, */getTaskSortedByUserId)
router.patch('/updateuser', /*checkToken,*/userupdate)
router.patch('/updatepassword', checkToken,passwordupdate)//
/* router.patch('/updatestatus', /*checkToken,updateTaskStatus)// */
router.post('/role',checkToken,assignedrole)//
router.post('/roleid',  checkToken, assignedtask)///
router.get('/getassigntask/:ID',checkToken,gettaskdetails)//
router.get('/deadline',/*checkToken,*/getdeadlinedetails)
router.get('/taskstatus/:status/:assignid', /*checkToken,*/gettaskstatusinfo)//
router.get('/taskreport/:user_id/:id', /*checkToken,*/gettaskreports)//all most done
router.get('/averageratio', /*checkToken,*/averagetaskreport)
//router.post('/mail', /*checkToken,*/mailer)// for testing purpose only
router.post('/forgetpassword', forgetPassword)//
router.post('/resetpassword', resetpassword)//
router.get('/reminder',/*checkToken,*/deadlinereminder)//(need to design)//for monday purpose


router.post('/login', login)///




module.exports = router;