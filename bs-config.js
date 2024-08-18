const { exec } = require("child_process");

module.exports = {
  files: ["./src/**/*.ejs"],
  proxy: "http://localhost:3000",
  port: 3001,

}
