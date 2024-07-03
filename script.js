const logInBtn = document.getElementById("popUpSignup");
logInBtn.addEventListener("click", () => {
  // console.log("button is clicked")
  document.getElementById("signupModel").classList.toggle("hidden");
  document.getElementById("signupBackdrop").classList.toggle("hidden");
  // console.log(a);
});

const signUpBackdrop = document.getElementById("signupBackdrop");

signUpBackdrop.addEventListener("click", () => {
  signUpBackdrop.classList.add("hidden")
  document.getElementById("signupModel").classList.add("hidden");
})

