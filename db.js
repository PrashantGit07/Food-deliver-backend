const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://restro:pm2001@cluster0.csfxmpk.mongodb.net/order";

const mongoURI = "mongodb+srv://restro:pm2001@cluster0.csfxmpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";   
 
// module.exports = connectToMongo;
 const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");

    const [foodItems, foodCategories] = await Promise.all([
      mongoose.connection.db.collection("food_items").find({}).toArray(),
      mongoose.connection.db.collection("foodCategory").find({}).toArray(),
    ]);

    global.food_items = foodItems;
    global.foodCategory = foodCategories;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
 module.exports = {connectToMongo};