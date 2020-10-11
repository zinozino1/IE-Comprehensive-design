const targetText = document.getElementById("js-typing");

const addLetter = function (params) {
    let letters = targetText.innerHTML;
    let text1 = "  resume";
    let text2 = "  experience";
    let text3 = "  passion";
    let tmpStr = "";
    let index = 0;
    let interval = setInterval(() => {
        targetText.innerHTML += text1[index];
        index++;
        if (index > text1.length - 1) {
            index = 0;
            clearInterval(interval);
        }
    }, 200);
};

const init = function (params) {
    addLetter();
};
init();
