let students = [];

function startEntry() {
    const count = document.getElementById("count").value;
    const formArea = document.getElementById("formArea");

    formArea.innerHTML = "";

    for (let i = 0; i < count; i++) {
        formArea.innerHTML += `
        <div class="card">
            <h3>Student ${i + 1}</h3>
            <input placeholder="Name" id="name${i}">
            <input placeholder="Roll No" id="roll${i}">
            <input placeholder="Web Technology" id="wt${i}">
            <input placeholder="IP" id="ip${i}">
            <input placeholder="Unix" id="unix${i}">
            <input placeholder="Robotics" id="robot${i}">
            <input placeholder="SE" id="se${i}">
        </div>
        `;
    }

    formArea.innerHTML += `<button onclick="calculate()">Calculate & Save</button>`;
}

// grade
function getSubjectGrade(mark) {
    if (mark >= 90) return "S";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    if (mark >= 40) return "E";
    return "F";
}

// grade → points
function gradeToPoint(g) {
    if (g === "S") return 10;
    if (g === "A") return 9;
    if (g === "B") return 8;
    if (g === "C") return 7;
    if (g === "D") return 6;
    if (g === "E") return 5;
    return 0;
}

async function calculate() {

    const count = document.getElementById("count").value;

    for (let i = 0; i < count; i++) {

        let marks = [
            +document.getElementById(`wt${i}`).value,
            +document.getElementById(`ip${i}`).value,
            +document.getElementById(`unix${i}`).value,
            +document.getElementById(`robot${i}`).value,
            +document.getElementById(`se${i}`).value
        ];

        let subjectGrades = marks.map(m => {
            if (m >= 90) return "S";
            if (m >= 80) return "A";
            if (m >= 70) return "B";
            if (m >= 60) return "C";
            if (m >= 50) return "D";
            if (m >= 40) return "E";
            return "F";
        });

        let cgpa = (
            subjectGrades.reduce((sum, g) => {
                if (g === "S") return sum + 10*3;
                if (g === "A") return sum + 9*3;
                if (g === "B") return sum + 8*3;
                if (g === "C") return sum + 7*3;
                if (g === "D") return sum + 6*3;
                if (g === "E") return sum + 5*3;
                return sum;
            }, 0) / 15
        ).toFixed(2);

        let student = {
            name: document.getElementById(`name${i}`).value.trim(),
            roll: document.getElementById(`roll${i}`).value.trim(), 
            marks,
            subjectGrades,
            cgpa,
            fail: marks.some(m => m < 40)
        };

        console.log("Sending:", student); // DEBUG

        await fetch("http://localhost:5051/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });
    }

    alert("Saved successfully!");
}