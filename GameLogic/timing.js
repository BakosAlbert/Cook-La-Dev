//Az időzítő beállításaira haznált kódok
import { gameRunningset } from "../menu/gamestart.js";
import { endScore } from "./scorelogic.js";
export const recipecontainer = document.getElementById("recipecontainer");
export const scorecontainer = document.getElementById("score-container");
export const timesup=document.getElementById("endscreen");
const endscore=document.getElementById("endscore");

//A fájlban szükséges változók
let timeleft = 180;
let delta=180;
const timerEl = document.getElementById('timer');
let intervalId = null;

//Időzítő frissítése és megjelenítése a hudon
export function updateTimerDisplay(){
    if(!timerEl){
        return;
    }
    const minutes = Math.floor(timeleft / 60).toString().padStart(2, '0');
    const seconds = (timeleft % 60).toString().padStart(2, '0');
    timerEl.textContent = `Time: ${minutes}:${seconds}`;

}

//Időzítő indítása
export function startTimer(){
    stopTimer();
    updateTimerDisplay();
    intervalId = setInterval (() => {
        if(timeleft > 0){
            timeleft--;
            updateTimerDisplay();

        }else{
            //Hud elemek, illetve egyéb dolgok kezelése ha lejár az időzítő
            clearInterval(intervalId);
            gameRunningset(false);
            timesup.classList.remove("toleaderboard");
            player.locked = true;
            scorecontainer.classList.add("hidden");
            recipecontainer.classList.add("hidden");
            timesup.classList.remove("hidden");
            timesup.classList.add("timesupshow");
            endscore.textContent=endScore;
            
        }
    }, 1000);
}
//Az időzítő szüneteltetése/megállítása.
export function stopTimer(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
    
}

//Időzítő indítása (Folytatása ha megállítottuk)
export function resumeTimer(){
    if(!intervalId){
        startTimer();
    }
}
//Idzősítő resetelése
export function timerReset(){
    timeleft=delta;
    
}
