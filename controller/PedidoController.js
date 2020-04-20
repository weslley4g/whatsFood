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
    checkboxes[i].onclick = function() {
        getValues(this);

    }
};
var infoPedido = document.getElementById("InfoPedido");
var numeroPedido = document.getElementById("qtdPedido");
var alT = document.getElementById("alT");
if (numeroPedido.innerText === "") {
    infoPedido.hidden = true;
} else {
    infoPedido.hidden = false;
}
Number.prototype.toBrl = function() {
    return 'R$ ' + this.toFixed(2).replace('.', ',');
};
var TotalRS;
// Arrays
var pedidosArray = [];

var precoArray = [];
var nomeArray = [];
var idPedido = [];

function getValues(elemento) {
    PedidoViaPost();
    elementoID = elemento.id;

    // buscando os elementos no HTML
    var pedidoElement = document.getElementById(elemento.id);
    var precoElement = document.getElementById(elemento.id + "P");
    var nomeElement = document.getElementById(elemento.id + 'N');

    if (elemento.checked) {

        pedidosArray.push(pedidoElement.value);

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

    } else {
        infoPedido.hidden = false;


    }
}
// Função de listar os pedidos feitos
function listaDePedidos(elementoID) {
    PedidoViaPost();
    var pedidoElement = document.getElementById(elementoID);

    var precoElement = document.getElementById(elementoID + "P");
    var nomeElement = document.getElementById(elementoID + 'N');
    if (idPedido.length <= 0) {
        document.getElementById("listPedidos").innerHTML = "";
    }
    if (pedidoElement.checked) {

        // criando o LI
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        li.setAttribute("id", elementoID + "SeuPedido")
            // criando a div
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        div3.setAttribute("class", "alinhamento")
            // criando o H5
        var h5 = document.createElement("h5");
        // criando o H6
        var h6 = document.createElement("h6");

        // criando o small


        // criando o span


        // criando os buttons de + e -
        var buttonMais = document.createElement("a");
        var buttonMenos = document.createElement("a");
        buttonMenos.setAttribute("name", elementoID);
        buttonMais.setAttribute("name", elementoID);
        // appendchilds corretos
        listPedidos.appendChild(li);
        li.appendChild(div);
        div.appendChild(h5);
        div.appendChild(h6);



        div3.appendChild(buttonMenos);
        div3.appendChild(buttonMais);
        li.appendChild(div2);
        li.appendChild(div3);


        // texto dentro das tags


        var nomeDoLancheText = document.createTextNode(nomeElement.innerText);
        var qtdMais = document.createTextNode("1 Pedido");




        // colocando os textos certo entre as tags
        h5.appendChild(qtdMais);
        h6.appendChild(nomeDoLancheText);



        h5.setAttribute("id", elementoID + "+")
        buttonMenos.setAttribute("class", "btn maisemenos");

        buttonMais.setAttribute("class", "btn maisemenos");

        buttonMenos.style.marginRight = "10px";
        buttonMenos.style.height = "30px";
        buttonMais.style.height = "30px";
        buttonMenos.style.fontSize = "12px";
        buttonMais.style.fontSize = "12px";
        buttonMais.innerHTML = "<i class='fas fa-plus'></i>"
        buttonMenos.innerHTML = "<i class='fas fa-minus'></i>"


        buttonMenos.onclick = function() {
            MenosPedidos(buttonMenos.name);
        }
        buttonMais.onclick = function() {
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
    PedidoViaPost();
    var verifica = document.getElementById("Total");
    var valorTotal = pedidosArray.reduce(function(total, numero) {
        return total + parseFloat(numero);
    }, 0);
    TotalRS = valorTotal;
    if (!verifica) {
        var divTotal = document.createElement("div");
        var divTotalRow = document.createElement("div");
        var spanTotal = document.createElement("span");
        var strongTotal = document.createElement("strong");
        var strongTotal2 = document.createElement("strong");

        // textos para aprensentar no total
        var reaisText = document.createTextNode("Total (BRL)");

        divTotal.setAttribute("class", "card p-2 list-group-item d-flex total");
        divTotalRow.setAttribute("class", "row");
        divTotal.setAttribute("id", "Total");
        strongTotal.setAttribute("id", "valor");
        divTotalRow.appendChild(divTotal);
        strongTotal2.appendChild(reaisText);
        spanTotal.appendChild(strongTotal2);
        divTotal.appendChild(spanTotal);
        divTotal.appendChild(strongTotal);
        infoPedido.appendChild(divTotal);
    }
    var strongTotal = document.getElementById("valor");
    var TotalText = document.createTextNode(parseFloat(valorTotal).toBrl());
    strongTotal.innerHTML = "";
    strongTotal.appendChild(TotalText);
    PedidoViaPost();

}
// adicionar mais um pedido 
function MaisPedidos(ID) {
    PedidoViaPost();
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
    PedidoViaPost();
    var idPos = 0;
    idPos = idPedido.indexOf(ID);
    if (idPos >= 0) {

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
        var checkboxesT = document.getElementsByName('Pacote');
        for (let i = 0; i < checkboxesT.length; i++) {
            // somente nome da função, sem executar com ()
            if (checkboxesT[i].checked) {
                checkboxesT[i].click();
            }

        }
    }



    // remove pedido zerado
    if (qtdElement.innerHTML == "0 Pedidos" ||
        qtdElement.innerHTML == "0 Pedido" ||
        qtdElement.innerHTML === null) {
        var desclicar = document.getElementById(ID);
        desclicar.click();


    }



    if (numeroPedido.innerText == 0) {
        infoPedido.hidden = true;

    } else {
        infoPedido.hidden = false;

    }

}
// observar quando não ha nenhum lanche clicado e esvaziar a lista de pedidos
function checkOutZerado(id) {
    //--------------------------------------------
    let indice = idPedido.indexOf(id);

    while (indice >= 0) {
        idPedido.splice(indice, 1);
        pedidosArray.splice(indice, 1);

        precoArray.splice(indice, 1);
        nomeArray.splice(indice, 1);
        indice = idPedido.indexOf(id);
    }
    //--------------------------------------------
}
// ajudar o usuario mais leigo a escolher seu lanche
var rad = document.getElementsByName('radios');
for (var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        simounao(this);
    }
};

function simounao(e) {
    if (e.value === "sim") {
        var verdade = nomeArray.length;
        if (verdade > 0) {
            PedidoViaPost();
        } else {
            alert("Você não escolheu um lanche. É bem simples," +
                " selecione seu pedido clicando na imagem dele.");
            e.checked = false;
        }
    } else {

        alert("Você não escolheu um lanche? " +
            " É bem simples, selecione seu pedido" +
            " clicando na imagem dele.");
        e.checked = false;
    }
}
// enviando a lista de pedidos para o post do formulario no input lancheForm
function PedidoViaPost() {

    boxChecked = document.getElementById("listPedidos");

    valor = parseFloat(TotalRS).toBrl();

    // console.log(boxChecked.children);
    var cont = idPedido.length;
    if (cont > 0) {
        var N = "";
        for (let i = 0; i < cont; i++) {
            if (boxChecked.children[i]) {
                var Q = boxChecked.children[i].children[0].children[0].innerHTML;
                var Name = boxChecked.children[i].children[0].children[1].innerHTML;
                var preco = boxChecked.children[i].children[1].innerText;


                N = N + "%0A " + Q + " " + Name + " " + preco;
            }
        }
        // var Total = boxChecked.children[0].children[0].children[0].innerHTML;
        var tudo = N + "%0A *TOTAL DE: " + valor + "*";

        var lancheForm = document.getElementById('lancheForm');
        lancheForm.value = tudo

    }
}
// habilitando aba de entrega no formulario caso o usuario escolha a opção entrega
document.getElementById("ER").onchange = function() {
    Entrega();
}

function Entrega() {
    var select = document.getElementById('ER');
    var value = select.options[select.selectedIndex].value;
    if (value === "" || value === "retirada no local") {
        document.getElementById("Maps").hidden = true;
        document.getElementById("rua").removeAttribute("required", "");
        document.getElementById("cep").removeAttribute("required", "");

        document.getElementById("local").removeAttribute("required", "");
        document.getElementById("latLong").removeAttribute("required", "");

    } else {
        document.getElementById("Maps").hidden = false;
        document.getElementById("rua").setAttribute("required", "");
        document.getElementById("cep").setAttribute("required", "");

        document.getElementById("local").setAttribute("required", "");
        document.getElementById("latLong").setAttribute("required", "");
    }
}
// obtendo a informação se o pagamento sera em dinheiro e habilitando campo de troco
var pagamento = document.getElementsByName('paymentMethod');
for (var i = 0; i < pagamento.length; i++) {
    pagamento[i].onclick = function() {
        Troco(this);
    }
};

function Troco(e) {
    if (e.value === "Dinheiro") {
        document.getElementById("boxtroco").hidden = false;
        document.getElementById("troco").setAttribute("required", "");
    } else {
        document.getElementById("boxtroco").hidden = true;
    }
}

document.getElementById("troco").focusout = function() {
    var valorDeTroco = this.value.replace("R$ ", '');
    valorDeTroco = parseFloat(valorDeTroco);
    troco = valorDeTroco - TotalRS;
    troco = parseFloat(troco).toBrl()
    troco = "%0A *CALCULO DE TROCO:*%0A Valor a ser pago pelo cliente *" +
        parseFloat(valorDeTroco).toBrl() +
        "* menos o valor total da compra: *" +
        parseFloat(TotalRS).toBrl() +
        "* %0A *TROCO DE " +
        troco + "*";
    if (valorDeTroco < TotalRS) {
        document.getElementById("troco").value = "";

        document.getElementById("TrocoDanger").hidden = false;

        setTimeout(() => {
            document.getElementById("TrocoDanger").classList.remove("fadeblock");
            document.getElementById("TrocoDanger").classList.toggle('fadeIn');
        }, 200);

    } else {
        document.getElementById("TrocoDanger").hidden = true;
        setTimeout(() => {
            document.getElementById("TrocoDanger").classList.remove("fadeIn");
            document.getElementById("TrocoDanger").classList.toggle('fadeblock');
        }, 200);
    }
    document.getElementById("calcTroco").value = troco;


}


document.getElementById("boxGeolocal").onclick = function() {
    geoLocal();
}

function geoLocal() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000000,
        maximumAge: 6
    };

    function success(pos) {
        var crd = pos.coords;

        console.log(crd.latitude)
        console.log(crd.longitude)
        console.log(crd.accuracy)

        lat = crd.latitude;
        long = crd.longitude;
        metros = crd.accuracy;
        latlon = lat + " " + long;
        document.getElementById("latLong").value = latlon;
        document.getElementById("mapaAlertSuccess").hidden = false;

        setTimeout(() => {
            document.getElementById("mapaAlertSuccess").classList.remove("fadeblock");
            document.getElementById("mapaAlertSuccess").classList.toggle('fadeIn');
        }, 200);


    };

    function error(err) {
        document.getElementById("mapaAlertDanger").hidden = false;

        setTimeout(() => {
            document.getElementById("mapaAlertDanger").classList.remove("fadeblock");
            document.getElementById("mapaAlertDanger").classList.toggle('fadeIn');
        }, 200);



    };

    navigator.geolocation.getCurrentPosition(success, error, options);
}

var coll = document.getElementsByClassName("coll");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


// push notifications
var applicationServerPublicKey = 'BM-kZZpQOxtBSUCss9oNv7BfDPO3KMXoXgX-EFb5hb_TYROZ5XqWB0R9I2Dx5ZN3c39KFlk8tkWDa-cwAT_KOWY';
const pushButton = document.getElementById("notificacao");
let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
            swRegistration = swReg;
            initialiseUI();
        })
        .catch(function(error) {
            console.log(error)
        });
} else {
    alert('Push messaging is not supported');
    pushButton.innerHTML =
        " <span class='btn-label'>" +
        "<i class='fas fa-comment-slash'></i>" +
        "</span>Notificação <b>NÃO SUPORTADA</b>";
}

function initialiseUI() {
    pushButton.addEventListener('click', function() {

        pushButton.disabled = true;
        if (isSubscribed) {
            unsubscribeUser();
        } else {
            unsubscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            isSubscribed = !(subscription === null);
            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }
            updateBtn();
        });
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function(error) {
            console.log('Error unsubscribing', error);
        })
        .then(function() {
            isSubscribed = false;

            updateBtn();

        });
}

function updateBtn() {
    if (Notification.permission === 'denied') {
        pushButton.innerHTML = " <span class='btn-label'>" +
            "<i class='fas fa-comment-slash'></i></span>Notificação <b>Bloqueada</b>";

        pushButton.disabled = true;
        pushButton.classList.remove("buttonElement");
        pushButton.classList.add("buttonBlock");
        pushButton.style.opacity = 0.5;
        pushButton.style.touchAction = 'none';

        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.innerHTML = " <span class='btn-label'>" +
            "<i class='fas fa-comment'></i></span><b> Notificação</b> Ativada";
        document.getElementById("notifyAlertSuccess").hidden = false;

        setTimeout(() => {
            document.getElementById("notifyAlertSuccess").classList.remove("fadeblock");
            document.getElementById("notifyAlertSuccess").classList.toggle('fadeIn');
        }, 200);
    } else {
        pushButton.innerHTML = " <span class='btn-label'>" +
            "<i class='fas fa-comment'></i></span> Permitir <b>Notificação</b>";

    }
    pushButton.disabled = false;
}

// function updateSubscriptionOnServer(subscription) {
//     // TODO: Send subscription to application server
//     if (subscription) {
//         document.getElementById("pushN").value = subscription;

//     } else {

//     }
// }