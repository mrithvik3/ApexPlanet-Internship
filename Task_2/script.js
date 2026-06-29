let students = [];

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();
 
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;
    let error = document.getElementById("error");

    if (fname === "" || lname === "" || email === "" || course === "") {
        error.innerText = "All fields are required!";
        return;
    }

    if (!email.includes("@")) {
        error.innerText = "Enter valid email!";
        return;
    }

    error.innerText = "";

    students.push({
        name: fname + " " + lname,
        email,
        course
    });

    displayStudents();

    this.reset();
});

function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((s, index) => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${s.name}</h3>
            <p>${s.email}</p>
            <p>${s.course}</p>
            <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        `;

        list.appendChild(div);
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}