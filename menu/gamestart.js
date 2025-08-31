//A játék elindítása a menüből (start gombbal)
import {control} from "../GameLogic/control.js";
import { pickRandomRecipe } from "../GameLogic/recipeLogic.js";
import { startTimer, resumeTimer, recipecontainer, scorecontainer, timesup, timerReset } from "../GameLogic/timing.js";
import {scoreReset } from "../GameLogic/scorelogic.js";
export let gameRunning = false;
export function gameRunningset(value){
    gameRunning = value;
}
export function startgame(){
    heldItemnull()
    scoreReset(0);
    timerReset();
    resumeTimer();
    Mainmenu.classList.add("hidden");
    generateMap();
    initPlayer();
    resetPlayerpos();
    control();
    recipecontainer.classList.remove("hidden");
    scorecontainer.classList.remove("hidden");
    pickRandomRecipe();
    startTimer();
    gameRunning = true;
    player.locked=false;
    timesup.classList.add("hidden");

}