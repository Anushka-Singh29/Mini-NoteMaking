const express = require("express");
const app = express();
const path = require("path");
const fs = require("node:fs");
const { writeFile } = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  fs.readdir(`./files`, function (err, files) {
    // console.log(files)
    res.render("index", { files: files });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
  //   console.log(req.body);
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render(`show`, { filename: req.params.filename, filedata: filedata });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render(`edit`, {filename: req.params.filename});
 
  // fs.readFile(`edit`, 'utf-8', function(err, filedata) {
  //   if (err) {
  //     console.log("Error reading file:", err);
  //     return res.status(500).send("Error reading file");
  //   }

  console.log(filedata)
});



app.post("/edit", function(req, res){
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err) {
    if (err) {
      console.log(err);
    }
    // fs.rename(`./files/${req.body.olddetails}`, `./files/${req.body.newdetails}`, function(err) {
    //   if (err) {
    //     console.log(err);
    //   }
  res.redirect("/");
});
  });



app.listen(3000, function(err) {
  if (err) {
    console.log("Error starting the server:", err);
  } else {
    console.log("Server is running on port 3000");
  }
});