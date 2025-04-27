import { GetCategories } from "./api-calls.js";

let categories = [];
categories = await GetCategories();
if (categories == null){
    alert("Error fetching categories. Please try again later.");
    throw new Error("Error fetching categories. Please try again later.");
}

export function GetFourCategories(){
    let fourCategories = [];
    let usedIndexes = new Set();
    for (let i = 0; i < 4; i++){
        let randomIndex = Math.floor(Math.random() * categories.length);
        while (usedIndexes.has(randomIndex)){
            randomIndex = Math.floor(Math.random() * categories.length);
        }
        usedIndexes.add(randomIndex);
        fourCategories.push(categories[randomIndex]);
    }
    return fourCategories;
}