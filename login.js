// login
const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (email && password) {
        
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        
        window.location.href = 'home.html';
    } else {
        alert('Please enter both email and password');
    }
});