const Joi = require("joi");

// Validation schema
const paramsValidation = (req, res, next) => {

    try {

        const schema = Joi.object({
            feature_id: Joi.number().integer().positive().required().messages({
                "number.base": "feature_id must be a number",
                "number.integer": "feature_id must be an integer",
                "number.positive": "feature_id must be a positive number",
                "any.required": "feature_id is required",
            })
        });

        const { error, value } = schema.validate(req.params);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        req.params = value;
        next();

    } catch (error) {

        return res.status(500).json({ 
            error: "Internal server error" 
        });

    }

}

module.exports = paramsValidation