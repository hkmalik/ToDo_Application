module.exports  =(sequelize,DataTypes) =>  {

    const role =sequelize.define('role',
    {
        roleId:{
            type:DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true,

        },
         rolename:{
            type:DataTypes.STRING,
        } 
    }
    ,{
        freezeTableName: true
    }) 
      return role;
}
