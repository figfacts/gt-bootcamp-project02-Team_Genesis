//--------------------------------------------------------------------------
//LOGIN BUTTONS
//--------------------------------------------------------------------------
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const loginModalBtn = document.getElementById('loginBtn')
const closeLoginBtn = document.getElementById('loginCloseBtn')
//--------------------------------------------------------------------------
//SIGN-UP BUTTONS
//--------------------------------------------------------------------------
const myModalSignUp = document.getElementById('myModalSignUp')
const myInputSignup = document.getElementById('myInputSignUp')
const signUpModalBtn = document.getElementById('signUpBtn')
const closeSignUpBtn = document.getElementById('signUpCloseBtn')

//--------------------------------------------------------------------------
//FOOTER "ABOUT-US" MODAL & BUTTONS
//--------------------------------------------------------------------------
const myModalAboutUs = document.getElementById('aboutUsModal')
// const myInputSignup = document.getElementById('myInputSignUp')
const aboutUsBtn = document.getElementById('aboutUsBtn')
const closeAboutUsBtn = document.getElementById('aboutUsCloseBtn')

//--------------------------------------------------------------------------
//FOOTER CONTACT-US MODAL & BUTTONS
//--------------------------------------------------------------------------
const myModalContactUs= document.getElementById('contactUsModal')
// const myInputSignup = document.getElementById('myInputSignUp')
const contactUsBtn = document.getElementById('contactUsBtn')
const closeContactUsBtn = document.getElementById('contactUsCloseBtn')






//--------------------------------------------------------------------------
//DROPDOWN BUTTON
//--------------------------------------------------------------------------
const dropDownBtn = document.getElementById('dropdownMenuLink')

//--------------------------------------------------------------------------
// DROPDOWN BUTTON FUNCTIONALITY
//--------------------------------------------------------------------------
function dropDownMenu() {
  document.getElementById("dropDown").classList.toggle("show");
}

dropDownBtn.onclick = function () {
  dropDownMenu()
}

//--------------------------------------------------------------------------
// OPEN AND CLOSE LOGIN/SIGN-UP MODALS
//--------------------------------------------------------------------------
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





//--------------------------------------------------------------------------
// OPEN AND CLOSE FOOTER ABOUT-US/CONTACT-US MODALS
//--------------------------------------------------------------------------
aboutUsBtn.onclick = function() {
  myModalAboutUs.style.display = "block";
}

closeAboutUsBtn.onclick = function(event) {
  if (event.target == closeAboutUsBtn) {
    myModalAboutUs.style.display = "none";
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