//A szükséges változtatások a játék újrakezdéséhez (restart gombbal)
import { gameRunningset } from "../menu/gamestart.js";
import { pickRandomRecipe } from "./recipeLogic.js";
import { scoreReset } from "./scorelogic.js";
import { timerReset, startTimer, timesup, recipecontainer, scorecontainer } from "./timing.js";

export function gameRestart(){
    heldItemnull();
    timesup.classList.add("hidden");
    recipecontainer.classList.remove("hidden");
    scorecontainer.classList.remove("hidden");
    timerReset();
    scoreReset(0);
    pickRandomRecipe();
    resetPlayerpos();
    gameRunningset(true);
    startTimer();
    player.locked=false;
    
}

