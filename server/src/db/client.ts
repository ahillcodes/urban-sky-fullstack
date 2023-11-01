import { Client } from 'pg';

export const config = {
  database: "urban_sky",
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432
}

export const client = new Client(config);

// TODO: Do something smarter than this
client.connect();