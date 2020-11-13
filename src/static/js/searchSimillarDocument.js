const searchBtn = document.querySelector("#anal-search");
const analysisTopContainer = document.querySelector(".anal-top");
const inputContainer = document.querySelector(".analysis-input");

const showResultDocument = function () {};

const splitView = function () {
    const similarDocContainer = document.createElement("div");
    const inputTitle = document.querySelector("#anal-input-title");
    const question = document.querySelector("#anal-req");
    const answer = document.querySelector("#anal-res");

    similarDocContainer.classList.add("simillar-doc-container");
    similarDocContainer.style.border = "1px solid black";
    similarDocContainer.innerHTML = "fuck";
    similarDocContainer.classList.add("analysis-newContainer-init");

    inputTitle.classList.add("analysis-traverse-animation-init");
    question.classList.add("analysis-traverse-animation-init");
    answer.classList.add("analysis-traverse-animation-init");

    // analysisTopContainer.appendChild(similarDocContainer);
    setTimeout(() => {
        inputTitle.classList.add("analysis-traverse-animation");
        question.classList.add("analysis-traverse-animation");
        answer.classList.add("analysis-traverse-animation");

        similarDocContainer.classList.add("analysis-traverse-animation");
    }, 30);
    // setTimeout(() => {
    //     // similarDocContainer.classList.add("analysis-traverse-animation");
    //     similarDocContainer.style.border = "1px solid black";
    //     similarDocContainer.innerHTML = "fuck";

    //     analysisTopContainer.appendChild(similarDocContainer);
    // }, 300);
};

const fetchData = async function (data) {
    // 파이썬 클라우드 서버로 보내야함
    await fetch("http://localhost:4000/api/searchSimillarDocument", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({
            data,
        }),
    })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((json) => {
            // 파이썬 서버로부터 온 데이터 로직 처리
            splitView();
        })

        .catch((error) => {
            console.log(error);
        });
};

const searchBtnHandler = function (e) {
    const inputTitle = document.querySelector("#anal-input-title");
    const inputQuestion = document.querySelector("#anal-req");
    const inputAnswer = document.querySelector("#anal-res");
    const inputData = {
        title: inputTitle.value,
        question: inputQuestion.value,
        answer: inputAnswer.value,
    };
    fetchData(inputData);
};

const init = function () {
    searchBtn.addEventListener("click", searchBtnHandler);
};

if (searchBtn) init();
