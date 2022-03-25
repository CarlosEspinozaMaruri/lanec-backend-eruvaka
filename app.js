import express from "express";
import { createRequire } from "module";
import { eruvakaThief } from "./controller/eruvakaController.js";

const require = createRequire(import.meta.url);
const app = express();
var cors = require("cors");

let port = process.env.PORT;
if (port == null || port == "") {
  port = process.env.PORT || 9002;
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hola Mundo");
});

app.listen(port, () => {
  setInterval(() => {
    eruvakaThief();
  }, 10000);
});
