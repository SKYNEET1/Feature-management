require('dotenv').config();
const express = require('express');
const { pool, dbConnect } = require('./config/database');
const router = require('./routes/route');

const app = express();
app.use(express.json());
app.use('/api', router);

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 3000;

(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`🚀 Server started successfully at PORT: ${PORT}`);
  });
})();
