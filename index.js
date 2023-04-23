// DOM Elements
const welcomeTxt = document.querySelector(".logo");
const restroName = document.querySelector("#restroName");
const foodType = document.querySelector("#foodType");
const foodPrice = document.querySelector("#foodPrice");
const registerBtn = document.querySelector(".register-btn");
const nameAlert = document.querySelector(".nameAlert");
const sameNameAlert = document.querySelector(".sameNameAlert");
const foodTypeAlert = document.querySelector(".foodTypeAlert");
const foodItemAlert = document.querySelector(".foodItemAlert");
const foodPriceAlert = document.querySelector(".priceAlert");
const foodPriceAlert2 = document.querySelector(".priceAlert2");

// getting users and restros array
let users = JSON.parse(localStorage.getItem("users")) || [];
let restros = JSON.parse(localStorage.getItem("restros")) || [];

var restroNames = restros.map((e) => {
  return e.name;
});

// Getting Currentuser From URL
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const username = urlParams.get("username");
let currentUser = users.find(function (user) {
  return user.userName === username;
});

// welcome Header With First Name Of Logged In User
welcomeTxt.innerHTML = ` <a href="index.html">Welcome To Meal Monkey ${currentUser.firstName} </a>`;

// Hiding Previous Order Section
document.querySelector(".recent-orders-box").classList.add("hidden");
let html = "";

// Display Function To Display Restros Card
function display(arr) {
  arr
    .sort((a, b) => {
      return a.price - b.price;
    })
    .map((e, i) => {
      html += `<div class="col-lg-3 my-3">
      <div class="box" data-aos="zoom-in" data-aos-delay="100">
        <span class="hidden">${i}</span>
        <span><ion-icon name="storefront-outline"  class="me-1"></ion-icon>${e.name}</span>
        <h4><ion-icon name="fast-food-outline" class="me-1"></ion-icon> ${e.foodItem}</h4>
        <p>
        <ion-icon name="alert-circle-outline" class="me-1"></ion-icon>
        ${e.foodType}
        </p>
        <p> <b class="ms-1 me-1">$</b>${e.price}</p>
        <button class="buy-btn mt-3 me-2 hidden" data-bs-toggle="modal" data-bs-target="#buyModal">Buy</button>
        <button class="delete-btn mt-3" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
      </div>
      </div>`;
    });
  document.querySelector(".r-box").innerHTML = html;
}

display(restros);

// When Admin Logs In
if (currentUser.role === "Admin") {
  //  Hiding buy Btn And Showing Delete And Create Restro btn
  document.querySelector(".btn-createmenu").classList.remove("hidden");
  document.querySelector(".filter-row").classList.add("hidden");
  document.querySelectorAll(".delete-btn").forEach((e) => {
    e.classList.remove("hidden");
  });

  document.querySelectorAll(".buy-btn").forEach((e) => {
    e.classList.add("hidden");
  });

  // Showing Food Item Dropdown Based On food Type Dropdwon
  // firstly used 4 seprate select component then created arrays of food item based on food type and display using single select component (Improves code quality and readbility) 
  let foodItem;
  function jsFunction() {

    let soups =['Tomato','Hot And Sour','Manchurain Soup'];
    let starters =['Paneer Chilly','Crispy Veggies','Manchurian'];
    let mainCourse =['Panner Patiyala','Veg Kabab','Kaju Masala'];
    let deserts =['Brownie Fudge','Naked Nuttela Waffle','Choco Bomb'];
    document.querySelector('.foodItems').classList.remove('hidden');
    let htm='';
    switch (foodType.value) {  
      case "Soups":
       
        soups.map((e)=>{
          htm += `<option value="${e}">${e}</option>`
        })
        document.querySelector('.foodItems').innerHTML=htm;
        // document.querySelector(".Soups").classList.remove("hidden");
        // document.querySelector(".Starters").classList.add("hidden");
        // document.querySelector(".mainCourse").classList.add("hidden");
        // document.querySelector(".deserts").classList.add("hidden");
        // foodItem = document.querySelector("#foodItems");
        break;
      case "Starters":
         htm='';
        starters.map((e)=>{
          htm += `<option value="${e}">${e}</option>`
        })
        document.querySelector('.foodItems').innerHTML=htm;
        // document.querySelector(".Soups").classList.add("hidden");
        // document.querySelector(".Starters").classList.remove("hidden");
        // document.querySelector(".mainCourse").classList.add("hidden");
        // document.querySelector(".deserts").classList.add("hidden");
        // foodItem = document.querySelector("#foodItems2");
        break;
      case "Main Course":
         htm='';
        mainCourse.map((e)=>{
          htm += `<option value="${e}">${e}</option>`
        })
        document.querySelector('.foodItems').innerHTML=htm;
        // document.querySelector(".Soups").classList.add("hidden");
        // document.querySelector(".Starters").classList.add("hidden");
        // document.querySelector(".mainCourse").classList.remove("hidden");
        // document.querySelector(".deserts").classList.add("hidden");
        // foodItem = document.querySelector("#foodItems3");
        break;
      case "Deserts":
         htm='';
        deserts.map((e)=>{
          htm += `<option value="${e}">${e}</option>`
        })
        document.querySelector('.foodItems').innerHTML=htm;
        // document.querySelector(".Soups").classList.add("hidden");
        // document.querySelector(".Starters").classList.add("hidden");
        // document.querySelector(".mainCourse").classList.add("hidden");
        // document.querySelector(".deserts").classList.remove("hidden");
        // foodItem = document.querySelector("#foodItems4");
        break;
      default:
    }
    foodItem=document.querySelector('.foodItems');
  }

  // Clearnig Food Item Dropdown When New Create Restro Modal Opens
  document.querySelector(".btn-createmenu").addEventListener("click", () => {
    document.querySelector(".Soups").classList.add("hidden");
    document.querySelector(".Starters").classList.add("hidden");
    document.querySelector(".mainCourse").classList.add("hidden");
    document.querySelector(".deserts").classList.add("hidden");
    restroName.value = "";
    foodType.value = "";
    foodPrice.value = "";
  });

  // Register Btn Event
  registerBtn.addEventListener("click", () => {
    let restro = {
      name: restroName.value,
      foodType: foodType.value,
      foodItem: foodItem.value,
      price: foodPrice.value,
      users: [],
    };

    // Validating Inputs
    if (!restroName.value) {
      nameAlert.classList.remove("hidden");
      sameNameAlert.classList.add("hidden");
      foodTypeAlert.classList.add("hidden");
      foodItemAlert.classList.add("hidden");
      foodPriceAlert.classList.add("hidden");
      foodPriceAlert2.classList.add("hidden");
    } else if (!foodType.value) {
      nameAlert.classList.add("hidden");
      sameNameAlert.classList.add("hidden");
      foodTypeAlert.classList.remove("hidden");
      foodItemAlert.classList.add("hidden");
      foodPriceAlert.classList.add("hidden");
      foodPriceAlert2.classList.add("hidden");
    } else if (!foodItem.value) {
      nameAlert.classList.add("hidden");
      sameNameAlert.classList.add("hidden");
      foodTypeAlert.classList.add("hidden");
      foodItemAlert.classList.remove("hidden");
      foodPriceAlert.classList.add("hidden");
      foodPriceAlert2.classList.add("hidden");
    } else if (!foodPrice.value) {
      nameAlert.classList.add("hidden");
      sameNameAlert.classList.add("hidden");
      foodTypeAlert.classList.add("hidden");
      foodItemAlert.classList.add("hidden");
      foodPriceAlert.classList.remove("hidden");
      foodPriceAlert2.classList.add("hidden");
    } else if (foodPrice.value < 0) {
      nameAlert.classList.add("hidden");
      sameNameAlert.classList.add("hidden");
      foodTypeAlert.classList.add("hidden");
      foodItemAlert.classList.add("hidden");
      foodPriceAlert.classList.add("hidden");
      foodPriceAlert2.classList.remove("hidden");
    } else if (restroNames.includes(restroName.value)) {
      nameAlert.classList.add("hidden");
      sameNameAlert.classList.remove("hidden");
      foodTypeAlert.classList.add("hidden");
      foodItemAlert.classList.add("hidden");
      foodPriceAlert.classList.add("hidden");
      foodPriceAlert2.classList.add("hidden");
    } else {
      // Pushing Restro To Restros Array And Setting Local Storage And Displaying New Data To UI
      restros.push(restro);
      localStorage.setItem("restros", JSON.stringify(restros));

      html = "";
      display(restros);
      restroName.value = "";
      foodType.value = "";
      foodItem.value = "";
      foodPrice.value = "";

      // closing model on submit
      const modal = document.querySelector("#createOrderBackdrop");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    }
  });

  // View Previous Order Button event and showcasinng in UI
  document.querySelector(".btn-view-order").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".adminTitle").innerHTML = `<h2>Orders</h2>
    <p>on Your Items </p>`;
    document.querySelector(".recent-orders-box").classList.remove("hidden");
    location.href = "#previousOrderSection";
    let html = "";
    restros.map((e) => {
      console.log(e.users.length);
      if (e.users.length > 0) {
        html += `<div class="col-lg-3 my-3">
        <div class="box" data-aos="zoom-in" data-aos-delay="100">
         <span><ion-icon name="storefront-outline"  class="me-1"></ion-icon>${e.name}</span>
         <h4><ion-icon name="fast-food-outline" class="me-1"></ion-icon>
          ${e.foodItem}</h4>
         <p>
         <ion-icon name="alert-circle-outline" class="me-1"></ion-icon>
         ${e.foodType}
         </p>
         <p> <b class="ms-1 me-1">$</b> ${e.price}</p>
         <p> <b class="ms-1 me-1">users :</b> ${e.users}</p>
       </div>
       </div>`;
      }
    });
    document.querySelector("#previousOrderSection").innerHTML = html;
  });

  // Delete Button Event Deleting Food Items On UI
  let box;
  let currentOrder;
  document.querySelector(".r-box").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      box = e.target.parentElement.parentElement;
      let id = e.target.parentElement.firstElementChild.innerText;

      document
        .querySelector(".btn-delete-modal")
        .addEventListener("click", (e) => {
          document.querySelector(".r-box").removeChild(box);
          restros.splice(id, 1);
          localStorage.setItem("restros", JSON.stringify(restros));

          const modal = document.querySelector("#deleteModal");
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        });
    }
  });
}

// When User Logs In
if (currentUser.role === "User") {
  // Hiding Delete And Crate restro Button And Showing Buy Btn
  document.querySelector(".btn-createmenu").classList.add("hidden");
  document.querySelector(".filter-row").classList.remove("hidden");
  document.querySelectorAll(".delete-btn").forEach((e) => {
    e.classList.add("hidden");
  });

  document.querySelectorAll(".buy-btn").forEach((e) => {
    e.classList.remove("hidden");
  });

  //  View Orders Button Shows Orders On Admins Restro
  document.querySelector(".btn-view-order").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".recent-orders-box").classList.remove("hidden");
    location.href = "#previousOrderSection";
    let html = "";
    currentUser.orderedItems.map((e) => {
      restros.find((h) => {
        if (e === h.name) {
          html += `<div class="col-lg-3 my-3">
        <div class="box" data-aos="zoom-in" data-aos-delay="100">
         <span><ion-icon name="storefront-outline"  class="me-1"></ion-icon>${h.name}</span>
         <h4><ion-icon name="fast-food-outline" class="me-1"></ion-icon>
          ${h.foodItem}</h4>
         <p>
         <ion-icon name="alert-circle-outline" class="me-1"></ion-icon>
         ${h.foodType}
         </p>
         <p> <b class="ms-1 me-1">$</b> ${h.price}</p>
         <button class="buy-btn mt-3 me-2" data-bs-toggle="modal" data-bs-target="#buyModal">Buy</button>
       </div>
       </div>`;
        }
      });
    });
    document.querySelector("#previousOrderSection").innerHTML = html;
  });

  // Buy Button Event Buying Food Item
  let restroName;
  document.querySelector(".r-box").addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
      restroName =
        e.target.parentElement.firstElementChild.nextElementSibling.innerText;
    }
  });

  document.querySelector(".btn-buy-modal").addEventListener("click", () => {
    restros.find((e) => {
      if (e.name === restroName) {
        if (!e.users.includes(currentUser.userName)) {
          e.users.push(currentUser.userName);
          localStorage.setItem("restros", JSON.stringify(restros));
        }
      }
    });
    users.find((e) => {
      if (e.userName === currentUser.userName) {
        if (!e.orderedItems.includes(restroName)) {
          e.orderedItems.push(restroName);
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    });

    const modal = document.querySelector("#buyModal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  });

  let restrohtml = `<option value="All" selected>All</option>`;
  restros.map((e) => {
    restrohtml += `
     <option value="${e.name}">${e.name}</option>`;
  });

  document.querySelector("#filter-restros").innerHTML = restrohtml;

  // Function For Filterinng Orders
  function filterDisplay(e) {
    e.forEach((e, i) => {
      html2 += `<div class="col-lg-3 my-3">
      <div class="box" data-aos="zoom-in" data-aos-delay="100">
        <span class="hidden">${i}</span>
        <span><ion-icon name="storefront-outline"  class="me-1"></ion-icon>${e.name}</span>
        <h4><ion-icon name="fast-food-outline" class="me-1"></ion-icon> ${e.foodItem}</h4>
        <p>
        <ion-icon name="alert-circle-outline" class="me-1"></ion-icon>
        ${e.foodType}
        </p>
        <p> <b class="ms-1 me-1">$</b>${e.price}</p>
        <button class="buy-btn mt-3 me-2" data-bs-toggle="modal" data-bs-target="#buyModal">Buy</button>
        <button class="delete-btn mt-3 hidden" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
      </div>
      </div>`;
    });
    document.querySelector(".r-box").innerHTML = html2;
  }

  let html2 = "";

  function Filter(value) {
    let priceRange = document.querySelector("#priceRange");
    let foodType = document.querySelector("#foodType1");
    let restrosFilter = document.querySelector("#filter-restros");

    let temp = JSON.parse(JSON.stringify(restros));
    html2 = "";

    if (
      priceRange.value === "Low To High" &&
      foodType.value === "All" &&
      restrosFilter.value === "All"
    ) {
      temp = temp.sort((a, b) => {
        return a.price - b.price;
      });
      filterDisplay(temp);
    } else if (
      priceRange.value === "High To Low" &&
      foodType.value === "All" &&
      restrosFilter.value === "All"
    ) {
      temp = temp.sort((a, b) => {
        return b.price - a.price;
      });
      filterDisplay(temp);
    } else if (
      priceRange.value === "Low To High" &&
      foodType.value !== "All" &&
      restrosFilter.value === "All"
    ) {
      temp = temp.sort((a, b) => {
        return a.price - b.price;
      });
      temp = temp.filter((e) => {
        if (e.foodType === foodType.value) {
          return e;
        }
      });
      filterDisplay(temp);
    } else if (
      priceRange.value === "High To Low" &&
      foodType.value !== "All" &&
      restrosFilter.value === "All"
    ) {
      temp = temp.sort((a, b) => {
        return b.price - a.price;
      });
      temp = temp.filter((e) => {
        if (e.foodType === foodType.value) {
          return e;
        }
      });
      filterDisplay(temp);
    } else if (
      priceRange.value === "Low To High" &&
      foodType.value !== "All" &&
      restroNames.includes(restrosFilter.value)
    ) {
      temp = temp.sort((a, b) => {
        return a.price - b.price;
      });
      temp = temp.filter((e) => {
        if (e.foodType === foodType.value) {
          return e;
        }
      });
      temp = temp.filter((e) => e.name === restrosFilter.value);
      filterDisplay(temp);
    } else if (
      priceRange.value === "High To Low" &&
      foodType.value !== "All" &&
      restroNames.includes(restrosFilter.value)
    ) {
      temp = temp.sort((a, b) => {
        return b.price - a.price;
      });
      temp = temp.filter((e) => {
        if (e.foodType === foodType.value) {
          return e;
        }
      });

      temp = temp.filter((e) => e.name === restrosFilter.value);

      filterDisplay(temp);
    } else {
      temp = temp.filter((e) => {
        if (e.name === restrosFilter.value) {
          return e;
        }
      });

      filterDisplay(temp);
    }
  }
}

//Log Out Btn
const logOutBtn = document.querySelector(".log-out-btn");
logOutBtn.addEventListener("click", (e) => {
  location.href = "login.html";
});

document.addEventListener("keypress", (event) => {
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {

    registerBtn.click();
    document.querySelector(".btn-delete-modal").click();
    document.querySelector(".btn-buy-modal").click();
  }
});

