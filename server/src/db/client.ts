import { Client } from 'pg';

export const client = new Client();

// TODO: Do something smarter than this
client.connect();