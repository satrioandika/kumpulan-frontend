const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nama;";
    
                pool.query(query, (err, results) => {
                    if (err) reject(new Error(err.message)); 
                    resolve(results);
                });
            });
    
            return response; 
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    async insertNewName(nama) {
        try {
            const tanggal = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO nama (nama, tanggal) VALUES (?, ?);";
    
                pool.query(query, [nama, tanggal], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                });
            });
            return {
                id : insertId,
                nama : nama,
                tanggal : tanggal
            };
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM nama WHERE id = ?";
    
                pool.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateNamaById(id, nama) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE nama SET nama = ? WHERE id = ?";
    
                pool.query(query, [nama, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async searchByNama(nama) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nama WHERE nama = ?;";
    
                pool.query(query, [nama], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = DbService;
