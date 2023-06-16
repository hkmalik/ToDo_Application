
const { createUsers, getUsers,  login,resetpassword}=require('../contollers/usersSequalize')
const {createTasks, getTasks, getTaskByUserId, updateTask, deleteTask,getFilterByStatus, getTasksortedByName, getTaskSortedByUserId }=require('../contollers/tasks')

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
router.get('/resetpassword', /*checkToken,*/resetpassword)
router.post('/login', login)




module.exports = router;