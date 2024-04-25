// IdntyAccMgmtServ.js

const users = {
    'Ayesha': 'password',
    'Bisma': 'password',
    'Zuria': 'password',
    'Kanwal': 'password'
};

document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'block';
});

const modal = document.getElementById('loginModal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users.hasOwnProperty(username) && users[username] === password) {
        document.getElementById('app').style.display = 'block';
        document.getElementById('storageTracker').style.display = 'block'; // Show storage tracker
        modal.style.display = 'none';
        document.getElementById('loginButton').textContent = 'Logout';
        document.getElementById('loginButton').removeEventListener('click', handleLogin);
        document.getElementById('loginButton').addEventListener('click', handleLogout);
        document.getElementById('welcomeMessage').textContent = 'Welcome ' + username;
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

function handleLogout() {
    document.getElementById('loginButton').textContent = 'Login';
    document.getElementById('loginButton').removeEventListener('click', handleLogout);
    document.getElementById('loginButton').addEventListener('click', handleLogin);
    document.getElementById('app').style.display = 'none';
    document.getElementById('storageTracker').style.display = 'none'; // Hide storage tracker
    document.getElementById('welcomeMessage').textContent = '';
}

function handleLogin() {
    document.getElementById('loginModal').style.display = 'block';
}
