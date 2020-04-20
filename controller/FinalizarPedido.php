<?php
session_start();
require_once('../conexao/conexao.php');


$primeiroNome = $_POST['firstName'];
$segundoNome = $_POST['lastName'];
$telefone = $_POST['telefone'];
$ER = $_POST['ER'];

if (!empty($_POST['pushN']) && !empty($_POST['firstName'])) {
  $nome = $primeiroNome . " " . $segundoNome;
  $notificacao =  $_POST['pushN'];
  var_dump($notificacao);
  $notificacaoInsert = $Con->query("INSERT INTO `push_notifications`
  ( `nome_cliente`, `chave_notification`)
   VALUES ('$nome','$notificacao')");
}

// endereco 
if (!empty($_POST['cep'])) {
  $rua = $_POST['rua'];
  $cep = $_POST['cep'];
  $loteQuadra = $_POST['adress'];
  $local = $_POST['local'];
  $geolocalizacao = $_POST['latLong'];
} else {
  $rua = " ";
  $cep = " ";
  $loteQuadra = " ";
  $local = " ";
}
if (!empty($_POST['complemento'])) {
  $obs = $_POST['complemento'];
  $obs = str_replace("á", "%C3%A1", $obs);
  $obs = str_replace("é", "%C3%A9", $obs);
  $obs = str_replace("ç", "%C3%A7", $obs);
  $obs = str_replace("ã", "%C3%A3", $obs);

  $complemento = "%0AComplemento%3A%20%0A" . $obs;
} else {
  $complemento = "";
}
$risadinha = "Risadinha+Lanches,+Av.+Autom%C3%B3vel+Clube";

if (!empty($_POST['rua'])) {
  $fim = "%0A_%0A%0A*PARA%20FINALIZAR%20SEU%20PEDIDO%20POR%20FAVOR%20ENVIE%20SUA%20LOCALIZAÇÃO%20FIXA%20DO%20WHATSAPP*%20";
  $urlMaps = "https://www.google.com/maps/dir/?api=1&origin=" . $risadinha . "&destination=" . $geolocalizacao . "&travelmode=bicycling";
  $urlMaps = str_replace(" ", "+", $urlMaps);
  $urlMaps = str_replace("&", "%26", $urlMaps);
  $urlMaps = str_replace("+", "%2B", $urlMaps);
  $endereco = "%0A*ENDERE%C3%87O%3A*%20%0A" . $rua . "%20" . $local . "%20" . $complemento . "%0A%0A*LOCALIZAÇÃO%20APROXIMADA:*%0A" . $urlMaps;
} else {
  $urlMaps = " ";
  $endereco = "";
}

// pedido realizado
$lanche = $_POST['lancheForm'];
if (!empty($_POST['ObsL'])) {
  $ObsLanche = "%0A%0A*OBS%20SOBRE%20O(S)%20LANCHE(S)%3A*%0A" . $_POST['ObsL'];
} else {
  $ObsLanche = "";
}

// forma de pagamento
$pagamento = $_POST['paymentMethod'];
if ($pagamento === "Dinheiro") {
  if (!empty($_POST['calcTroco'])) {
    $troco = $_POST['calcTroco'];
  }
} else {
  $troco = "";
}
// localizacao de origem para o maps 


$urlWhats = "https://api.whatsapp.com/send?phone=5521993440961&text=*CLIENTE%3A*%20" .
  $primeiroNome .
  "%20" .
  $segundoNome .
  "%0A*TELEFONE%3A*%20" .
  $telefone . "%0A*STATUS%3A*%20" .
  $ER . "%0A%0A*PEDIDO%3A*%20" .
  $lanche .
  $ObsLanche . "%0A%0A*FORMA%20DE%20PAGAMENTO%3A*%20" .
  $pagamento . "%0A" .
  $troco . "%0A" . $endereco;

$urlWhats = str_replace(" ", "%20", $urlWhats);

//var_dump($urlWhats);
header("Location:" . $urlWhats . "");
