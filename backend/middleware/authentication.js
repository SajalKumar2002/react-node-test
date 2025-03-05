const {
    checkCookiePresence,
    verifyCookie,
} = require('../helpers/jwt.helper');

exports.getAccessToRoute = (req, res, next) => {
    if (checkCookiePresence(req)) {
        const { usertoken } = req.cookies;
        if (usertoken) {
            try {
                const result = verifyCookie(req);
                req.user = result;
                if (next) next()
            } catch (error) {
                res.clearCookie('usertoken',
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'Strict'
                    });
                return res.status(401).send({ message: "Unauthorized" })
            }
        }
    } else {
        return res.status(401).send({ message: "Unauthorized" })
    }
}
