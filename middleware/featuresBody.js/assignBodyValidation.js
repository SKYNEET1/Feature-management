const Joi = require("joi");

// Validation schema
const assignBodyValidation = (req, res, next) => {

    try {

        const schema = Joi.object({
            feature_id: Joi.number().integer().positive().required().messages({
                "number.base": "feature_id must be a number",
                "number.integer": "feature_id must be an integer",
                "number.positive": "feature_id must be a positive number",
                "any.required": "feature_id is required",
            }),
            consumer_id: Joi.number().integer().positive().required().messages({
                "number.base": "consumer_id must be a number",
                "number.integer": "consumer_id must be an integer",
                "number.positive": "consumer_id must be a positive number",
                "any.required": "consumer_id is required",
            })
        });

        const bodyValidate = (bodyData) => {
            return schema.validate(bodyData,{abortEarly:false,allowUnknown:false})
        }

        const { error, value } = bodyValidate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        req.body = value;
        next();

    } catch (error) {

        return res.status(500).json({ 
            error: "Internal server error" 
        });

    }

}

module.exports = assignBodyValidation