const Joi = require('joi');

const userLoginValidate = async (req, res, next) => {

    const loginBodyValidate = Joi.object({
        email: Joi.string().trim().email().required().messages({
            "string.empty": "email can not be empty",
            "string.email": "email should be valid",
            "any.required": "email is mandatory"
        }),
        password: Joi.string().trim().required().messages({
            "string.empty": "password can not be empty",
            "any.required": "password is mandatory"
        }),
    })

    const schemaValidate = (bodyData) => {
        return loginBodyValidate.validate(bodyData, { abortEarly: false, allowUnknown: false })
    }

    const { error, value } = schemaValidate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = value;
    next()
}

module.exports = userLoginValidate