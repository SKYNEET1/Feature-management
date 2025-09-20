const { createFeatures } = require("../../service/features.service");

exports.addFeatures = async (req, res) => {
    try {
        const { feature_name, description, parent_id } = req.body;

        if (!feature_name || !description) {
            return res.status(400).json({
                success: false,
                message: "Feature name and description are required, after validation"
            });
        }

        const feature = await createFeatures(feature_name, description, parent_id || null);

        return res.status(201).json({
            success: true,
            message: "Feature created successfully",
            data: feature
        });

    } catch (error) {

        console.error("addFeatures controller Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error while creating feature",
            error: error.message
        });
    }
};