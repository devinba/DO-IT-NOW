// this part of code is written to pop the model and the backdrop in the screen
const logInBtn = document.getElementById("popUpSignup");
logInBtn.addEventListener("click", () => {
  document.getElementById("loginModel").classList.remove("hidden");
  document.getElementById("signupBackdrop").classList.remove("hidden");
});
// This lines are written to remove the the models and backdrop from the main page
const loginBackdrop = document.getElementById("signupBackdrop");
loginBackdrop.addEventListener("click", () => {
  loginBackdrop.classList.add("hidden")
  document.getElementById("loginModel").classList.add("hidden");
  document.getElementById("signupBackdrop").classList.add("hidden");
  document.getElementById("otpModel").classList.add("hidden");
});
// this peice of code to pop the model sign up and the backdrop
const createAccount = document.getElementById("createAccount");
createAccount.addEventListener("click", () => {
  document.getElementById("signupModel").classList.remove("hidden");
  document.getElementById("signupBackdrop").classList.remove("hidden");
})
// this peice of code is for otp verification model pop up
const otpVerify = document.getElementById("signupBtn");
otpVerify.addEventListener("click", () => {
  document.getElementById("signupModel").classList.add("hidden");
  document.getElementById("loginModel").classList.add("hidden");
  document.getElementById("otpModel").classList.remove("hidden");
  let timerElement = document.querySelector("#timer-sec span");
  let timer = 15;
  const counter = setInterval(() => {
    if (timer <= 0) {
      clearInterval(counter);
      timerElement.textContent = 15;
      timerElement.classList.add("hidden");
      document.getElementById("timer-sec").classList.add("hidden");
    } else {
      timerElement.textContent = timer;
      timer--;
    }
  }, 1000);
});
// this peice of code is used to used re trigger thr otp again
const resendOtpTrigger = document.getElementById("resendOtp");
resendOtpTrigger.addEventListener("click", () => {
  document.getElementById("timer-sec").classList.remove("hidden");
  document.querySelector("#timer-sec span").classList.remove("hidden");
  let timer = 15;
  const counter = setInterval(() => {
    if (timer <= 0) {
      clearInterval(counter);
      document.querySelector("#timer-sec span").textContent = 15
      document.querySelector("#timer-sec span").classList.add("hidden");
      document.getElementById("timer-sec").classList.add("hidden");
    } else {
      document.querySelector("#timer-sec span").textContent = timer;
      timer--;
    }
  }, 1000);
});

// Adding the functionality to move the insertion pointer from one text to the next text field
const otpInput = document.querySelectorAll(".otp-input")
otpInput[0].addEventListener("focus", () => {
  // console.log("The input field is in the focus!");
  otpInput.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < otpInput.length - 1) {
        input.classList.add("border-2")
        input.classList.add("border-indigo-400");
        otpInput[index + 1].focus();
        // console.log(index);
        // console.log(otpInput.length);
      };
    // check poitner to go the next page
      if (index + 1 === otpInput.length && input.value.length === 1) {
        input.classList.add("border-2")
        input.classList.add("border-indigo-400");
        // console.log("valid otp");
        window.location.href = "todo.html";
        console.log("Navigating to the next page");
      }

    // to override the value to enter the new value by using backspace key
    });
    input.addEventListener("keydown", (event) => {
      if (index > 0 && event.key === "Backspace" && input.value.length === 0) {
        otpInput[index - 1].focus();
      }
    });
  });
});
// console.log(window.location.href)