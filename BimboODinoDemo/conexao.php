<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$nomeDoBanco = "bimbo_o_dino";
try {
	$conexao = new PDO("mysql:dbname=$nomeDoBanco; host=$servidor", $usuario, $senha);
	$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conexao -> exec("SET CHARACTER SET utf8");
} catch(PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}
?>	