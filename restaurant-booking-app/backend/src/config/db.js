import mysql from 'mysql2';

const pool = mysql.PoolConnection({
    host: "localhost",
    user: "root",
    password: "Climax4561@",
    database: "proyecto3"
});

export default pool.promise();