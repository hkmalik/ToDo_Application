

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
        },
         assignedid:{

            type:DataTypes.INTEGER,

         },
         deadline:{
            type:DataTypes.DATE
         }
    })
      return createtasks;
}
