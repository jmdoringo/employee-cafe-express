import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('Database connection failed: ', err)
        return
    }

    console.log('Successfully connected to database')
    // connection.end()
})

export default connection