const handleLogin = async function(event) {
	event.preventDefault();

	const emailEl = document.getElementById('email');
	const passwordEl = document.getElementById('password');

	const res = await fetch('/api/user/login', {
		method: 'POST',
		// redirect: 'follow',
		
		body: JSON.stringify({
			email: emailEl.value,
			password: passwordEl.value
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (res.redirected) window.location.href = res.url;
}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
