const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const checkFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

app.post("/save-json", (req, res) => {
  const jsonData = req.body;

  // Create UUID for output data filename
  const simpleUUID = () =>
  "xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rnd = (Math.random() * 16) | 0;
    const value = char === "x" ? rnd : (rnd & 0x3) | 0x8;
    return value.toString(16);
  });

  const filePath = path.join(__dirname, "requests", `${simpleUUID()}.json`);

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write JSON data to a file
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error saving JSON:", err);
      return res.status(500).send("Error saving JSON file.");
    }
  });
});

app.post("/save-json-2", (req, res) => {
  const jsonData = req.body;

  // Create UUID for output data filename
  const simpleUUID = () =>
  "xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rnd = (Math.random() * 16) | 0;
    const value = char === "x" ? rnd : (rnd & 0x3) | 0x8;
    return value.toString(16);
  });

  const filePath = path.join(__dirname, "submits", `${simpleUUID()}.json`);

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write JSON data to a file
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error saving JSON:", err);
      return res.status(500).send("Error saving JSON file.");
    }
  });
});

app.post("/check-song", (req, res) =>{
console.log(req.body);
const filePath = path.join(__dirname, '..', req.body.filePath); 
console.log(filePath);
console.log(checkFileExists(filePath) ? 'File exists' : 'File does not exist');

// const exists = fs.existsSync(absolutePath);
res.json(checkFileExists(filePath));
});

app.listen(5000, () => console.log("Server running on port 5000"));