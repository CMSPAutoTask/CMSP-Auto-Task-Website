const container = document.getElementById('container');
const registerBtn = document.getElementById('registerBtn'); 
const loginBtn = document.getElementById('loginBtn');
const termsCheckBox = document.getElementById('terms');
const createAccountBtn = document.getElementById('createAccountBtn');

function register() {
    const user = document.getElementById('user_reg').value;
    const pw = document.getElementById('pw_reg').value;

    fetch('https://cmsp-auto-task.vercel.app/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            pw: pw
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Aqui você pode adicionar lógica para tratar a resposta, como redirecionar ou mostrar uma mensagem
    })
    .catch((error) => {
        console.error('Error:', error);
        // Aqui você pode adicionar lógica para tratar erros
    });
}

function login() {
    const user = document.getElementById('user_log').value;
    const pw = document.getElementById('pw_log').value;

    fetch('https://cmsp-auto-task.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            pw: pw
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Aqui você pode adicionar lógica para tratar a resposta, como redirecionar ou mostrar uma mensagem
    })
    .catch((error) => {
        console.error('Error:', error);
        // Aqui você pode adicionar lógica para tratar erros
    });
}

termsCheckBox.onchange = function() {
  createAccountBtn.disabled = !this.checked;
};

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
