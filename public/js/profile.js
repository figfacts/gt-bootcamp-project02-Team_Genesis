// -----------------------------------------------------------------------------
// Program:  profile.js
// Purpose:  
// Input:    <none>   
// -----------------------------------------------------------------------------
// Author:   Team Genesis
// Date:     May 22, 2021
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
var userImage1= document.getElementById("userimage1")
var itemByUserIdUrl = "/api/item/byuserid/24"

fetch(itemByUserIdUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
    return data[0].image
}).then(function (data){
    userImage1.setAttribute("src",data)
});
