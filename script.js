const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

async function sendPostRequest() {
    const url = 'https://verbose-zebra-7vrq6vq7r9x43xwq5-5000.app.github.dev/api/register';

    // Dados a serem enviados no corpo da requisição
    const data = {
        user: "exampleUser",
        pw: "examplePass"
    };

    // Configurações da requisição
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Inclui cookies automaticamente, incluindo o gerado pelo forwarder
    };

    try {
        // Envia a requisição
        const response = await fetch(url, options);

        // Lida com a resposta
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    sendPostRequest();
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
