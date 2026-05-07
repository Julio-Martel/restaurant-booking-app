import mysql from 'mysql2';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Climax4561@",
    database: "proyecto3"
});

export default pool.promise();