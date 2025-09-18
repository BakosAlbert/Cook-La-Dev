//Irányítás inicializálása
import {interactWithTile, interactWithCuttingboard} from './interactions.js';
import {movePlayer} from './utils.js';
const dpadup = document.getElementById("dpadup");
const dpaddown = document.getElementById("dpaddown");
const dpadleft = document.getElementById("dpadleft");
const dpadright = document.getElementById("dpadright");

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
export function mobilecontrol(){
    if(controlsinit){
        return;
    }else{
        controlsinit=true;
    }
    /*dpadup.addEventListener('touchstart', ()=>{
        movePlayer(0, -1);
    });
    dpaddown.addEventListener('touchstart', ()=>{
        movePlayer(0, 1);
    });
    dpadleft.addEventListener('touchstart', ()=>{
        movePlayer(-1, 0);
    });
    dpadright.addEventListener('touchstart', ()=>{
        movePlayer(1, 0);
    });*/

    setTimeout(() => {

        if(!dpadup || !dpaddown || !dpadleft || !dpadright){
            console.warn("Dpad elemek nem találhatók még!");
            return;
        }

        dpadup.addEventListener('touchstart', ()=> movePlayer(0, -1));
        dpaddown.addEventListener('touchstart', ()=> movePlayer(0, 1));
        dpadleft.addEventListener('touchstart', ()=> movePlayer(-1, 0));
        dpadright.addEventListener('touchstart', ()=> movePlayer(1, 0));
    }, 300);
}