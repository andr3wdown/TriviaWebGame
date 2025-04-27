import { GetCategories } from "./api-calls.js";

//get categories from the API and store them in a variable
let categories = [];
categories = await GetCategories();
if (categories == null){
    alert("Error fetching categories. Please try again later.");
    throw new Error("Error fetching categories. Please try again later.");
}
// get a random set of 4 categories from the list of categories
export function GetFourCategories(){
    let fourCategories = [];
    // make a set to keep track of used indexes
    let usedIndexes = new Set();
    for (let i = 0; i < 4; i++){
        // get a random index from the categories array
        // if the index has already been used, get a new one
        let randomIndex = Math.floor(Math.random() * categories.length);
        while (usedIndexes.has(randomIndex)){
            randomIndex = Math.floor(Math.random() * categories.length);
        }
        // add the index to the set of used indexes and push the category to the array
        usedIndexes.add(randomIndex);
        fourCategories.push(categories[randomIndex]);
    }
    // return the array of categories
    return fourCategories;
}