/* variable connectée à new game*/
const StartGame = document.getElementById("newGame");
const RollDice = document.getElementById("rollDice");
const Dice = document.getElementById("dice");
const Holdscore = document.getElementById("Holdscore");
const GlobalScore1Html = document.getElementById("GlobalScore1Display");
const GlobalScore2Html = document.getElementById("GlobalScore2Display");
const isPlayer1active = document.getElementById("actifPlayer1");
const isPlayer2active = document.getElementById("actifPlayer2");
/* differents points du dé*/
/*const face1 = document.getElementById("face1");
const face2 = document.getElementById("face2");
const face3 = document.getElementById("face3");
const face4 = document.getElementById("face4");
const face5 = document.getElementById("face5");
const face6 = document.getElementById("face6");
AllFace=[face1,face2,face3,face4,face5,face6];*/

const face1 = '<div class="face" id="face1"></div>';
const face2 = '<div class="face" id="face2"></div>';
const face3 = '<div class="face" id="face3"></div>';
const face4 = '<div class="face" id="face4"></div>';
const face5 = '<div class="face" id="face5"></div>';
const face6 = '<div class="face" id="face6"></div>';


/*objet joueurs*/
class Player {
  constructor(name, GlobalScore, CurrentScore, Starter) {
    this.name = name;
    this.GlobalScore = GlobalScore;
    this.CurrentScore = CurrentScore;
    this.Starter = Starter;
  }
  reset(){
    this.name = "PlayerName1";
    this.GlobalScore = 0;
    this.CurrentScore = 0;
    this.Starter = false;
  }
}
/* creation des joeurs*/
let Player1 = new Player("playerName1",0,0,false);
let Player2 = new Player("playerName2",0,0,false);
let players = [Player1, Player2];



StartGame.addEventListener('click', NamesUpdate);
/* Je ne comprends pas pourquoi quand je click du coté droit de
la div new game ça nexcute pas la fonction du cliques*/

function RemovelistenerStargame(){
  /*cette fonction heberge l'evenement qui supprime le premier
  évènement du startgame, car je veux lui rajouter un evenement qui se fonctionnel que pendant la partie*/
  StartGame.removeEventListener('click',NamesUpdate);
 } 
function RemovelistenerRollDice(){
  /*cette fonction heberge l'evenement qui supprime l'évènement du rollDice ,
  dans le cas ou les joueurs selectionnent Non à la demande re relancement de jeu 
  ainsi s'ils repondent "Non" le dé ne tournera plus*/
  RollDice.removeEventListener('click',Rolling);
 } 

function NamesUpdate(event){
  const regex = /^[a-zA-Z0-9]{3,}$/;
 // isPlayer1active.style.display="none";
 // isPlayer2active.style.display="none";

  setTimeout(RemovelistenerStargame,50);
 /// StartGame.removeEventListener('click', NamesUpdate);

    alert("C'est parti!");
    /*mise des valeurs noms dans deux variables*/
    let PlayerName = prompt("rentrez nom du joueur 1");

    while (!regex.exec(PlayerName)){
      event.preventDefault();
      alert("le nom du joueur doit contenir au moins 3 caractères");
      PlayerName = prompt("entrez à nouveau le nom du joueur 1");
   
    } 
    Player1.name = PlayerName;

    PlayerName = prompt("rentrez nom du joueur 2");
    while (!regex.exec(PlayerName)){
      event.preventDefault();
      alert("le nom du joueur doit contenir au moins 3 caractères"); 
      PlayerName = prompt("entrez à nouveau le nom du joueur 2");
    } 
    Player2.name = PlayerName;

    /* mise a jours des noms et score sur le DOM HTML*/
    document.getElementById("h1FirstPlayer").innerHTML=Player1.name;
    document.getElementById("h1SecondPlayer").innerHTML=Player2.name;
    document.getElementById("UpdateScore1").innerHTML=0;
    document.getElementById("UpdateScore2").innerHTML=0;
    GlobalScore1Html.innerHTML = 0;
    GlobalScore2Html.innerHTML = 0;
    FirstToPlay();
    
}
function isActive(){
  if (Player1.Starter==true){
    isPlayer1active.style.display="";
    isPlayer2active.style.display="none";
  }
  else if (Player2.Starter==true){
    isPlayer1active.style.display="none";
    isPlayer2active.style.display=""; 
  }
}

//fonction qui choisi aléatoirement qui commence à jouer
function FirstToPlay(){

  let ShuffleNumber = Math.floor(Math.random()*2);
  if(ShuffleNumber==0){
   Player1.Starter=true;
    alert("C'est à "+Player1.name+" de commencer!");
    isActive();
    /*isPlayer1active.style.display="";
    isPlayer2active.style.display="none";
    //isActive("none","");*/
  }
  else{
    Player2.Starter=true;
    alert("C'est à "+Player2.name+" de commencer!");
   /* isPlayer2active.style.display="";
    isPlayer1active.style.display="none";
   // isActive("","none");*/
   isActive();
  }
  //isActive();
 // Mettre la fonnction qui montre le joueur actif ici
  Play();// appel de la fonction play pour commencer le jeu
}
// fonction pour recuperer le joueur actif et le non actif
function isPlayer(isTrue) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].Starter === isTrue) {
    
      return players[i]; // me permettra de recuperer un joueur selon s'il est true ou false
    }
  }
  return players[i]==null; // Retourne null si aucun joueur avec Starter à true n'est trouvé

}

/* fonction pour mettre à jour le score , elle est appelé
  à chaque tours de dé pour update le score du player actif*/
function UpdateCurrentScore(){
 
  let CurrentPlayer = isPlayer(true);

  if (CurrentPlayer.name===Player1.name){
    Player1.CurrentScore = CurrentPlayer.CurrentScore ;
    document.getElementById("UpdateScore1").innerHTML=Player1.CurrentScore;
  }
  else if (CurrentPlayer.name===Player2.name){
    Player2.CurrentScore = CurrentPlayer.CurrentScore;
    document.getElementById("UpdateScore2").innerHTML=Player2.CurrentScore;
  }
/* cette condition fait une verification par le nom donc elle reste limité si 
les 2 joueurs entrent le meme nom */
}
// fonction qui met à jour le contenu html du dé
function updateDiceContent(){
  let statusPlayer = isPlayer(true);
  let statusPlayer2 = isPlayer(false);
  //variable pour trouver un numero de dé entre 1 à 6
  let diceValue = (Math.floor(Math.random() * 6) + 1);
 
  if(diceValue === 1){
    Dice.innerHTML = face1;
    statusPlayer.CurrentScore = 0;
    UpdateCurrentScore();
    /*le joueur perd
    donc on switch au prochain par changement de statut qui va mettre
    à jour le statut des joueurs su la fontion isPlayer*/
    statusPlayer.Starter=false;
    statusPlayer2.Starter=true;
    isActive();
    

  // afficher une alerte indiquant c'est à qui de jouer!
    setTimeout(Alert,500);
    function Alert (){
      alert("c'est au tour de "+statusPlayer2.name);
    }
  }
  else if(diceValue === 2){
    Dice.innerHTML = face2+face5;
    statusPlayer.CurrentScore += diceValue;
    UpdateCurrentScore();
    /*le joueur joue un chiffre donc on appelle 
    la fonction UpdatecurrentScore pour mettre à jour son score*/
  }
  else if(diceValue === 3){
    Dice.innerHTML = face2+face1+face5;
    statusPlayer.CurrentScore += diceValue;
    UpdateCurrentScore();  
  }
  else if(diceValue === 4){
    Dice.innerHTML = face2+face3+face4+face5;
    statusPlayer.CurrentScore += diceValue;
    UpdateCurrentScore();
  }
  else if(diceValue === 5){
    Dice.innerHTML = face1+face2+face3+face4+face5;
    statusPlayer.CurrentScore += diceValue;
    UpdateCurrentScore();
  }
  else if(diceValue === 6){
    Dice.innerHTML = face1+face2+face3+face4+face5+face6;
    statusPlayer.CurrentScore += diceValue;
    UpdateCurrentScore();
 }

}
function UpdateTimer(){
 setTimeout(updateDiceContent,1000);
}

function restart(){

  let confirmation = confirm("voulez vous reprendre une nouvelle partie ?");
  if (confirmation===true){
     // suppression des événements du jeu fini
 function Removelistener(){
  /*cet evenement permet de rendre la supression de l'evenement de
  la partie precedente plus rapide*/
  RollDice.removeEventListener('click',Rolling);
 } 

 setTimeout(Removelistener,50);
  // Réinitialiser les joueurs
  Player1.reset();
  Player2.reset();
  NamesUpdate();
  }

}
function End(){
  let statusPlayer = isPlayer(true);
  if (statusPlayer.GlobalScore >= 100 ){
      alert(statusPlayer.name+" a gagné!!!");
      statusPlayer.Starter = false;// pour desactiver le joueur actif et ne pas rester dans une boucle infinie
      restart();
        
   }

   StartGame.addEventListener('click', ()=>{
     if (Player1.GlobalScore > Player2.GlobalScore){
      let confirmation = confirm("Etes vous sur de vouloir annuler la partie?");
      if (confirmation===true){
        alert(Player1.name+" a gagné!!!");
        restart();
      }
     
  
    }
    else if  (Player1.GlobalScore < Player2.GlobalScore){
      let confirmation = confirm("Etes vous sur de vouloir annuler la partie?");
      if (confirmation===true){
        alert(Player2.name+" a gagné!!!");
        restart();
      }
      
    } 

    else if(Player1.GlobalScore === Player2.GlobalScore){
      let confirmation = confirm("Etes vous sur de vouloir annuler la partie?");
      if(confirmation===true){
        alert(" Vous etes ex aequo");
        restart();
      }

    }
    
   }) 
  }  

function UpdateGlobaleScore(){
  activePlayer = isPlayer(true);
  // quand on change de joueur ça ne met pas à jour le global score du nouvel actif player 
  if (activePlayer){
     Holdscore.addEventListener('click', ()=>{
     //alert("HOLD FONCTIONNE");
     activePlayer.GlobalScore += activePlayer.CurrentScore;
     activePlayer.CurrentScore = 0;
     UpdateCurrentScore();
     GlobalScore1Html.innerHTML=Player1.GlobalScore;
     GlobalScore2Html.innerHTML=Player2.GlobalScore;
     setTimeout(End,500); 
     
    })
  } 
}


// fonction qui lance le jeu apres le click
function Play() {
RollDice.addEventListener("click", Rolling); 

}
function Rolling() {
  // Désactiver le clic du dé momentanément
  RollDice.onclick = null;

  const frames = 50;

  // Position initiale du dé
  const initialRotation = 0;

  // Angle total de rotation pour l'animation
  const totalRotation = 360 * 3; 

  // Angle de rotation actuel
  let currentRotation = 0;

  // Durée totale de l'animation (en millisecondes)
  const animationDuration = 3000;

  // Pas de rotation par frame
  const rotationStep = totalRotation / frames;

  // Temps écoulé
  let elapsedTime = 0;

  // Animation loop
  function animate(currentFrame, timestamp) {
    if (currentFrame <= frames) {
      // Ajuster la rotation actuelle
      currentRotation += rotationStep;

      // Appliquer la rotation au dé
      Dice.style.transform = `rotate(${currentRotation}deg)`;

      // Schedule the next frame
      requestAnimationFrame((nextTimestamp) => {
        const deltaTime = nextTimestamp - timestamp;
        elapsedTime += deltaTime;
        animate(currentFrame + 1, nextTimestamp);
        
      });
    } else {
      // Réinitialiser la transformation à sa position initiale après l'animation
      Dice.style.transform = `rotate(${initialRotation}deg)`;
      

      // Activer le clic après l'animation complète
      RollDice.onclick = Rolling;
    }
  }
  animate(1, performance.now());  // Démarrer l'animation
  UpdateTimer();// lancer updateTimer qui elle lance UpdateDiceContente
  UpdateGlobaleScore();//elle permet de mettre à jour le score global

}

    

    
  



