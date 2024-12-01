const pakets = [];
exports.getHomePage = (req, res) => {
    res.render("index", {myPakets: pakets});
}
exports.getPaketPage = (req, res) => {
    res.render("tambah");
}
exports.savePaket = (req, res) => {
    pakets.push(req.body);
    res.render("thankyou");
}
