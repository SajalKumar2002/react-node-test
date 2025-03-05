const jwt = require('jsonwebtoken')

exports.sendTokenToClient = (client, rememberMe, res) => {
    const token = jwt.sign(client, process.env.JWT_TOKEN);

    const cookie = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION' ? true : false,
        sameSite: 'Strict'
    };

    if (rememberMe) {
        cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    }

    res.cookie("usertoken", token, cookie);

    res.status(200).json({ message: "Successfully Logged In" });
};

exports.checkCookiePresence = (req) => {
    return req.cookies.usertoken ? true : false;
}

exports.verifyCookie = (req) => {
    return jwt.verify(req.cookies.usertoken, process.env.JWT_TOKEN)
}