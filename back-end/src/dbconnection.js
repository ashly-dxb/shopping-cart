const mongoose = require("mongoose");
// const dbURL =
//   "mongodb+srv://ashlythomas:" +
//   password +
//   "@cluster0.nobtacb.mongodb.net/react-node-todolist?retryWrites=true&w=majority"; // server db
// const dbURL = "mongodb://localhost/react-node-todolist"; // local mongodb

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB: vue-node-app");
  } catch (error) {
    console.log(
      "Could not connect to MongoDB database. Check IP in server!",
      error
    );

    // https://cloud.mongodb.com/v2/64ac0903f95ff95f3e392d85#/security/network/accessList
  }
};
