// DOM Elements
const signInUsername = document.querySelector("#loginUserName");
const signInPassword = document.querySelector("#loginPassword");
const signInBtn = document.querySelector(".sign-in-btn");
const logInEmptyAlert = document.querySelector('.logInEmptyAlert');
const usernameAlert = document.querySelector('.usernameAlert');
const logInPasswordAlert = document.querySelector('.logInPasswordAlert');


// getting users,usernames from array
var users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser2;
var userNames = users.map((e) => {
  return e.userName;
});

//
document.querySelector('.btn-login').addEventListener('click',()=>{
  signInUsername.value=''
  signInPassword.value=''
  usernameAlert.classList.add("hidden");
  logInEmptyAlert.classList.add("hidden");
  logInPasswordAlert.classList.add("hidden");
})

// Sign-in Button
signInBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Validating Inputs
  if (signInUsername.value && signInPassword.value) {
    //  Validating Username
    if (!userNames.includes(signInUsername.value)) {
 
      usernameAlert.classList.remove("hidden");
      logInEmptyAlert.classList.add("hidden");
      logInPasswordAlert.classList.add("hidden");
    } else {
      // Validating Password
      currentUser2 =
        users.find(function (user) {
          return user.userName === signInUsername.value;
        }) || {};

      if (currentUser2?.password == signInPassword.value) {
        // Redirecting To Homepage
        var url = "index.html";
        var uname = currentUser2.userName;
        url += "?username=" + encodeURIComponent(uname);
        window.location.href = url;
      } else {
        
        usernameAlert.classList.add("hidden");
        logInEmptyAlert.classList.add("hidden");
        logInPasswordAlert.classList.remove("hidden");
      }
    }
  } else {
    usernameAlert.classList.add("hidden");
    logInEmptyAlert.classList.remove("hidden");
    logInPasswordAlert.classList.add("hidden");
  }
});

document.addEventListener("keypress", (event) => {
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {
    signInBtn.click();
  }
});

