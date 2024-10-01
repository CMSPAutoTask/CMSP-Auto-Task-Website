document.addEventListener("DOMContentLoaded", () => {
    const resolverButtons = document.querySelectorAll('.resolver-btn');

    resolverButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardId = this.closest('.card').id;

            enviarIdParaApi(cardId);
        });
    });
});

function enviarIdParaApi(cardId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Você não está autenticado! Por favor, faça login.');
        return;
    }

    const senhaInput = document.querySelector('#senhaSED');
    const senha = senhaInput.value;

    if (!senha) {
        alert('Por favor, digite sua senha da SED.');
        return;
    }

    fetch(`https://mytask-sp.vercel.app/api/tasks/${cardId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        },
        body: JSON.stringify({ cardId: cardId, pw: senha }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
