const express = require("express");
const app = express();
const courseApi = require("./app/api/courseApi");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api", courseApi);

app.listen(8080, function () {
  console.log("Serwer działa");
});
