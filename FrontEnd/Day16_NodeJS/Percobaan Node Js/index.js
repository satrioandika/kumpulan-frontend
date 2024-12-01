const port = 3000,
    express = require("express");
    layouts = require('express-ejs-layouts');
app = express();
const path = require('path');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/html', express.static('./public'))
app.set("view engine", "ejs");
app.use(layouts);

//parse url encode data
app.use(express.urlencoded({extended: false }));
app.use(express.json());
const staticAppController = require("./Controllers/staticAppController");
const errorController = require("./Controllers/errorController");
app.get("/", staticAppController.getHomePage);
app.get("/subscribe", staticAppController.getSubscribePage);
app.post("/subscribe", staticAppController.saveSubscriber);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});