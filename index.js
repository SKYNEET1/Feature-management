require('dotenv').config();
const express = require('express');
const { pool, dbConnect } = require('./config/database');
const Urouter = require('./routes/userRoutes/Uroute');
const Crouter = require('./routes/consumerRoutes/Croute');
const cookieParser = require('cookie-parser');
const Froute = require('./routes/featuresRoutes/Froute');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', Urouter);
app.use('/api', Crouter);
app.use('/api', Froute);

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
