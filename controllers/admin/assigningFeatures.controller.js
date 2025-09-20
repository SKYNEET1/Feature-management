const { asignFeatures } = require("../../service/features.service");

exports.assignFeaturesToConsumer = async (req, res) => {
    try {
        const { consumer_id, feature_id } = req.body

        if (!consumer_id || !feature_id) {
            return res.status(400).json({
                success: false,
                message: "consumer_id and feature_id are required"
            });
        }

        const assignedFeatures = await asignFeatures(consumer_id, feature_id);

        if (!assignedFeatures || assignedFeatures.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Feature assignment failed"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Features assigned successfully",
            data: assignedFeatures
        });

    } catch (error) {
        console.error("assignFeaturesToConsumer Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error while assigning features",
            error: error.message
        });
    }
};
