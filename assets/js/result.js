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

    var escalaHTML;

    for (let i = 0; i < this.escalas.length; i++) {

        escalaHTML = `<h3>Escala ${ i+1 }</h3>`;

        this.getKeys(this.escalas[i]).forEach(categ => {
            escalaHTML += `<div> <h4> ${ categ } </h4>`;

            this.escalas[i][categ].members.forEach(member => {
                escalaHTML += `<div> - ${ member }
           </div>`;
            });

            escalaHTML += `</div>`
        });

        let escalaElemento = document.createElement('div');

        escalaElemento.innerHTML = escalaHTML;

        containerEscalasGeradas.appendChild(escalaElemento);
    }
}

function getKeys(obj) {
    return Object.keys(obj);
}

function copiarEscalas() {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";

    var boxEscalas = document.getElementById('escalas-geradas');

    tempInput.value = boxEscalas.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert('Texto copiado com sucesso!');
}

function enviarWhatsapp() {
    window.open('https://web.whatsapp.com/', '_blank');
}

function voltarPagina() {
    window.location.href = './form.html';
}

function abrirPaginaInicio() {
    window.location.href = '../index.html';
}