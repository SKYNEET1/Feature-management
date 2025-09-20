
const autherisedAdmin = async (req, res, next) => {

    if (!req.user || !req.user.user_id || !req.user.role) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing authentication details in token"
        });
    }
    const { user_id, role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: `This ${user_id} is not autherised to create User profile`
        })
    }

    next();

}

module.exports = autherisedAdmin