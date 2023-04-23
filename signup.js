// DOOM Elements
const firstName = document.querySelector("#registerFirstName");
const lastName = document.querySelector("#registerLastName");
const signUpUserName = document.querySelector("#registerUserName");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword");
const confirmPassword = document.querySelector("#registerCPassword");
const role = document.querySelector("#registerRole");
const signupBtn = document.querySelector(".sign-up-btn");
const  firstnameAlert= document.querySelector(".firstnameAlert");
const lastNameAlert= document.querySelector(".lastNameAlert");
const userNameAlert=document.querySelector(".userNameAlert");
const userNameAlert2=  document.querySelector(".userNameAlert2");
const emailAlert= document.querySelector(".emailAlert");
const passwordAlert=document.querySelector(".passwordAlert");
const passwordAlert2= document.querySelector(".passwordAlert2");

// getting users data from local storage
var users = JSON.parse(localStorage.getItem("users")) || [];
var userNames = users.map((e) => {
  return e.userName;
});
let currentUser;

//
document.querySelector('.btn-signup').addEventListener('click',()=>{
  firstnameAlert.classList.add("hidden");
  lastNameAlert.classList.add("hidden");
  userNameAlert.classList.add("hidden");
  userNameAlert2.classList.add("hidden");
  emailAlert.classList.add("hidden");
  passwordAlert.classList.add("hidden");
  passwordAlert2.classList.add("hidden");
  firstName.value = "";
  lastName.value = "";
  signUpUserName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";

})

// Sign-up Button
signupBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Getting User data values from inputs
  let user = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: signUpUserName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    role: role.value,
    orderedItems:[]
  };

  // Validating Input Data
  if (!user.firstName) {
    firstnameAlert.classList.remove("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (!user.lastName) {
    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.remove("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (!user.userName) {

    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.remove("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (userNames.includes(user.userName)) {

    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.remove("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (!user.email) {

    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.remove("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (!user.password || !user.confirmPassword) {

    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.remove("hidden");
    passwordAlert2.classList.add("hidden");
  } else if (user.password == user.confirmPassword) {
    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.add("hidden");
    // Pushing user in Users array and storing users array in local storage
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // storing username in array to validate unique username
    userNames.push(user.userName);

    // Storing logged in user object in currentuser
    currentUser = user;

    // Redirecting To Home Page
    var url = "index.html";
    var uname = currentUser.userName;
    url += "?username=" + encodeURIComponent(uname);
    window.location.href = url;

    // Setting Input Fields To ''
    firstName.value = "";
    lastName.value = "";
    signUpUserName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

  } else {
    firstnameAlert.classList.add("hidden");
    lastNameAlert.classList.add("hidden");
    userNameAlert.classList.add("hidden");
    userNameAlert2.classList.add("hidden");
    emailAlert.classList.add("hidden");
    passwordAlert.classList.add("hidden");
    passwordAlert2.classList.remove("hidden");
    
  }
});

document.addEventListener("keypress", (event) => {
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {
    signupBtn.click();
  }
});
