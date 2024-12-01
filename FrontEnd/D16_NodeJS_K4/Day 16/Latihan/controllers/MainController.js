// Dashboard
exports.dashboard = (req, res) => {
    res.render("dashboard")
}

// Users
const user = [];
exports.getUser = (req, res) => {
    res.render("users/index", { users: user });
}
exports.createUser = (req, res) => {
    res.render("users/create");
}
exports.storeUser = (req, res) => {
    user.push(req.body);
    res.render("users/index", { users: user });
}

// Vendor
const vendor = [];
exports.getVendor = (req, res) => {
    res.render("vendor/index", { vendors: vendor });
}
exports.createVendor = (req, res) => {
    res.render("vendor/create");
}
exports.storeVendor = (req, res) => {
    vendor.push(req.body);
    res.render("vendor/index", { vendors: vendor });
}

// Paket
const paket = [];
exports.getPaket = (req, res) => {
    res.render("paket/index", { pakets: paket });
}
exports.createPaket = (req, res) => {
    res.render("paket/create");
}
exports.storePaket = (req, res) => {
    paket.push(req.body);
    res.render("paket/index", { pakets: paket });
}

// Customer
const customer = [];
exports.getCustomer = (req, res) => {
    res.render("customer/index", { customers: customer });
}
exports.createCustomer = (req, res) => {
    res.render("customer/create");
}
exports.storeCustomer = (req, res) => {
    customer.push(req.body);
    res.render("customer/index", { customers: customer });
}

// Provinsi
const provinsi = [];
exports.getProvinsi = (req, res) => {
    res.render("provinsi/index", { provinsis: provinsi });
}
exports.createProvinsi = (req, res) => {
    res.render("provinsi/create");
}
exports.storeProvinsi = (req, res) => {
    provinsi.push(req.body);
    res.render("provinsi/index", { provinsis: provinsi });
}

// Kota
const kota = [];
exports.getKota = (req, res) => {
    res.render("kota/index", { kotas: kota });
}
exports.createKota = (req, res) => {
    res.render("kota/create");
}
exports.storeKota = (req, res) => {
    kota.push(req.body);
    res.render("kota/index", { kotas: kota });
}

//Pengiriman
const pengiriman = [];
exports.getPengiriman = (req, res) => {
    res.render("pengiriman/index", { pengirimans: pengiriman });
}
exports.createPengiriman = (req, res) => {
    res.render("pengiriman/create");
}
exports.storePengiriman = (req, res) => {
    pengiriman.push(req.body);
    res.render("pengiriman/index", { pengirimans: pengiriman });
}

//Biaya
// Biaya
const biaya = [];
exports.getBiaya = (req, res) => {
    res.render("biaya/index", { biayas: biaya });
}
exports.createBiaya = (req, res) => {
    res.render("biaya/create");
}
exports.storeBiaya = (req, res) => {
    biaya.push(req.body);
    res.render("biaya/index", { biayas: biaya });
}