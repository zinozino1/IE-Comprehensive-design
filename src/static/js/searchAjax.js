const taskSearchBtn = document.querySelector("#taskSearch-btn");
const taskSelect = document.querySelector("#task-select");
const taskSearchForm = document.querySelector("#taskSearch-form");

const questionSearchBtn = document.querySelector("#questionSearch-btn");
const questionSelect = document.querySelector("#question-select");
const questionSearchForm = document.querySelector("#questionSearch-form");

const resultContainer = document.querySelector("#js-search-result");

const taskSearchRealTime = function (result) {
    // html element생성하는 함수
    // html 그리는 함수

    result.forEach(function (item) {
        const newDocContainer = document.createElement("div");
        newDocContainer.className = "new-document";
        newDocContainer.style.border = "1px solid black";
        for (let i = 0; i < item.length; i++) {
            newDocContainer.innerText += `${item[i].company} `;
            //resultContainer.innerText += `${i}번째 회사 : ${item[i].company} `;
        }
        resultContainer.appendChild(newDocContainer);
    });
};

const taskSearchHandler = async function (event) {
    let resultArr = [];
    const searchReq = {
        task: taskSelect.value,
        // question: questionSelect.value,
    };
    await fetch("http://localhost:4000/document/taskSearch", {
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
    })
        .then((res) => {
            if (res.status === 404 || res.status === 400) {
                console.log(res.status);
            } else if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            resultArr = json.result;

            console.log(json.result[0][0].task);
        });

    taskSearchRealTime(resultArr);
};

const questionSearchHandler = async function (event) {};

const init = function () {
    taskSearchBtn.addEventListener("click", taskSearchHandler);
    taskSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    questionSearchBtn.addEventListener("click", questionSearchHandler);
    questionSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
};

if (taskSearchForm) init();
