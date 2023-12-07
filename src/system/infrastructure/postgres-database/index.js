import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
    max: process.env.DATABASE_MAX_CONNECTIONS, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Function to execute a query
async function query(text, params) {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query:', { text, duration, rows: result.rowCount });
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function transaction(queries) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        let len = queries.length
        for(let i = 0; i < len;i++) await client.query(queries[i][0], queries[i][1])
        await client.query('COMMIT');
    } catch (error) {
        console.error('Transfer error:', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.release();
    }
}

/*
    // transaction usage example
    let queries = [
        [`UPDATE accounts SET balance = balance - $1 WHERE id = $2`, [amount, senderAccountId]],
        [`UPDATE accounts SET balance = balance - $1 WHERE id = $2`, [amount, senderAccountId]],
    ]

    transaction(queries).then(() => console.log('Transaction complete')).catch((error) => console.error('Transaction failed:', error))
*/

export default {
    pool,
    query,
    transaction
}