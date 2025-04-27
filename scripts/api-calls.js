export async function GetCategories(){
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

    let url = "https://opentdb.com/api_category.php";
    
    await $.get(url, (data) => {
        categories = data.trivia_categories;
    }
    ).fail((error) => {
        console.error("Error fetching categories:", error);
    });

    if (categories != null){
        localStorage.setItem("categories", JSON.stringify({
            data: categories,
            expiration: new Date().getTime() + 1000 * 60 * 60 * 24 * 7 // 1 week
        }));
    }
    
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