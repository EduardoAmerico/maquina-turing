// Empty JS for your own code to be here

var fita = ''; //fita que vai ter o algoritmo lido
var matriz = []; //matriz da tabela de ação
var posicao = 1; //posição em que esta o simbolo na fita
var estado = 1; //estado em que vai ler na tabela de ação
var listaSimbolos = []; //lista de simbolos que estão na tabela de ação
var parar = false;

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
function run() {
    var celula;
    var colunaAtual = 0;
    var i = 0;
    posicao = 1;

    while (!parar == true) {
        // var interval = setInterval(function (){

        //     },10000)
        

        console.log("fita")
        console.log(fita)
        console.log("posiçao na fita: " + posicao)
        colunaAtual = null;
        colunaAtual = pegarPosicaoSimboloAtual();
        console.log("posicao na coluna matriz: " + colunaAtual)
        console.log("posicao na linha matriz: " + estado)

        mostrarNaTela(fita);

        if (colunaAtual == null || colunaAtual == undefined || colunaAtual == '' || colunaAtual == "") {
            alert("elemento lido '" + fita[posicao] + "' não foi encontrado na lista de simbolos");
            parar = true;
            break;
        }
        celula = matriz[estado][colunaAtual];
        if (celula == null || celula == undefined || celula == '' || celula == "") {
            alert("A Celula lida está vazia, o programa finalizou");
            parar = true;
            break;
        }
        celula = celula.split(';', 3);
        // console.log(celula);
        fazerAcaoCelula(celula)

        // i++;
        // if (i == 20) {
        //     parar = true;
        //     break;
        // }

        // console.log(fita)

        // parar = true;

    }

}

function mostrarNaTela(fita){

    var resultado = document.getElementById('resultado')
    var string = '';
    var div = document.createElement("div");
    for(var i = 0; i < fita.length; i++){
        if(posicao == i){
            var aux = "{" + fita[posicao] + "}";
            string = string + aux;
            console.log(string)
        }else{
            string = string + fita[i]
            console.log(string)
        }
    }

    console.log("final")
    console.log(string)
    div.innerHTML = "<p>Fita:&nbsp;" + string +" &nbsp;&nbsp;&nbsp;Estado Atual:&nbsp;"+ estado +"</p>";
    resultado.appendChild(div);
}


function fazerAcaoCelula(celula) {
    estado = celula[0];
 
    if (posicao == 0 && celula[1] != fita[posicao]) {
        fita = addInicio(fita);
        posicao++;
    } else if (posicao == fita.length && celula[2] == 'D') {
        fita = addFinal(fita);
    }
    fita[posicao] = celula[1];
    //     // console.log(fita)
    // }

    console.log(celula)
    if (celula[2] == "D") {
        posicao++;
    } else {
        posicao--;
    }

}

function inicializar(tabela) {
    console.log("Incicio")
    matriz = []; //padrão []
    estado = 1; //padrão 1
    algoritmo = document.getElementById('algoritmo').value
    fita = algoritmo;
    fita = transformarFita(fita);
    console.log(fita);
    matriz = pegarMatriz(tabela);
    console.log(matriz);
    pegarListaDeSimbolos();
    console.log(listaSimbolos);
    console.log("Fim Incicio")

    var teste =document.getElementById('resultado').textContent = '';
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



// function initiateArrays(value) {
//     var values = []
//     listRight = undefined
//     listLeft = []
//     values = Array.from(value)
//     //o programa sempre inicia com o simbolo inicial (>) na posicao zero
//     if (values[0] != '>') {
//         alert('Voce precisa iniciar com o simbolo inicial!')
//     } else {
//         listRight = values
//     }
// }