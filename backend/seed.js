const Product = require("./models/product");
const axios = require("axios");
async function seedDatabase() {
  try {
    const count = await Product.countDocuments();
    if (count == 0) {
      await Product.deleteMany();
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      const data = response.data;
      await Product.insertMany(data);
      console.log("Database seeded successfully");
    } else {
      console.log("Database already contains data. No seeding required");
    }
  } catch (error) {
    console.error("Error database seeding", error);
  }
}

module.exports = seedDatabase;
