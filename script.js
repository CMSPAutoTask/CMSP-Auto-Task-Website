const container = document.getElementById('container');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const termsCheckBox = document.getElementById('terms');
const createAccountBtn = document.getElementById('createAccountBtn');
const accountRecovery = document.getElementById("accountRecovery");
const recoveryBtn = document.getElementById("recoveryBtn");
const recoverySpan = document.getElementsByClassName("close")[0];
const recoverPasswordBtn = document.getElementById('recoverPasswordBtn');

function submitForm(formId, action, apiUrl) {
    grecaptcha.ready(function() {
        grecaptcha.execute('6Lc-RUYqAAAAALF04Qflz7_edfkF265maP4NnT5a', { action: action }).then(function(token) {
            const form = document.getElementById(formId);
            const userInput = document.getElementById(formId === 'registerForm' ? 'user_reg' : 'user_log');
            const pwInput = document.getElementById(formId === 'registerForm' ? 'pw_reg' : 'pw_log');
            const statusLabel = form.querySelector('.lblStatus');
            const loader = document.getElementById('loader');

            const user = userInput.value;
            const pw = pwInput.value;

            let requestBody = {
                user: user,
                pw: pw,
                'g-recaptcha-response': token
            };

            if (formId === 'registerForm') {
                const secInput = document.getElementById('sec_reg');
                requestBody.sec = secInput.value;
            }

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
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                loader.style.display = 'none';
                if (response.ok) {
                    userInput.value = '';
                    pwInput.value = '';
                    if (formId === 'registerForm') {
                        const secInput = document.getElementById('sec_reg');
                        secInput.value = '';
                    }
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
    submitForm('registerForm', 'register', 'https://mytask-sp.vercel.app/api/register');
}

function login() {
    submitForm('loginForm', 'login', 'https://mytask-sp.vercel.app/api/login');
}

function recoverPassword() {
    grecaptcha.ready(function() {
        grecaptcha.execute('6Lc-RUYqAAAAALF04Qflz7_edfkF265maP4NnT5a', { action: 'recover_password' }).then(function(token) {
            const user = document.getElementById('raRecovery').value;
            const sec = document.getElementById('secretWord').value;

            let requestBody = {
                user: user,
                sec: sec,
                'g-recaptcha-response': token
            };

            fetch('https:///mytask-sp.vercel.app/api/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    alert("Sucesso! Crie uma nova conta usando seu RA com sua nova senha desejada. Seus dados e plano permancerão após a conta ser criada novamente.");
                } else {
                    alert("Usuário ou segredo inválido. Tente novamente.");
                }
            })
            .catch(() => {
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            });
        });
    });
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

recoveryBtn.onclick = function() {
    accountRecovery.style.display = "block";
    container.style.display = "none";  
}

recoverySpan.onclick = function() {
    accountRecovery.style.display = "none";
    container.style.display = "block"; 
}

recoverPasswordBtn.addEventListener('click', recoverPassword); 
