//A pontok kezelése szolgáló függvények
export let endScore=0;
export const scoreValueEl = document.getElementById('score-value');
export let points = 0;

//A pontszám kezelésére szolgáló függvény
export function score(scoreAmount){
    points+=scoreAmount;
    if(points < 0){
        points = 0;
    }
    scoredisplay();

}
//A pontot megjelenítú hud frissítése
export function scoredisplay(){
    endScore=points;
    scoreValueEl.textContent = points;
}
//A pontszám alaphelyzetbe állítása, hud frissítése
export function scoreReset(value){
    points=value;
    scoredisplay();
}