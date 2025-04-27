import { QuestionCard } from "./components/question-card.js";
import { StartCard } from "./components/start-card.js";
import { CategoriesCard } from "./components/categories-card.js";
import { EndCard } from "./components/end-card.js";
import { ScoresCard } from "./components/scores-card.js";

export function init_import(){
    customElements.define('start-card', StartCard);
    customElements.define('categories-card', CategoriesCard);
    customElements.define('question-card', QuestionCard);
    customElements.define('end-card', EndCard);
    customElements.define('scores-card', ScoresCard);
}