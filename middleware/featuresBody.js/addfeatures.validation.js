const Joi = require("joi")

const addfeaturesValidation = async (req, res, next) => {

    const schemaValidate = Joi.object({

        feature_name: Joi.string()
            .max(100)
            .required()
            .messages({
                'string.base': 'Feature name must be a string',
                'string.empty': 'Feature name is required',
                'string.max': 'Feature name cannot exceed 100 characters',
                'any.required': 'Feature name is required'
            }),
        description: Joi.string()
            .allow('', null)
            .messages({
                'string.base': 'Description must be a string'
            }),
        parent_id: Joi.number()
            .integer()
            .optional()
            .messages({
                'number.base': 'Parent ID must be a number',
                'number.integer': 'Parent ID must be an integer'
            })
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

module.exports = addfeaturesValidation