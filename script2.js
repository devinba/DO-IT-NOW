// Check window size and redirect if width is too small
function checkWindowSize() {
  if (window.innerWidth <= 750) {
    window.location.href = "warning.html";
  }
}
window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", checkWindowSize);

// DOM elements
const addTaskBtn = document.querySelector("#addTask");
const taskBackdrop = document.getElementById("taskBackdrop");
let desIdStore = [];
let taskStore = {};

// // exporting the data 
// const sharedData = {
//   key: "value",
//   anotherKey: "anotherValue"
// };


// task Storage
function addTask(date, taskId, taskDetails) {
  if (!taskStore[date]) {
    taskStore[date] = {};
  }
  taskStore[date][[taskId]] = taskDetails;
}
// Unique ID generator
function generateUniqueId() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000000000).toString();
  return (timestamp + random).slice(-10);
}

// Set the timer for a new task
function setTimerNewTask(desId) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getCurrentDayAndMonth() {
    const now = new Date();
    return {
      day: daysOfWeek[now.getDay()],
      month: `${monthsOfYear[now.getMonth()]} ${now.getFullYear()}`,
      date: now.getDate(),
    };
  }

  const currentDayAndMonth = getCurrentDayAndMonth();
  document.getElementById("taskDate" + desId).textContent =
    currentDayAndMonth.date;
  document.getElementById("taskDay" + desId).textContent =
    currentDayAndMonth.day;
  document.getElementById("taskMonth" + desId).textContent =
    currentDayAndMonth.month;
}

// Copy attributes and properties from one element to another
function copyOtherelementChild(source, target, id = 0) {
  target.className = source.className;
  target.classList.add("draggable-child", "p-6");
  target.classList.remove("justify-center", "items-center");
  target.setAttribute("draggable", "true");
  const cloneDiv = source.cloneNode(true);
  cloneDiv.setAttribute("id", id);
  return cloneDiv;
}

function startCountdown(toHourElement, fromHourElement, targetElement) {
  let totalRemainingHours =
    (Number(toHourElement.textContent) - Number(fromHourElement.textContent)) *
    60;

  function createUpdateFunction() {
    let rm = totalRemainingHours;

    return function updateTimingRemain() {
      if (rm >= 0) {
        targetElement.firstElementChild.firstElementChild.textContent = rm;
        rm -= 1;
        totalRemainingHours = rm;
      } else {
        clearInterval(targetElement.countdownInterval);
      }
    };
  }
  const updateTimingRemain = createUpdateFunction();
  updateTimingRemain(); // Initial call
  targetElement.countdownInterval = setInterval(updateTimingRemain, 2000);
}

// Initialize drag and drop functionality
function initializeDragAndDrop(desUniqueId, newToDoChild) {
  const dragTaskContainer = document.querySelectorAll(".task-container");
  const dragtaskChild = document.querySelectorAll(".draggable-child");

  dragtaskChild.forEach((dragIndTask) => {
    if (!dragIndTask.dataset.dragInitialized) {
      dragIndTask.dataset.dragInitialized = true;
      dragIndTask.addEventListener("dragstart", () => {
        dragIndTask.classList.add("dragging", "border-2", "border-yellow-300");
      });

      dragIndTask.addEventListener("dragend", () => {
        dragIndTask.classList.remove(
          "dragging",
          "border-2",
          "border-yellow-300",
        );
      });
    }
  });

  dragTaskContainer.forEach((dropingTaskStatus) => {
    if (!dropingTaskStatus.dataset.dropInitialized) {
      dropingTaskStatus.dataset.dropInitialized = true;
      dropingTaskStatus.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      dropingTaskStatus.addEventListener("dragenter", (e) => {
        dropingTaskStatus.classList.add("border-2", "border-green-500");
        e.preventDefault();
      });

      dropingTaskStatus.addEventListener("dragleave", (e) => {
        dropingTaskStatus.classList.remove("border-2");
        e.preventDefault();
      });

      dropingTaskStatus.addEventListener("drop", (e) => {
        e.preventDefault();
        dropingTaskStatus.classList.remove("border-2");
        const fromHour = document.getElementById("fromHour" + desUniqueId);
        const fromMin = document.getElementById("fromMin" + desUniqueId);
        const toHour = document.getElementById("toHour" + desUniqueId);
        const toMin = document.getElementById("toMin" + desUniqueId);
        const draggingElement = document.querySelector(".dragging");
        dropingTaskStatus.appendChild(draggingElement);
        if (e.target.id === "doing-task") {
          startCountdown(toHour, fromHour, draggingElement);
        } else if (e.target.id === "done-task") {
          let taskDone = e.target;
          let targetTask = taskDone.querySelector(
            "#newToDoTask-" + desUniqueId,
          );
          if (targetTask) {
            targetTask.classList.add("bg-green-200");
            clearInterval(targetTask.countdownInterval);
          }
        }
      });
    }
  });
}

// deleting element from the array
function delDesId(id) {
  desIdStore = desIdStore.filter((item) => item !== id);
}

// set timer for the task
function setTimer(id) {
  const fromHour = document.getElementById("fromHour" + id);
  const fromMin = document.getElementById("fromMin" + id);
  const toHour = document.getElementById("toHour" + id);
  const toMin = document.getElementById("toMin" + id);
  const dateAndTime = new Date();
  fromHour.textContent = dateAndTime.getHours();
  fromMin.textContent = dateAndTime.getMinutes();
}

// Handle task creation
function createTask() {
  const newToDoChild = document.createElement("div");
  const todoBox = document.getElementById("toDoBox");
  const desUniqueId = generateUniqueId();
  const desTemplate = document
    .getElementById("descriptionModelTemplate")
    .content.cloneNode(true);
  const rootElement = desTemplate.getElementById("taskDesModel");

  document.getElementById("descriptionModelHolder").append(desTemplate);
  rootElement.setAttribute("id", desUniqueId);

  rootElement.querySelectorAll("[id]").forEach((element) => {
    const desOrgId = element.getAttribute("id");
    element.setAttribute("id", desOrgId + desUniqueId);
  });
  setTimer(desUniqueId);

  const taskTimerIcon = document.getElementById("taskTimerImage" + desUniqueId);
  const setTaskTimer = document.getElementById("setTaskTimer" + desUniqueId);

  taskTimerIcon.addEventListener("mouseenter", () => {
    setTaskTimer.classList.remove("hidden");
  });
  setTaskTimer.addEventListener("mouseleave", () => {
    const fromHour = document.getElementById("fromHour" + desUniqueId);
    const toHour = document.getElementById("toHour" + desUniqueId);
    const setTimerInfo = document.getElementById("timerInfo" + desUniqueId);
    // toHour.addEventListener("input", (event) => {
    if (Number(toHour.textContent) >= Number(fromHour.textContent)) {
      setTaskTimer.classList.add("hidden");
      setTimerInfo.classList.add("hidden");
    } else {
      setTimerInfo.classList.remove("hidden");
      setTaskTimer.classList.remove("hidden");
    }
    // });
  });

  if (!desIdStore.includes(desUniqueId)) {
    desIdStore.push(desUniqueId);
    const newDesModel = document.getElementById(desUniqueId);
    const taskBackdrop = document.getElementById("taskBackdrop");
    const taskDeleteImg = document.getElementById(
      "taskDeleteImage" + desUniqueId,
    );
    const fromHour = document.getElementById("fromHour" + desUniqueId);
    const fromMin = document.getElementById("fromMin" + desUniqueId);
    const toHour = document.getElementById("toHour" + desUniqueId);
    const toMin = document.getElementById("toMin" + desUniqueId);
    const setTimerInfo = document.getElementById("timerInfo" + desUniqueId);
    taskDeleteImg.classList.add("hidden");
    newDesModel.classList.remove("hidden");
    taskBackdrop.classList.remove("hidden");
    setTimerNewTask(desUniqueId);

    taskBackdrop.addEventListener("click", (e) => {
      // generate the taskID 
      function taskID(prefix = "t") {
        let idCounter = 0;
        return function () {
          idCounter++;
          return `${prefix}${idCounter}`;
        };
      };
      if (
        toHour.textContent == "00" &&
        Number(toHour.textContent) <= Number(fromHour.textContent)
      ) {
        const setTimerInfo = document.getElementById("timerInfo" + desUniqueId);
        setTaskTimer.classList.remove("hidden");
        setTimerInfo.classList.remove("hidden");
        taskBackdrop.classList.remove("hidden");
      } else if (
        toHour.textContent != "00" &&
        Number(toHour.textContent) <= Number(fromHour.textContent)
      ) {
        const setTimerInfo = document.getElementById("timerInfo" + desUniqueId);
        setTaskTimer.classList.remove("hidden");
        setTimerInfo.classList.remove("hidden");
        taskBackdrop.classList.remove("hidden");
        setTaskTimer.classList.add("hidden");
      } else {
        newDesModel.classList.add("hidden");
        taskBackdrop.classList.add("hidden");
        setTimerInfo.classList.add("hidden");
      }
      e.preventDefault();

      const newTaskTitle = document.getElementById(
        "task-title-input" + desUniqueId,
      );

      const newTaskDes = document.getElementById(
        "task-description-input" + desUniqueId,
      );
      if (
        newTaskTitle.innerText.trim() != "Title" ||
        newTaskDes.innerText.trim() != "Starting typing..."
      ) {
        // Check if the element is already in the DOM to avoid resetting its position
        if (!newToDoChild.parentNode) {
          const cloneNewtoDo = copyOtherelementChild(
            addTaskBtn,
            newToDoChild,
            "newToDotask" + "-" + desUniqueId,
          );
          newToDoChild.textContent = newTaskTitle.textContent;
          newToDoChild.setAttribute("id", "newToDoTask" + "-" + desUniqueId);
          todoBox.append(newToDoChild);
          cloneNewtoDo.querySelectorAll("[id]").forEach((e) => {
            if (e.id !== "addTaskIcon") {
              newToDoChild.appendChild(e);
            }
          });
          const newTaskHoverIcons = document.querySelector(
            `#newToDoTask-${desUniqueId} #taskHoverIcon`,
          );
          newToDoChild.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            newTaskHoverIcons.classList.remove("hidden");
          });
          newToDoChild.addEventListener("mouseleave", (e) => {
            e.preventDefault();
            newTaskHoverIcons.classList.add("hidden");
          });
          newTaskHoverIcons.lastElementChild.firstChild.addEventListener(
            "click",
            () => {
              e.preventDefault();
              newToDoChild.remove();
              newDesModel.remove();
              delDesId(desUniqueId);
            },
          );
          initializeDragAndDrop(desUniqueId, newToDoChild);
          let totalRemainingHours =
            (Number(toHour.textContent) - Number(fromHour.textContent)) * 60;
          newToDoChild.firstElementChild.firstElementChild.textContent =
            totalRemainingHours; //taskHoverIcon
          const currDate = new Date()
          const year = currDate.getFullYear().toString().slice(-2);
          const month = (currDate.getMonth() + 1).toString().padStart(2, "0");
          const day = currDate.getDate().toString().padStart(2, "0");
          const dayOfWeek = currDate.toLocaleString("en-US", { weekday: "long" });
          const hours = currDate.getHours();
          const minute = currDate.getMinutes().toString().padStart(2, "0");
          const time = `${hours.toString().padStart(2, '0')}:${minute}`;
          const date = `${month}-${day}-${year}`;
          const setTime = totalRemainingHours;
          const taskStatus = "Done";
          const taskIds = desUniqueId;
          const newTask = {
            taskNo: desUniqueId,
            date: date,
            day: dayOfWeek,
            time: time,
            taskTitle: newTaskTitle.textContent,
            taskDes: newTaskDes.textContent,
            setTime: setTime + "mins",
            taskStatus: taskStatus,
          }
          addTask(date, desUniqueId, newTask);

          // storing data in the local storage 
          localStorage.setItem("sharedData", JSON.stringify(taskStore));
          console.log("the data has been saved in the local storage");
          console.log("THe new task object is:", taskStore);
          console.log("the id storage: ", desIdStore);
        }
      }
    });

    newToDoChild.addEventListener("click", (element) => {
      element.preventDefault();
      const elementId = element.target.id.split("-")[1];
      document.getElementById(elementId).classList.remove("hidden");
      taskBackdrop.classList.remove("hidden");
      taskDeleteImg.classList.remove("hidden");
    });

    // To delete the particular task
    taskDeleteImg.addEventListener("click", () => {
      newToDoChild.remove();
      newDesModel.remove();
      delDesId(desUniqueId);
      taskBackdrop.classList.add("hidden");
    });
  }
}

// Add task button event listener
addTaskBtn.addEventListener("click", createTask);
// Menu popup event listeners
const menuToDo = document.getElementById("menu-todo");
const todoPopup = document.getElementById("todoMenu");
menuToDo.addEventListener("mouseenter", () => {
  todoPopup.classList.toggle("hidden");
});

todoPopup.addEventListener("mouseleave", () => {
  todoPopup.classList.toggle("hidden");
});
