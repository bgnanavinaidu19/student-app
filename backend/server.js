const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB
mongoose.connect("mongodb://mongo:27017/studentdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    marks: [Number],
    subjectGrades: [String],
    cgpa: String,
    fail: Boolean
});

const Student = mongoose.model("Student", studentSchema);

// ADD
app.post("/add", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send("Saved");
});

// GET ALL
app.get("/students", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// GET BY ROLL
app.get("/students/:roll", async (req, res) => {
    const student = await Student.findOne({ roll: req.params.roll });

    if (!student) return res.status(404).send("Not found");

    res.json(student);
});

// FRONTEND
app.use(express.static(path.join(__dirname, "frontend")));

// SERVER
app.listen(5050, "0.0.0.0", () => {
    console.log("Server running on 5050");
});