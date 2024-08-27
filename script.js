function register() {
    const user = document.getElementById('user_reg').value;
    const pw = document.getElementById('pw_reg').value;

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

function login() {
    const user = document.getElementById('user_log').value;
    const pw = document.getElementById('pw_log').value;

    const url = `https://verbose-zebra-7vrq6vq7r9x43xwq5-5000.app.github.dev/api/login?user=${encodeURIComponent(user)}&pw=${encodeURIComponent(pw)}`;
    
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
