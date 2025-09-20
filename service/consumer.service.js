const { pool } = require("../config/database");

const create = async (balance, user_id) => {

    try {

        const existing = await pool.query(
            `SELECT * FROM consumer WHERE user_id = $1`,
            [user_id]
        );
        if (existing.rows.length > 0) {
            // return await pool.query(
            //     `UPDATE consumer SET balance = $1 WHERE user_id = $2 RETURNING *`,
            //     [balance, user_id]
            // );
            throw new Error('Profile already Exists');
        }

        const result = await pool.query(
            `INSERT INTO consumer (balance,user_id)
                VALUES ($1,$2) RETURNING *;
                `,
            [balance, user_id]
        )
        return result.rows[0];

    } catch (error) {

        throw new Error(` create ConsumerService Error: ${error.message}`, error);

    }

}

const emailCheck = async (email) => {

    try {

        const result = await pool.query(
            `SELECT * FROM consumer WHERE email = $1;`, [email]
        );
        return result.rows[0];

    } catch (error) {

        throw new Error(` emailCheck ConsumerService Error: ${error.message}`, error);

    }

}

const addEmail = async (email, user_id) => {

    try {

        const result = await pool.query(
            `UPDATE consumer
            SET email = $1
            WHERE user_id = $2
            RETURNING * ;`
            , [email, user_id]
        )
        if (result.rowCount === 0) {
            throw new Error(`No consumer found with user_id ${user_id}`);
        }
        return result.rows[0];

    } catch (error) {

        throw new Error(` addEmail ConsumerService Error: ${error.message}`, error);


    }

}

module.exports = { create, emailCheck, addEmail }
