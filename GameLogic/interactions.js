//Interakciók kezelése szolgáló függvények
import {getTileInFront} from "./utils.js";
import {showHeldItem} from "./utils.js";
import {sounds} from "./audio.js";
import { placedItems, crateMap, notWalkableObjects } from "./constvariable.js";
import {RecipeChecker} from "./recipeLogic.js";
import { cuttableItems } from "./frames.js";
import { gameRunning } from "../menu/gamestart.js";
export const tile = 0;
export const base = 0;
export let key = "";

//Mezőkkel történő interakció
export function interactWithTile() {
    const tile = getTileInFront(player);
    const base = baseLayer[tile.y][tile.x];
    key = `${tile.x}_${tile.y}`;
    
    //Pult logika
    if(player.heldItem && base === 2){
        if(!placedItems[key]) {

            placeItemOnDesk(tile.x, tile.y, player.heldItem);
            player.heldItem = null;
            showHeldItem();
            return;
        }else {
            return;
        }
        
    }
    //Kiszolgáló pulttal való interakció
    if(player.heldItem && base === 5){
        key = `${tile.x}_${tile.y}`;
        //Recept ellenőrző
        RecipeChecker(player.heldItem);

    }else{
        console.log("Nincs mit letenni!");
    }
    if(player.heldItem && base === 4){
        player.heldItem = null;
        showHeldItem();
    }
    if(player.heldItem){
        return;
    }
    if(placedItems[key]){
        player.heldItem = placedItems[key];
        delete placedItems[key];

        const itemEL = document.getElementById(`placed_${key}`);
        if(itemEL){
            itemEL.remove();
        }
        showHeldItem();
        sounds.pickup.volume = 0.5;
        sounds.pickup.play();
        return;
    }

    const item = crateMap[base];
    if(item){
        player.heldItem = item;
        showHeldItem();
        sounds.crate.volume = 0.5;
        sounds.crate.play();
    }else{
        console.log("Nincs ott semmi!");
    }

}

//Az asztalra rakás lekezelésére szolgáló függvény
export function placeItemOnDesk(x, y, item){
    const key = `${x}_${y}`;

    if(placedItems[key]){
        const existingEL = document.getElementById(`placed_${key}`);
        if(existingEL){
            existingEL.remove();
        }
    }

    //A lerakott item inicializálása
    placedItems[key] = item;
    const container = document.getElementById("gameContainer");
    const itemEl= document.createElement("img");
    itemEl.src = `assets/Ingredientsprites/${item}.png`;
    itemEl.classList.add("placed-item");
    itemEl.style.position = "absolute";
    itemEl.style.left = x * 32 + "px";
    itemEl.style.top = y * 32 + "px";
    itemEl.id = `placed_${key}`;

    container.appendChild(itemEl);
    sounds.pickup.volume = 0.5;
    sounds.pickup.play();
}

//A vágóasztallal történő interakció és a vágás
export function interactWithCuttingboard(){
    
    const tile = getTileInFront(player);
    const object = objectLayer[tile.y][tile.x];
    const key = `${tile.x}_${tile.y}`;

    //Vágódeszka és egyéb dolgok ellenőrzése
    if(object !== 41 && object !== 42){
        return;
    }
    const item = placedItems[key];
    if(!item){
        return;
    }
    if(!cuttableItems[item]){
        return;
    }
    if(player.locked){
        return;
    }
    console.log(object);
    const {spritePrefix, totalFrames} = cuttableItems[item];

    player.locked = true;

    let frame = 1;
    //A vágódeszka megcserélse az animációhoz
    const cuttingboardEl = document.getElementById(`cuttingboard_${tile.x}_${tile.y}`);
    if(cuttingboardEl){
        cuttingboardEl.classList.add("cuttingboard_swap");
    }

    const imgId=`cutting_${key}`;
    let img = document.createElement("img");
    img.id = imgId;
    img.classList.add("placed-item");
    img.style.position = "absolute";
    img.style.left = tile.x * 32 + "px";
    img.style.top = tile.y * 32 + "px";
    document.getElementById("gameContainer").appendChild(img);

    //A kés inicializálása
    const knife = document.createElement("img");
    knife.src = `./assets/Kitcheneqiupments/knife.png`;
    knife.classList.add("placed-item");
    knife.style.position = "absolute";
    knife.style.width = "32px";
    knife.style.height = "32px";
    knife.style.transform = "rotate(180deg)";
    knife.scale = 0.5;
    knife.style.left = tile.x * 32 + "px";
    knife.style.top = tile.y * 32 + "px";
    knife.style.zIndex = 35;
    knife.id = `knife_${key}`;
    document.getElementById("gameContainer").appendChild(knife);

    //A vágás megvalósítása
    const interval = setInterval(() => {
        if (!gameRunning) return;
        img.src = `./assets/ingredientcuttingframes/${item}/${spritePrefix}${frame}.png`;
        knife.style.top = (tile.y * 32-8+4) + "px";
        setTimeout(()=>{
            knife.style.top = (tile.y * 32-8) + "px";
        }, 100);
        sounds.slice.volume = 0.5;
        sounds.slice.play();
        frame++;
        if(frame > totalFrames){
            clearInterval(interval);
            img.remove();

            const choppedItem = `chopped_${item}`;
            placedItems[key] = choppedItem;
            placeItemOnDesk(tile.x, tile.y, choppedItem);
            player.locked = false;
            if(cuttingboardEl){
                cuttingboardEl.classList.remove("cuttingboard_swap");
                knife.remove();
            }
            
        }
    }, 400);
}