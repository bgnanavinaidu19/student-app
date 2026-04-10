const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL || "mongodb://mongo:27017/studentdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  marks: [Number],
  subjectGrades: [String],
  cgpa: String,
  fail: Boolean
});

const Student = mongoose.model("Student", studentSchema);

app.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send("Saved successfully");
  } catch (err) {
    console.log("Add Error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/students", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    console.log("Get All Error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/students/:roll", async (req, res) => {
  try {
    const student = await Student.findOne({ roll: req.params.roll });

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);
  } catch (err) {
    console.log("Get By Roll Error:", err);
    res.status(500).send("Server error");
  }
});

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(5050, "0.0.0.0", () => {
  console.log("Server running on 5050");
});