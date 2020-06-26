const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./app/routes/tutorial.routes");
const app = express();
const db = require("./app/models");
db.sequelize.sync();
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});