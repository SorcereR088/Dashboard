const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const propertiesRoutes = require('./routes/properties');
const usersRoutes = require('./routes/users');
const managementRoutes = require('./routes/management');
const salesRoutes = require('./routes/sales');
const transactionsRoutes = require('./routes/transactions');


//Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//Routes
app.use("/property", propertiesRoutes);
app.use("/user", usersRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/sales", salesRoutes);
app.use("/transactions", transactionsRoutes)

app.listen(3000, console.log("server started"))