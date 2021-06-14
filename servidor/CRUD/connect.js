const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO).then(() =>{
}).catch(() => {
    console.log("Connection failed!");
})