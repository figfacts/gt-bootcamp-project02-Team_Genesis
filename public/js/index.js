//--------------------------------------------------------------------------
//LOGIN BUTTONS

// const { get } = require("../../routes/api/item/item-routes")

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
//FOOTER CONTACT-US MODAL & BUTTONS
//--------------------------------------------------------------------------
const myModalContactUs= document.getElementById('contactUsModal')
const contactUsBtn = document.getElementById('contactUsBtn')
const closeContactUsBtn = document.getElementById('contactUsCloseBtn')

//cloud api url----------------------------------------------------------

// const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/drhdiapys';
// const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/drhdiapys/img/upload';
const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/drhdiapys/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'xbstlcpl'
// const CLOUDINARY_UPLOAD_PRESET = 'xbstlcpl/img/upload'
const CLOUDINARY_UPLOAD_PRESET = 'xbstlcpl'
var image = document.getElementById('image');



//-----------------------------------------------------------------------
// testBtn.addEventListener('change', function(event) {
//   var file = event.target.file[0];

//   var imageData = new FormData();
// imageData.append('file', file);
// imageData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

// axios({
//   url: CLOUDINARY_API,
//   method: 'POST',
//   header: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Origin',
//     'Access-Control-Allow-Credentials': true,
//   },
//   data: imageData
// }).then(function(res) {
//   console.log(res)
//   image.src = res.data.source_url;
// }).catch(function(err) {
//   console.log(err);
// });

// });




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

// closeAboutUsBtn.onclick = function(event) {
//   if (event.target == closeAboutUsBtn) {
//     myModalAboutUs.style.display = "none";
//   }
// }

contactUsBtn.onclick = function() {
  myModalContactUs.style.display = "block";
}

///Carousel------------------------------------------
// display latest 3 items posted in the carousel ---------------------------------------------
///------------------------------------------------------------------------------------------

var carousel1 = document.getElementById('carousel1');
var carousel2 = document.getElementById('carousel2');
var carousel3 = document.getElementById('carousel3');


latestPostedItems = [];

//Get last five items posted from our api url-------------------------------------------------

const carouselUrl = 'http://localhost:3000/api/item/carouselurls'


fetch(carouselUrl)
.then(function (response) {
    return response.json();
})

.then(function (data) {
    console.log(data);
    latestPostedItems.push(data);

}).then(function() {
 getLatestItems();

});

//set the carousel images to the last 3 items posted---------------------------------------------------

function getLatestItems() {

carousel1.setAttribute('src', latestPostedItems[0][0].image);
carousel2.setAttribute('src', latestPostedItems[0][1].image);
carousel3.setAttribute('src', latestPostedItems[0][2].image);
}
    
//-----------------------------------------------------------------------------------------------------
var image1 = document.getElementById("item1");
var image2 = document.getElementById("item2");
var image3 = document.getElementById("item3");
var image4 = document.getElementById("item4");
var image5 = document.getElementById("item5");
var image6 = document.getElementById("item6");
var image7 = document.getElementById("item7");
var image8 = document.getElementById("item8");
var image9 = document.getElementById("item9");
var image10 = document.getElementById("item10");


homePageItems = [];

//Get last five items posted from our api url-------------------------------------------------

const homePageItemsUrl = 'http://localhost:3000/api/item/homepageitems'


fetch(homePageItemsUrl)
.then(function (response) {
    return response.json();
})

.then(function (data) {
    console.log(data);
    homePageItems.push(data);

}).then(function() {
 getHomePageItems();

});

//set the homepage images to the last 20 items posted---------------------------------------------------

function getHomePageItems() {

image1.setAttribute('src', homePageItems[0][0].image);
image2.setAttribute('src', homePageItems[0][1].image);
image3.setAttribute('src', homePageItems[0][2].image);
image4.setAttribute('src', homePageItems[0][3].image);
image5.setAttribute('src', homePageItems[0][4].image);
image6.setAttribute('src', homePageItems[0][5].image);
image7.setAttribute('src', homePageItems[0][6].image);
image8.setAttribute('src', homePageItems[0][7].image);
image9.setAttribute('src', homePageItems[0][8].image);
image10.setAttribute('src', homePageItems[0][9].image);

}
    
//-----------------------------------------------------------------------------------------------------




