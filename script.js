const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

function register() {
    const user = document.getElementById('user').value;
    const pw = document.getElementById('pw').value;

    const url = `https://verbose-zebra-7vrq6vq7r9x43xwq5-5000.app.github.dev/api/register?user=${encodeURIComponent(user)}&pw=${encodeURIComponent(pw)}`;
    
    fetch(url, {
        method: 'GET', 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

registerBtn.addEventListener('click', () => {
    register();
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
