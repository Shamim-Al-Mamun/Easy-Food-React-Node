const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const port = process.env.PORT || 5000;

// parsor
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// connect DB
connectDB();

// routes 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.get('/', (req, res) => res.send('In the name of Allah'));

app.listen(port, () => console.log(`server running port: ${port}`));  
