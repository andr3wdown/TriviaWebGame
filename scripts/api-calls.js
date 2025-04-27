export async function GetCategories(){
    let url = "https://opentdb.com/api_category.php";
    let categories = null;
    await $.get(url, (data) => {
        categories = data.trivia_categories;
    }
    ).fail((error) => {
        console.error("Error fetching categories:", error);
    });
    return categories;
}

export async function GetQuestion(category, difficulty, type="multiple"){
    let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=${type}`;
    let question = null;
    await $.get(url, (data) => {
        question = data.results[0];
    }
    ).fail((error) => {
        console.error("Error fetching question:", error);
    });
    return question;
}