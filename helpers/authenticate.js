const jwt = require("jsonwebtoken");
const HttpError = require("./HttpError");
const User = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    // // Проверка на наличие заголовка Authorization
    // if (!authorization) {
    //     return next(HttpError(401, "Authorization header is missing"));
    // }
    const [bearer, token] = authorization.split(' ');    

    if (bearer !== 'Bearer') {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }
        req.user = user;
        next()
    } catch {
        next(HttpError(401));
    }

}

module.exports = authenticate;