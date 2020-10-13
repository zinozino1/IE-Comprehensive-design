const targetText = document.getElementById("js-typing");

const addLetter = function (params) {
    let letters = targetText.innerHTML;

    let text1 = "  Resume.";
    let text2 = "  Goal.";
    let text3 = "  Passion.";
    let text4 = "  Life.";
    let elems = [text1, text2, text3, text4];
    let tmpStr = "";
    let index = 0;
    let textIndex = 0;
    let eleIndex = 0;

    let addInterval = setInterval(() => {
        if (index > elems[eleIndex].length - 1) {
            tmpStr = tmpStr.slice(0, -1);
            textIndex++;
            targetText.innerHTML = `Your <span>partner </span>for a successful ${tmpStr}<span id="js-cursor"></span>`;
            if (textIndex > elems[eleIndex].length - 1) {
                eleIndex++;
                if (eleIndex === elems.length) eleIndex = 0;
                index = 0;
                tmpStr = "";
                textIndex = 0;
            }
        } else {
            tmpStr += elems[eleIndex][index];
            targetText.innerHTML = `Your <span>partner </span>for a successful ${tmpStr}<span id="js-cursor"></span>`;
            index++;
        }
    }, 200);
};

const init = function (params) {
    addLetter();
};

init();
