<?php


if(isset($_POST ['email']) && !empty($_POST['email'])){
$nome = addslashes($_POST['nome']);
$email = addslashes($_POST['email']);
$mensagem = addslashes($_POST['message']);


$to = "jhoycehelen93@gmail.com";
$subject = " Contato - Consulta API";
$body = "Nome: " .$nome. "\r\n".
"Email:" .$email. "\r\n".
"Mensagem:" .$messagem;


$header = "From:jhoyce.oliveira@nfe.io". "\r\n".
"Reply-To:".$email."\e\n".
"X=Mailer:PHP/".phpVersion();
}

 if(mail($to,$subject,$body,$header)){
    echo ("Email enviado com sucesso!");
}else{
    echo("O Email não pode ser enviado");
}



?>