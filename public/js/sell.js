var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');

var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dui0ghwal/upload';
var CLOUDINARY_UPLOAD_PRESET ='sadfpo8imru'


fileUpload.addEventListener('change', function(event) {
  // console.log(event);
    var file = event.target.files[0]
    // console.log(file);
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url:  CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res){
        console.log(res);
        imgPreview.src=res.data.secure_url; //This shows a display preview of the image
        
    }).catch(function(err){
        console.log(err);
    });


}); 

// ----------------------------------------------------------------------------------------------------------------------------------------------------
// POST (CREATE) Items when a user wants to add something (i.e. Michael Jordan RookieCard) to their collection upon clicking the submit button
// ---------------------------------------------------------------------------------------------------------------------------------------------------

const itemSubmitted = async function(event) {
	event.preventDefault();
	
	const userIdEl = document.getElementById('userId');
	const subCategoryIdEl = document.getElementById('subCategoryId');
	const autographedEl = document.getElementById("itemAutographed");
    const descriptionEl = document.getElementById("itemDescription");
    const playerNameEl = document.getElementById("playerName");
    // const playerSoundexEl = document.getElementById("playerSoundex");
    const teamIdEl= document.getElementById("teamId");
    const priceEl= document.getElementById("itemPrice");
    const imgPreview = document.getElementById('img-preview');
	
//This was used for the isoDate for dateListed (down below); however, we don't need to pass it anymore as it is defined in the api/item-routes.js
	// date = new Date();
	// year = date.getFullYear();
	// month = date.getMonth()+1;
	// dt = date.getDate();

	// if (dt < 10) {
	// dt = '0' + dt;
	// }

	// if (month < 10) {
	// month = '0' + month;
	// }

	// const isoDate = year + '-' + month + '-' + dt;

	const res = await fetch('/api/item', {
		method: 'POST',
		body: JSON.stringify({
                user_id: userIdEl.value,
                subCategory_id: 14,//subCategoryIdEl.checked, //will get from Omari's dropdown
                autographed: autographedEl.checked,
                description: descriptionEl.value,
                playerName: playerNameEl.value,
                // playerSoundex: "HARDCODED Test", don't need playerSoundex as it takes in from playerName
                team_id: 514, //teamIdEl.checked, //will get from Omari's dropdown
                price: priceEl.value,
                // dateListed: isoDate, //don't need dateListed(see line 51)
                image: imgPreview.src
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

document.getElementById('sellSubmitBtn').addEventListener('click', itemSubmitted);
