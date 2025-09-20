const { pool } = require("../config/database");

const create = async (username, email, hashedPassword, role) => {

    try {
        const result = await pool.query(
            `INSERT INTO users (username, email, password, role) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            //  returning the full inserted coloumn if u write name insted of * then it would give u only name
            [username, email, hashedPassword, role]
        );
        return result.rows[0];

    } catch (error) {
        throw new Error(` create userService Error: ${error.message}`, error);

    }

}

const emailCheck = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`, [email]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(` emailCheck userService Error: ${error.message}`, error);

    }
}

module.exports = { create, emailCheck }




