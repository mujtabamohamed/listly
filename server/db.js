
import pg from "pg";
import { config } from "dotenv";

config();
const { Pool } = pg;

// const pool = new Pool({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PROCESS,
// });

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

pool.connect((err) => {
    if(err) throw err
    console.log("Connected successfully")

})

export default pool;
