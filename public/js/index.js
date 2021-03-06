// -----------------------------------------------------------------------------
// Program:  index.js
// Purpose:  
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Team Genesis
// Date:     May 22, 2021
// -----------------------------------------------------------------------------

//--------------------------------------------------------------------------
//LOGIN BUTTONS
//--------------------------------------------------------------------------
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const loginModalBtn = document.getElementById('loginBtn')
const closeLoginBtn = document.getElementById('loginCloseBtn')
// const logOutBtn = document.getElementById('logoutBtn')
// const profileBtn = document.getElementById('profileBtn')
// const addItemBtn = document.getElementById('addItemBtn')
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

//--------------------------------------------------------------------------
//cloud api url
//--------------------------------------------------------------------------
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
//HANDLE LOGOUT BUTTON
//--------------------------------------------------------------------------
// logOutBtn.onclick = async function() {
// 	const res = await fetch('hbs/user/logout');
// 	if (res.redirected) window.location.href = res.url;
// }

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

///Navigation Button

// addItemBtn.addEventListener('click', function() {
//   window.location.href = '/addItem'
// });

// profileBtn.addEventListener('click', function() {
//   window.location.href = '/profile'
// });
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


//--------------------------------------------------------------------------
//Carousel display latest 3 items posted in the carousel
//--------------------------------------------------------------------------
var carousel1 = document.getElementById('carousel1');
var carousel2 = document.getElementById('carousel2');
var carousel3 = document.getElementById('carousel3');


latestPostedItems = [];

//--------------------------------------------------------------------------
//Get last three items posted from our api url
//--------------------------------------------------------------------------
// const carouselUrl = '/api/item/carouselurls';
const carouselUrl = '/api/item/latestitems/3';

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

//--------------------------------------------------------------------------
//set the carousel images to the last 3 items posted
//--------------------------------------------------------------------------
function getLatestItems() {

carousel1.setAttribute('src', latestPostedItems[0][0].image);
carousel2.setAttribute('src', latestPostedItems[0][1].image);
carousel3.setAttribute('src', latestPostedItems[0][2].image);
}
    
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
var image11 = document.getElementById("item11");
var image12 = document.getElementById("item12");



homePageItems = [];

//--------------------------------------------------------------------------
//Get last 12 items posted from our api url
//--------------------------------------------------------------------------
// const homePageItemsUrl = '/api/item/homepageitems'
const homePageItemsUrl = '/api/item/latestitems/12'

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

//--------------------------------------------------------------------------
//set the homepage images to the last 12 items posted
//--------------------------------------------------------------------------
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
image11.setAttribute('src', homePageItems[0][10].image);
image12.setAttribute('src', homePageItems[0][11].image);

}




//--------------------------------------------------------------------------
//Profile displays latest items posted from sell.js
//--------------------------------------------------------------------------
  
// var image1 = document.getElementById("item1");
// var image2 = document.getElementById("item2");
// var image3 = document.getElementById("item3");
// var image4 = document.getElementById("item4");
// var image5 = document.getElementById("item5");
// var image6 = document.getElementById("item6");
// var image7 = document.getElementById("item7");
// var image8 = document.getElementById("item8");
// var image9 = document.getElementById("item9");
// var image10 = document.getElementById("item10");
// var image11 = document.getElementById("item11");
// var image12 = document.getElementById("item12");
// var image13 = document.getElementById("item13");
// var image14 = document.getElementById("item14");
// var image15 = document.getElementById("item15");
// var image16 = document.getElementById("item16");
// var image17 = document.getElementById("item17");
// var image18 = document.getElementById("item18");
// var image19 = document.getElementById("item19");
// var image20 = document.getElementById("item20");


// profileItems = [];

//--------------------------------------------------------------------------
//Get all items by UserID
//--------------------------------------------------------------------------
// const homePageItemsUrl = '/api/item/homepageitems'
// const profilePageItemsUrl = '/api/item/byuserid/24'

// fetch(profilePageItemsUrl)
// .then(function (response) {
//     return response.json();
// })

// .then(function (data) {
//     console.log(data);
//     profileItems.push(data);

// }).then(function() {
//  getProfilePageItems();

// });

//--------------------------------------------------------------------------
//set the homepage images to the last 20 items posted
//--------------------------------------------------------------------------
// function getProfilePageItems() {

// image1.setAttribute('src', profileItems[0][0].image);
// image2.setAttribute('src', profileItems[0][1].image);
// image3.setAttribute('src', profileItems[0][2].image);
// image4.setAttribute('src', profileItems[0][3].image);
// image5.setAttribute('src', profileItems[0][4].image);
// image6.setAttribute('src', profileItems[0][5].image);
// image7.setAttribute('src', profileItems[0][6].image);
// image8.setAttribute('src', profileItems[0][7].image);
// image9.setAttribute('src', profileItems[0][8].image);
// image10.setAttribute('src', profileItems[0][9].image);
// image11.setAttribute('src', profileItems[0][10].image);
// image12.setAttribute('src', profileItems[0][11].image);
// image13.setAttribute('src', profileItems[0][12].image);
// image14.setAttribute('src', profileItems[0][13].image);
// image15.setAttribute('src', profileItems[0][14].image);
// image16.setAttribute('src', profileItems[0][15].image);
// image17.setAttribute('src', profileItems[0][16].image);
// image18.setAttribute('src', profileItems[0][17].image);
// image19.setAttribute('src', profileItems[0][18].image);
// image20.setAttribute('src', profileItems[0][19].image);
// }