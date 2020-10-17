const docSearchBtn = document.querySelector("#docSearch-btn");
const taskSelect = document.querySelector("#task-select");
const questionSelect = document.querySelector("#question-select");
const submitBtn = document.querySelector("#docSearch-btn");
const searchForm = document.querySelector("#search-form");

const searchBtnHandler = function (event) {
    const searchReq = {
        task: taskSelect.value,
        question: questionSelect.value,
    };
    fetch("http://localhost:4000/document/search", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(searchReq),
    });
};

const init = function () {
    docSearchBtn.addEventListener("click", searchBtnHandler);
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
};

init();
