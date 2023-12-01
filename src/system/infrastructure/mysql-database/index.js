import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    connectionLimit: process.env.DATABASE_MAX_CONNECTIONS,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
});

const query = function (sqlQuery, values = null, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null)
            return;
        }

        connection.query(sqlQuery, values, (queryError, results) => {
            if (queryError) {
                callback(queryError, null)
                return;
            }


            connection.release();
            callback(queryError, results)
        });
    });
}

async function transaction(queries) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        let len = queries.length
        for(let i = 0; i < len;i++) await connection.execute('INSERT INTO your_table (column1, column2) VALUES (?, ?)', ['value1', 'value2']);
        await connection.commit();
    } catch (error) {
        console.error('Transfer error:', error);
        await connection.rollback();
        throw error;
    } finally {
        await connection.release();
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