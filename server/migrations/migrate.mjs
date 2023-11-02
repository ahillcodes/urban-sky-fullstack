import { migrate } from "postgres-migrations"

const config = {
  database: process.env['PGDATABASE'],
  user: process.env['PGUSER'],
  password: process.env['PGPASSWORD'],
  host: process.env['PGHOST'],
  port: parseInt(process.env['PGPORT'])
}

migrate(config, './migrations');