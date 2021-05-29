const handleSignUp = async function(event) {
	event.preventDefault();
	
	const firstNameEl = document.getElementById('firstName');
	const lastNameEl = document.getElementById('lastName');
	const emailAddressEl = document.getElementById('signUpEmail');
	const passwordEl = document.getElementById('signUpPassword');

	date = new Date();
	year = date.getFullYear();
	month = date.getMonth()+1;
	dt = date.getDate();

	if (dt < 10) {
	dt = '0' + dt;
	}

	if (month < 10) {
	month = '0' + month;
	}

	const isoDate = year + '-' + month + '-' + dt;

	const res = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({
			firstName: firstNameEl.value,
			lastName: lastNameEl.value,
			email: emailAddressEl.value,
			password: passwordEl.value,
			signUpDate: isoDate
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

document.getElementById('signUpForm').addEventListener('submit', handleSignUp);