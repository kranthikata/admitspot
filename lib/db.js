import { Client } from "pg";

let client;

export async function connectToDatabase() {
  if (!client) {
    client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    await client.connect();
    console.log("Connected to the PostgreSQL database successfully!");
  }
  return client;
}
