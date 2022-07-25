const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

exports.checkAuth = (request, response, next) => {
    const authHeader = request.get('authorization')
    console.log("AUTH HEADER: ", authHeader)
    const token = authHeader.split(' ')[1]
    console.log("TOKEN: ", token)
    
    if (!token) {
      return response.status(401).send("Erro no header")
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return response.status(401).send("Não autorizado")
            }
        });

        next();
          
    } catch(err) {
        console.error(err);
    }
}

