import mysql from 'mysql2';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '..', '.env') });

// First create a connection without specifying the database
const initialConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Function to create database if it doesn't exist
const createDatabase = () => {
    return new Promise((resolve, reject) => {
        initialConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, results) => {
            if (err) {
                console.error("❌ Database creation failed:", err);
                reject(err);
            } else {
                console.log(`✅ Database '${process.env.DB_NAME}' ready!`);
                resolve();
            }
        });
    });
};

// Initialize the main database connection
let db;

const initializeConnection = async () => {
    try {
        await createDatabase();
        // Now create the main connection with the database specified
        db = mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        return new Promise((resolve, reject) => {
            db.connect((err) => {
                if (err) {
                    console.error("❌ Database connection failed:", err);
                    reject(err);
                } else {
                    console.log("✅ Database connected successfully!");
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error("❌ Database initialization failed:", error);
        throw error;
    }
};

const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT,
            mobileNumber VARCHAR(15) UNIQUE,
            email VARCHAR(50) UNIQUE NOT NULL,
            benefit_company VARCHAR(100),
            benefit_industry VARCHAR(100),
            companyName VARCHAR(100),
            jobTitle VARCHAR(100),
            address TEXT
        )
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Table creation failed:", err);
        } else {
            console.log("✅ Users table ready!");
        }
    });
};

// Initialize the database and create table
const init = async () => {
    try {
        await initializeConnection();
        createTable();
    } catch (error) {
        console.error("❌ Initialization failed:", error);
        process.exit(1);
    }
};


// Export both
export { db, init as createTable };
