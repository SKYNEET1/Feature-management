const Joi = require("joi")

const consumerBodyValidation = async (req, res, next) => {

    const schemaValidate = Joi.object({

        balance: Joi.number()
            .precision(2)
            .strict()           
            .greater(0)
            .required()
            .messages({
                'number.base': 'balance must be a number (e.g. 100.00).',
                'number.precision': 'balance can have at most 2 decimal places.',
                'number.greater': 'balance must be greater than 0.',
                'any.required': 'balance is required.'
            }),
    })

    const bodyValidation = (bodyData) => {
        return schemaValidate.validate(bodyData, { abortEarly: false, allowUnknown: false })
    }

    const { error, value } = bodyValidation(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = value;
    next()

}

module.exports = consumerBodyValidation