const mongoose = require("mongoose");
const { type } = require("os");

const modelName = "user";

// The Schema is the template defining how a user should validated
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    require: true,
  },
});

// we create the model by using the .model method
module.exports = mongoose.model(modelName, userSchema);

