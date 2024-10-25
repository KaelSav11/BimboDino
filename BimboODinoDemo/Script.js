var bt = document.getElementById("play"); //botão inicial
var mn = document.getElementById("menu"); //div do menu
var obs = document.getElementsByClassName("obsta"); // três divs dos obstaculos
var pers=document.getElementById("perso"); //div do personagem
var esquerda = 50; //posição em px do personagem
var vida = 0; //vida do personagem
var divScore = document.getElementById("score"); //div do score
var score = 1; // var que guarda a pontuação do score
var tiro = document.getElementById("tiro"); //div da bola de fogo 
var play = 3; //se play for == 1, esc inicia o jogo, após iniciar play == 0
var dificuldade = 0; // dificuldade == 0: 2.2 segundos; dif... == 1: 1.6s; dif... == 2: 1.3s
var textoDif = document.getElementById("difTex"); //texto inicial
var divTempo = document.getElementById("temp"); //texto inicial
var morte = 0; //se morte == 1, game over
var enviar = document.getElementById("enviar"); //enviar noem do player
var nomeDiv = document.getElementById("nome"); //nome do player
var form = document.getElementById("form"); //div do formulario 
var a = 1; //tempo da bola de fogo
var audio_inicio = new Audio('musica/musica_inicio.mp3'); //musica
var audio_loop = new Audio('musica/musica_loop.mp3'); //musica

//função que esconde o menu e chama a função aleatorio
    function iniciar(){
        musica();
        morte = 0;
        score = 0;
        mn.style.zIndex = -1;
        textoDif.style.color = "green";
        textoDif.innerHTML = "Level: Facil";
        textoDif.style.zIndex = 2;
        divTempo.style.zIndex = 2;
        tempo();
        setTimeout(function(){
            textoDif.style.zIndex = -2;
            funcCont();
            aleatorio();
        }, 3000);
        setTimeout(function(){
            vida = 1;
        }, 2500);
    }
    function pronto(){
        play = 1;
    }
    function habilitarBox($nome){
        div = document.getElementById($nome);
        div.style.visibility = "visible";
    }
    function desabilitarBox($nome){
        div = document.getElementById($nome);
        div.style.visibility = "hidden";
    }
    function desativarBox($nome){
        div = document.getElementById($nome);
        div.style.display = "none";
    }

//função que deixa aleatório os obstáculos
    function aleatorio(){
        var  alea;
        var aleaObj;

        for(var i =0; i<4; i++){
                alea = Math.floor(Math.random() * 3);
                aleaObj = Math.floor(Math.random() * 4);
                if(obs[alea].classList.length<2){
                    obs[alea].classList.add("obj"+aleaObj, "anima"+dificuldade);
                }
            }
            if (vida==1) {
                    switch(dificuldade){
                        case 0:
                            loop0(); //facil
                        break;
                        case 1:
                            loop1(); //medio 
                        break;
                        case 2:
                            loop2(); //dificil
                        break;
                    }
                }
    }

    function loop0(){
        setTimeout(function(){
                for(var i =0; i<4; i++){
                    if(vida==1){
                        obs[0].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[1].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[2].classList.remove("obj"+i, "anima"+dificuldade);
                    }
                }
                
                if (vida==1) {
                    aleatorio();
                    if (dificuldade==1) {
                        obs[0].classList.remove("anima0");
                        obs[1].classList.remove("anima0");
                        obs[2].classList.remove("anima0");
                    }
                }
                
            }, 2200);
    }
    function loop1(){
        setTimeout(function(){
                for(var i =0; i<4; i++){
                    if(vida==1){
                        obs[0].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[1].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[2].classList.remove("obj"+i, "anima"+dificuldade);
                    }
                }
                
                if (vida==1) {
                    aleatorio();
                    if (dificuldade==2) {
                        obs[0].classList.remove("anima1");
                        obs[1].classList.remove("anima1");
                        obs[2].classList.remove("anima1");
                    }
                }
                
            }, 1600);
    }
    function loop2(){
        setTimeout(function(){
                for(var i =0; i<4; i++){
                    if(vida==1){
                        obs[0].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[1].classList.remove("obj"+i, "anima"+dificuldade);
                        obs[2].classList.remove("obj"+i, "anima"+dificuldade);
                    }
                }
                if (vida==1) {
                    aleatorio();
                }
               
            }, 1300);
    }

    //funçao de aparecer mensagens de perca e resetar o jogo
    function gameOver(){
        audio_inicio.pause();
        audio_loop.pause();
        morte = 1;
        vida = 0;
        var altura0 = obs[0].offsetTop;
        var altura1 = obs[1].offsetTop;
        var altura2 = obs[2].offsetTop;
        var alturaP = pers.offsetTop;

        obs[0].style.top = altura0+ "px";
        obs[1].style.top = altura1+ "px";
        obs[2].style.top = altura2+ "px"; 

        obs[0].classList.remove("anima"+dificuldade);
        obs[1].classList.remove("anima"+dificuldade);
        obs[2].classList.remove("anima"+dificuldade);

        dificuldade = 0;

        divGameOver();
        passarScore(score); 
    }

    //chama a dic novo jogo
    function divNovoJogo(){
        var div = document.getElementById("nome");
        div.style.visibility = "visible";
        mn.style.zIndex = 4;
    }

    //chama a div gameover
    function divGameOver(){
        var divGameOver = document.getElementById("gameOverBox");
        divGameOver.style.visibility = "visible";
        mn.style.zIndex = 4;
    }

    //manda o score pro db
    function passarScore(score){
        document.getElementById('campoScore').value = score;
    };

    //compara a disntacia entre os personagens e os obstaculos, para caso toquem-se, chamar a funçao gamerover
    const morteTeste = setInterval(() => {
        var altura0 = obs[0].offsetTop;
        var altura1 = obs[1].offsetTop;
        var altura2 = obs[2].offsetTop;
        var alturaP = pers.offsetTop;
        if (esquerda<50 && altura0<480 && altura0>450) {
            if (alturaP<450 && obs[0].classList[1] == "obj1") {
                return;
            }
            gameOver();
        }else if (esquerda==50 && altura1<480 && altura1>450) {
            if (alturaP<450 && obs[1].classList[1] == "obj1") {
                return;
            }
            gameOver();
        }else if (esquerda>50 && altura2<480 && altura2>450) {
            if (alturaP<450 && obs[2].classList[1] == "obj1") {
                return;
            }
            gameOver();
        }
    }, 10);

    //aumenta o score e calcula a dificuldade
    function funcCont(){  
        const contador = setInterval(() => {

            score += 1;
            if (score<500) {
                divScore.innerHTML = "Score: "+ score;
            }else if (score>=500 && score<1000) {
                divScore.innerHTML = "Score: "+ score;
                if (score == 500) {
                    textoDif.style.color = "yellow";
                    textoDif.innerHTML = "Level: Medio";
                    textoDif.style.zIndex = 2;
                    setTimeout(function(){
                        textoDif.style.zIndex = -2;
                    }, 500);
                }
            }else if (score>=1000) {
                pers.style.transitionDuration = 0.25 + "s";
                divScore.innerHTML = "Score: "+ score;
                if (score == 1000) {
                    textoDif.style.color = "red";
                    textoDif.innerHTML = "Level: Dificil";
                    textoDif.style.zIndex = 2;
                    setTimeout(function(){
                        textoDif.style.zIndex = -2;
                    }, 500);
                }
            }

            if (vida==0) {
                clearInterval(contador); //limpa o score
            }
        }, 100);
    }

    //caso 3 dos obstaculos seja indestrutivel, 1 e´ removido
    const verme3 = setInterval(() => {
        
        if (obs[0].classList[1] == "obj2" && obs[1].classList[1] == "obj2" && obs[2].classList[1] == "obj2") {
            var aleaN = Math.floor(Math.random() * 3);
            obs[aleaN].classList.remove("obj2", "anima"+dificuldade);
        }

        //aumenta dificuldade
        if (score>=500 && score<1000 && dificuldade<1) {
            dificuldade += 1;
        }

        if (score >= 1000 && dificuldade<2) {
            dificuldade += 1;
        }

    }, 10);

    //funçao que conta ate 3 para startar
    function tempo(){
        var seg = 1;
        divTempo.innerHTML = seg;
        const temp = setInterval(() => {
            seg +=1;
            divTempo.innerHTML = seg;
            if (seg==3) {
                setTimeout(function(){
                    divTempo.innerHTML = "VAI";
                }, 300);
                setTimeout(function(){
                    divTempo.style.zIndex = -2;
                }, 700);
                clearInterval(temp);
            }
        }, 1000);
    }
        

    document.addEventListener("keydown", teclaDw);

    //mapeamento das teclas
    function teclaDw(){
        var tecla=event.keyCode;
        if (tecla==38 && vida==1) {
            pulo();
            pers.classList.add("pular");
            setTimeout(function(){
                pers.classList.remove("pular");
            }, 500);
        }else if(tecla==37 && vida==1){
            if(esquerda>20){
                esquerda -= 30;
                pers.style.left = esquerda + "%";
                tiro.style.left = esquerda + "%";
            }
            
        }else if(tecla==39 && vida==1){
            if(esquerda<80){
                esquerda += 30;
                pers.style.left = esquerda + "%";
                tiro.style.left = esquerda + "%";
            }       
        }else if (tecla==16 && vida==1 && a == 1) {
            a = 0;
            fireball();
            atirou();
            tiro.classList.add("atirou");
            setTimeout(function(){
                tiro.classList.remove("atirou");
            }, 800);
            setTimeout(function(){
                a = 1;
            }, 700);
        }else if (tecla==27 && play==1 && vida==0) {
            iniciar();
            play = 0;
        }else if(tecla==27 && play==0 && vida==0 && morte==1){
            telaFim.style.zIndex = -2;
            obs[0].style.top = "-30%";
            obs[1].style.top = "-30%";
            obs[2].style.top = "-30%";
            iniciar();
        }
    }

    // funçao de atirar
    function atirou(){
        setTimeout(function(){
            if (esquerda<50 && obs[0].classList[1] == "obj0") {
                obs[0].style.background = "url(Arvore_queimando.gif)";
                obs[0].style.backgroundRepeat = "no-repeat";    
                obs[0].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[0].classList.remove("obj0", "anima0", "anima1", "anima2");
                    obs[0].style.background = ""; 
                    obs[0].style.backgroundRepeat = "no-repeat";
                    obs[0].style.backgroundSize = "cover";               
                }, 120);    
                
            }else if (esquerda<80 && obs[1].classList[1] == "obj0" ) {
                obs[1].style.background = "url(Arvore_queimando.gif)";
                obs[1].style.backgroundRepeat = "no-repeat";
                obs[1].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[1].classList.remove("obj0", "anima0", "anima1", "anima2");
                    obs[1].style.background = "";
                    obs[1].style.backgroundRepeat = "no-repeat";
                    obs[1].style.backgroundSize = "cover";                
                }, 120);
            }else if (esquerda>50 && obs[2].classList[1] == "obj0" ) {
                obs[2].style.background = "url(Arvore_queimando.gif)";
                obs[2].style.backgroundRepeat = "no-repeat";
                obs[2].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[2].classList.remove("obj0", "anima0", "anima1", "anima2");
                    obs[2].style.background = "";   
                    obs[2].style.backgroundRepeat = "no-repeat";
                    obs[2].style.backgroundSize = "cover";                             
                }, 120);
            }
            //----------------------------------------------------------------------------
            if (esquerda<50 && obs[0].classList[1] == "obj3") {
                obs[0].style.background = "url(pedra_quebrada.gif)";
                obs[0].style.backgroundRepeat = "no-repeat";    
                obs[0].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[0].classList.remove("obj3", "anima0", "anima1", "anima2");
                    obs[0].style.background = ""; 
                    obs[0].style.backgroundRepeat = "no-repeat";
                    obs[0].style.backgroundSize = "cover";               
                }, 120);    
                
            }else if (esquerda<80 && obs[1].classList[1] == "obj3" ) {
                obs[1].style.background = "url(pedra_quebrada.gif)";
                obs[1].style.backgroundRepeat = "no-repeat";
                obs[1].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[1].classList.remove("obj3", "anima0", "anima1", "anima2");
                    obs[1].style.background = "";
                    obs[1].style.backgroundRepeat = "no-repeat";
                    obs[1].style.backgroundSize = "cover";                
                }, 120);
            }else if (esquerda>50 && obs[2].classList[1] == "obj3" ) {
                obs[2].style.background = "url(pedra_quebrada.gif)";
                obs[2].style.backgroundRepeat = "no-repeat";
                obs[2].style.backgroundSize = "cover";
                setTimeout(function(){
                    destruicao();
                    obs[2].classList.remove("obj3", "anima0", "anima1", "anima2");
                    obs[2].style.background = "";   
                    obs[2].style.backgroundRepeat = "no-repeat";
                    obs[2].style.backgroundSize = "cover";                             
                }, 120);
            }

        }, 100);
    }

    //funçao da musica e sons
    function musica() {
            audio_inicio.play();  
            setTimeout(function(){
                audio_inicio.pause();
                audio_loop.play();
                audio_loop.loop = true;
            }, 13000)
    }
    function destruicao(){
        var destruir = new Audio('musica/destruicao.mp3');
        destruir.play();
    }
    function pulo(){
        var pulo = new Audio('musica/pulo.mp3');
        pulo.play();
    }
    function fireball(){
        var fire = new Audio('musica/fireball.mp3');
        fire.play();
    }
    