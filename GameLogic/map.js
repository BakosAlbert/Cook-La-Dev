//A pálya konfigurációja
//Az alapok inicializálása (pultok, kiszolgáló asztal, talaj)
export const baseLayer = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,6,7,8,9,11,12,13,14,16,17,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,5],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,0,0,0,0,2,1,2,0,0,0,2,1],
    [1,0,0,0,0,2,1,2,0,0,0,2,1],
    [1,2,4,2,2,1,1,1,2,2,2,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
];

//A pultokon előforduló eszközök konfigurációja (egyenlőre vágódeszka)
export const objectLayer = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,42,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,41,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

//A pálya generálása
export function generateMap() {
    const container = document.getElementById("gameContainer");
    container.innerHTML = "";

    const tileSize = 32; // tile mérete pixelben
    container.style.width = baseLayer[0].length * tileSize + "px";
    container.style.height = baseLayer.length * tileSize + "px";

    for (let y = 0; y < baseLayer.length; y++) {
        for (let x = 0; x < baseLayer[y].length; x++) {
        const base = baseLayer[y][x];
        const object = objectLayer[y][x];

        // Alap réteg (pl. padló, fal, pult)
        const tile = document.createElement("div");
        tile.classList.add("tile");

        switch (base) {
            //Alap textúrák, pl padló, fal
            case 0: tile.classList.add("floor"); break;
            case 1: tile.classList.add("wall"); break;

            //Pult
            case 2: tile.classList.add("counter"); break;

            //Egyéb használható tereptárgyak pl. kuka
            case 4: tile.classList.add("trashcan"); break;
            case 5: tile.classList.add("servedesk"); break;

            //Alapanyag ládák (pl. paradicsom, hagyma, stb.)
            case 6: tile.classList.add("tomatocrate"); break;
            case 7: tile.classList.add("lettucecrate"); break;
            case 8: tile.classList.add("onioncrate"); break;
            case 9: tile.classList.add("cheesecrate"); break;
            case 11: tile.classList.add("fishmeatcrate"); break;
            case 12: tile.classList.add("chickenmeatcrate"); break;
            case 13: tile.classList.add("beefmeatcrate"); break;
            case 14: tile.classList.add("ricecrate"); break;
            case 16: tile.classList.add("mushroomcrate"); break;
            case 17: tile.classList.add("hamburgerbunscrate"); break;

        }

        tile.style.left = x * 32 + "px";
        tile.style.top = y * 32 + "px";
        container.appendChild(tile);

        // Objektum réteg
        if (object !== 0) {
            const obj = document.createElement("div");
            obj.classList.add("tile", "overlay");

            switch (object) {
            case 41: 
                obj.classList.add("cuttingboardtopdown");
                obj.id = `cuttingboard_${x}_${y}`; 
                break;
            case 42: 
                obj.classList.add("cuttingboardside");
                obj.id = `cuttingboard_${x}_${y}`; 
                break;
            case 5: obj.classList.add("pan"); break;
            case 6: obj.classList.add("pot"); break;
            case 7: obj.classList.add("plate"); break;
            }

            obj.style.left = x * 32 + "px";
            obj.style.top = y * 32 + "px";
            container.appendChild(obj);
        }
        }
    }
}