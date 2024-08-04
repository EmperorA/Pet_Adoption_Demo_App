//Module imports
require("dotenv").config();
const http = require("http");
const { Pool } = require("pg");

//Config imports
const app = require("./app");
const PORT = process.env.PORT;

//Create PostgreSQL client object
const dbConfig = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false, // Adjust this based on your security needs
  },
});

//Create http server
const server = http.createServer(app);

async function startServer() {
  try {
    // Connect to PostgreSQL
    await dbConfig.connect(() => {
      console.log("Connected to PostgreSQL database");
    });

    //TEST DB connexion: only for testing purposes
    dbConfig.query("SELECT * FROM test", (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("Query result:", result.rows);
      }
    });

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Error starting the server or connecting to the database:",
      error
    );
    process.exit(1); // Exit the process with failure code
  }
}

startServer();
