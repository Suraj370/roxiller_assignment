const mongoose = require("mongoose");

const seedDatabase = require('../seed')



const connectdb = () =>{
  mongoose
  .connect(
    "mongodb+srv://suraj189:nn65mQ5ZsZQdcN7e@cluster0.yzo78l4.mongodb.net/data",
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