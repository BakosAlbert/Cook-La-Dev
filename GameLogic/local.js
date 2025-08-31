//A localStorageba történő pont mentés
import {leaderboardlist} from "../menu/menulogic.js";

//A pont mentése
export function scoreSave(name, points){
    
    let scores = JSON.parse(localStorage.getItem("highscore")) ||[];
    scores.push({name, points});
    scores.sort((a,b) => b.points - a.points);
    scores = scores.slice(0,10);

    localStorage.setItem("highscore", JSON.stringify(scores));
}

//A ranglista inicalizálása, adatok beolvasása a megjelenítése
export function renderLeaderboard(){
    let scores = JSON.parse(localStorage.getItem("highscore")) ||[];
    leaderboardlist.innerHTML="";
    scores.forEach((entry, index) =>{
        let p = document.createElement("p");
        p.classList.add("datas");
        let point=document.createElement("span");
        point.classList.add("players-point");
        let name=document.createElement("span");
        name.classList.add("players-name");
        name.textContent=`${entry.name}`;
        point.textContent=entry.points;
        p.appendChild(name);
        p.appendChild(point);
        leaderboardlist.appendChild(p);
    });
    
}