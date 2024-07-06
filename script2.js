// this peice of code will not allow you t o decrease the screen width
function checkWindowSize() {
  if (window.innerWidth <= 750) {
    // console.log("Window size is less than 750px")
    window.location.href = "warning.html";
  }
}
window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", checkWindowSize);
// this peice of code is used  to add the new task in th eto do list
const addTaskBtn = document.querySelector("#addTask");
// This adds the new task to the todo container
addTaskBtn.addEventListener("click", () => {
  const newToDoChild = document.createElement("div");
  newToDoChild.textContent = "I am the new child";
  const todoBox = document.getElementById("toDoBox");
  const taskDescriptionModel = document.getElementById("taskDesModel");
  taskDescriptionModel.classList.remove("hidden");
  // this function is used to copy the classname from add todo container to all other container
  function copyOtherelementChild(source, target) {
    target.className = source.className;
    newToDoChild.classList.add("draggable-child");
    newToDoChild.setAttribute("draggable", "true");
    const taskBackdrop = document.getElementById("taskBackdrop");
    taskBackdrop.classList.remove("hidden");

    // to remove the pop description
    taskBackdrop.addEventListener("click", () => {
      taskDescriptionModel.classList.add("hidden");
      taskBackdrop.classList.add("hidden");
    });
    newToDoChild.classList.remove("justify-center");
    newToDoChild.classList.remove("items-center");
    newToDoChild.classList.add("p-6");
    todoBox.appendChild(newToDoChild);

    // if any new child is created if i click on it the ntask description mode lshould pop up
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

      // This peice of code will give pop up to set the timer
      const tasktimerIcon = document.getElementById("taskTimerImage");
      tasktimerIcon.addEventListener("mouseenter", () => {
        // console.log("mouse in")
        const setTaskTimer = document.getElementById("setTaskTimer");
        setTaskTimer.classList.remove("hidden");
      });
      setTaskTimer.addEventListener("mouseleave", () => {
        setTaskTimer.classList.add("hidden");
      });
    });
  };
  copyOtherelementChild(addTaskBtn, newToDoChild);
  // todoBox.insertBefore(newToDoChild, addTaskBtn)

  // This peice of code will enable the tasks to drag and drop as per the status
  const dragTaskContainer = document.querySelectorAll(".task-container");
  const dragtaskChild = document.querySelectorAll(".draggable-child");
  // To pop up the task description
  // darg the elements eas per the events
  dragtaskChild.forEach((dragIndTask) => {
    dragIndTask.addEventListener("dragstart", (e) => {
      dragIndTask.classList.add("dragging");
      dragIndTask.classList.add("border-2");
      dragIndTask.classList.add("border-yellow-300");
    });
    dragIndTask.addEventListener("dragend", () => {
      dragIndTask.classList.remove("dragging");
      dragIndTask.classList.remove("border-2");
      dragIndTask.classList.remove("border-yellow-300");
    });
  });
  dragTaskContainer.forEach((dropingTaskStatus) => {
    dropingTaskStatus.addEventListener("dragover", (e) => {
      // dropingTaskStatus.classList.add("border");
      e.preventDefault();

    });

    dropingTaskStatus.addEventListener("dragenter", (e) => {
      dropingTaskStatus.classList.add("border-2");
      dropingTaskStatus.classList.add("border-green-500");
      e.preventDefault();

    });

    dropingTaskStatus.addEventListener("dragleave", (e) => {
      dropingTaskStatus.classList.remove("border-2");
      e.preventDefault();

    });

    dropingTaskStatus.addEventListener("drop", (e) => {
      e.preventDefault();
      dropingTaskStatus.classList.remove("border-2");
      const draggingElement = document.querySelector(".dragging")
      dropingTaskStatus.appendChild(draggingElement);
    });
  });
});
// to pop up the menu bar in the to do page
const menuToDo = document.getElementById("menu-todo");
const todoPopup = document.getElementById("todoMenu")
menuToDo.addEventListener("mouseenter", () => {
  todoPopup.classList.toggle("hidden");
});
todoPopup.addEventListener('mouseleave', () => {
  todoPopup.classList.toggle("hidden");
});