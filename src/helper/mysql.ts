import { createPool } from 'mysql2';

export async function connect() {
  const connection = await createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'craiglist',
    password: 'password',
    // connectionLimit: 10
  });

  return connection;
}
