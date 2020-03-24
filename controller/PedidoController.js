/* segurança
// desabilita as teclas de atalho
if (document.addEventListener) {
  document.addEventListener("keydown", bloquearSource);
} else { //Versões antigas do IE
  document.attachEvent("onkeydown", bloquearSource);
}

function bloquearSource(e) {
  e = e || window.event;

  var code = e.which || e.keyCode;

  if (
      e.ctrlKey &&
      (code == 83 || code == 85 ||code == 17 ||code == 16 ||code == 73) //83 = S, 85 = U, Ctrl = 17
  ) {
      if (e.preventDefault) {
          e.preventDefault();
      } else {
          e.returnValue = false;
      }

      return false;
  }
}
//desabilita o botao direito
if (document.addEventListener) {
  document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      return false;
  });
} else { //Versões antigas do IE
  document.attachEvent("oncontextmenu", function(e) {
      e = e || window.event;
      e.returnValue = false;
      return false;
  });
}
*/
// adicionar ação ao clique no checkbox
var checkboxes = document.getElementsByName('Pacote');
for (let i = 0; i < checkboxes.length; i++) {
  // somente nome da função, sem executar com ()
  checkboxes[i].onclick = function () {
    getValues(this);

  }
};

var infoPedido = document.getElementById("InfoPedido");
var numeroPedido = document.getElementById("qtdPedido");
var alT = document.getElementById("alT");
if (numeroPedido.innerText === "") {
  infoPedido.hidden = true;
  alT.classList.remove("col-md-8");
  alT.classList.add("col-md-12");

} else {
  infoPedido.hidden = false;
}
var TotalRS;

// Arrays
var pedidosArray = [];
var descArray = [];
var precoArray = [];
var nomeArray = [];
var idPedido = [];

function getValues(elemento) {
  
  elementoID = elemento.id;
  
  // buscando os elementos no HTML
  var pedidoElement = document.getElementById(elemento.id);
  var descElement = document.getElementById(elemento.id + "D");
  var precoElement = document.getElementById(elemento.id + "P");
  var nomeElement = document.getElementById(elemento.id + 'N');

  if (elemento.checked) {
    pedidosArray.push(pedidoElement.value);
    descArray.push(descElement.innerText);
    precoArray.push(precoElement.innerText);
    nomeArray.push(nomeElement.innerText);
    idPedido.push(elemento.id);

  } else {
    
    checkOutZerado(elementoID);
  }
  // listar os pedidos feitos
  listaDePedidos(elementoID);
  // total da compra
  CalculoPedido();
  // mostrar a quantidade de pedidos
  var qtdPedido = idPedido.length;
  var qtd = document.getElementById("qtdPedido");
  var text = document.createTextNode(qtdPedido);
  qtd.innerHTML = "";
  qtd.appendChild(text);
  if (numeroPedido.innerText == 0) {
    infoPedido.hidden = true;
    alT.classList.remove("col-md-8");
    alT.classList.add("col-md-12");
  } else {
    infoPedido.hidden = false;
    alT.classList.remove("col-md-12");
    alT.classList.add("col-md-8");

  }
}

// Função de listar os pedidos feitos
function listaDePedidos(elementoID) {

  var pedidoElement = document.getElementById(elementoID);
  var descElement = document.getElementById(elementoID + "D");
  var precoElement = document.getElementById(elementoID + "P");
  var nomeElement = document.getElementById(elementoID + 'N');
  if (idPedido.length <= 0) {
    document.getElementById("listPedidos").innerHTML = "";
  }
  if (pedidoElement.checked) {

    // criando o LI
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between lh-condensed ");
    li.setAttribute("id", elementoID + "SeuPedido")
    // criando a div
    var div = document.createElement("div");
    // criando o H5
    var h5 = document.createElement("h5");
    // criando o H6
    var h6 = document.createElement("h6");
    h6.setAttribute("class", "my-0");
    // criando o small
    var small = document.createElement("small");
    small.setAttribute("class", "text-muted");
    // criando o span
    var span = document.createElement("span");
    span.setAttribute("class", " preco");
    // criando os buttons de + e -
    var buttonMais = document.createElement("button");
    var buttonMenos = document.createElement("button");
    buttonMenos.setAttribute("name", elementoID);
    buttonMais.setAttribute("name", elementoID);
    // appendchilds corretos
    listPedidos.appendChild(li);
    li.appendChild(div);
    div.appendChild(h5);
    div.appendChild(h6);
    div.appendChild(small);
    li.appendChild(span);
    li.appendChild(buttonMenos);
    li.appendChild(buttonMais);
    // texto dentro das tags

    var descricaoText = document.createTextNode(descElement.innerText);
    var nomeDoLancheText = document.createTextNode(nomeElement.innerText);
    var qtdMais = document.createTextNode("1 Pedido");

    var valorDoLancheText = document.createTextNode(precoElement.innerText);
    var sinaldeMais = document.createTextNode(" + ");
    var sinaldeMenos = document.createTextNode(" - ");
    // colocando os textos certo entre as tags
    h5.appendChild(qtdMais);
    h6.appendChild(nomeDoLancheText);
    span.appendChild(valorDoLancheText);
    small.appendChild(descricaoText);
    buttonMais.appendChild(sinaldeMais);
    buttonMenos.appendChild(sinaldeMenos);
    h5.setAttribute("id", elementoID + "+")
    buttonMenos.setAttribute("class", "btn btn-outline-info");
    buttonMais.setAttribute("class", "btn btn-outline-info");
    buttonMenos.style.marginRight = "10px";
    buttonMenos.style.height = "10%";
    buttonMais.style.height = "10%";
    buttonMais.style.boxShadow = "none";
    buttonMenos.style.boxShadow = "none";
    buttonMenos.onclick = function () {
      MenosPedidos(buttonMenos.name);
    }
    buttonMais.onclick = function () {
      MaisPedidos(buttonMais.name);
    }
  } else {

    if (document.getElementById(elementoID + "SeuPedido") !== null) {
      document.getElementById(elementoID + "SeuPedido").remove();

    } else {
      CalculoPedido();

    }

  }

}

// função de calculo de valor
function CalculoPedido() {
  var verifica = document.getElementById("Total");
  var valorTotal = pedidosArray.reduce(function (total, numero) {
    return total + parseInt(numero);
  }, 0);
  TotalRS = valorTotal;
  if (!verifica) {
    var divTotal = document.createElement("div");
    var divTotalRow = document.createElement("div");
    var spanTotal = document.createElement("span");
    var strongTotal = document.createElement("strong");

    // textos para aprensentar no total
    var reaisText = document.createTextNode("Total (BRL)");

    divTotal.setAttribute("class", "card p-2 list-group-item d-flex total");
    divTotalRow.setAttribute("class", "row");
    divTotal.setAttribute("id", "Total");
    strongTotal.setAttribute("id", "valor");
    divTotalRow.appendChild(divTotal);
    spanTotal.appendChild(reaisText);
    divTotal.appendChild(spanTotal);
    divTotal.appendChild(strongTotal);
    infoPedido.appendChild(divTotal);
  }
  var strongTotal = document.getElementById("valor");
  var TotalText = document.createTextNode("R$: " + valorTotal + ",00");
  strongTotal.innerHTML = "";
  strongTotal.appendChild(TotalText);



}

// adicionar mais um pedido 
function MaisPedidos(ID) {
  let pedidoElement = document.getElementById(ID);


  pedidosArray.push(pedidoElement.value);
  idPedido.push(ID);
  CalculoPedido();

  var text = document.createTextNode(qtdPedido);
  var qtdElement = document.getElementById(ID + "+");

  qtdElement.innerHTML = "";
  qtdElement.appendChild(text);
  var qtdPedido = idPedido.length;
  var qtd = document.getElementById("qtdPedido");
  var text = document.createTextNode(qtdPedido);
  qtd.innerHTML = "";
  qtd.appendChild(text);
  // atualiza a quantidade de pedidos
  var qtdPedido = 0;
  for (let index = 0; index < idPedido.length; index++) {
    if (idPedido[index] === ID) {
      qtdPedido++
    }
  }

  var text;
  var qtdElement = document.getElementById(ID + "+");

  if (qtd.innerHTML === "1") {
    qtdElement.innerHTML = "";
    text = document.createTextNode(qtdPedido + " Pedido");
    qtdElement.appendChild(text);
  } else {
    qtdElement.innerHTML = "";
    text = document.createTextNode(qtdPedido + " Pedidos");
    qtdElement.appendChild(text);
  }
}

// diminuir a quantidade do pedido
function MenosPedidos(ID) {
  var idPos = 0;
  idPos = idPedido.indexOf(ID);
  if (idPos >= 0) {
    descArray.splice(idPos, 1);
    pedidosArray.splice(idPos, 1);
    precoArray.splice(idPos, 1);
    nomeArray.splice(idPos, 1);
    idPedido.splice(idPos, 1);
  }

  CalculoPedido();

  var text = document.createTextNode(qtdPedido);
  var qtdElement = document.getElementById(ID + "+");

  qtdElement.innerHTML = "";
  qtdElement.appendChild(text);
  var qtdPedido = idPedido.length;
  var qtd = document.getElementById("qtdPedido");
  var text = document.createTextNode(qtdPedido);
  qtd.innerHTML = "";
  qtd.appendChild(text);
  // atualiza a quantidade de pedidos
  var qtdPedido = 0;
  for (let index = 0; index < idPedido.length; index++) {
    if (idPedido[index] === ID) {
      qtdPedido++
    }
  }

  var text;
  var qtdElement = document.getElementById(ID + "+");

  if (qtd.innerHTML === "1") {
    qtdElement.innerHTML = "";
    text = document.createTextNode(qtdPedido + " Pedido");
    qtdElement.appendChild(text);
  } else if (qtd.innerHTML === "0") {
    qtdElement.innerHTML = "";
    document.getElementById(ID + "SeuPedido").remove();

  } else {
    qtdElement.innerHTML = "";
    text = document.createTextNode(qtdPedido + " Pedidos");
    qtdElement.appendChild(text);
  }


  // verifica se zerou os produtos e remove a coluna
  if (TotalRS === 0) {
    document.getElementById(ID + "SeuPedido").remove();
  }
  // remove pedido zerado
  var pedidoZerado = document.getElementById(ID + "+");
  if (pedidoZerado) {
    if (pedidoZerado.innerHTML === "0 Pedidos" || pedidoZerado.innerHTML === null) {
      document.getElementById(ID + "SeuPedido").remove();

    }
  }


  if (numeroPedido.innerText == 0) {
    infoPedido.hidden = true;
    alT.classList.remove("col-md-8");
    alT.classList.add("col-md-12");
  } else {
    infoPedido.hidden = false;
    alT.classList.remove("col-md-12");
    alT.classList.add("col-md-8");
  }
}

function checkOutZerado(id) {
//--------------------------------------------
console.log(pedidosArray);
  let indice = idPedido.indexOf(id);

  while(indice >= 0){
    idPedido.splice(indice, 1);
    pedidosArray.splice(indice, 1);
    descArray.splice(indice, 1);
    precoArray.splice(indice, 1);
    nomeArray.splice(indice, 1);
    
    indice = idPedido.indexOf(id);
    console.log(idPedido);
  }
}

