const bcrypt = require('bcrypt');

module.exports={
    async hashedpassword(password) {
        return new Promise(async (resolve, reject) => {
          try {
            console.log(password);
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            console.log("password in encryption mode", passwordHash);
            resolve(passwordHash);
          } catch (error) {
            reject(error);
          }
        });
      }
         
        

    }





