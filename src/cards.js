const baralhos = JSON.parse(localStorage.getItem('baralhos')) || [];

// Função para verificar se a busca está contida no início da pergunta do card
function contemNaOrdemCorreta(pergunta, busca) {
    // Normaliza e remove acentos
    const normaliza = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };
    
    return normaliza(pergunta.toLowerCase()).startsWith(normaliza(busca.toLowerCase()));
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

// Função para renderizar todos os cards no HTML
function renderizarCards(filtrar = '') {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    baralhos.forEach((baralho) => {
        const cardsFiltrados = baralho.cards.filter(card =>
            card && card.pergunta && contemNaOrdemCorreta(card.pergunta, filtrar)
        );
        cardsFiltrados.forEach((card) => {
            const cardButton = document.createElement('button');
            cardButton.classList.add('card-button');
            cardButton.textContent = card.pergunta;

            // Exibe o modal com a resposta quando o card é clicado
            cardButton.addEventListener('click', () => {
                exibirResposta(card.resposta);
            });

            cardsContainer.appendChild(cardButton);
        });
    });
}

// Chama a função para renderizar os cards ao carregar a página
renderizarCards();

// Adiciona um evento para a barra de busca
document.getElementById('search-bar').addEventListener('input', (event) => {
    const busca = event.target.value; // Obtém o valor atual da barra de busca
    renderizarCards(busca); // Chama renderizarCards com o valor da busca
});
