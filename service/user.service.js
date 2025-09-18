const users = require("../model/users")

const create = async (username, email, hashedPassword, role) => {

    try {
        const user = await users.createUser(username, email, hashedPassword, role);
        console.log(user)
        return user

    } catch (error) {
        throw error;
    }

}

const emailCheck = async (email) => {
    try {
        const isUser = await users.findByEmail(email);
        console.log(isUser)
        return isUser
    } catch (error) {
        throw error;
    }
}

module.exports = { create, emailCheck }