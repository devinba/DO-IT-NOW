// custom drop down for progress view
const progressDuration = document.getElementById("customDropdownDuration");
progressDuration.addEventListener("mouseenter", () => {
  // console.log("mouse in");
  document.getElementById("durationDropOption").classList.remove("hidden")
});

document.getElementById("durationDropOption").addEventListener("mouseleave", () => {
  // console.log("mouse in");
  document.getElementById("durationDropOption").classList.add("hidden")
});

const progressViewType = document.getElementById("customDropdownViewType");
progressViewType.addEventListener("mouseover", () => {
  // console.log("mouse in");
  document.getElementById("viewTypeDropOption").classList.remove("hidden")
});

document.getElementById("viewTypeDropOption").addEventListener("mouseleave", () => {
  // console.log("mouse in");
  document.getElementById("viewTypeDropOption").classList.add("hidden")
});

//to navbar hide nd show
const menuToDo = document.getElementById("menu-todo");
const todoPopup = document.getElementById("todoMenu")
menuToDo.addEventListener("mouseenter", () => {
  todoPopup.classList.toggle("hidden");
});
todoPopup.addEventListener('mouseleave', () => {
  todoPopup.classList.toggle("hidden");
});

// Pie chart visualization for the Porgress
const pieChart = d3.select(".pie-chart svg");
const pieHeight = 400;
const pieWidth = 300;
const pieRadius = Math.min(pieHeight, pieWidth) / 2;
const colors = ["#A0B7E2", "#E2A0A0", "#C8E2A0"];
const data = [1, 3, 5]
pieChart.attr("width", pieWidth)
  .attr("height", pieHeight)
  .append("g")
  .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`)

const progressPie = d3.pie();

const progressPieArc = d3.arc()
  .innerRadius(0)
  .outerRadius(pieRadius);

const pieDataBind = progressPie(data);

pieChart.select("g").selectAll("path")
  .data(pieDataBind)
  .join("path")
  .attr("fill", (d, i) => colors[i % colors.length])
  .attr("d", progressPieArc);


