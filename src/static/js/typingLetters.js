const targetText = document.getElementById("js-typing");

const addLetter = function (params) {
    const letters = targetText.innerHTML;

    const elems = ["  Resume.", "  Goal.", "  Passion.", "  Life."];
    let tmpStr = "";
    let index = 0;
    let textIndex = 0;
    let eleIndex = 0;

    const addInterval = setInterval(() => {
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
    localStorage.setItem("isFirst", "true");
};

if (targetText) init();
