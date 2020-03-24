<?php

$products = [
    [
        "id" => "1",
        "nome" => "Combo 1.0",
        "desc" => "descricao lanche 1",
        "valor" => 15.00,
        "img" => "./assets/img/hamburguerbatata.png"
    ],
    [
        "id" => "2",
        "nome" => "Artesanal monstro",
        "desc" => " 1 hamburguer artesanal completo, pão alface ovo ...",
        "valor" => 20.00,
        "img" => "./assets/img/artesanal.png"
    ],
    [
        "id" => "3",
        "nome" => "X-FOME!",
        "desc" => "1 X-tudo duplo completo, pão alface ovo ...",
        "valor" => 20.00,
        "img" => "./assets/img/duploxtudo.png"
    ],
    [
        "id" => "4",
        "nome" => "Devastador",
        "desc" => "DEvastador tem tudo em multiplicação por 4..",
        "valor" => 30.00,
        "img" => "./assets/img/lanche.png"
    ],
    [
        "id" => "5",
        "nome" => "Coca-Cola",
        "desc" => "1 coca lata 250ml.",
        "valor" => 6.00,
        "img" => "./assets/img/cocalata.png"
    ],
];

//var_dump($products);

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="WhatsFood">
    <meta name="author" content="weslley">
    <meta property="og:image" content="https://pbs.twimg.com/profile_images/564976605479460865/6ZgfAF6b.png">

    <script type="text/javascript" nonce="c8b10c42db9444bb942ef6d30d0" src="//local.adguard.org?ts=1580265532925&amp;type=content-script&amp;dmn=getbootstrap.com&amp;css=1&amp;js=1&amp;gcss=1&amp;rel=1&amp;rji=1&amp;stealth=1&amp;uag="></script>
    <script type="text/javascript" nonce="c8b10c42db9444bb942ef6d30d0" src="//local.adguard.org?ts=1580265532925&amp;name=AdGuard%20Popup%20Blocker&amp;name=AdGuard%20Extra&amp;type=user-script"></script>
    <link rel="icon" href="./assets/img/whatsfood.png">

    <title>WhatsFood</title>

    <link rel="canonical" href="https://weslleymendes.com.br/whatsFood">

    <!-- Bootstrap core CSS -->
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./form-validation.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">
</head>

<body class="bg-light">

    <div class="container">
        <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src="./assets/img/icone2.png" alt="" width="350" height="200">
            <h2>WhatsFood</h2>
            <p class="lead">Para melhor lhe atender preencha o formulario a baixo: </p>
        </div>

        <div class="row">
            <div class="col-md-4 order-md-2 mb-4" id="InfoPedido">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Total de pedido(s)</span>
                    <span class="badge badge-secondary badge-pill" id="qtdPedido"></span>
                </h4>
                <ul class="list-group mb-3" id="listPedidos">
                </ul>
            </div>
            <div class="col-md-8 order-md-1" id="alT">
                <h4 class="mb-3">Preencha o formulário </h4>
                <form class="needs-validation" novalidate action="#" method="POST">
                  
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">Nome</label>
                            <input type="text" class="form-control" id="firstName" placeholder="Digite seu nome"
                                value="" required>
                            <div class="invalid-feedback">
                                Nome é Obrigatório!
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Sobrenome</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Digite seu sobrenome"
                                value="" required>
                            <div class="invalid-feedback">
                                Sobrenome é Obrigatório!
                            </div>
                        </div>
                    </div>
                    <div class=" mb-3">
                        <label for="celular">Celular</label>
                        <input type="text" class="form-control" id="telefone" placeholder="(DDD) 9XXXX-XXXX" value=""
                            required maxlength="15">
                        <div class="invalid-feedback">
                            Celular é Obrigatório!
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address">Endereço</label>
                        <input type="text" class="form-control" id="address"
                            placeholder="Rua, bairro, lote, quadra e ponto de referência" required>
                        <div class="invalid-feedback">
                            Por favor entre com o endereço pois é Obrigatório!
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Entrega ou retirada no local:</label>

                            <select class="custom-select d-block w-100" id="country" required>
                                <option value="">Selecione</option>
                                <option value="entrega">Entrega</option>
                                <option value="retirada">Retirada no local</option>
                            </select>
                            <div class="invalid-feedback">
                                Por favor selecione a opção desejada!
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-md-12 mb-3">
                            <label for="local"><b>Bairros e taxas de entrega:</b></label>
                            <small class="text-muted">(Informe sua localidade para o calculo da taxa de
                                entrega!)</small>
                            <select class="custom-select d-block w-100" id="country" required>
                                <option value="">Selecione</option>
                                <option value="pqp">Parque Paulista</option>
                                <option value="newcamp">Nova Campinas</option>
                                <option value="sts">Santa Cruz da Serra</option>
                            </select>
                            <div class="invalid-feedback">
                                Por favor selecione a opção desejada!
                            </div>
                        </div>
                    </div>
                
                    <hr class="mb-4">
                    <div class="row box">
                        <div class="album py-12 bg-light text-center" id="lanchecheck">
                            <ul class="col-md-12 ">
                                <?php
                                foreach ($products as $key => $value) {

                                ?>
                                    <li>
                                        <div class="col-md-12">
                                            <input type="checkbox"  name="Pacote" id="cb<?php echo $products[$key]['id']; ?>" value="<?php echo $products[$key]['valor'] ?>" />
                                            <label for="cb<?php echo $products[$key]['id']; ?>" id="<?php echo $products[$key]['id']; ?>L" class="label">
                                                <img src="<?php echo $products[$key]['img'];?>" />
                                                <p><b name="preco" id="cb<?php echo $products[$key]['id']; ?>P"> R$:<?php echo $products[$key]['valor'] . ",00"; ?></b></p>
                                                <p name="nome" id="cb<?php echo $products[$key]['id']; ?>N"><?php echo $products[$key]['nome']; ?></p>
                                                <small name="desc" class="text-muted" id="cb<?php echo $products[$key]['id']; ?>D">
                                                <?php echo $products[$key]['desc'];?>
                                                </small>
                                            </label>
                                        </div>
                                    </li>
                                <?php } ?>
                            </ul>
                        </div>
                    </div>
                    <hr class="mb-4">
                    <h4 class="mb-3">Selecione a forma de pagamento:</h4>
                    <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input checked id="credit" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="credit">Crédito</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="debit">Débito</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
                            <label class="custom-control-label" for="paypal">Dinheiro</label>
                        </div>
                    </div>
                    <hr class="mb-4">
                    <button class="btn btn-primary btn-lg btn-block" type="submit">Finalizar Pedido</button>
                </form>
            </div>
        </div>
        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2017-2018 Company Name</p>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <!--
    <script>window.jQuery || document.write('<script src="./assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
    <script src="./assets/js/vendor/popper.min.js"></script>
    <script src="./dist/js/bootstrap.min.js"></script>
    <script src="./assets/js/vendor/holder.min.js"></script>
    -->
    <script src="./assets/js/bootstrap.min.js"></script>
    <script src="./controller/PedidoController.js"></script>
    <script>
       var tel = document.getElementById('telefone');
        tel.setAttribute("onkeypress", "mascara(this)");

        function mascara(telefone) {
            if (telefone.value.length == 0) {
                telefone.value = '(' + telefone.value;
            }
            if (telefone.value.length == 3) {
                telefone.value = telefone.value + ') ';
            }
            if (telefone.value.length == 10) {
                telefone.value = telefone.value + '-';
            }

        }
    </script>
    <script>
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function() {
            'use strict';

            window.addEventListener('load', function() {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');

                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
    </script>
</body>

</html>