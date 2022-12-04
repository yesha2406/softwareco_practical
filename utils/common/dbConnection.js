const mongoose = require("mongoose");

let connection = mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Mongodb Connected"))
    .catch((error) => {
        console.log(error);
    });

module.exports = connection;