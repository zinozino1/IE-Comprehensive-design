const taskSearchBtn = document.querySelector("#taskSearch-btn");
const taskSelect = document.querySelector("#task-select");
const taskSearchForm = document.querySelector("#taskSearch-form");

const questionSearchBtn = document.querySelector("#questionSearch-btn");
const questionSelect = document.querySelector("#question-select");
const questionSearchForm = document.querySelector("#questionSearch-form");

const resultContainer = document.querySelector("#js-search-result");

let currentPage = 1;

const pagingData = function (result, curr) {
    resultContainer.innerHTML = "";
    for (let i = curr * 10 - 9; i <= curr * 10; i++) {
        const newDocContainer = document.createElement("div");
        newDocContainer.className = "new-document";
        newDocContainer.style.border = "1px solid black";
        newDocContainer.addEventListener("click", function (e) {
            if (newDocContainer.id === "clicked") {
                newDocContainer.id = "";
                console.log(newDocContainer.firstChild.nextSibling);
                newDocContainer.removeChild(
                    newDocContainer.firstChild.nextSibling,
                );
            } else {
                newDocContainer.id = "clicked";
                const newDocDesc = document.createElement("div");
                newDocDesc.className = "document-desc";
                newDocDesc.style.border = "1px solid red";
                for (let j = 0; j < result[i].length; j++) {
                    newDocDesc.innerHTML += `question : ${result[i][j].question},,,,, answer : ${result[i][j].answer}`;
                }
                newDocContainer.appendChild(newDocDesc);
            }
        });
        if (!result[i]) break;
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
};

const paging = function (result) {
    const dataPerPage = 10;
    let pageCount = 5;

    const totalPage = Math.ceil(result.length / 10);
    const pageGroup = Math.ceil(currentPage / pageCount);
    console.log(`totalpage : ${totalPage}`);
    console.log(`pageGroup : ${pageGroup}`);

    let last = pageGroup * pageCount;
    let lastDiff = 0;
    if (last > totalPage) {
        lastDiff = last - totalPage;
        last = totalPage;
    }
    if (totalPage < 5) pageCount = totalPage;
    let first = 0;
    if (lastDiff === 0) {
        first = last - (pageCount - 1);
    } else {
        first = last + lastDiff - 4;
    }
    let next = last + 1;
    let prev = first - 1;

    console.log(`first : ${first}`);
    console.log(`last : ${last}`);
    console.log(`next : ${next}`);
    console.log(`prev : ${prev}`);
    console.log(`current Page : ${currentPage}`);

    const pageContainer = document.querySelector(".paging-container");
    let html = "";

    if (prev > 0) {
        html += `<a id='prev'><</a> `;
    }
    for (let i = first; i <= last; i++) {
        html += `<a id=${i}>${i}</a> `;
    }
    if (last < totalPage) {
        html += `<a id='next'>></a>`;
    }

    pageContainer.innerHTML = html;
    const pages = document.querySelectorAll(".paging-container a");
    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener("click", function (e) {
            if (pages[i].id === "prev") {
                currentPage = prev;
            } else if (pages[i].id === "next") {
                currentPage = next;
            } else {
                currentPage = parseInt(pages[i].id);
            }

            pagingData(result, currentPage);
            paging(result);
        });
    }
    // document.querySelectorAll(".paging-container a").forEach(function (item) {
    //     item.onclick = function () {
    //         paging(result); // curreunt page 바꿔야댐
    //     };
    // });
};

const taskDataHandler = function (result) {
    console.log(result.length);
    const column = document.createElement("div");
    column.innerText = "-회사명-               -직무-";
    resultContainer.appendChild(column);
    resultContainer.innerHTML = "";

    paging(result);
    pagingData(result, 1);
};

const taskSearchHandler = async function (event) {
    currentPage = 1;
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
        })
        .catch((error) => {
            resultContainer.innerHTML = "검색 결과가 없습니다.";
            console.log(error);
        });

    taskDataHandler(resultArr);
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
