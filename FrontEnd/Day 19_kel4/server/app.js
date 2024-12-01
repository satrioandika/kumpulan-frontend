const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Agar bisa akses file statis dari direktori client
app.use(express.static(path.join(__dirname, "..", "client")));

// Akses Bootstrap
app.get("/css/bootstrap.css", (req, res) => {
  res.sendFile(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.css");
});
app.get("/js/bootstrap.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.js");
});

app.get("/", (req, res) => {
  const error = req.query.error ? 'Invalid username or password' : null;
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.set("views", path.join(__dirname, "..", "client", "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'aJw2$wf?I9*2D?#dFfSte@s%td',
  resave: false,
  saveUninitialized: true,
}));

function checkAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.redirect('/');
  }
}

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = dbService.getDbServiceInstance();

  const user = await db.login(username, password);
  if (user) {
      const secret = crypto.createHash('md5').update(username).digest('hex');

      req.session.regenerate(err => {
          if (err) {
              return res.status(500).send('Session regeneration error');
          }
          req.session.secret = secret;
          req.session.user = user;
          req.session.save(err => {
              if (err) {
                  return res.status(500).send('Session save error');
              }
              res.redirect('/dashboard');
          });
      });
  } else {
    res.redirect('/?error=Invalid username or password');
  }
});

// LOGOUT
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// DASHBOARD
app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard/DashboardIndex', { user: req.session.user });
});

// USER
// read user
app.get("/users", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllUsers()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("users/UsersIndex", { users: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("users/UsersIndex", { users: []});
    });
});

// create user
app.get("/users/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllUsers()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("users/UsersInsert");
    })
    .catch((err) => {
      console.log(err);
      res.render("users/UsersInsert");
    });
});

// insert user
app.post("/users/insert", checkAuthenticated, (req, res) => {
  const { nama, username, password, kontak, role } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewUsers(nama, username, password, kontak, role)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/users");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit user
app.get("/users/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getUsersById(id)
    .then((users) => {
      if (users) {
        res.render("users/UsersUpdate", { users });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errorr");
    });
});

// update user
app.post("/users/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { nama, username, kontak, role } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateUsersById(id, nama, username, kontak, role)
    .then(res.redirect("/users"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete user
app.post("/users/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteUsersById(id);

  result.then(res.redirect("/users")).catch((err) => console.log(err));
});

// VENDOR
// read vendor
app.get("/vendor", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllVendor()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("vendor/VendorIndex", { vendors: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("vendor/VendorIndex", { vendors: [] });
    });
});

// create vendor
app.get("/vendor/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllVendor()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("vendor/VendorInsert");
    })
    .catch((err) => {
      console.log(err);
      res.render("vendor/VendorInsert");
    });
});

// insert vendor
app.post("/vendor/insert", checkAuthenticated, (req, res) => {
  const { nama, pegawai, kontak, alamat } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewVendor(nama, pegawai, kontak, alamat)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/vendor");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit vendor
app.get("/vendor/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getVendorById(id)
    .then((vendors) => {
      if (vendors) {
        res.render("vendor/VendorUpdate", { vendors });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errorr");
    });
});

// update vendor
app.post("/vendor/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { nama, pegawai, kontak, alamat } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateVendorById(id, nama, pegawai, kontak, alamat)
    .then(res.redirect("/vendor"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete vendor
app.post("/vendor/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteVendorById(id);

  result.then(res.redirect("/vendor")).catch((err) => console.log(err));
});

// PAKET
// read paket
app.get("/paket", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllPaket()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("paket/PaketIndex", { pakets: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("paket/PaketIndex", { pakets: [] });
    });
});

// create paket
app.get("/paket/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  Promise.all([
    db.getAllPaket(),
    db.getAllVendor()
  ])
  .then(([paket, vendor]) => {
    res.render("paket/PaketInsert", { paket, vendor });
  })
  .catch((err) => {
    console.log(err);
    res.render("paket/PaketInsert", { paket: [], vendor: [] });
  });
});

// insert paket
app.post("/paket/insert", checkAuthenticated, (req, res) => {
  const { id_vendor, nama, deskripsi, berat, dimensi, harga, status } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewPaket(id_vendor, nama, deskripsi, berat, dimensi, harga, status)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/paket");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit paket
app.get("/paket/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getPaketById(id)
    .then((pakets) => {
      if (pakets) {
        res.render("paket/PaketUpdate", { pakets });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errorr");
    });
});

// update paket
app.post("/paket/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { id_vendor, nama, deskripsi, berat, dimensi, harga, status } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updatePaketById(id, id_vendor, nama, deskripsi, berat, dimensi, harga, status)
    .then(res.redirect("/paket"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete paket
app.post("/paket/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deletePaketById(id);

  result.then(res.redirect("/paket")).catch((err) => console.log(err));
});

// PROVINSI
// read provinsi
// app.get("/provinsi", checkAuthenticated, (req, res) => {
//   const db = dbService.getDbServiceInstance();

//   db.getAllProvinsi()
//     .then((data) => {
//       if (!Array.isArray(data)) {
//         console.log("Error:", data);
//         data = [];
//       }
//       res.render("provinsi/ProvinsiIndex", { provinsis: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render("provinsi/ProvinsiIndex", { provinsis: [] });
//     });
// });
app.get("/provinsi", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  Promise.all([
    db.getPaginatedProvinsis(offset, limit),
    db.getProvinsiCount()
  ])
  .then(([provinsis, totalProvinsi]) => {
    const totalPages = Math.ceil(totalProvinsi / limit);
    res.render("provinsi/ProvinsiIndex", {
      provinsis,
      currentPage: page,
      totalPages,
      limit
    });
  })
  .catch((err) => {
    console.log(err);
    res.render("provinsi/ProvinsiIndex", {
      provinsis: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10
    });
  });
});

// create provinsi
app.get("/provinsi/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllProvinsi()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("provinsi/ProvinsiInsert");
    })
    .catch((err) => {
      console.log(err);
      res.render("provinsi/ProvinsiInsert");
    });
});

// insert provinsi
app.post("/provinsi/insert", checkAuthenticated, (req, res) => {
  const { kode_provinsi, nama_provinsi } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewProvinsi(kode_provinsi, nama_provinsi)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/provinsi");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit provinsi
app.get("/provinsi/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getProvinsiById(id)
    .then((provinsis) => {
      if (provinsis) {
        res.render("provinsi/ProvinsiUpdate", { provinsis });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// update provinsi
app.post("/provinsi/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { kode_provinsi, nama_provinsi } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateProvinsiById(id, kode_provinsi, nama_provinsi)
    .then(res.redirect("/provinsi"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete provinsi
app.post("/provinsi/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteProvinsiById(id);

  result.then(res.redirect("/provinsi")).catch((err) => console.log(err));
});

// KOTA
// read kota
app.get("/kota", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllKota()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("kota/KotaIndex", { kotas: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("kota/KotaIndex", { kotas: [] });
    });
});

// get kota by id_provinsi
app.get('/getKotaByProvinsi/:id_provinsi', checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();
  const id_provinsi = req.params.id_provinsi;

  db.getKotaByProvinsi(id_provinsi)
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// create kota
app.get("/kota/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  Promise.all([
    db.getAllKota(),
    db.getAllProvinsi()
  ])
  .then(([kota, provinsi]) => {
    res.render("kota/KotaInsert", { kota, provinsi });
  })
  .catch((err) => {
    console.log(err);
    res.render("kota/KotaInsert", { kota: [], provinsi: [] });
  });
});

// insert kota
app.post("/kota/insert", checkAuthenticated, (req, res) => {
  const { kode_kota, nama_kota, jenis, id_provinsi } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewKota(kode_kota, nama_kota, jenis, id_provinsi)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/kota");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit kota
app.get("/kota/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getKotaById(id)
    .then((kotas) => {
      if (kotas) {
        res.render("kota/KotaUpdate", { kotas });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// update kota
app.post("/kota/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { kode_kota, nama_kota, jenis, id_provinsi } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateKotaById(id, kode_kota, nama_kota, jenis, id_provinsi)
    .then(res.redirect("/kota"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete kota
app.post("/kota/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteKotaById(id);

  result.then(res.redirect("/kota")).catch((err) => console.log(err));
});

// Biaya
// read biaya
app.get("/biaya", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllBiaya()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("biaya/BiayaIndex", { biayas: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("biaya/BiayaIndex", { biayas: [] });
    });
});

// create biaya
app.get("/biaya/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllBiaya()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("biaya/BiayaInsert");
    })
    .catch((err) => {
      console.log(err);
      res.render("biaya/BiayaInsert");
    });
});

// insert biaya
app.post("/biaya/insert", checkAuthenticated, (req, res) => {
  const { jenis_pengiriman, berat_min, berat_max, biaya } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewBiaya(jenis_pengiriman, berat_min, berat_max, biaya)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/biaya");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit biaya
app.get("/biaya/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getBiayaById(id)
    .then((biayas) => {
      if (biayas) {
        res.render("biaya/BiayaUpdate", { biayas });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// update biaya
app.post("/biaya/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { jenis_pengiriman, berat_min, berat_max, biaya } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateBiayaById(id, jenis_pengiriman, berat_min, berat_max, biaya)
    .then(res.redirect("/biaya"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete biaya
app.post("/biaya/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteBiayaById(id);

  result.then(res.redirect("/biaya")).catch((err) => console.log(err));
});

// CUSTOMER
// read
app.get("/customer", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllCustomer()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("customer/CustomerIndex", { customers: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("customer/UsersIndex", { customers: [] });
    });
});

// create customer
app.get("/customer/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  Promise.all([
    db.getAllCustomer(),
    db.getAllProvinsi(),
    db.getAllKota()
  ])
  .then(([customer, provinsi, kota]) => {
    res.render("customer/CustomerInsert", { customer, provinsi, kota });
  })
  .catch((err) => {
    console.log(err);
    res.render("customer/CustomerInsert", { customer: [], provinsi: [], customer: [] });
  });
});

// insert customer
app.post("/customer/insert", checkAuthenticated, (req, res) => {
  const { nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewCustomer(nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/customer");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit customer
app.get("/customer/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getCustomerById(id)
    .then((customers) => {
      if (customers) {
        res.render("customer/CustomerUpdate", { customers });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errorr");
    });
});

// update customer
app.post("/customer/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updateCustomerById(id, nama, email, nomor_telepon, id_provinsi, id_kota, detail_alamat, kode_pos)
    .then(res.redirect("/customer"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete customer
app.post("/customer/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteCustomerById(id);

  result.then(res.redirect("/customer")).catch((err) => console.log(err));
});

// PENGIRIMAN
// read pengiriman
app.get("/pengiriman", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllPengiriman()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("pengiriman/PengirimanIndex", { pengirimans: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("pengiriman/PengirimanIndex", { pengirimans: [] });
    });
});

// create pengiriman
app.get("/pengiriman/insert", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  Promise.all([
    db.getAllPaket(),
    db.getAllBiaya(),
    db.getAllCustomer(),
    db.getAllProvinsi(),
    db.getAllKota()
  ])
  .then(([paket, biaya, customer, provinsi, kota]) => {
    res.render("pengiriman/PengirimanInsert", { paket, biaya, customer, provinsi, kota });
  })
  .catch((err) => {
    console.log(err);
    res.render("pengiriman/PengirimanInsert", { paket: [], biaya: [], customer: [], provinsi: [], kota: [] });
  });
});

// insert pengiriman
app.post("/pengiriman/insert", checkAuthenticated, (req, res) => {
  const { id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman } = req.body;
  const db = dbService.getDbServiceInstance();

  db.insertNewPengiriman(id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman)
    .then((insertedData) => {
      if (insertedData) {
        res.redirect("/pengiriman");
      } else {
        res.status(500).send("gagal!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

// edit pengiriman
app.get("/pengiriman/edit/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getPengirimanById(id)
    .then((pengirimans) => {
      if (pengirimans) {
        res.render("pengiriman/PengirimanUpdate", { pengirimans });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Errorr");
    });
});

// update pengiriman
app.post("/pengiriman/update/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const { id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman } = req.body;
  const db = dbService.getDbServiceInstance();

  db.updatePengirimanById(id, id_paket, qty, id_biaya, id_customer, id_provinsi, id_kota, detail_alamat, kode_pos, tanggal_pengiriman, tanggal_diterima, status_pengiriman)
    .then(res.redirect("/pengiriman"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// delete pengiriman
app.post("/pengiriman/delete/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deletePengirimanById(id);

  result.then(res.redirect("/pengiriman")).catch((err) => console.log(err));
});

// Laporan
app.get("/laporan", checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllLaporan()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.log("Error:", data);
        data = [];
      }
      res.render("laporan/LaporanIndex", { laporans: data });
    })
    .catch((err) => {
      console.log(err);
      res.render("laporan/LaporanIndex", { laporans: [] });
    });
});

// Detail Laporan
app.get("/laporan/detail/:id", checkAuthenticated, (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  db.getLaporanById(id)
    .then((laporans) => {
      if (laporans) {
        res.render("laporan/DetailLaporanIndex", { laporans });
      } else {
        res.status(404).send("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// DASHBOARD
app.get('/api/pengiriman-berlangsung', checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.PengirimanBerlangsung()
    .then((count) => {
      res.json({ kirimProses: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/pengiriman-selesai', checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.PengirimanSelesai()
    .then((count) => {
      res.json({ kirimSelesai: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/total-pemasukan', checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.TotalPemasukan()
    .then((count) => {
      res.json({ totalPemasukan: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/total-paket', checkAuthenticated, (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.TotalPaket()
    .then((count) => {
      res.json({ totalPaket: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(process.env.PORT, () => console.log("app is running"));
