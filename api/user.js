const { createUser, getUsers, login,create_Task, getTask,getTaskById,updateTasks,deleteTask,getFilterStatus,getSortedByName,getSortedById ,deleteUsers } = require('../contollers/user');
const {create}=require('../contollers/usersSequalize');
const router = require("express").Router();
const { checkToken } = require('../tokenValidation');

router.post('/create', create);
router.get('/get', checkToken, getUsers);
router.delete('/deleteuser', checkToken, deleteUsers);
router.post('/tasks',checkToken,create_Task);
router.get('/gettask',checkToken,getTask);
router.patch('/update',checkToken,updateTasks);
router.delete('/delete',checkToken,deleteTask);
router.get('/status',checkToken,getFilterStatus) //http://localhost:3000/api/user/status?status=todo
router.get('/name',checkToken,getSortedByName);
router.get('/taskid',checkToken,getSortedById);
router.get('/:id',checkToken,getTaskById)

router.post('/login',login)
 
module.exports = router;

