
module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('users',
        {
            id:
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            username:
            {
                type: DataTypes.STRING,
                type: DataTypes.UUID
            },
            email: {
                type: DataTypes.STRING,
                type: DataTypes.UUID
            },
            password: {
                type: DataTypes.STRING,
                type: DataTypes.UUID
            },
            isactive_key:
            {
                type: DataTypes.TINYINT,
                defaultValue: 0
            },
            //createdAt: false,
          //updatedAt: false,
        },
        {
            freezeTableName: true
        });
          return users
   
  
      createtasks.belongsTo(users);

  
}