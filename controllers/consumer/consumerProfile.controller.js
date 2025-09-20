const { emailCheck, create, addEmail } = require("../../service/user.service");

exports.consumerProfile = async (req, res) => {

    try {
        const { balance } = req.body;
        const { email, user_id } = req.user;
        console.log(user_id)
        if (!balance) {
            return res.status(400).json({
                success: false,
                message: 'Some of the values are missing from validaiton.'
            })
        }

        const isconsumer = await emailCheck(email);
        if (!isconsumer) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong in creating Consumer profile '
            })
        }

        const consumer = await create(balance, user_id);
        if (!consumer) {
            return res.status(400).json({
                success: false,
                message: 'Consumer profile could not be created.'
            })
        }

        const updateEmail = await addEmail(email, user_id);
        if (!updateEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email of the consumer can not be updated'
            })
        }

        return res.status(202).json({
            success: true,
            message: 'Consumer Profile created Successfully',
            data:updateEmail
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}