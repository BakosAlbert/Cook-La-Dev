//Irányítás inicializálása
import {interactWithTile, interactWithCuttingboard} from './interactions.js';
import {movePlayer} from './utils.js';
let controlsinit = false;
export function control(){
    //Ellőrzés hogy az inicializálás megtörtént-e már
    if(controlsinit){
        return;
    }else{
        controlsinit=true;
        
        //gombnyomások kezelése
        document.addEventListener("keydown", (e) =>{
            if(player.locked){
                return;
            }
            switch(e.key.toLowerCase()){
                case "w":
                    movePlayer(0, -1);
                    break;
                case "s":
                    movePlayer(0, 1);
                    break;
                case "a":
                    movePlayer(-1, 0);
                    break;
                case "d":
                    movePlayer(1, 0);
                    break;
                case "e":
                    interactWithTile();
                    break;
                case "f":
                    interactWithCuttingboard();
                    break;
                    
            }
        });
    }
}