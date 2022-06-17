const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/todo-app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("✅ MongoDB connected 🗄️");
      }
    );
  } catch (error) {
    console.log("🚫 =>", error.message);
  }
};

module.exports = connectDB;
