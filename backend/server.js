const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/studentDB");

const Student = mongoose.model("Student", {
  name: String,
  marks: [Number],
  total: Number,
  average: Number,
  grade: String
});

function grade(avg) {
  if (avg >= 90) return "A";
  if (avg >= 75) return "B";
  if (avg >= 50) return "C";
  return "F";
}

app.post("/add", async (req, res) => {
  const { name, marks } = req.body;
  const total = marks.reduce((a, b) => a + b, 0);
  const avg = total / marks.length;
  const g = grade(avg);

  const student = new Student({ name, marks, total, average: avg, grade: g });
  await student.save();
  res.send(student);
});

app.get("/students", async (req, res) => {
  res.send(await Student.find());
});

app.listen(5000, () => console.log("Server running"));