import { QuestionCard } from "./components/question-card.js";
import { StartCard } from "./components/start-card.js";
import { CategoriesCard } from "./components/categories-card.js";

export function init_import(){
    customElements.define('question-card', QuestionCard);
    customElements.define('start-card', StartCard);
    customElements.define('categories-card', CategoriesCard);
}