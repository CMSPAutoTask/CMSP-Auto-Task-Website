const container = document.getElementById('container');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const termsCheckBox = document.getElementById('terms');
const createAccountBtn = document.getElementById('createAccountBtn');
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("myBtn");
const modalSpan = document.getElementsByClassName("close")[0];

function submitForm(formId, action, apiUrl) {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcPKjMqAAAAACRFS-_zsvty2YIHUK0ylIY915wj', { action: action }).then(function(token) {
            const form = document.getElementById(formId);
            const userInput = document.getElementById(formId === 'registerForm' ? 'user_reg' : 'user_log');
            const pwInput = document.getElementById(formId === 'registerForm' ? 'pw_reg' : 'pw_log');
            const statusLabel = form.querySelector('.lblStatus');
            const loader = document.getElementById('loader');

            const user = userInput.value;
            const pw = pwInput.value;

            function showError() {
                statusLabel.innerHTML = 'Oops! Verifique os dados e tente novamente.';
                statusLabel.style.color = 'red';
                loader.style.display = 'none';
            }

            loader.style.display = 'block';
            statusLabel.innerHTML = '';

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
                loader.style.display = 'none';
                if (response.status === 200 || response.status === 201) {
                    userInput.value = '';
                    pwInput.value = '';
                    statusLabel.innerHTML = 'Sucesso! ;)';
                    statusLabel.style.color = 'green';
                } else {
                    showError();
                }
            })
            .catch(() => {
                showError();
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

modalBtn.onclick = function() {
    modal.style.display = "block";
    container.style.display = 'none';  
}

modalSpan.onclick = function() {
    modal.style.display = "none";
    container.style.display = 'block'; 
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        container.style.display = 'block'; 
    }
}
