const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
const dbConnect = async () => {
    
    try {
        const client = await pool.connect()
        console.log('✅ Successfully connected to PostgreSQL');
        client.release();
    } catch (error) {
        console.error('❌ Connection error:', error.message);
        console.log(error)
        process.exit(1);
    }

    pool.on("error", (error) => {
        console.error("⚠️ Unexpected PG error", error);
        process.exit(-1);
    });

}

module.exports = { pool, dbConnect }