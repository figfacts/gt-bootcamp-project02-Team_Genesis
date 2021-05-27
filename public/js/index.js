const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const loginModalBtn = document.getElementById('loginBtn')
const closeLoginBtn = document.getElementById('loginCloseBtn')

const myModalSignUp = document.getElementById('myModalSignUp')
const myInputSignup = document.getElementById('myInputSignUp')
const signUpModalBtn = document.getElementById('signUpBtn')
const closeSignUpBtn = document.getElementById('signUpCloseBtn')

const dropDownBtn = document.getElementById('dropdownMenuLink');

// database connection




// OPEN AND CLOSE LOGIN/SIGN-UP MODALS

loginModalBtn.onclick = function() {
  myModal.style.display = "block";
}

closeLoginBtn.onclick = function(event) {
  if (event.target === closeLoginBtn) {
    myModal.style.display = "none";
  }
}

signUpModalBtn.onclick = function() {
  myModalSignUp.style.display = "block";
}

closeSignUpBtn.onclick = function(event) {
  if (event.target === closeSignUpBtn) {
    myModalSignUp.style.display = "none";
  }
}

// DROPDOWN BUTTON FUNCTIONALITY
function dropDownMenu() {
  document.getElementById("dropDown").classList.toggle("show");
}

dropDownBtn.onclick = function () {
  dropDownMenu()
}



userInterestItems = [];

latestPostedItems = [];


function getAllItems() {
  console.log("Choice Accepted");
  connection.query("SELECT * FROM item", function (err, result) {
      if (err) throw err;
      console.table(result);
  })
};

getAllItems();