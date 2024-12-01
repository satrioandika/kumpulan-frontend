const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // login
  async login(username, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        
        connection.query(query, [username, password], (err, results) => {
          if (err) reject(new Error(err.message));
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Users Methods
  async getAllUsers() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewUsers(nama, username, password, kontak, role) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO users (nama, username, password, kontak, role) VALUES (?,?,?,?,?);";
        connection.query(query, [nama, username, password, kontak, role], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        nama: nama,
        username: username,
        password: password,
        kontak: kontak,
        role: role
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUsersById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id_user = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUsersById(id, nama, username, kontak, role) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        // const query = "UPDATE users SET nama = ?, username = ?, kontak = ?, role = ? WHERE id_user = ?;";
        const query = "UPDATE users SET nama = ?, username = ?, kontak = ?, role = ? WHERE id_user = ?;"

        connection.query(query, [nama, username, kontak, role, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteUsersById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM users WHERE id_user = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  // Vendor Methods
  async getAllVendor() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM vendor;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewVendor(nama, pegawai, kontak, alamat) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO vendor (nama, pegawai, kontak, alamat) VALUES (?,?,?,?);";
        connection.query(query, [nama, pegawai, kontak, alamat], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        nama: nama,
        pegawai: pegawai,
        kontak: kontak,
        alamat: alamat,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getVendorById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM vendor WHERE id_vendor = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateVendorById(id, nama, pegawai, kontak, alamat) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE vendor SET nama = ?, pegawai = ?, kontak = ?, alamat = ? WHERE id_vendor = ?;"

        connection.query(query, [nama, pegawai, kontak, alamat, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteVendorById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM vendor WHERE id_vendor = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Paket Methods
  async getAllPaket() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT paket.*, vendor.nama AS nama_vendor FROM paket LEFT JOIN vendor ON paket.id_vendor = vendor.id_vendor;"
  
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewPaket(id_vendor, nama, deskripsi, berat, dimensi, harga, status) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO paket (id_vendor, nama, deskripsi, berat, dimensi, harga, status) VALUES (?,?,?,?,?,?,?);";
        connection.query(query, [id_vendor, nama, deskripsi, berat, dimensi, harga, status], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        id_vendor: id_vendor,
        nama: nama,
        deskripsi: deskripsi,
        berat: berat,
        dimensi: dimensi,
        harga: harga,
        status: status,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPaketById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM Paket WHERE id_paket = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updatePaketById(id, id_vendor, nama, deskripsi, berat, dimensi, harga, status) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE paket SET id_vendor = ?, nama = ?, deskripsi = ?, berat = ?, dimensi = ?, harga = ?, status = ? WHERE id_paket = ?;"

        connection.query(query, [id_vendor, nama, deskripsi, berat, dimensi, harga, status, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletePaketById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM paket WHERE id_paket = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Provinsi Methods
  async getAllProvinsi() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM provinsi;"
  
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getPaginatedProvinsis(offset, limit) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM provinsi LIMIT ?, ?";
        connection.query(query, [offset, limit], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getProvinsiCount() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT COUNT(*) AS totalProvinsi FROM provinsi";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0].totalProvinsi);
        });
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async insertNewProvinsi(kode_provinsi, nama_provinsi) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO provinsi (kode_provinsi, nama_provinsi) VALUES (?,?);";
        connection.query(query, [kode_provinsi, nama_provinsi], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        kode_provinsi: kode_provinsi,
        nama_provinsi: nama_provinsi,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProvinsiById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM provinsi WHERE id_provinsi = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProvinsiById(id, kode_provinsi, nama_provinsi) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE provinsi SET kode_provinsi = ?, nama_provinsi = ? WHERE id_provinsi = ?;"

        connection.query(query, [kode_provinsi, nama_provinsi, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteProvinsiById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM provinsi WHERE id_provinsi = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Kota Methods
  async getAllKota() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT kota.*, provinsi.nama_provinsi FROM kota LEFT JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi;"
  
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getKotaByProvinsi(id_provinsi) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM kota WHERE id_provinsi = ?";
        
        connection.query(query, [id_provinsi], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewKota(kode_kota, nama_kota, jenis, id_provinsi) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO kota (kode_kota, nama_kota, jenis, id_provinsi) VALUES (?,?,?,?);";
        connection.query(query, [kode_kota, nama_kota, jenis, id_provinsi], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        kode_kota: kode_kota,
        nama_kota: nama_kota,
        jenis: jenis,
        id_provinsi: id_provinsi
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getKotaById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM kota WHERE id_kota = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateKotaById(id, kode_kota, nama_kota, jenis, id_provinsi) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE kota SET kode_kota = ?, nama_kota = ?, jenis = ?, id_provinsi = ? WHERE id_kota = ?;"

        connection.query(query, [kode_kota, nama_kota, jenis, id_provinsi, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteKotaById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM kota WHERE id_kota = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Biaya Methods
  async getAllBiaya() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM biaya;"
  
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewBiaya(jenis_pengiriman, berat_min, berat_max, biaya) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO biaya (jenis_pengiriman, berat_min, berat_max, biaya) VALUES (?,?,?,?);";
        connection.query(query, [jenis_pengiriman, berat_min, berat_max, biaya], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        jenis_pengiriman: jenis_pengiriman,
        berat_min: berat_min,
        berat_max: berat_max,
        biaya: biaya
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getBiayaById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM biaya WHERE id_biaya = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateBiayaById(id, jenis_pengiriman, berat_min, berat_max, biaya) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE biaya SET jenis_pengiriman = ?, berat_min = ?, berat_max = ?, biaya = ? WHERE id_biaya = ?;"

        connection.query(query, [jenis_pengiriman, berat_min, berat_max, biaya, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteBiayaById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM biaya WHERE id_biaya = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Customer Methods
  async getAllCustomer() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT customer.*, provinsi.nama_provinsi, kota.nama_kota FROM customer LEFT JOIN provinsi ON customer.id_provinsi = provinsi.id_provinsi LEFT JOIN kota ON customer.id_kota = kota.id_kota;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewCustomer(nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO customer (nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos) VALUES (?,?,?,?,?,?,?);";
        connection.query(query, [nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        nama: nama,
        email: email,
        nomor_telepon: nomor_telepon,
        id_provinsi: id_provinsi,
        id_kota: id_kota,
        detail_alamat: detail_alamat,
        kode_pos: kode_pos
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCustomerById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer WHERE id_customer = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateCustomerById(id, nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE customer SET nama = ?, email = ?, nomor_telepon = ?, id_provinsi = ?, id_kota = ?, detail_alamat = ?, kode_pos =? WHERE id_customer = ?;"

        connection.query(query, [nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteCustomerById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM customer WHERE id_customer = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Pengiriman Methods
  async getAllPengiriman() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT pengiriman.*, paket.nama AS nama_paket, biaya.jenis_pengiriman, customer.nama AS nama_customer, provinsi.nama_provinsi, kota.nama_kota FROM pengiriman LEFT JOIN paket ON pengiriman.id_paket = paket.id_paket LEFT JOIN biaya ON pengiriman.id_biaya = biaya.id_biaya LEFT JOIN customer ON pengiriman.id_customer = customer.id_customer LEFT JOIN provinsi ON pengiriman.id_provinsi = provinsi.id_provinsi LEFT JOIN kota ON pengiriman.id_kota = kota.id_kota;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertNewPengiriman(id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO pengiriman (id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
        connection.query(query, [id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });
      return {
        id: insertId,
        id_paket: id_paket, 
        qty: qty, 
        id_biaya: id_biaya, 
        id_customer: id_customer, 
        id_provinsi: id_provinsi, 
        id_kota: id_kota, 
        detail_alamat: detail_alamat, 
        kode_pos: kode_pos, 
        tanggal_pengiriman: tanggal_pengiriman, 
        tanggal_diterima: tanggal_diterima, 
        status_pengiriman: status_pengiriman
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPengirimanById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM pengiriman WHERE id_pengiriman = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updatePengirimanById(id, id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE pengiriman SET id_paket = ?, qty = ?, id_biaya = ?, id_customer = ?, id_provinsi = ?, id_kota = ?, detail_alamat = ?, kode_pos =?, tanggal_pengiriman = ?, tanggal_diterima = ?, status_pengiriman = ? WHERE id_pengiriman = ?;"

        connection.query(query, [id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletePengirimanById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM pengiriman WHERE id_pengiriman = ?;";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Laporan Methods
  async getAllLaporan() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT pg.id_pengiriman, v.id_vendor, v.nama AS nama_vendor, p.id_paket, p.nama AS nama_paket, p.deskripsi AS deskripsi_paket, p.berat AS berat_paket, p.dimensi AS dimensi_paket, p.harga AS harga_paket, pg.qty AS qty, b.jenis_pengiriman, b.berat_min, b.berat_max, b.biaya AS biaya_pengiriman, c.nama AS nama_customer, pr.id_provinsi, pr.nama_provinsi, kt.id_kota, kt.nama_kota, kt.jenis, pg.detail_alamat, pg.kode_pos, pg.status_pengiriman, pg.tanggal_pengiriman, pg.tanggal_diterima FROM pengiriman pg JOIN paket p ON pg.id_paket = p.id_paket JOIN  vendor v ON p.id_vendor = v.id_vendor JOIN biaya b ON pg.id_biaya = b.id_biaya JOIN provinsi pr ON pg.id_provinsi = pr.id_provinsi JOIN kota kt ON pg.id_kota = kt.id_kota JOIN customer c ON pg.id_customer = c.id_customer ORDER BY pg.id_pengiriman ASC;"
        
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getLaporanById(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT pg.id_pengiriman, v.id_vendor, v.nama AS nama_vendor, p.id_paket, p.nama AS nama_paket, p.deskripsi AS deskripsi_paket, p.berat AS berat_paket, p.dimensi AS dimensi_paket, p.harga AS harga_paket, pg.qty AS qty, b.jenis_pengiriman, b.berat_min, b.berat_max, b.biaya AS biaya_pengiriman, c.nama AS nama_customer, c.nomor_telepon AS kontak_customer, pr.id_provinsi, pr.nama_provinsi, kt.id_kota, kt.nama_kota, kt.jenis, pg.detail_alamat, pg.kode_pos, pg.status_pengiriman, pg.tanggal_pengiriman, pg.tanggal_diterima FROM pengiriman pg JOIN paket p ON pg.id_paket = p.id_paket JOIN  vendor v ON p.id_vendor = v.id_vendor JOIN biaya b ON pg.id_biaya = b.id_biaya JOIN provinsi pr ON pg.id_provinsi = pr.id_provinsi JOIN kota kt ON pg.id_kota = kt.id_kota JOIN customer c ON pg.id_customer = c.id_customer WHERE pg.id_pengiriman = ?";

        connection.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Dashboard
  async PengirimanBerlangsung() {
    try {
      const query = "SELECT COUNT(*) AS kirimProses FROM pengiriman WHERE status_pengiriman = 'Dalam Pengiriman'";
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results[0].kirimProses);
        });
      });
      return result;
    } catch (error) {
      console.error("Error in PengirimanBerlangsung:", error);
      return null;
    }
  }

  async PengirimanSelesai() {
    try {
      const query = "SELECT COUNT(*) AS kirimSelesai FROM pengiriman WHERE status_pengiriman = 'Diterima'";
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results[0].kirimSelesai);
        });
      });
      return result;
    } catch (error) {
      console.error("Error in PengirimanSelesai:", error);
      return null;
    }
  }

  async TotalPemasukan() {
    try {
      const query = "SELECT SUM(biaya.biaya) AS totalPemasukan FROM pengiriman JOIN biaya ON pengiriman.id_biaya = biaya.id_biaya;";
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results[0].totalPemasukan);
        });
      });
      return result;
    } catch (error) {
      console.error("Error in TotalPemasukan:", error);
      return null;
    }
  }

  async TotalPaket() {
    try {
      const query = "SELECT COUNT(*) AS totalPaket FROM paket";
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results[0].totalPaket);
        });
      });
      return result;
    } catch (error) {
      console.error("Error in TotalPaket:", error);
      return null;
    }
  }

}

module.exports = DbService;
