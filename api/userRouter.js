
const { createUsers, getUsers,  login, resetpassword, forgetPassword ,userupdate,passwordupdate,deadlinereminder}=require('../contollers/usersSequalize')
const {createTasks, getTasks, getTaskByUserId, updateTask, deleteTask,getFilterByStatus, getTasksortedByName, getTaskSortedByUserId,updateTaskStatus }=require('../contollers/tasks')
const{assignedrole,assignedtask,gettaskdetails,getdeadlinedetails,gettaskstatusinfo,gettaskreports,averagetaskreport}=require('../contollers/role')
const router = require("express").Router();
const { checkToken } = require('../tokenValidation');
console.log("router startings")
 
router.post('/create', createUsers)
router.get('/get', getUsers);
router.post('/tasks', /*checkToken,*/ createTasks)
router.get('/gettask', /*checkToken,*/ getTasks);
router.get('/id', /*checkToken,*/ getTaskByUserId)
router.patch('/update', /*checkToken,*/ updateTask)
router.delete('/delete', /*checkToken,*/ deleteTask)
router.get('/status', /*checkToken,*/ getFilterByStatus)
router.get('/name', /*checkToken, */getTasksortedByName)
router.get('/sortid', /*checkToken, */getTaskSortedByUserId)
router.patch('/updateuser', /*checkToken,*/userupdate)
router.patch('/updatepassword', /*checkToken,*/passwordupdate)
router.patch('/updatestatus', /*checkToken,*/updateTaskStatus)
router.post('/role', /*checkToken,*/assignedrole)
router.get('/roleid', /*checkToken,*/assignedtask)
router.get('/getassigntask', /*checkToken,*/gettaskdetails)
router.get('/deadline',/*checkToken,*/getdeadlinedetails)
router.get('/taskstatus', /*checkToken,*/gettaskstatusinfo)
router.get('/taskreport', /*checkToken,*/gettaskreports)
router.get('/averageratio', /*checkToken,*/averagetaskreport)
//router.post('/mail', /*checkToken,*/mailer)// for testing purpose only
router.post('/forgetpassword',forgetPassword)
router.get('/resetpassword',resetpassword)
router.get('/reminder',/*checkToken,*/deadlinereminder)


router.post('/login', login)




module.exports = router;