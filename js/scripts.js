// Empty JS for your own code to be here

var fita = ''; //fita que vai ter o algoritmo lido
var matriz = []; //matriz da tabela de ação
var posicao = 1; //posição em que esta o simbolo na fita
var estado = 1; //estado em que vai ler na tabela de ação
var listaSimbolos = []; //lista de simbolos que estão na tabela de ação
var maxAcoes = 0;
var numAcoes = 0;
var parar = false;
var colunaAtual = 0;
var celula;
var ultimo = 0;

var teste = 0;

var exemplo;


function adcionarLinha(tabela) {
    var tabela2 = document.getElementById(tabela);
    var numeroDeColunas = tabela2.rows[0].cells.length;
    var linha = tabela2.insertRow(tabela2.rows.length);

    for (var i = 0; i < numeroDeColunas; i++) {
        var celula = linha.insertCell();
        celula.setAttribute('contenteditable', 'true');
    }

}


function adcionarCuluna(tabela) {
    var tabela2 = document.getElementById(tabela);
    for (var i = 0; i < tabela2.rows.length; i++) {
        var celula = tabela2.rows[i].insertCell(tabela2.rows[i].cells.length);
        celula.setAttribute('contenteditable', 'true');
        celula.innerHTML = '';
    }
}

function pegarMatriz(tabela) {
    var tabela2 = document.getElementById(tabela);
    var linhaTabela = tabela2.getElementsByTagName("tr");
    for (i = 0; i < linhaTabela.length; i++) {
        var celula = linhaTabela[i].getElementsByTagName("td");
        var linha = []
        for (j = 0; j < celula.length; j++) {
            linha.push(celula[j].innerText);
        }
        matriz.push(linha)
    }
    return matriz
}


function rodar(tabela) {

    parar = false
    inicializar(tabela);
    run();


}
function startPassoAPasso(tabela) {

    parar = false
    inicializar(tabela);

}


function inicializar(tabela) {

    matriz = []; //padrão []
    estado = 1; //padrão 1
    algoritmo = document.getElementById('algoritmo').value
    maxAcoes = document.getElementById('acoes').value

    fita = algoritmo;
    fita = transformarFita(fita);

    posicao = 1;
    celula = null;
    numAcoes = 0;
    ultimo = 0;

    matriz = pegarMatriz(tabela);

    pegarListaDeSimbolos();

    document.getElementById('resultado').textContent = '';



}


function constinuaPassoAPasso() {
    runPassoAPasso();
}

function runPassoAPasso() {

    // console.log("fita")
    // console.log(fita)
    // console.log("posiçao na fita: " + posicao)
    colunaAtual = null;
    colunaAtual = pegarPosicaoSimboloAtual();
    // console.log("posicao na coluna matriz: " + colunaAtual)
    // console.log("posicao na linha matriz: " + estado)

    if (colunaAtual == null || colunaAtual == undefined || colunaAtual == '' || colunaAtual == "") {
        alert("elemento lido '" + fita[posicao] + "' não foi encontrado na lista de simbolos");
        parar = true;
        return false;
    }
    estado = parseInt(estado, 10);
    celula = matriz[estado][colunaAtual];
    if (celula == null || celula == undefined || celula == '' || celula == "") {
        mostrarNaTelaFinal(fita);
        alert("A Celula lida está vazia. O programa foi finalizado");
        parar = true;
        return false;
    }
    celula = celula.split(';', 3);

    mostrarNaTela(fita, celula);

    fazerAcaoCelula(celula)


    numAcoes++;
    if (maxAcoes == numAcoes) {
        mostrarNaTelaFinal(fita);
        alert("Chegou ao numero maximo de ações '" + maxAcoes + "'. O programa foi finalizado")
        parar = true;
        return false;
    }

}
function run() {



    while (!parar == true) {


        runPassoAPasso();

    }

}

function mostrarNaTela(fita, celula) {

    var resultado = document.getElementById('resultado')
    var string = '';
    var div = document.createElement("div");

    for (var i = 0; i < fita.length; i++) {
        if (posicao == i) {
            var aux = "{" + fita[posicao] + "}";
            string = string + aux;
        } else {
            string = string + fita[i]
        }
    }

    div.innerHTML = "<p>Fita:&nbsp;" + string + "<br>Ação:&nbsp;" + numAcoes + " &nbsp;&nbsp;&nbsp;Estado Atual:&nbsp;" + estado + " &nbsp;&nbsp;&nbsp;Simbolo Atual:&nbsp;" + fita[posicao]
        + " &nbsp;&nbsp;&nbsp;Novo Estado:&nbsp;" + celula[0] + " &nbsp;&nbsp;&nbsp;Novo Simbolo:&nbsp;" + celula[1] + " &nbsp;&nbsp;&nbsp;Mover :&nbsp;" + celula[2] + "</p>";


    resultado.appendChild(div);
}

function mostrarNaTelaFinal(fita) {
    if (ultimo == 0) {

        var resultado = document.getElementById('resultado')
        var string = '';
        var div = document.createElement("div");

        for (var i = 0; i < fita.length; i++) {
            if (posicao == i) {
                var aux = "{" + fita[posicao] + "}";
                string = string + aux;
            } else {
                string = string + fita[i]
            }
        }



        div.innerHTML = "<p>Fita:&nbsp;" + string + "<br>Ação:&nbsp;" + numAcoes + " &nbsp;&nbsp;&nbsp;Estado Atual:&nbsp;" + estado + " &nbsp;&nbsp;&nbsp;Simbolo Atual:&nbsp;" + fita[posicao]
            + "</p>";
        resultado.appendChild(div);
    }
    ultimo++;



}



function fazerAcaoCelula(celula) {
    estado = celula[0];
    estado = parseInt(estado, 10);


    if (posicao == 0 && celula[1] != fita[posicao]) {
        fita = addInicio(fita);
        posicao++;
    } else if (posicao == (fita.length - 1) && celula[1] != fita[posicao]) {
        fita = addFinal(fita);
    }

    fita[posicao] = celula[1];

    if (celula[2] == "D") {
        posicao++;
    } else {
        posicao--;
    }

}

function transformarFita(fita) {
    fita = fita.split('');
    fita = addInicio(fita);
    fita = addFinal(fita);
    return fita;

}

function addInicio(fita) {
    array1 = ['_']
    fita = array1.concat(fita);
    return fita;

}

function addFinal(fita) {
    array1 = ['_']
    fita = fita.concat(array1)
    return fita;
}

function pegarListaDeSimbolos() {
    listaSimbolos = []
    for (var i = 0; i < matriz[0].length; i++) {
        listaSimbolos.push(matriz[0][i]);
    }
}

function pegarPosicaoSimboloAtual() {
    for (let i = 0; i <= listaSimbolos.length; i++) {
        if (listaSimbolos[i] == fita[posicao]) {
            return i;
        }
    }
    return null;
}



function escreverImput(idImput, valor) {
    document.getElementById(idImput).value = valor;
}

function escreverExemplo(exemplo) {
    document.getElementById('tadelaDeAcao').textContent = '';
    var aux = document.createElement("tbody");
    var tabela = document.getElementById('tadelaDeAcao');

    aux.innerHTML = exemplo;
    tabela.appendChild(aux);

}
function exemploSoma() {
    exemplo = "<tr> <td>#</td><td>*</td><td>_</td><td>&gt;</td></tr><tr><td>1</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'>2;&gt;;D</td></tr><tr><td contenteditable='true'>2</td><td contenteditable='true'>2;*;D</td><td contenteditable='true'>3;_;D</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>3</td><td contenteditable='true'><span style='background-color: rgba(0, 0, 0, 0.05);'>3;*;D</span></td><td contenteditable='true'>4;_;E</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>4</td><td contenteditable='true'><span style='background-color: rgb(255, 255, 255);'>5;_;E</span><br></td><td contenteditable='true'></td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>5</td><td contenteditable='true'>5;*;E</td><td contenteditable='true'>6;*;D</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>6</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td></tr>";
    escreverExemplo(exemplo);
    escreverImput("acoes", 100);
    escreverImput("algoritmo", ">***_***");
}
function exemploSub() {
    exemplo = "<tr> <td>#</td><td>*</td><td>_</td><td>&gt;</td></tr><tr><td>1</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'>2;&gt;;D</td></tr><tr><td contenteditable='true'>2</td><td contenteditable='true'>2;*;D</td><td contenteditable='true'>3;_;D</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>3</td><td contenteditable='true'><span style='background-color: rgba(0, 0, 0, 0.05);'>3;*;D</span></td><td contenteditable='true'>4;_;E</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>4</td><td contenteditable='true'><span style='background-color: rgb(255, 255, 255);'>5;_;E</span><br></td><td contenteditable='true'></td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>5</td><td contenteditable='true'>5;*;E</td><td contenteditable='true'>6;_;E</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>6</td><td contenteditable='true'>6;*;E</td><td contenteditable='true'></td><td contenteditable='true'>7;_;D</td></tr><tr><td contenteditable='true'>7</td><td contenteditable='true'>2;&gt;;D</td><td contenteditable='true'></td><td contenteditable='true'></td></tr>"
    escreverExemplo(exemplo);
    escreverImput("acoes", 500);
    escreverImput("algoritmo", ">***_**");
}
function exemploFrente() {
    exemplo = "<tr><td>#</td><td>*</td><td>_</td><td>&gt;</td></tr><tr><td>1</td><td contenteditable='true'>1;A;D</td><td contenteditable='true'>1;A;D</td><td contenteditable='true'>1;&gt;;D</td></tr>";
    escreverExemplo(exemplo);
    escreverImput("acoes", 50);
    escreverImput("algoritmo", ">***");
}
function exemploAtras() {
    exemplo = "<tr><td>#</td><td>*</td><td>_</td><td>&gt;</td></tr><tr><td>1</td><td contenteditable='true'>1;A;E</td><td contenteditable='true'>1;A;E</td><td contenteditable='true'>1;&gt;;E</td></tr>";
    escreverExemplo(exemplo);
    escreverImput("acoes", 50);
    escreverImput("algoritmo", ">***");
}
function exemploVaiEVolta() {
    exemplo = "<tr><td>#</td><td>*</td><td>_</td><td>&gt;</td><td contenteditable='true'>A</td><td contenteditable='true'></td></tr><tr><td>1</td><td contenteditable='true'>1;A;D</td><td contenteditable='true'>2;*;E</td><td contenteditable='true'>1;&gt;;D</td><td contenteditable='true'>1;A;D</td><td contenteditable='true'></td></tr><tr><td>2 </td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'>3;*;E</td><td contenteditable='true'>2;*;E</td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>3</td><td contenteditable='true'></td><td contenteditable='true'>4;&gt;;D</td><td contenteditable='true'><br></td><td contenteditable='true'></td><td contenteditable='true'></td></tr><tr><td contenteditable='true'>4</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td></tr>";
    escreverExemplo(exemplo);
    escreverImput("acoes", 100);
    escreverImput("algoritmo", ">****");
}

function exemploZerar() {
    exemplo = "<tr><td>#</td><td>*</td><td>_</td><td>&gt;</td></tr><tr><td>1</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td></tr>";
    escreverExemplo(exemplo);
    escreverImput("acoes", 100);
    escreverImput("algoritmo", ">****");
}


