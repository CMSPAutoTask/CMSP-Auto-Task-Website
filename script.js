const container = document.getElementById('container');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const termsCheckBox = document.getElementById('terms');
const createAccountBtn = document.getElementById('createAccountBtn');

function submitForm(formId, action, apiUrl) {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcPKjMqAAAAACRFS-_zsvty2YIHUK0ylIY915wj', { action: action }).then(function(token) {
            const form = document.getElementById(formId);
            const userInput = document.getElementById(formId === 'registerForm' ? 'user_reg' : 'user_log');
            const pwInput = document.getElementById(formId === 'registerForm' ? 'pw_reg' : 'pw_log');
            const statusLabel = form.querySelector('.lblStatus');

            const user = userInput.value;
            const pw = pwInput.value;

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    pw: pw,
                    'g-recaptcha-response': token
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .then(data => {
                console.log('Success:', data);
                userInput.value = '';
                pwInput.value = '';
                statusLabel.innerHTML = 'Sucesso! ;)';
                statusLabel.style.color = 'green';
            })
            .catch((error) => {
                console.error('Error:', error);
                statusLabel.innerHTML = 'Oops! Verifique os dados e tente novamente.';
                statusLabel.style.color = 'red';
            });
        });
    });
}

function register() {
    submitForm('registerForm', 'register', 'https://cmsp-auto-task.vercel.app/api/register');
}

function login() {
    submitForm('loginForm', 'login', 'https://cmsp-auto-task.vercel.app/api/login');
}

function updateButtonState() {
  createAccountBtn.disabled = !termsCheckBox.checked;
}

termsCheckBox.onchange = updateButtonState;
updateButtonState();

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
