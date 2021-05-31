const logOutBtn = document.getElementById('logoutBtn')
const profileBtn = document.getElementById('profileBtn')
const addItemBtn = document.getElementById('addItemBtn')
const homePage = document.getElementById('title')


//--------------------------------------------------------------------------
//HANDLE LOGOUT BUTTON
//--------------------------------------------------------------------------
logOutBtn.onclick = async function() {
	const res = await fetch('hbs/user/logout');
	if (res.redirected) window.location.href = res.url;
}

///Navigation Button

addItemBtn.addEventListener('click', function() {
    window.location.href = '/addItem'
  });
  
  profileBtn.addEventListener('click', function() {
    window.location.href = '/profile'
  });

homePage.addEventListener('click', function() {
    window.location.href = "/"
});