const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:  'features',
    password: 'Swagat2002$',
    port:  5432
});

pool.connect()
.then((client)=>{
    console.log('Successfully conected to PG');
})
.catch((error)=>{
    console.error("Connection error",error)
})

pool.on("error", (error) => {
  console.error("Unexpected PG error", error);
  process.exit(-1);
});

module.exports = pool