// login.js
const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email and password
    if (email && password) {
        // Save credentials in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Redirect to home page
        window.location.href = 'home.html';
    } else {
        alert('Please enter both email and password');
    }
});