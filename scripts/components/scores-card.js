export class ScoresCard extends HTMLElement {
    template(){
        return /*html*/`
        <div class="flex flex-col grow">
            <h1 class="my-4 text-3xl lg:text-4xl lg:my-10">Here are your scores!</h1>
            <div id="score-container">
                
            </div>
            <div class="container grow"></div>
            <div class="flex flex-col justify-end grid-cols-1 m-10 space-y-4 align-bottom lg:space-y-0 lg:grid-cols-2 grow lg:grow-0">
                <div id="end-button" class="flex items-center justify-center transition-colors grow max-h-16 min-h-16 lg:m-4 bg-pink-700/40 backdrop-contrast-200 hover:bg-pink-500/40 active:bg-pink-300/20 lg:h-32 text-pink-50 rounded-xl"><p>Back to Start</p></div>
            </div>
        </div>
        `;
    }
    constructor() {
        super();
        this.innerHTML = this.template();
    }
}