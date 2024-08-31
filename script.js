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
                userInput.value = '';
                pwInput.value = '';
                statusLabel.innerHTML = 'Sucesso! ;)';
                statusLabel.style.color = 'green';
            })
            .catch((error) => {
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

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}

consoleText(['Hello World.', 'Console Text', 'Made with Love.'], 'text',['tomato','rebeccapurple','lightblue']);


