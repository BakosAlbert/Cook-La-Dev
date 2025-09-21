//A játék működéséhez elengedhetetlen segédfüggvények
import { notWalkable, notWalkableObjects } from "./constvariable.js";
import { isMobile } from "./constvariable.js";

//A karakter előtti plaftformok lekérése
export function getTileInFront(player){
    let dx = 0;
    let dy = 0;

    switch(player.direction){
        case "up":
            dy = -1;
            break;
        case "down":
            dy = 1;
            break;
        case "left":
            dx = -1;
            break;
        case "right":
            dx = 1;
            break;
        
    }

    return {
        x: player.x + dx,
        y: player.y + dy
    };
}

//A kézben fogott tárgyak megjelenítése
export function showHeldItem(){
    let heldEL = document.getElementById("heldItem");
    if(!player.heldItem){
        if(heldEL) heldEL.remove();
        return;
    }
    if(!heldEL){
        heldEL = document.createElement("img");
        heldEL.id = "heldItem";
        heldEL.classList.add("held");
        document.getElementById("gameContainer").appendChild(heldEL);
    }

    heldEL.src = `./assets/ingredientsprites/${player.heldItem}.png`;

    const offsetX = player.direction === "right" ? 16 : player.direction === "left" ? -16 : 0;
    const offsetY = player.direction === "down" ? 16 : player.direction === "up" ? -16 : 0;

    heldEL.style.left = player.x * 32+ offsetX + "px";
    heldEL.style.top = player.y * 32 + offsetY + "px";
    

}

//A játékos valódi mozgatása
export function movePlayer(dx, dy){
    if (dx === 1){
        player.direction = "right";
        player.element.style.transform = "rotate(90deg)";
    }
    else if(dx === -1){
        player.direction = "left";
        player.element.style.transform = "rotate(-90deg)";
    }
    else if(dy === -1){
        player.direction = "up";
        player.element.style.transform = "rotate(0deg)";
    }
    else if(dy === 1){
        player.direction = "down";
        player.element.style.transform = "rotate(180deg)";
    }

    const newX = player.x + dx;
    const newY = player.y + dy;

    if (!baseLayer[newY] || !objectLayer[newY]){
        return;
    } 

    if(newX < 0 || newX>= baseLayer[0].length || newY<0 || newY >= baseLayer.length){
        updatePlayerPosition();
        return;
    }

    const base = baseLayer[newY][newX];
    const object = objectLayer[newY][newX];

    if(notWalkable.includes(base) || notWalkableObjects.includes(object)){
        return;
    }
    player.x = newX;
    player.y = newY;
    updatePlayerPosition();
    showHeldItem();

    

}
export function zoomdeny() {
  if (isMobile) {
    // pinch tiltás
    document.addEventListener('touchmove', function (event) {
      if (event.scale !== undefined && event.scale !== 1) {
        event.preventDefault();
      }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }
}
