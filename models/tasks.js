const {users}=require('./user');

module.exports  =(sequelize,DataTypes) =>  {

    const createtasks =sequelize.define('tasks',
    {
        id:{
            type:DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true,

        },
        user_id:
        {
            type:DataTypes.INTEGER,
        
        },
        task_name:
        {
            type:DataTypes.STRING,

        },
        description:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.ENUM("todo","inprogress","complete","canceled"),
        }

        
    })
      return createtasks;
}
