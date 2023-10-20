const mongoose = require("mongoose");
const { env } = require("../../environment");

let adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      length: 300,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model(`${env.PROJECT_NAME}Admin`, adminSchema);

module.exports = { Admin };
