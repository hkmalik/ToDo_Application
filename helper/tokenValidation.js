const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
            
        let token = req.get("Authorization");
        //console.log(token)
        if (token) {
            token = token.slice(7);
            verify(token, "hk12", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "invalid token"
                    });
                }
                else {
                    next()
                }
            }) //parameters is token then the key and then a callback


        } else {
            res.json({
                success: 0,
                message: "Acess denial unauthorized user"
            })
        }
    }
}