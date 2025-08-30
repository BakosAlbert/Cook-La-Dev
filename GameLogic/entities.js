//Entitások inicializálása
let player = {
  x: 6,
  y: 4,
  element: null,
  direction: "down",
  heldItem: null, 
  locked: false,
};

//Játékos inicializálása
function initPlayer() {
  const el = document.createElement("img");
  el.src = "./assets/basics/character.png";
  el.classList.add("player");
  player.element = el;
  document.getElementById("gameContainer").appendChild(el);
  updatePlayerPosition();
}

//Játékos helyzetének frissítése
function updatePlayerPosition() {
  player.element.style.left = player.x * 32 + "px";
  player.element.style.top = player.y * 32 + "px";
  console.log("Frissített pozíció stílusban:", player.element.style.left, player.element.style.top);
}

//Játékos alaphelyzetbe állítása
function resetPlayerpos(){
  player.x=6;
  player.y=4;
  updatePlayerPosition();
}