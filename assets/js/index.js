mostrarLimitePorCategoria = true;
usarUltEscalas = true;
quantEscalas = 1;
ultimasEscalas = [];

window.addEventListener('load', () => {
    this.carregarDadosHistorico();
});

function carregarDadosHistorico() {
    limiteCategoria.checked = localStorage['mostrarLimite'] === 'true';
    usarUltimasEscalas.checked = localStorage['usarUltimasEscalas'] === 'true';
    quantidEscalas.value = localStorage['quantidEscalas'];

    if (isNaN(quantidEscalas.value) || quantidEscalas.value <= 0) {
        quantidEscalas.value = 1;
    }
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

function carregarListaEscalasFromHistorico() {

}