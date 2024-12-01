const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;
const userModel = require("./models/userModel.js")
app.set("view engine" , "ejs")
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

/* routes */

app.get("/", (req,res) => {
  res.render("index");
})

app.post("/create", async (req,res) => {
  let { name , email , imageurl } = req.body;
  let user = await userModel.create({
    name,
    email,
    imageurl
  })
  res.redirect("/");
})

app.get("/users", async (req,res) => {
  let users = await userModel.find();
  res.render("users",{users});
})

app.get("/update/:id", async (req,res) => {
  let { id } = req.params;
  let user = await userModel.findById(id);
  res.render("update",{ user });
})

app.post("/update/:id", async (req,res) => {
  let { id } = req.params;
  let { name , email , imageurl } = req.body;
  let user = await userModel.findByIdAndUpdate(id , {name , email , imageurl } , { new:true });
  res.redirect("/users");
})

app.get("/delete/:id", async (req,res) => {
  let { id } = req.params;
  let deleteUser = await userModel.findByIdAndDelete(id);
  res.redirect("/users");
})

app.listen( port, () => {
  console.log(`server runing on ${port}`);
});