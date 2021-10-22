const express = require('express');
const app = express();
const morgan = require('morgan'); // displays logs in the console (request made, path, status...)
const mongoose = require('mongoose'); // sets the model of a collection
const cors = require('cors'); // Necessary to allow any app (our frontend app in this case) to request API from Node.js server
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors); // the "*" allows all other http request to be passed from any other origin (i.e : form another app)

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    })

// Server
app.listen(3000, () => {
    console.log("Server has started running http://localhost:3000");
})