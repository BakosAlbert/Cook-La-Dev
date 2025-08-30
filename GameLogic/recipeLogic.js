//A receptek kezelésésre szolgáló függvények
import {recipes} from "./recepies.js";
import {score} from "./scorelogic.js";
import {sounds} from "./audio.js";
import { placedItems } from "./constvariable.js";
import { interactWithTile, key, tile, base } from "./interactions.js";
import { showHeldItem } from "./utils.js";

//A szükséges változók inicializálása
export let currentRecipe = null;
export let completedIngredients = []; 

//A recept hud megjenítésére és frissítésére szolgáló függvény
export function renderRecipeUI(recipe, completedIngredients){
    const container = document.querySelector(".recipe-ui");
    const header = document.querySelector(".recipe-header");
    if(!container || !header){
        console.error("Recipe UI elements not found");
        return;
    }
    header.textContent = recipe.name;
    container.innerHTML = "";

    recipe.ingredients.forEach(ingredient =>{
        const div = document.createElement("div");
        div.className = "ingredient";

        if(completedIngredients.includes(ingredient)){
            div.classList.add("completed");
        }

        div.textContent = ingredient.replace(/_/g, " ");
        container.appendChild(div);
    });
    const allCompleted = recipe.ingredients.every(i => completedIngredients.includes(i));
    header.classList.toggle("completed", allCompleted);
}
//Függvény random recept választásához
export function pickRandomRecipe(){
    const index = Math.floor(Math.random() * recipes.length);
    currentRecipe = recipes[index];
    completedIngredients = [];
    renderRecipeUI(currentRecipe, completedIngredients);
    return currentRecipe;
}
//Recept ellenőrző
export function RecipeChecker(){
    if(currentRecipe.ingredients.includes(player.heldItem) && !completedIngredients.includes(player.heldItem)){
        completedIngredients.push(player.heldItem);
        sounds.correct.play();
        score(15);
        player.heldItem = null;
        renderRecipeUI(currentRecipe, completedIngredients);

    }else{
        sounds.wrong.volume = 0.5;
        sounds.wrong.play();
        score(-35);
        delete placedItems[key];
        player.heldItem = null;
        

    }

    if(completedIngredients.length === currentRecipe.ingredients.length){
        sounds.bell.volume = 0.5;
        sounds.bell.play();
        pickRandomRecipe();
    }
    showHeldItem();
    return;
}