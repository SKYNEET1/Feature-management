const jwt = require('jsonwebtoken');

// Generate access token (short-lived, 2h)
const generateAccessToken = (user_id, role, email) => {
    console.log('in jwt')
    console.log(user_id,role,email)
    return jwt.sign(
        { user_id, role, email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

// Generate refresh token (long-lived, 7d)
const generateRefreshToken = (user_id, email) => {
    return jwt.sign(
        { user_id, email },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '7d' }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
