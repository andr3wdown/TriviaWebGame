

export class QuestionCard extends HTMLElement {
    template(){
        return /*html*/`
        <div class="flex flex-col grow">
            <h1 class="my-4 text-4xl lg:my-10">Question</h1>
            <p id="question" class="mx-10 text-lg lg:text-xl text-start text-wrap"></p>
            <div class="container grow"></div>
            <div class="grid justify-end grid-cols-1 m-10 space-y-4 align-bottom lg:space-y-0 lg:grid-cols-2 grow lg:grow-0">
                <div id="answer-0" class="flex items-center justify-center transition-colors min-h-16 lg:m-4 bg-pink-700/40 backdrop-contrast-200 hover:bg-pink-500/40 active:bg-pink-300/20 lg:h-32 text-pink-50 rounded-xl"><p>Answer1</p></div>
                <div id="answer-1" class="flex items-center justify-center transition-colors min-h-16 lg:m-4 bg-pink-700/40 backdrop-contrast-200 hover:bg-pink-500/40 active:bg-pink-300/20 lg:h-32 text-pink-50 rounded-xl"><p>Answer2</p></div>
                <div id="answer-2" class="flex items-center justify-center transition-colors min-h-16 lg:m-4 bg-pink-700/40 backdrop-contrast-200 hover:bg-pink-500/40 active:bg-pink-300/20 lg:h-32 text-pink-50 rounded-xl"><p>Answer3</p></div>
                <div id="answer-3" class="flex items-center justify-center transition-colors min-h-16 lg:m-4 bg-pink-700/40 backdrop-contrast-200 hover:bg-pink-500/40 active:bg-pink-300/20 lg:h-32 text-pink-50 rounded-xl"><p>Answer4</p></div>
            </div>
        </div>
        `;
    }
    constructor() {
        super();
        this.innerHTML = this.template();
    }
}