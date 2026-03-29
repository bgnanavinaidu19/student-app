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

    formArea.innerHTML += `<button onclick="calculate()">Calculate Results</button>`;
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

function calculate() {
    students = [];
    const count = document.getElementById("count").value;

    let subjectTotals = [0,0,0,0,0];
    let subjectTop = [0,0,0,0,0];

    for (let i = 0; i < count; i++) {

        let marks = [
            +document.getElementById(`wt${i}`).value,
            +document.getElementById(`ip${i}`).value,
            +document.getElementById(`unix${i}`).value,
            +document.getElementById(`robot${i}`).value,
            +document.getElementById(`se${i}`).value
        ];

        // subject stats
        marks.forEach((m, idx) => {
            subjectTotals[idx] += m;
            if (m > subjectTop[idx]) subjectTop[idx] = m;
        });

        let total = marks.reduce((a,b)=>a+b,0);
        let avg = total / 5;

        let subjectGrades = marks.map(m => getSubjectGrade(m));

        // CGPA
        let totalPoints = subjectGrades.reduce((sum, g) => sum + gradeToPoint(g)*3, 0);
        let cgpa = totalPoints / 15;

        students.push({
            name: document.getElementById(`name${i}`).value,
            roll: document.getElementById(`roll${i}`).value,
            marks,
            total,
            avg: avg.toFixed(2),
            subjectGrades,
            cgpa: cgpa.toFixed(2),
            fail: marks.some(m => m < 40)
        });
    }

    // ranking
    students.sort((a,b)=>b.total-a.total);

	let rank = 1;
	students.forEach((s,i)=>{
    	if (s.fail) {
       		 s.rank = "F";   // failed students no rank
    	} else {
        	s.rank = rank++;
   	 }
	});

    // save data
    localStorage.setItem("students", JSON.stringify(students));

    alert("Results calculated! Go to result page ");
}