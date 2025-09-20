const { emailCheck } = require("../../service/user.service");
const { comparePassword } = require("../../utils/hash");
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');

exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        const isuser = await emailCheck(email);
        if (!isuser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email is not registered yet'
            })
        }

        const confirmPassword = comparePassword(password, isuser.password);
        if (!confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid password'
            })
        }

        const accessToken = generateAccessToken(isuser.user_id, isuser.role, email);
        const refreshToken = generateRefreshToken(isuser.user_id, email);

        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'accessToken could not be generated'
            })
        }
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'refreshtoken could not be generated'
            })
        }

        await res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 2 * 60 * 60 * 1000
        })
        await res.cookie("refresh", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: `${isuser.username} login successful`,
            accessToken,
            refreshToken
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            message: "Error logging in",
            error: error.message
        })

    }
}