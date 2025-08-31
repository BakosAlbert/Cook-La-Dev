    //A játékban megjelenő hudok, menük, popup ablakok kezelése inicializálása
    import { startgame, gameRunningset } from "./gamestart.js";
    import { stopTimer, resumeTimer } from "../GameLogic/timing.js";
    import { gameRestart } from "../GameLogic/restart.js";
    import {timesup} from "../GameLogic/timing.js";
    import {scoreSave} from "../GameLogic/local.js";
    import { points } from "../GameLogic/scorelogic.js";
    import { renderLeaderboard } from "../GameLogic/local.js";
    
    //A gombok és hud elemek inicializálása
    export  const restartbutton = document.getElementById("restartbutton");
    export const leaderboardbutton = document.getElementById("leaderboardbutton");
    export let leaderboardlist=document.getElementById("data");
    const Mainmenu = document.getElementById("Mainmenu");
    const htp = document.getElementById("htp");
    const controls = document.getElementById("controls");
    const startbutton = document.getElementById("startbutton");
    const htpbutton = document.getElementById("htpbutton");
    const contbutton = document.getElementById("contbutton");
    const contbackbutton = document.getElementById("contbackbutton");
    const htpbackbutton = document.getElementById("htpbackbutton");
    const continuebutton = document.getElementById("continuebutton");
    const scorecontainer = document.getElementById("score-container");
    const music= document.getElementById("background-music");
    const leaderboardform = document.getElementById("getname");
    const submitbutton=document.getElementById("submitbutton");
    const leaderboard = document.getElementById("leaderboard");
    const tomenubutton = document.getElementById("tomenu");
    
    //A zene indítása
    window.addEventListener("DOMContentLoaded", () =>{
        music.volume="0.05";
        music.play().catch(err => {
            console.log("Nem indul a zene!");
        });
        
    })

    continuebutton.style.display = "none"; 
    
    //Gombok és hud elemek logikája
    startbutton.addEventListener("click", ()=>{
        Mainmenu.classList.add("hidden");
        leaderboardform.classList.add("hidden");
        leaderboard.classList.add("hidden");
        startgame();
        startbutton.style.display = "none";
        continuebutton.style.display = "block";
        scorecontainer.style.display = "inline-block";
        music.volume=0.035;
        Mainmenu.classList.add("ingame");
        htp.classList.add("ingame");
        controls.classList.add("ingame");
        console.log("Startgame indul");
        console.log("Points előtte:", points);
        console.log("Player locked:", player.locked);
        console.log("Startgame után points:", points);
        console.log("Player locked:", player.locked);
        
        
    });


    continuebutton.addEventListener("click", ()=>{
        if (Mainmenu.classList.contains("hidden")) {
            Mainmenu.classList.remove("hidden");
            htp.classList.add("hidden");
            controls.classList.add("hidden");
            stopTimer();
            player.locked = true;
            gameRunningset(false); 
                 
        } else {
            
            Mainmenu.classList.add("hidden");
            htp.classList.add("hidden");
            controls.classList.add("hidden");
            resumeTimer();
            player.locked = false;
            gameRunningset(true); 
                
        }
    });

    htpbutton.addEventListener("click", ()=>{
        Mainmenu.classList.add("hidden");
        htp.classList.remove("hidden");
        htpbackbutton.classList.remove("hidden");
    });

    contbutton.addEventListener("click", ()=>{
        Mainmenu.classList.add("hidden");
        htp.classList.add("hidden");
        controls.classList.remove("hidden");
        contbackbutton.classList.remove("hidden");

    });
    htpbackbutton.addEventListener("click", ()=>{
        htp.classList.add("hidden");
        htpbackbutton.classList.add("hidden");
        Mainmenu.classList.remove("hidden");
        
    });

    contbackbutton.addEventListener("click", ()=>{
        controls.classList.add("hidden");
        contbackbutton.classList.add("hidden");
        Mainmenu.classList.remove("hidden");
    });

    restartbutton.addEventListener("click", ()=>{
        gameRestart();
    });
    leaderboardbutton.addEventListener("click", ()=>{
        timesup.classList.remove("timesupshow");
        timesup.classList.add("hidden");
        leaderboardform.classList.remove("hidden");
    });
    document.addEventListener("DOMContentLoaded", ()=>{
        const playername = document.getElementById("playername");

        submitbutton.addEventListener("click", ()=>{
            let name = playername.value;
            if(name.trim() !== ""){
                scoreSave(name, points);
                console.log("Mentés sikeres");
                
            }else{
                alert("Sikertelen mentés!");
                return;
            }

            timesup.classList.add("hidden");
            leaderboardform.classList.add("hidden");
            renderLeaderboard();
            leaderboard.classList.remove("hidden");
        
        })
    });
    tomenubutton.addEventListener("click", ()=>{
        leaderboard.classList.add("hidden");
        Mainmenu.classList.remove("hidden");
        Mainmenu.classList.remove("ingame");
        htp.classList.remove("ingame");
        controls.classList.remove("ingame");
        continuebutton.style.display="none";
        startbutton.style.display="block";
    });

    
    //Az ESC gomb logikája
    document.addEventListener("keydown", (e) => {
        if (e.key && e.key.toLowerCase() === "escape") {
            if (Mainmenu.classList.contains("hidden")) {
                Mainmenu.classList.remove("hidden");
                htp.classList.add("hidden");
                controls.classList.add("hidden");
                stopTimer();
                player.locked = true;
                gameRunningset(false); 
                 
            } else {
                
                Mainmenu.classList.add("hidden");
                htp.classList.add("hidden");
                controls.classList.add("hidden");
                resumeTimer();
                player.locked = false;
                gameRunningset(true); 
                
            }
        }
    });

