//calls to the Open Trivia Database API to get trivia categories
export async function GetCategories(){
    // Check if categories are already in local storage and not expired
    // If they are, return them
    let categories = localStorage.getItem("categories");
    if (categories != null){
        categories = JSON.parse(categories);
        if(new Date().getTime() > categories.expiration){
            categories = null;
        }
        else {
            categories = categories.data;
        }
    }
    //If categories are not in local storage or expired, request them from the API
    let url = "https://opentdb.com/api_category.php";
    await $.get(url, (data) => {
        categories = data.trivia_categories;
    }
    ).fail((error) => {
        console.error("Error fetching categories:", error);
    });
    // Store the categories in local storage with an expiration date of 1 week
    // This is to avoid hitting the API too many times
    if (categories != null){
        localStorage.setItem("categories", JSON.stringify({
            data: categories,
            expiration: new Date().getTime() + 1000 * 60 * 60 * 24 * 7 // 1 week
        }));
    }
    // Return the categories
    return categories;
}
// Get a random question from the Open Trivia Database API based on the category, difficulty, and type
export async function GetQuestion(category, difficulty, type="multiple"){
    //Request a random question from the Open Trivia Database API
    let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=${type}`;
    let question = null;
    await $.get(url, (data) => {
        question = data.results[0];
    }
    ).fail((error) => {
        console.error("Error fetching question:", error);
    });
    //return the question
    return question;
}