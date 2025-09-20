const { featureRemove } = require("../../service/features.service");

exports.removeFeature = async (req, res) => {
    try {

        const { feature_id } = req.params;

        

        if (!feature_id) {
            return res.status(400).json({
                success: false,
                message: "Feature ID is required",
            });
        }

        const removedFeature = await featureRemove(feature_id);

        return res.status(200).json({
            success: true,
            message: "Feature removed successfully",
            data: removedFeature,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
