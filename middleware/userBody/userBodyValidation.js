const Joi = require('joi')

const usersBodyValidation = async (req, res, next) => {

    const signupValidation = Joi.object({
        username: Joi.string().trim().max(20).required().messages({
            "string.empty": "User name can not be empty",
            "any.required": "User name is mandatory"
        }),
        email: Joi.string().trim().email().required().messages({
            "string.empty": "email can not be empty",
            "string.email": "email should be valid",
            "any.required": "email is mandatory"
        }),
        role: Joi.string().trim().lowercase().valid("admin", "user").required().messages({
            'any.only': 'role must be either admin, user',
            'any.required': 'role is mandatory',
            'string.empty': 'role can not be empty'
        }),
        password: Joi.string().trim().required().messages({
            "string.empty": "password can not be empty",
            "any.required": "password is mandatory"
        }),
        confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({
            "any.only": "Confirm password must match password",
            "any.required": "Confirm password is mandatory",
            "string.empty": "Confirm password cannot be empty"
        }),
    })

    const validateUsers = (bodyData) => {
        return signupValidation.validate(bodyData, { abortEarly: false, allowUnknown: false })
    }

    const { error, value } = validateUsers(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    const {confirmPassword, ...sanitiseValue} = value;
    req.body = sanitiseValue;
    next();

}


module.exports = usersBodyValidation