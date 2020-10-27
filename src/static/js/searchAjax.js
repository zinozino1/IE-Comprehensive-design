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
    let count = 0;
    const column = document.createElement("div");
    column.innerText = "-회사명-               -직무-";
    resultContainer.appendChild(column);
    resultContainer.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const newDocContainer = document.createElement("div");
        newDocContainer.className = "new-document";
        newDocContainer.style.border = "1px solid black";
        for (let j = 0; j < 1; j++) {
            switch (result[i][j].task) {
                case `1`:
                    newDocContainer.innerText += `${result[i][j].company} | 경영 / 사무 / 영업 / 마케팅 / 금융 / 자재 / 기획 `;
                    break;
                case `2`:
                    newDocContainer.innerText += `${result[i][j].company} | IT / 전산 / 네트워크 / 데이터베이스 `;
                    break;
                case `3`:
                    newDocContainer.innerText += `${result[i][j].company} | 생산 / 제조 / 환경 / 플랜트 / 기계 설비 / 공정 / 설계 / 설비 / 품질 `;
                    break;
                case `4`:
                    newDocContainer.innerText += `${result[i][j].company} | 건설 / 건축 / 시공  `;
                    break;
                case `5`:
                    newDocContainer.innerText += `${result[i][j].company} | 유통 / 무역 `;
                    break;
                case `6`:
                    newDocContainer.innerText += `${result[i][j].company} | R&D `;
                    break;
                case `7`:
                    newDocContainer.innerText += `${result[i][j].company} | 전기/전자(설계, 제어) `;
                    break;
                case `8`:
                    newDocContainer.innerText += `${result[i][j].company} | 기타 `;
                    break;
                default:
                    break;
            }
        }
        resultContainer.appendChild(newDocContainer);
    }

    // result.forEach(function (item) {
    //     const newDocContainer = document.createElement("div");
    //     newDocContainer.className = "new-document";
    //     newDocContainer.style.border = "1px solid black";
    //     for (let i = 0; i < 1; i++) {
    //         switch (item[i].task) {
    //             case `1`:
    //                 newDocContainer.innerText += `${item[i].company} | 경영 / 사무 / 영업 / 마케팅 / 금융 / 자재 / 기획 `;
    //                 break;
    //             case `2`:
    //                 newDocContainer.innerText += `${item[i].company} | IT / 전산 / 네트워크 / 데이터베이스 `;
    //                 break;
    //             case `3`:
    //                 newDocContainer.innerText += `${item[i].company} | 생산 / 제조 / 환경 / 플랜트 / 기계 설비 / 공정 / 설계 / 설비 / 품질 `;
    //                 break;
    //             case `4`:
    //                 newDocContainer.innerText += `${item[i].company} | 건설 / 건축 / 시공  `;
    //                 break;
    //             case `5`:
    //                 newDocContainer.innerText += `${item[i].company} | 유통 / 무역 `;
    //                 break;
    //             case `6`:
    //                 newDocContainer.innerText += `${item[i].company} | R&D `;
    //                 break;
    //             case `7`:
    //                 newDocContainer.innerText += `${item[i].company} | 전기/전자(설계, 제어) `;
    //                 break;
    //             case `8`:
    //                 newDocContainer.innerText += `${item[i].company} | 기타 `;
    //                 break;
    //             default:
    //                 break;
    //         }
    //         // newDocContainer.innerText += `${item[i].company}  ${item[i].task}`;
    //         //resultContainer.innerText += `${i}번째 회사 : ${item[i].company}d `;
    //     }
    //     resultContainer.appendChild(newDocContainer);
    // });
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
