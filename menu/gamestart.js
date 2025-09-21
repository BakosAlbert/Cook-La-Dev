//A játék elindítása a menüből (start gombbal)
import {control, mobilecontrol} from "../GameLogic/control.js";
import { pickRandomRecipe } from "../GameLogic/recipeLogic.js";
import { startTimer, resumeTimer, recipecontainer, scorecontainer, timesup, timerReset } from "../GameLogic/timing.js";
import {scoreReset } from "../GameLogic/scorelogic.js";
import { isMobile } from "../GameLogic/constvariable.js";
import { zoomdeny } from "../GameLogic/utils.js";
export let gameRunning = false;
export function gameRunningset(value){
    gameRunning = value;
}
export function startgame(){
    zoomdeny();
    heldItemnull()
    scoreReset(0);
    timerReset();
    resumeTimer();
    Mainmenu.classList.add("hidden");
    generateMap();
    initPlayer();
    resetPlayerpos();
    if(isMobile){
        mobilecontrol();
        console.log("mobile");
    }else{
        control();
    }
    recipecontainer.classList.remove("hidden");
    scorecontainer.classList.remove("hidden");
    pickRandomRecipe();
    startTimer();
    gameRunning = true;
    player.locked=false;
    timesup.classList.add("hidden");

}