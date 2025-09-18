const jwt = require('jsonwebtoken');

const generateAccessToken = (id,role) => {
    return jwt.sign(
        {id,role},
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    )
}

const generateRefreshToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '7d' }
    )
}

module.exports = {generateAccessToken, generateRefreshToken}

