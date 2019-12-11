console.log('test');

const article = document.querySelector("article");

if(article) {
    article.addEventListener('click', (ev) => {
        if(ev.target instanceof HTMLElement) {
            let bg = ev.target.style.background;
            if (bg === "red") ev.target.style.background = "blue";
                else {
                    ev.target.style.background = "red";
            }
        }
    })
}
