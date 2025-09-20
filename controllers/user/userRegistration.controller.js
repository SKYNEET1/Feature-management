const { create, emailCheck } = require("../../service/consumer.service");
const { hashPassword } = require("../../utils/hash");

exports.userRegistration = async (req, res) => {

    try {

        console.log('You are in reg controller')

        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Some sanitise values are missing from validation'
            })
        }
        const isuser = await emailCheck(email);
        if (isuser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already present please login'
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = await create(username, email, hashedPassword, role);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User can not created, Something went wrong in services'
            })
        }

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });

    }
}