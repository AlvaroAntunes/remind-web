// Função para criar um novo baralho
function criarBaralho(nome) {
    return {
        nome: nome,
        cards: []
    };
}

// Função para adicionar um card a um baralho específico
function adicionarCard(baralho, pergunta, resposta) {
    const card = {
        pergunta: pergunta,
        resposta: resposta
    };
    baralho.cards.push(card);
}

// Array para armazenar os baralhos
const baralhos = [];

// Criando alguns baralhos
const baralhoSwiftUI = criarBaralho("SwiftUI");
const baralhoFisica = criarBaralho("Física II");
const baralhoMatematica = criarBaralho("Matemática");
const baralhoHistoria = criarBaralho("História");
const baralhoQuimica = criarBaralho("Química");
const baralhoProgramacao = criarBaralho("Programação");

// Adicionando cards ao baralho SwiftUI
adicionarCard(baralhoSwiftUI, "O que é SwiftUI?", "SwiftUI é uma framework declarativa para construir interfaces de usuário na Apple.");
adicionarCard(baralhoSwiftUI, "Como criar uma lista em SwiftUI?", "Use a estrutura List e passe uma coleção de itens para exibir.");
adicionarCard(baralhoSwiftUI, "Qual é o propósito do VStack?", "VStack organiza as views em uma coluna vertical.");

// Adicionando cards ao baralho Física II
adicionarCard(baralhoFisica, "O que é a Segunda Lei de Newton?", "A força resultante é igual ao produto da massa pela aceleração (F = ma).");
adicionarCard(baralhoFisica, "Qual a fórmula da velocidade média?", "A velocidade média é igual à razão entre o deslocamento e o tempo (v = d/t).");
adicionarCard(baralhoFisica, "O que é energia potencial?", "É a energia armazenada em um objeto devido à sua posição ou estado.");

// Adicionando cards ao baralho Matemática
adicionarCard(baralhoMatematica, "O que é uma derivada?", "A derivada representa a taxa de variação instantânea de uma função.");
adicionarCard(baralhoMatematica, "Qual é a fórmula da área de um círculo?", "A área de um círculo é π vezes o quadrado do raio (A = πr²).");
adicionarCard(baralhoMatematica, "O que é um número primo?", "Um número primo é aquele que só tem dois divisores: 1 e ele mesmo.");

// Adicionando cards ao baralho História
adicionarCard(baralhoHistoria, "Quando ocorreu a Revolução Francesa?", "A Revolução Francesa ocorreu em 1789.");
adicionarCard(baralhoHistoria, "Quem foi Napoleão Bonaparte?", "Napoleão foi um líder militar e imperador francês.");
adicionarCard(baralhoHistoria, "O que foi a Idade Média?", "Foi o período da história europeia entre os séculos V e XV.");

// Adicionando cards ao baralho Química
adicionarCard(baralhoQuimica, "O que é um átomo?", "Um átomo é a unidade básica da matéria.");
adicionarCard(baralhoQuimica, "Qual é a fórmula da água?", "A fórmula da água é H₂O.");
adicionarCard(baralhoQuimica, "O que é uma reação exotérmica?", "Uma reação exotérmica libera energia para o ambiente.");

// Adicionando cards ao baralho Programação
adicionarCard(baralhoProgramacao, "O que é uma variável?", "Uma variável é um espaço na memória que armazena dados.");
adicionarCard(baralhoProgramacao, "O que significa 'loop' em programação?", "Um loop é uma estrutura que repete um bloco de código.");
adicionarCard(baralhoProgramacao, "Qual é a função de um condicional 'if'?", "O condicional 'if' executa um bloco de código se uma condição for verdadeira.");

// Adicionando os baralhos ao array de baralhos
baralhos.push(baralhoSwiftUI, baralhoFisica, baralhoMatematica, baralhoHistoria, baralhoQuimica, baralhoProgramacao);


// Armazenar o array de baralhos no localStorage ao clicar em "Cards"
document.querySelector(".menu a[href='./cards.html']").addEventListener('click', () => {
    localStorage.setItem('baralhos', JSON.stringify(baralhos));
});

// Armazenar o array de baralhos no localStorage ao clicar em "Cards"
document.querySelector(".menu a[href='./licoes.html']").addEventListener('click', () => {
    localStorage.setItem('baralhos', JSON.stringify(baralhos));
});

// Função para verificar se a busca está contida no início do nome do baralho
function contemNaOrdemCorreta(baralhoNome, busca) {
    // Normaliza e remove acentos
    const normaliza = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };
    
    return normaliza(baralhoNome.toLowerCase()).startsWith(normaliza(busca.toLowerCase()));
}

// Função para renderizar todos os baralhos no HTML
function renderizarBaralhos(filtrar = '') {
    const baralhosContainer = document.getElementById('baralhos-container');
    baralhosContainer.innerHTML = '';

    const baralhosFiltrados = baralhos.filter(baralho =>
        contemNaOrdemCorreta(baralho.nome, filtrar)
    );

    baralhosFiltrados.forEach((baralho) => {
        const baralhoButton = document.createElement('button');
        baralhoButton.classList.add('baralho-button');
        baralhoButton.textContent = baralho.nome;

        baralhosContainer.appendChild(baralhoButton);

        // Redireciona para a página de cards do baralho ao clicar no botão do baralho
        baralhoButton.addEventListener('click', () => {
            localStorage.setItem('baralhos', JSON.stringify(baralhos));
            window.location.href = `baralho.html?nome=${encodeURIComponent(baralho.nome)}`;
        });
    });
}

// Adiciona o evento de input para a barra de pesquisa
document.getElementById('search-bar').addEventListener('input', (event) => {
    renderizarBaralhos(event.target.value);
});

// Função para abrir o modal
function abrirModal() {
    document.getElementById('modal-container').style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal-container').style.display = 'none';
    document.getElementById('modal-input').value = ''; // Limpar o campo de entrada
}

// Função para adicionar um novo baralho a partir do modal
function adicionarNovoBaralho() {
    abrirModal();
}

// Evento para o botão "Confirmar" no modal
document.getElementById('modal-confirm-button').addEventListener('click', () => {
    const nomeBaralho = document.getElementById('modal-input').value;
    if (nomeBaralho) {
        const novoBaralho = criarBaralho(nomeBaralho);
        baralhos.push(novoBaralho);
        renderizarBaralhos(); // Renderiza novamente para mostrar o novo baralho
        fecharModal();
    }
});

// Evento para o botão "Cancelar" no modal
document.getElementById('modal-cancel-button').addEventListener('click', () => {
    fecharModal();
});

// Evento para o botão de adicionar baralho na interface
document.getElementById('add-baralho-button').addEventListener('click', adicionarNovoBaralho);

// Chama a função para renderizar os baralhos ao carregar a página
renderizarBaralhos();