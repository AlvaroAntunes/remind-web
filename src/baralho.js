// Captura o nome do baralho a partir da URL
const params = new URLSearchParams(window.location.search);
const nomeBaralho = params.get('nome');
document.getElementById('baralho-nome').textContent = `Cards do baralho de ${nomeBaralho}`;

// Recupera o array de baralhos do localStorage
const baralhos = JSON.parse(localStorage.getItem('baralhos')) || [];

// Função para exibir o modal com a resposta
function exibirResposta(resposta) {
    const modal = document.getElementById('custom-modal');
    const modalText = document.getElementById('modal-text');
    modalText.textContent = resposta;
    modal.style.display = "block";
}

// Fecha o modal quando o usuário clica no "X"
document.getElementById('close-modal').onclick = function() {
    document.getElementById('custom-modal').style.display = "none";
};

// Fecha o modal ao clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('custom-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Função para renderizar os cards do baralho
function renderizarCards() {
    const baralho = baralhos.find(b => b.nome === nomeBaralho);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Limpa o conteúdo atual

    if (baralho) {
        baralho.cards.forEach((card) => {
            const cardButton = document.createElement('button');
            cardButton.classList.add('card-button');
            cardButton.textContent = card.pergunta;

            // Exibe o modal com a resposta quando o card é clicado
            cardButton.addEventListener('click', () => {
                exibirResposta(card.resposta);
            });

            cardsContainer.appendChild(cardButton);
        });
    } else {
        console.error("Baralho não encontrado.");
    }
}

// Função para voltar à página inicial
function voltar() {
    window.location.href = 'index.html';
}

// Função para abrir e fechar o modal
function abrirModal() {
    document.getElementById('modal-container').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-container').style.display = 'none';
    document.getElementById('pergunta-input').value = '';
    document.getElementById('resposta-input').value = '';
}

// Função para adicionar um novo card ao baralho
function adicionarNovoCard() {
    abrirModal();
}

// Evento para o botão "Confirmar" no modal
document.getElementById('modal-confirm-button').addEventListener('click', () => {
    const pergunta = document.getElementById('pergunta-input').value;
    const resposta = document.getElementById('resposta-input').value;
    const baralho = baralhos.find(b => b.nome === nomeBaralho);

    if (baralho && pergunta && resposta) {
        baralho.cards.push({ pergunta, resposta });
        localStorage.setItem('baralhos', JSON.stringify(baralhos)); // Salva no localStorage
        renderizarCards(); // Renderiza novamente para mostrar o novo card
        fecharModal();
    } else {
        alert("Por favor, preencha tanto a pergunta quanto a resposta.");
    }
});

// Evento para o botão "Cancelar" no modal
document.getElementById('modal-cancel-button').addEventListener('click', () => {
    fecharModal();
});

// Evento para o botão de adicionar card na interface
document.getElementById('add-card-button').addEventListener('click', adicionarNovoCard);

// Chama renderizarCards ao carregar a página
renderizarCards();