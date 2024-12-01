const port = 3000,
    express = require("express")
    layouts = require("express-ejs-layouts")
app = express()
const path = require('path')

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
app.use('/html', express.static('./public'))
app.set("view engine", "ejs")
app.use(layouts)

// Parse URL encoded data and use JSON format
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Route
const mainController = require("./controllers/MainController")

app.get("/", mainController.dashboard)
app.get("/GetUser", mainController.getUser)
app.get("/AddUser", mainController.createUser)
app.post("/AddUser", mainController.storeUser)
app.get("/GetVendor", mainController.getVendor)
app.get("/AddVendor", mainController.createVendor)
app.post("/AddVendor", mainController.storeVendor)
app.get("/GetPaket", mainController.getPaket)
app.get("/AddPaket", mainController.createPaket)
app.post("/AddPaket", mainController.storePaket)
app.get("/GetCustomer", mainController.getCustomer)
app.get("/AddCustomer", mainController.createCustomer)
app.post("/AddCustomer", mainController.storeCustomer)
app.get("/GetProvinsi", mainController.getProvinsi)
app.get("/AddProvinsi", mainController.createProvinsi)
app.post("/AddProvinsi", mainController.storeProvinsi)
app.get("/GetKota", mainController.getKota)
app.get("/AddKota", mainController.createKota)
app.post("/AddKota", mainController.storeKota)
app.get("/GetPengiriman", mainController.getPengiriman)
app.get("/AddPengiriman", mainController.createPengiriman)
app.post("/AddPengiriman", mainController.storePengiriman)
app.get("/GetBiaya", mainController.getBiaya)
app.get("/AddBiaya", mainController.createBiaya)
app.post("/AddBiaya", mainController.storeBiaya)


app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`)
})