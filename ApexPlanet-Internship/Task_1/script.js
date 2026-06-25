let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    
    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleComplete(${index})" 
                  class="${task.completed ? 'completed' : ''}">
                  ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("taskCount").innerText = tasks.length;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value === "") {
        alert("Enter a task!");
        return;
    }

    tasks.push({ text: input.value, completed: false });
    document.getElementById("quote").innerText = "Task Added! Keep going 🚀";
    input.value = "";

    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function showMessage() {
    let messages = [
        "Keep pushing forward 💪",
        "Success is near 🚀",
        "You are unstoppable 🔥",
        "Focus on your goals 🎯"
    ];

    let random = Math.floor(Math.random() * messages.length);
    alert(messages[random]);
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}


renderTasks();