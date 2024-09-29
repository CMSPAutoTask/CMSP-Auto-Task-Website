async function registerUser(event) {
    event.preventDefault();

    const apiUrl = 'https://mytask-sp.vercel.app/api/register';

    const user = document.getElementById('user').value;
    const pw = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const palavraSecreta = document.getElementById('palavra-secreta').value;
    const convite = document.getElementById('convite').value;

    if (pw !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    let requestBody = {
        user: user,
        pw: pw,
        secret: palavraSecreta,
        invite: convite
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
            alert('Usuário registrado com sucesso!');
        } else {
            const errorData = await response.json();
            alert('Erro: ' + errorData.message);
        }
    } catch (error) {
        alert('Erro ao registrar o usuário.');
    }
}
