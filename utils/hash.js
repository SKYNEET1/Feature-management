const bcrypt = require('bcrypt');

const hashPassword = async (password) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    } catch (error) {
        throw new Error("Error in hasing password", error)
    }

};

const comparePassword = async (plainPassword, hashedPassword) => {

    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing password",error);
    }

}

module.exports = {hashPassword, comparePassword}