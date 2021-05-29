var userImage1= document.getElementById("userimage1")


var itemByUserIdUrl = "http://localhost:3000/api/item/byuserid/24"

fetch(itemByUserIdUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
    // console.log(data[0].image)
    return data[0].image
}).then(function (data){
    userImage1.setAttribute("src",data)
});
