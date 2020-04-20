# whatsFood
um sistema para pedidos de lanche com encaminhamento direto para o whatsapp 

<html lang="pt-br">

<head>
</head>

<body >
    <div class="container">

        <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src="./assets/img/icone2.png" alt="" width="350" height="200">
            <h1>WhatsFood</h1>
            <h5>Seja bem vindo!</h5>
            <p class="lead"><b>Preencha o formulario a baixo:</b></p>
        </div>

        <div class="row py-5 text-center">

            <div class="col-md-12 order-md-1" id="alT">

                <form class="needs-validation" novalidate action="./controller/FinalizarPedido.php" method="POST">

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName"><strong>* Nome :</strong></label>
                            <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Digite seu nome" value="" required>
                            <div class="invalid-feedback">
                                Nome é Obrigatório!
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName"><strong>* Sobrenome :</strong></label>
                            <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Digite seu sobrenome" value="" required>
                            <div class="invalid-feedback">
                                Sobrenome é Obrigatório!
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="celular"><strong>* Celular :</strong></label>
                            <input type="tel" class="form-control" name="telefone" id="telefone" placeholder="(DD) XXXXX-XXXX" maxlength="15" required>
                            <div class="invalid-feedback">
                                Celular é Obrigatório!
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="ER"><strong>* Entrega ou retirada no local :</strong></label>

                            <select class="custom-select d-block w-100" name="ER" id="ER" required>
                                <option value="">Selecione</option>
                                <option value="entrega">Entrega</option>
                                <option value="retirada no local">Retirada no local</option>
                            </select>
                            <div class="invalid-feedback">
                                Por favor selecione a opção desejada!
                            </div>
                        </div>

                        <div class="col-md-12 mb-3" id="Maps" hidden>

                            <label for="address"><strong>* CEP :</strong></label>
                            <input type="tel" class="form-control" name="cep" id="cep" onkeypress="$(this).mask('00.000-000')" ontouchstart="$(this).mask('00.000-000')" placeholder="Digite apenas o seu cep! ex: 35271589">
                            <label for="address"><strong>* Rua :</strong></label>
                            <input value="" type="text" class="form-control" name="rua" id="rua" placeholder="Digite apenas o nome da sua rua! ex: Rua sao luiz">

                            <div class="invalid-feedback">
                                Por favor entre com o endereço pois é Obrigatório!
                            </div>

                            <label for="local"><strong>* Bairro :</strong></label>

                            <input class="form-control" type="text" readonly name="local" id="local">


                            <div class="invalid-feedback">
                                Por favor selecione a opção desejada!
                            </div>

                            <label for="complemento"><strong>Complemento :</strong></label>
                            <small class="text-muted">(opcional!)</small>
                            <textarea class="form-control" id="complemento" name="complemento" rows="3"></textarea>
                            <br><br>
                            <div id="boxGeolocal" class="row">
                                <div class="col-md-12 mb-3">
                                    <div class="col-md-6 mb-3">
                                        <label for="localizacao">
                                            Para que a entrega seja feita
                                            em sua residência
                                            permita o acesso a sua
                                            localização atual clicando
                                            no botão <b>LOCALIZAÇÃO</b>.
                                        </label>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <a id="localizacao" class="btn buttonElement  ">
                                            <span class="btn-label">
                                                <i class="fas fa-map-marked-alt"></i>
                                            </span>
                                            Localização
                                        </a>
                                        <br>
                                        <input class="form-control" name="latLong" id="latLong" type="text" hidden>
                                        <br>
                                        <div class="invalid-feedback">
                                            <h6>* Por favor permita o acesso a sua localização!</h6>
                                        </div>
                                    </div>
                                    <!-- alerta de Sucesso -->
                                    <div id="mapaAlertSuccess" class="alert alert-success fadeblock" role="alert" hidden>
                                        Sua <b>LOCALIZAÇÃO</b> foi compartilhada com sucesso!
                                    </div>
                                    <!-- alerta de error -->
                                    <div id="mapaAlertDanger" class="alert alert-danger fadeblock" role="alert" hidden>
                                        Sua <b>LOCALIZAÇÃO</b> não pode ser compartilhada!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <input type="text" id="lancheForm" name="lancheForm" hidden>
                    </div>
                    <hr class="mb-4">
                   
                            <div class="col-md-12 order-md-2 mb-4" id="InfoPedido">
                                <h4 class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="text-muted">Total de pedido(s)</span>
                                    <span class="badge badge-secondary badge-pill" id="qtdPedido"></span>
                                </h4>
                                <ul class="list-group mb-3" id="listPedidos">
                                </ul>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="ObsL"><strong>Qualquer observação
                                        sobre os lanches pode nos falar:</strong></label>
                                <small class="text-muted">(Fique atento a <b>descrição</b> dos lanches)!</small>
                                <textarea class="form-control" id="ObsL" name="ObsL" rows="4" placeholder="EX: 2 x-tudo, 1 sem bacon e sem calabresa e o outro completo..."></textarea>
                            </div>
                            <br>
                        </div>
                    </div>
                    <hr>
                    <br>
                    <div class="col-md-12 mb-3">
                        <div class="col-md-12 mb-3">
                            <label for="localizacao">
                                Se desejar receber Promoções basta clicar
                                no botão <b>NOTIFICAÇÃO</b>.
                            </label>
                        </div>
                        <div class="col-md-12 mb-3">
                            <input type="text" name="pushN" id="pushN" hidden>
                            <a id="notificacao" class=" sp_notify_prompt btn buttonElement">
                                <span class='btn-label'>
                                    <i class='fas fa-comment'></i>
                                </span>Ativar <b>Notificação</b>
                            </a>

                        </div>
                        <!-- alerta de Sucesso -->
                        <div id="notifyAlertSuccess" class="alert alert-success fadeblock" role="alert" hidden>
                            <b>NOTIFICAÇÃO</b> Permitita com sucesso!
                        </div>
                    </div>
                    <hr>
                    <br>
                    <hr class="mb-4">
                    <h4 class="mb-3 ">* Forma de pagamento:</h4>
                    <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input value="Credito" id="credito" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="credito">Crédito</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input value="Debito" id="debito" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="debito">Débito</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input value="Dinheiro" id="dinheiro" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="dinheiro">Dinheiro</label>
                        </div>
                    </div>
                    <div class=" input-group col-md-3 mb-3" id="boxtroco" hidden>
                        <label for="troco">Troco para quanto?</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">R$</span>
                            </div>
                            <input id="troco" name="troco" type="tel" class="form-control" onkeypress="$(this).mask('0#0.0#', {reverse: true})" ontouchstart="$(this).mask(' ##0.00', {reverse: true})">
                            <input type="text" name="calcTroco" id="calcTroco" hidden readonly>
                            <div class="invalid-feedback">
                                Por favor informe o valor!
                            </div>
                        </div>
                        <div id="TrocoDanger" class="alert alert-danger fadeblock" role="alert" hidden>
                            O <b>VALOR</b> informado é menor do que o valor total da compra!
                        </div>
                    </div>
                    <hr class="mb-4">
                    <h4 class="mb-3">* Escolheu seu lanche?</h4>
                    <div class="d-block my-3">

                        <div class="custom-control custom-radio">
                            <input value="sim" id="sim" name="radios" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="sim">Sim</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input value="nao" id="nao" name="radios" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="nao">Não</label>
                        </div>
                    </div>
                    <hr class="mb-4">
                    <br>
                    <button id="finalizar" class="btn btn-primary btn-lg btn-block" type="submit">Finalizar Pedido</button>
                </form>


            </div>
        </div>
        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2018-2020 WZSI</p>
            <ul class="list-inline">
                <li class="list-inline-item printd"><a href="#">Privacy</a></li>
                <li class="list-inline-item printd"><a href="#">Terms</a></li>
                <li class="list-inline-item printd"><a href="#">Support</a></li>
            </ul>
        </footer>
        <a href="#" class="scrollToTop"><i class="fas fa-arrow-circle-up"></i></a>
    </div>
</body>

</html>
