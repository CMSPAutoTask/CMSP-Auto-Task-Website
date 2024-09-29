async function loginUser(event) {
    event.preventDefault();

    const apiUrl = 'https://mytask-sp.vercel.app/api/login';

    const user = document.getElementById('user').value;
    const pw = document.getElementById('senha').value;

    let requestBody = {
        user: user,
        pw: pw
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = '/autotask/dashboard';
        } else {
            const errorData = await response.json();
            alert('Erro: ' + errorData.message);
        }
    } catch (error) {
        alert('Erro ao realizar o login.');
    }
}
