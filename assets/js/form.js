isLinear = true;
members = [];
categorias = [];
pessoaPorCategoria = {};
escalas = [];
quantidEscalas = 1;
mostrarLimiteCategoria = true;
limiteDadosHistorico = 10;

window.addEventListener('load', () => {
    this.quantidEscalas = parseFloat(localStorage.getItem('quantidEscalas'));
    this.mostrarLimiteCategoria = localStorage['mostrarLimite'] === 'true' ? true : false;

    if (!this.quantidEscalas || this.quantidEscalas <= 0) {
        this.quantidEscalas = 1;
    }

    if (localStorage['membros']) {
        inputMembros.value = localStorage['membros'];
    }

    if (localStorage['categorias']) {
        var categoriasSalvas = [];

        try {
            categoriasSalvas = JSON.parse(localStorage['categorias']);
            // escala_categorias.innerHTML = '';

            if (!categoriasSalvas || (categoriasSalvas && categoriasSalvas.length === 0)) {
                this.addCategoria(c.nome, c.limite);
            } else {
                categoriasSalvas.forEach(c => {
                    this.addCategoria(c.nome, c.limite);
                });
            }
        } catch { }
    } else {
        this.addCategoria();
    }

    this.focusInput(null, 'inputMembros');
});

function initPessoasPorCateg(categorias) {
    this.pessoaPorCategoria = {};

    this.members = this.getSuffleArray(this.members);
    this.members.forEach(m => {
        categorias.forEach(categ => {
            if (!this.pessoaPorCategoria[m]) this.pessoaPorCategoria[m] = {};

            this.pessoaPorCategoria[m][categ.nome] = 0;
            this.pessoaPorCategoria[m].geral = 0;
        });
    });
}

function getEscala(categorias, members = []) {
    const escala = {};
    categorias.forEach(c => escala[c.nome] = { qtdLimite: !isNaN(parseFloat(c.limite)) && c.limite >= 1 ? c.limite : '', qtdAtual: 0, members: [] });

    return escala;
}

// function getLimiteCateg(qtdCategs, qtdMembros) {
//     return qtdMembros < qtdCategs? 1 : Math.round(qtdMembros / qtdCategs);
// }

function setCategorias() {
    var nomesCategorias = document.getElementsByClassName('nomeCategoria');
    var limitesCategorias = document.getElementsByClassName('limiteCategoria');

    for (let i = 0, arrSize = nomesCategorias.length; i < arrSize; i++) {
        if (!nomesCategorias[i].value) {
            continue;
        }
        var obj = {
            nome: nomesCategorias[i].value,
            limite: limitesCategorias[i] && limitesCategorias[i].value ? parseFloat(limitesCategorias[i].value) : ''
        };
        this.categorias.push(obj);
    }
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
}

function alocarPessoasPorCategoria() {
    this.members = [];

    localStorage.setItem('membros', inputMembros.value);
    const members = inputMembros.value.split('\n');
    members.forEach((m) => m ? this.members.push(m) : '');

    this.setCategorias();

    if (!this.members || (this.members && this.members.length <= 1)) {
        alert('É necessário informar no mínimo 2 membros para o sorteio!');
        return null;
    }

    if (!this.categorias || (this.categorias && this.categorias.length <= 1)) {
        alert('É necessário informar no mínimo 2 categorias para o sorteio!');
        return null;
    }

    this.initPessoasPorCateg(this.categorias);

    this.escalas = [];

    while (this.escalas.length < this.quantidEscalas) {
        let cont = 0;
        let categI = 0;
        const escala = this.getEscala(this.categorias, this.members);

        while (cont <= this.members.length && !this.escalaIsFull(escala)) {
            let categ = this.categorias[categI];

            if (escala[categ.nome].qtdLimite && escala[categ.nome].qtdAtual === escala[categ.nome].qtdLimite) {
                categI++;

                if (!escala[this.categorias[categI].nome]) {
                    categI = 0;
                }
                continue;
            }

            let smallerMember = this.getSmallerMemberByCateg(escala, categ.nome);
            if (!smallerMember) continue;

            if (this.existsInEscala(escala, smallerMember)) {
                continue;
            }
            escala[categ.nome].members.push(smallerMember);
            escala[categ.nome].qtdAtual++;
            this.pessoaPorCategoria[smallerMember][categ.nome]++;
            this.pessoaPorCategoria[smallerMember].geral++;
            cont++;

            if (!escala[categ.nome].qtdLimite) {
                if (categI === this.categorias.length - 1) {
                    categI = 0;
                } else if (categI < this.categorias.length - 1) {
                    categI++;
                }
            }

        }
        this.escalas.push(escala);
    }

    localStorage.setItem('escalas', JSON.stringify(this.escalas));
    addEscalasToHistorico(this.escalas);

    window.location.href = './result.html';
}

function addEscalasToHistorico(novaListaEscalas) {
    if (!novaListaEscalas) {
        return null;
    }

    let dados = {
        criadoEm: new Date(),
        quantidadeEscalas: this.quantidEscalas,
        escalasGeradas: []
    };

    dados.escalasGeradas = novaListaEscalas;
    try {
        var historicoEscalas = JSON.parse(localStorage.getItem('historicoEscalas'));

        if (historicoEscalas && historicoEscalas.length > 0) {
            historicoEscalas.push(dados);
            historicoEscalas.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
            historicoEscalas = historicoEscalas.slice(0, this.limiteDadosHistorico);
        } else {
            historicoEscalas = [dados];
        }
    } catch {
        historicoEscalas = [dados];
    }

    localStorage.setItem('historicoEscalas', JSON.stringify(historicoEscalas));
}

function getSmallerMemberByCateg(escala, categ) {
    let smallerMember = this.getStillNotSelectedMember(escala);
    if (!smallerMember) return;
    let smallerVal = this.pessoaPorCategoria[smallerMember][categ];

    this.members = this.getSuffleArray(this.members);
    this.members.forEach((m) => {
        if (this.pessoaPorCategoria[m][categ] < smallerVal && !this.existsInEscala(escala, m)) {
            smallerMember = m;
            smallerVal = this.pessoaPorCategoria[m][categ];
        }
    });

    return smallerMember;
}

function keysIt(obj) {
    return Object.keys(this.pessoaPorCategoria);
}

function stringifyIt(obj) {
    return JSON.stringify(obj);
}

function escalaIsFull(escala) {
    let totalMembers = 0;
    let result = true;
    this.categorias.forEach(c => {
        if (!escala[c.nome].qtdLimite || (escala[c.nome].qtdLimite && escala[c.nome].qtdLimite > escala[c.nome].qtdAtual)) {
            result = false
        }
        totalMembers += escala[c.nome].qtdAtual
    });

    if (totalMembers === this.members.length) {
        result = true;
    }
    return result;
}

function existsInEscala(escala, memberName, categ = null) {
    if (categ) {
        return escala[categ].members.includes(memberName);
    }
    return this.categorias.find(c => escala[c.nome].members.includes(memberName));
}

function getStillNotSelectedMember(escala) {
    for (let i = 0; i < this.members.length; i++) {
        const memberName = this.members[i];

        if (!this.existsInEscala(escala, memberName)) {
            return memberName;
        }
    }
}

function getSuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/** Foca em um elemento input.
 * Se for passado um nome de classe por parâmetro, foca no último elemento com esse nome.
 */
function focusInput(className = '', idName = '', timeOut = 10) {
    setTimeout(() => {
        if (className) {
            const inputs = document.getElementsByClassName(className);
            if (!inputs || (inputs && inputs.length === 0)) {
                return;
            }
            const lastInput = inputs[inputs.length - 1];
            lastInput.focus();
        } else if (idName) {
            const input = document.getElementById(idName);
            if (!input) {
                return;
            }
            input.focus();
        }
    }, timeOut);
}

function addCategoria(nomeCateg = '', limiteCateg = '') {
    var container = document.getElementById('escala_categorias');
    container.appendChild(document.createElement('br'));
    var auxDiv = document.createElement('div')

    var inputNomeCateg = this.createInput('text', 'nomeCategoria', 'nomeCategoria', 'Nome da Categoria');
    var inputLimiteCateg = this.createInput('text', 'limiteCategoria', 'limiteCategoria', 'Limite da Categoria');

    inputNomeCateg.value = nomeCateg;
    inputLimiteCateg.value = limiteCateg;

    auxDiv.appendChild(inputNomeCateg);

    if (this.mostrarLimiteCategoria) {
        auxDiv.appendChild(inputLimiteCateg);
    }

    container.appendChild(auxDiv);

    this.focusInput('nomeCategoria');
}

function createInput(tipo = 'text', nome = '', nomeClasse = '', placeholder = '') {
    var input = document.createElement('input');

    input.type = tipo;
    input.name = nome;
    input.className = nomeClasse;
    input.placeholder = placeholder;

    return input;
}

function voltarPagina() {
    window.location.href = '../index.html';
}