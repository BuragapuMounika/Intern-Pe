document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const input = document.querySelector("#text");
    const taskList = document.querySelector(".tasklist");
    const statusNumber = document.getElementById("numbers");
    const progressBar = document.getElementById("progress");

    let tasks = [];

    function updateUI() {
        // Clear current task list
        taskList.innerHTML = "";

        // Re-render task list
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.style.cursor = "pointer";
            li.style.padding = "8px";
            li.style.borderBottom = "1px solid #444";
            li.style.textDecoration = task.completed ? "line-through" : "none";
            li.style.color = task.completed ? "gray" : "white";

            // Toggle completed
            li.addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                updateUI();
            });

            taskList.appendChild(li);
        });

        // Update progress and count
        const total = tasks.length;
        const done = tasks.filter(t => t.completed).length;
        statusNumber.textContent = `${done} / ${total}`;
        const percentage = total === 0 ? 0 : (done / total) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text !== "") {
            tasks.push({ text: text, completed: false });
            input.value = "";
            updateUI();
        }
    });

    // Initial render
    updateUI();
});
