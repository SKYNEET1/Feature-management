const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {

    let token;
    if (req.headers?.authorization && req.headers?.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        token = req.cookies?.token;
    }

    if (!token) {
        return res.status(401).json({
            message: 'Access Denied. No token provided.'
        });
    } else {
        console.log("Token is successfully Extracted", token)
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(400).json({
                success: false,
                message: 'Could not fetch the payload from token'
            })
            req.user = decode
            next();
        }
    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired. Please refresh your token.',
                expiredAt: error.expiredAt
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
}