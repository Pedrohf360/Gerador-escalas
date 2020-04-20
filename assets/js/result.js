escalas = [];
containerEscalasGeradas = '';

window.addEventListener('load', () => {
    this.escalas = JSON.parse(localStorage['escalas']);
    this.containerEscalasGeradas = document.getElementById('escalas-geradas');

    if (this.escalas && this.escalas.length > 0) {
        this.carregarEscalas();
    } else {
        let escalasVazio = document.createElement('p');
        escalasVazio.innerHTML = 'Nenhum valor foi encontrado';
        containerEscalasGeradas.appendChild(escalasVazio);
    }
});

function carregarEscalas() {

    var escala = {};

    for (let i = 0; i < this.escalas.length; i++) {

        escalaHTML = `<h3>Escala ${ i+1 }</h3>`;

        this.getKeys(this.escalas[i]).forEach(categ => {
            escalaHTML += `<div> <h4> ${ categ } </h4>`;

            this.escalas[i][categ].members.forEach(member => {
                escalaHTML += `<div> - ${ member }
           </div>`;
            });

            escala += `</div> <hr />`
        });

        let escalaElemento = document.createElement('div');

        escalaElemento.innerHTML = escalaHTML;

        containerEscalasGeradas.appendChild(escalaElemento);
    }
}

function getKeys(obj) {
    return Object.keys(obj);
}

function voltarPagina() {
    window.location.href = './form.html';
}

function abrirPaginaInicio() {
    window.location.href = '../index.html';
}