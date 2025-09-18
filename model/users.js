// queries.js
const pool = require("../config/database"); // your PG pool

module.exports = {

  // Create a new user
  createUser: async (username, email, hashedPassword, role = "user") => {
    const result = await pool.query(
      `INSERT INTO users (username, email, password, role) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, hashedPassword, role]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`, [email]
    );
    return result.rows[0];
  }, 

};
