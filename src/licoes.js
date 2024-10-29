const baralhos = JSON.parse(localStorage.getItem('baralhos')) || [];

// Função para obter 6 cards aleatórios
function obterSeisCardsAleatorios() {
    const todosCards = [];

    // Coleta todos os cards de todos os baralhos
    baralhos.forEach((baralho) => {
        if (baralho.cards && baralho.cards.length > 0) {
            todosCards.push(...baralho.cards);
        }
    });

    // Embaralha e seleciona os primeiros 6 cards
    const seisCards = todosCards.sort(() => 0.5 - Math.random()).slice(0, 6);
    return seisCards;
}

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


function renderizarCards() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    const guestCards = obterSeisCardsAleatorios();

    guestCards.forEach((card) => {
        const cardButton = document.createElement('button');
        cardButton.classList.add('card-button');
        cardButton.textContent = card.pergunta;

        // Exibe o modal com a resposta quando o card é clicado
        cardButton.addEventListener('click', () => {
            exibirResposta(card.resposta);
        });

        cardsContainer.appendChild(cardButton);
    });
}

renderizarCards();