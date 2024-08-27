const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

function register() {
    const user = document.getElementById('user_reg').value;
    const pw = document.getElementById('pw_reg').value;

    const url = `https://verbose-zebra-7vrq6vq7r9x43xwq5-5000.app.github.dev/api/register?user=${encodeURIComponent(user)}&pw=${encodeURIComponent(pw)}`;
    
    window.location.href = url;
}

function login() {
    const user = document.getElementById('user_log').value;
    const pw = document.getElementById('pw_log').value;

    const url = `https://verbose-zebra-7vrq6vq7r9x43xwq5-5000.app.github.dev/api/login?user=${encodeURIComponent(user)}&pw=${encodeURIComponent(pw)}`;
    
    window.location.href = url;
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
