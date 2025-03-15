const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const stockRoute = require('./routes/stockRoute');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/stocks', stockRoute);

mongoose.connect("mongodb+srv://nairayush45:nairayush45@cluster0.3daw0.mongodb.net/investPortal?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(process.env.PORT || 8000, (err) => {
            if (err)
                console.log("Not connected to the database");
            else
                console.log("Connected to the database: " + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
