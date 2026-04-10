let students = [];

function startEntry() {
    const count = document.getElementById("count").value;
    const formArea = document.getElementById("formArea");
    const statusMessage = document.getElementById("statusMessage");

    if (!count || count < 1) {
        alert("Please enter a valid number of students.");
        return;
    }

    formArea.innerHTML = "";
    statusMessage.innerHTML = "";

    for (let i = 0; i < count; i++) {
        formArea.innerHTML += `
        <div class="card" style="text-align: left;">
            <h3 style="color: #2563eb; margin-bottom: 20px;">Student ${i + 1}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label class="input-label">Name</label>
                    <input placeholder="Enter Name" id="name${i}">
                </div>
                <div>
                    <label class="input-label">Roll No</label>
                    <input placeholder="Enter Roll No" id="roll${i}">
                </div>
                <div>
                    <label class="input-label">Web Technology</label>
                    <input type="number" id="wt${i}" placeholder="0-100">
                </div>
                <div>
                    <label class="input-label">Internet Prog.</label>
                    <input type="number" id="ip${i}" placeholder="0-100">
                </div>
                <div>
                    <label class="input-label">Unix</label>
                    <input type="number" id="unix${i}" placeholder="0-100">
                </div>
                <div>
                    <label class="input-label">Robotics</label>
                    <input type="number" id="robot${i}" placeholder="0-100">
                </div>
                <div>
                    <label class="input-label">Software Engg.</label>
                    <input type="number" id="se${i}" placeholder="0-100">
                </div>
            </div>
        </div>
        `;
    }

    formArea.innerHTML += `
        <div style="margin-top: 20px; text-align: center;">
            <button onclick="calculate()" style="width: auto; min-width: 200px;">Calculate & Save All</button>
        </div>
    `;
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

async function calculate() {
    const count = document.getElementById("count").value;
    const statusMessage = document.getElementById("statusMessage");
    const formArea = document.getElementById("formArea");

    try {
        for (let i = 0; i < count; i++) {
            let marks = [
                +document.getElementById(`wt${i}`).value || 0,
                +document.getElementById(`ip${i}`).value || 0,
                +document.getElementById(`unix${i}`).value || 0,
                +document.getElementById(`robot${i}`).value || 0,
                +document.getElementById(`se${i}`).value || 0
            ];

            let subjectGrades = marks.map(getSubjectGrade);

            // Simple CGPA calculation based on grades (S=10, A=9, etc.)
            let points = subjectGrades.map(g => {
                if (g === "S") return 10;
                if (g === "A") return 9;
                if (g === "B") return 8;
                if (g === "C") return 7;
                if (g === "D") return 6;
                if (g === "E") return 5;
                return 0;
            });
            
            let cgpa = (points.reduce((a, b) => a + b, 0) / 5).toFixed(2);

            let student = {
                name: document.getElementById(`name${i}`).value.trim(),
                roll: document.getElementById(`roll${i}`).value.trim(), 
                marks,
                subjectGrades,
                cgpa,
                fail: marks.some(m => m < 40)
            };

            await fetch("/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
        }

        // Show Success UI
        formArea.innerHTML = "";
        statusMessage.innerHTML = `
            <div class="success-banner">
                Total student(s) saved successfully! You can now view results.
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px;">
                <button onclick="window.location.reload()">Add More Students</button>
                <button class="btn-secondary" onclick="window.location.href='result.html'">View Results</button>
            </div>
        `;

    } catch (err) {
        console.error(err);
        alert("Error saving data. Please try again.");
    }
}