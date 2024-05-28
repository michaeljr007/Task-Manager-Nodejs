// Selecting DOM elements
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-name");
const updateBtn = document.getElementById("update");
const cancelBtn = document.getElementById("cancel");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-tasks");

// Event listeners
const eventListeners = function () {
  form.addEventListener("submit", submitTask);
  document.addEventListener("DOMContentLoaded", fetchTasks);
  clearBtn.addEventListener("click", clearAllTasks);
  taskList.addEventListener("click", deleteSingleTask);
  taskList.addEventListener("click", editTask);
  updateBtn.addEventListener("click", updateTask);
  cancelBtn.addEventListener("click", cancelUpdate);
};

// Submit task
async function submitTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Task input cannot be empty");
  } else {
    const task = taskInput.value;
    try {
      await axios.post("/api/v1/tasks", { task });
    } catch (error) {
      console.log(error);
    }
    taskInput.value = "";
    fetchTasks();
  }
}

const fetchTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");

    if (tasks.length < 1) {
      const listItem = document.createElement("li");
      listItem.textContent = "No task found in database";
      listItem.className = "err-msg";

      taskList.appendChild(listItem);
    } else {
      const allTasks = tasks.map((item) => {
        let listItem = `<li class="list-item ${
          item.completed ? "completed" : ""
        }" id=${item._id}>${
          item.task
        } <i class="edit">🖊</i> <i class="delete">❌</i></li>`;

        return listItem;
      });

      taskList.innerHTML = allTasks;
    }
  } catch (error) {
    console.log(error);
  }
};

// Clear All Tasks
async function clearAllTasks() {
  if (confirm("Delete All Tasks?")) {
    try {
      await axios.delete("/api/v1/tasks");
      window.location.reload();
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }
}

// Delete single task
async function deleteSingleTask(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Delete Task?")) {
      const id = e.target.parentElement.id;
      try {
        await axios.delete(`/api/v1/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

// Edit Task
function editTask(e) {
  if (e.target.classList.contains("edit")) {
    const currentListItem = e.target.parentElement;
    currentListItem.classList.add("current-item");
    const currentText = currentListItem.firstChild.textContent;
    taskInput.value = currentText;
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    document.getElementById("btn").style.display = "none";
  }
}

// Update Task
function updateTask() {
  const text = taskInput.value;
  const listItems = document.querySelectorAll(".list-item");
  listItems.forEach(async function (item) {
    if (item.classList.contains("current-item")) {
      const id = item.id;

      try {
        await axios.patch(`/api/v1/tasks/${id}`, {
          task: text,
        });
        fetchTasks();
      } catch (error) {
        console.log(error);
      }

      item.classList.remove("current-item");
    }
  });
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  document.getElementById("btn").style.display = "inline-block";
  taskInput.value = "";
}

// Cancel Update
function cancelUpdate() {
  taskInput.value = "";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  document.getElementById("btn").style.display = "inline-block";
}

// Call all event listeners
eventListeners();
