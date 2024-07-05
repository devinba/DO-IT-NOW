// Add task for to do
function checkWindowSize() {
  if (window.innerWidth <= 750) {
    // console.log("Window size is less than 750px")
    window.location.href = "warning.html";
  }
}
window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", checkWindowSize);

const addTaskBtn = document.querySelector("#addTask");
addTaskBtn.addEventListener("click", () => {
  const newToDoChild = document.createElement("div");
  newToDoChild.textContent = "I am the new child";
  const todoBox = document.getElementById("toDoBox");
  function copyOtherelementChild(source, target) {
    target.className = source.className;
    newToDoChild.classList.add("draggable-child")
    newToDoChild.setAttribute("draggable", "true");
  }
  copyOtherelementChild(addTaskBtn, newToDoChild);
  // todoBox.insertBefore(newToDoChild, addTaskBtn)
  todoBox.appendChild(newToDoChild);
  const dragTaskContainer = document.querySelectorAll(".task-container");
  const dragtaskChild = document.querySelectorAll(".draggable-child");
  // To pop up the task description
  newToDoChild.addEventListener("click", () => {
    // console.log("the new task element is clicked")
    const taskDescriptionModel = document.getElementById("taskDesModel")
    const taskBackdrop = document.getElementById("taskBackdrop");
    taskDescriptionModel.classList.remove("hidden");
    taskBackdrop.classList.remove("hidden");
    taskBackdrop.addEventListener("click", () => {
      taskDescriptionModel.classList.add("hidden");
      taskBackdrop.classList.add("hidden");
    });
    // changing the day and date content in the task description
    const daysOfWeek = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    const monthsOfYear = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
    // Function to get the current day and month in words
    function getCurrentDayAndMonth() {
      const now = new Date();
      const dayOfWeek = daysOfWeek[now.getDay()];
      const monthOfYear = monthsOfYear[now.getMonth()];
      return {
        day: dayOfWeek,
        month: monthOfYear + " " + now.getFullYear(),
        date: "0" + now.getDate()
      };
    };
    // days manipulation for the task description model
    const taskDate = document.getElementById("taskDate");
    taskDate.textContent = getCurrentDayAndMonth().date;
    const taskDay = document.getElementById("taskDay");
    taskDay.textContent = getCurrentDayAndMonth().day;
    const taskMonth = document.getElementById("taskMonth");
    taskMonth.textContent = getCurrentDayAndMonth().month;

    const tasktimerIcon = document.getElementById("taskTimerImage");
    tasktimerIcon.addEventListener("mouseenter", () => {
      // console.log("mouse in")
      const setTaskTimer = document.getElementById("setTaskTimer");
      setTaskTimer.classList.remove("hidden");
    });

    setTaskTimer.addEventListener("mouseleave", () => {
      setTaskTimer.classList.add("hidden");
    })
  });
  dragtaskChild.forEach((dragIndTask) => {
    dragIndTask.addEventListener("dragstart", (e) => {
      dragIndTask.classList.add("dragging");
    });
    dragIndTask.addEventListener("dragend", () => {
      dragIndTask.classList.remove("dragging")
    })
  });
  dragTaskContainer.forEach((dropingTaskStatus) => {
    dropingTaskStatus.addEventListener("dragover", (e) => {
      e.preventDefault()
    })
    dropingTaskStatus.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggingElement = document.querySelector(".dragging")
      dropingTaskStatus.appendChild(draggingElement);
    });
  });
});
const menuToDo = document.getElementById("menu-todo");
const todoPopup = document.getElementById("todoMenu")
menuToDo.addEventListener("mouseenter", () => {
  todoPopup.classList.toggle("hidden");
})
todoPopup.addEventListener('mouseleave', () => {
  todoPopup.classList.toggle("hidden");
})
const taskTitle = document.getElementById("task-title-input");
const taskDescriptionContainer = document.getElementById("task-description-input");
taskTitle.addEventListener("focus", () => {
  // console.log("title is focused");
})
