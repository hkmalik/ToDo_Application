/*module.exports  =(sequelize,DataTypes) =>  {

    const admins_task =sequelize.define('admins_assigned_task',
    {
     
        taskid:{
            type:DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true,

        },
        useremail:
        {
            type:DataTypes.STRING,
            unique:true,
        
        },
       assignedtask:
        {
            type:DataTypes.STRING,

        },
        assignedtime:{
            type:DataTypes.DATE
        },
        deadline:
        {
            type:DataTypes.DATE
        },
        createdAt: {
            type:DataTypes.DATE,
            field: 'created_at',
          },
          updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
          }
        }, {
          freezeTableName: true, // Model tableName will be the same as the model name
          timestamps: false,
        
          })  
          return admins_task;
}*/