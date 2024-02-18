const mongoose = require("mongoose");

const seedDatabase = require('../seed')



const connectdb = () =>{
  mongoose
  .connect(
    process.env.mongodb_uri,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to mongodb");
    seedDatabase();
  })
  .catch((err) => console.error("Error connected to mongodb", err));

}

module.exports = connectdb