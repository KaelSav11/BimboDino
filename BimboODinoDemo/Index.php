<?php
	session_start();

	include("conexao.php");

	if(!isset($_POST['acao'])){
		limparSessao();
		echo ("<script>
				window.addEventListener('DOMContentLoaded', (event) => {
    				habilitarBox('inicioBox');
				}); 
			   </script>");
	}else{
		if(isset($_POST['caixaNome']) and empty($_POST['caixaNome'])){
			echo ("<script>
	    				  window.location.href = 'Index.php';	  
				   </script>");
		}
		if($_POST['acao'] == "Pronto"){
			$_SESSION['nome'] = $_POST['caixaNome'];
			echo ("<script>
					window.addEventListener('DOMContentLoaded', (event) => {
	    				desabilitarBox('inicioBox');
	    				habilitarBox('playBox');
	    				pronto();
					}); 
				   </script>");
		}
		else if($_POST['acao'] == "Novo Jogo"){		
			echo ("<script>
				window.addEventListener('DOMContentLoaded', (event) => {
    				desativarBox('playBox');
				}); 
			   </script>");
			$_SESSION['score'] = $_POST['campoScore'];
			if(empty($_SESSION['cod'])){
				inserirNoBd($_SESSION['score'],$_SESSION['nome']);
					echo ("<script>
	    				  window.location.href = 'Index.php';	    				
				    </script>");

			}
			else if(!empty($_SESSION['cod'])){
				$_SESSION['score'] = $_POST['campoScore'];
				$score_antigo = pegarScore($_SESSION['cod']);
				$score_novo = $_SESSION['score'];
				if($score_novo > $score_antigo){
					atualizarNoBd($score_novo,$_SESSION['cod']);
				}
				echo ("<script>
    				  window.location.href = 'Index.php';	    				
			 		  </script>"		);
			}
		}
		else if($_POST['acao'] == "Jogar Novamente"){	
			if(empty($_SESSION['cod'])){
				$_SESSION['score'] = $_POST['campoScore'];
				inserirNoBd($_SESSION['score'],$_SESSION['nome']);
				$_SESSION['cod'] = pegarUltimoCod();
			}
			else if(!empty($_SESSION['cod'])){
				$_SESSION['score'] = $_POST['campoScore'];
				$score_antigo = pegarScore($_SESSION['cod']);
				$score_novo = $_SESSION['score'];
				if($score_novo > $score_antigo){
					atualizarNoBd($score_novo,$_SESSION['cod']);
				}
			}
			echo ("<script>
					window.addEventListener('DOMContentLoaded', (event) => {
	    				desabilitarBox('gameOverBox');
	    				habilitarBox('playBox');
	    				pronto();
					}); 
				   </script>");
		}
	}
	
	function inserirNoBd($score, $nome){
		include("conexao.php");
		$consulta =  $conexao->prepare('INSERT INTO score VALUES(:cod, :score, :nome)');
		$cod = $consulta->bindValue(':cod', 0);
		$consulta->bindValue(':score', $score);
		$consulta->bindValue(':nome', $nome);
		$consulta->execute();
	}

	function atualizarNoBd($score, $cod){
		include("conexao.php");
		$consulta =  $conexao->prepare('UPDATE score set score = :score WHERE cod = :cod');
		$consulta->bindValue(':cod', $cod);
		$consulta->bindValue(':score', $score);
		$consulta->execute();
	}	

	function pegarUltimoCod(){
		include("conexao.php");
		$consulta =  $conexao->prepare('SELECT MAX(cod) as id FROM score ');
		$consulta->execute();
   		$jogador = $consulta->fetch(PDO::FETCH_ASSOC);	
		return $jogador['id'];
	}

	function pegarScore($cod){
		include("conexao.php");
		$consulta =  $conexao->prepare('SELECT * FROM score WHERE cod = :cod ');
		$consulta->bindValue(':cod', $cod);
		$consulta->execute();
   		$score = $consulta->fetch(PDO::FETCH_ASSOC);	
		return $score['score'];
	}

	function limparSessao(){
		unset($_SESSION['nome']);
		unset($_SESSION['score']);
		unset($_SESSION['cod']);
		$_SESSION['nome'] = "";
		$_SESSION['score'] = "";
		$_SESSION['cod'] = "";
	}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="../img/icone.ico" rel="shortcut icon"/>
	<title>Bimbo o Dino</title>
	<link rel="stylesheet" type="text/css" href="Style.css">
	<!--<link href="https://www.fontsquirrel.com/stylesheet.css">-->
</head>
<body>
	<div id="cor">
		<div id="comandosT">
			Comandos
		</div>
	<div id="comandos">
		
	</div>
	<div id="tabela">
		<div id="legenda">
			<h1 style="font-size: 3vw !important">Scores</h1>
		</div>
			<?php
				include("conexao.php");
				$consulta =  $conexao->prepare('SELECT * FROM score ORDER BY score DESC LIMIT 10');
				$consulta->execute();
   				$jogadores = $consulta->fetchAll(PDO::FETCH_ASSOC);
				foreach ($jogadores as $jogador) {
					echo ("<div class='posicao'><h2 style='font-size: 1.5vw !important'>");
					echo ($jogador['nome']. " |  " . $jogador['score']);
					echo("</h2></div>");
				}
			?>				
	</div>
	<div class="corpo">
		<p id="score">Score: 0</p>
		<div id="menu">
			<div id="playBox" style="visibility:hidden;">Aperte Esc para Iniciar!</div>
			<div id="gameOverBox" style="visibility: hidden;">
				<form method="POST" action="Index.php">
						<h1 id="fim">GAME OVER</h1>
						<br><br>
						<input type="submit" name="acao" id="btnGameOver" value="Novo Jogo" >
						<input type="hidden" name="campoScore" id="campoScore">
						<br><br>
						<input type="submit" name="acao" id="btnGameOver" value="Jogar Novamente">
			</div>
			<div id="inicioBox"  style="visibility:hidden;">
				<form method="POST" action="Index.php" id="form">
						<h1>Escolha o Nome:</h1><input id="caixaNome" type="text" name="caixaNome" maxlength="8" required value="<?=$_SESSION['nome']?>">
						<br>
						<br>	
						<input type="submit" name="acao" id="enviar" value="Pronto" >
				</form>
				<br>
				<br>
				<br>
				<a href="creditos.html" id="btCred">Creditos</a>
			</div>
		</div>

		<div class="obsta"  id="obsta1"></div>
		<div class="obsta" id="obsta2"></div>
		<div class="obsta" id="obsta3"></div>

		<div class="perso" id="perso"></div>
		<div id="tiro"></div>
		
	</div>

	<div id="fim" >
		GAME OVER
	</div>
	<div id="difTex"></div>
	<div id="temp"></div>



	<script type="text/javascript" src="Script.js"></script>
</div>
</body>
</html>