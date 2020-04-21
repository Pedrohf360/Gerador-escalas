mostrarLimitePorCategoria = true;
usarUltEscalas = true;
quantEscalas = 1;
ultimasEscalas = [];

window.addEventListener('load', () => {
    this.carregarDadosHistorico();
    this.carregarHistoricoEscalas();
});

function carregarDadosHistorico() {
    limiteCategoria.checked = localStorage['mostrarLimite'] === 'true';
    usarUltimasEscalas.checked = localStorage['usarUltimasEscalas'] === 'true';
    quantidEscalas.value = localStorage['quantidEscalas'] ? localStorage['quantidEscalas'] : 1;

    if (isNaN(quantidEscalas.value) || quantidEscalas.value <= 0) {
        quantidEscalas.value = 1;
    }
}

function carregarHistoricoEscalas() {
    var historicoEscalas = JSON.parse(localStorage.getItem('historicoEscalas'));

    if (!historicoEscalas || (historicoEscalas && historicoEscalas.length === 0)) {
        return;
    }

    const titulo = document.getElementById('ultimas-escalas-titulo');
    titulo.innerHTML = 'Últimas escalas geradas';

    const historicoElement = document.getElementById('historico-escalas');
    historicoEscalas.forEach((hist, histIndex) => {
        const divLista = document.createElement('div');

        const titulo = document.createElement('h4');
        titulo.innerHTML = `Lista ${histIndex + 1}`;

        const quantidGeradas = document.createElement('p');
        quantidGeradas.innerHTML = 'Quantidade de Escalas: ' + hist.quantidadeEscalas;

        const criadoEm = document.createElement('span');
        criadoEm.innerHTML = 'Criado em: ' + new Date(hist.criadoEm).toLocaleDateString();

        divLista.appendChild(titulo);
        divLista.appendChild(quantidGeradas);
        divLista.appendChild(criadoEm);

        // historicoElement.appendChild(divLista);

        const escalasElement = getEscalasHTML(hist.escalasGeradas);

        divLista.appendChild(escalasElement);

        historicoElement.appendChild(divLista);
    });

}

function getEscalasHTML(escalas) {

    var escalaHTML;
    var containerEscalasGeradas = document.createElement('div');

    for (let i = 0; i < escalas.length; i++) {

        escalaHTML = `<h3>Escala ${ i+1 }</h3>`;

        this.getKeys(escalas[i]).forEach(categ => {
            escalaHTML += `<div> <h4> ${ categ } </h4>`;

            escalas[i][categ].members.forEach(member => {
                escalaHTML += `<div> - ${ member }
           </div>`;
            });

            escalaHTML += `</div>`
        });

        let escalaElemento = document.createElement('div');

        escalaElemento.innerHTML = escalaHTML;

        containerEscalasGeradas.appendChild(escalaElemento);
    }
    return containerEscalasGeradas;
}

function abrirForm() {
    this.mostrarLimitePorCategoria = limiteCategoria.checked;
    this.usarUltEscalas = usarUltimasEscalas.checked;
    this.quantEscalas = quantidEscalas.value;

    localStorage.setItem('mostrarLimite', mostrarLimitePorCategoria);
    localStorage.setItem('usarUltimasEscalas', usarUltEscalas);
    localStorage.setItem('quantidEscalas', quantEscalas);

    localStorage.setItem('membros', '');
    localStorage.setItem('categorias', '');
    window.location.href = "./pages/form.html";
}

function getKeys(obj) {
    return Object.keys(obj);
}