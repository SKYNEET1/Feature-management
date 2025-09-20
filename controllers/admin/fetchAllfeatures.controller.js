const { getFeatures } = require("../../service/features.service");

exports.getAllFeatures = async (_, res) => {

    try {

        const features = await getFeatures();

        return res.status(200).json({
            success: true,
            count: features.length,
            data: features
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};