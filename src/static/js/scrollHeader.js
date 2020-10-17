const header = document.querySelector("header");

const scrollHandler = function () {
    if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.65)";
        header.style.transition = "0.3s";
    } else if (window.scrollY === 0) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.425)";
    }
};

const init = function () {
    window.addEventListener("scroll", scrollHandler);
};

init();
