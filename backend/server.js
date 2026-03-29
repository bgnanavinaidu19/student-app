const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/studentDB");

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    marks: [Number],
    average: Number,
    grade: String
});

const Student = mongoose.model("Student", studentSchema);

// ADD STUDENT (with validation)
app.post("/add", async (req, res) => {
    const { name, marks } = req.body;

    if (!name || !marks || marks.length === 0) {
        return res.status(400).send("Invalid input");
    }

    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;

    let grade = "C";
    if (avg >= 90) grade = "A";
    else if (avg >= 75) grade = "B";

    const student = new Student({
        name,
        marks,
        average: avg,
        grade
    });

    await student.save();
    res.send("Added");
});

// GET
app.get("/students", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// DELETE (FIXED)
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        console.log("DELETE REQUEST ID:", id);

        const deleted = await Student.findByIdAndDelete(id);

        console.log("DELETED RESULT:", deleted);

        if (!deleted) {
            return res.status(404).send("Not found");
        }

        res.send("Deleted OK");
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).send("Error");
    }
});
app.listen(5050, () => {
    console.log("Server running on 5050");
});