const scrapBtn = document.querySelector("#resume-scrap");
const targetContainer = document.querySelector(".mypage-articles");

// const mypageContainer = document.querySelector("");

let currentPage = 1;

const scrapPagingData = function (result, curr) {
    const scrapListContainer = document.querySelector(".scrap-list-container");
    scrapListContainer.innerHTML = "";
    for (let i = curr * 10 - 10; i <= curr * 10; i++) {
        const newDocContainer = document.createElement("div");
        newDocContainer.className = "new-document";

        newDocContainer.addEventListener("click", function (e) {
            if (newDocContainer.id === "clicked") {
                newDocContainer.id = "";

                newDocContainer.removeChild(
                    newDocContainer.firstChild.nextElementSibling
                        .nextElementSibling,
                );
            } else {
                newDocContainer.id = "clicked";
                const newDocDesc = document.createElement("div");
                newDocDesc.className = "document-desc";

                newDocDesc.addEventListener("click", function (event) {
                    event.stopPropagation();
                });
                for (let j = 0; j < result[i].length; j++) {
                    newDocDesc.innerHTML += `<div id="newDoc-question"><div><span id="newDoc-question-string">문항</span>  <p id="newDoc-question-desc">${result[i][j].questionString}</p></div></div><div id="newDoc-answer"><div><span id="newDoc-task-string">답변</span> <p id="newDoc-answer-desc">${result[i][j].answer}</p></div></div>`;
                }
                newDocContainer.appendChild(newDocDesc);
            }
        });
        if (!result[i]) break;
        for (let j = 0; j < 1; j++) {
            if (result[i][j].taskString === "-") {
                switch (result[i][j].task) {
                    case `1`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span>| 경영 / 사무 / 영업 / 마케팅 </span></div></div> `;
                        break;
                    case `2`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | IT / 전산 / 네트워크 / DB </span></div></div>`;
                        break;
                    case `3`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | 생산 / 제조 / 플랜트 / 공정 </span></div></div>`;
                        break;
                    case `4`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | 건설 / 건축 / 시공</span></div></div> `;
                        break;
                    case `5`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | 유통 / 무역</span></div></div> `;
                        break;
                    case `6`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | R&D</span></div> </div>`;
                        break;
                    case `7`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | 전기/전자(설계, 제어) </span></div></div>`;
                        break;
                    case `8`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                            visibility: hidden; position: absolute; left:-9999px;">${
                                result[i][j].key
                            }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i][j].company
                        }</span></div> <div id="task-col"><span> | 기타</span> </div></div>`;
                        break;
                    default:
                        break;
                }
            } else {
                newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                    visibility: hidden; position: absolute; left:-9999px;">${
                        result[i][j].key
                    }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                    i + 1
                }</span><span id="company-string"> ${
                    result[i][j].company
                }</span></div> <div id="task-col"><span id="task-string">| ${
                    result[i][j].taskString
                }</span></div></div> `;
                // <button id="scrap-btn"><i class="far fa-file-alt"></i></button>
            }
        }

        scrapListContainer.appendChild(newDocContainer);
    }
};

const scrapPaging = function (result) {
    const dataPerPage = 10;
    let pageCount = 5;

    const totalPage = Math.ceil(result.length / 10);
    const pageGroup = Math.ceil(currentPage / pageCount);

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

    // const pageContainer = document.querySelector(".paging-container");
    let html = "";

    if (prev > 0) {
        html += `<a id='scrapPrev'><</a> `;
    }
    for (let i = first; i <= last; i++) {
        html += `<a id=${i}>${i}</a> `;
    }
    if (last < totalPage) {
        html += `<a id='scrapNext'>></a>`;
    }
    const pageContainer = document.querySelector(".scrapPaging-container");

    pageContainer.innerHTML = html;
    const pages = document.querySelectorAll(".scrapPaging-container a");

    const currentPageNum = document.querySelector(
        `#${CSS.escape(currentPage)}`,
    );
    currentPageNum.style.background = "#555";
    currentPageNum.style.border = "1px solid black";
    currentPageNum.style.fontWeight = "600";
    currentPageNum.style.color = "#fff";

    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener("click", function (e) {
            if (pages[i].id === "scrapPrev") {
                currentPage = prev;
            } else if (pages[i].id === "scrapNext") {
                currentPage = next;
            } else {
                currentPage = parseInt(pages[i].id);
            }

            scrapPagingData(result, currentPage);
            scrapPaging(result);
        });
    }
};

const scrapDataHandler = function (result) {
    scrapPaging(result);
    scrapPagingData(result, 1);
};

const mergeData = function (data) {
    const wholeArr = [];
    const target = [];
    let key = data[0].indexString;

    target.push(key);
    for (let i = 0; i < data.length; i++) {
        if (data[i].indexString !== key) {
            target.push(data[i].indexString);
            key = data[i].indexString;
        }
    }
    for (let i = 0; i < target.length; i++) {
        const tmpArr = data.filter(function (item) {
            const innerKey = target[i];
            return item.indexString === innerKey;
        });
        wholeArr.push(tmpArr);
    }

    return wholeArr;
};

const getScrapData = async function () {
    const userId = window.location.href.split("/mypage/")[1];
    console.log(userId);
    await fetch("http://localhost:4000/api/searchUser", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({ userId }),
    })
        .then((res) => {
            if (res.status === 404 || res.status === 400) {
                console.log(res.status);
            } else if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            const {
                user: { scrap },
            } = json;
            // scrap.forEach((v) => {
            //     console.log(v.company);
            // });
            const result = mergeData(scrap);
            scrapDataHandler(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

const makePartionContainer = function () {
    const partitionContainer = document.createElement("div");
    partitionContainer.classList.add("scrap-partial-container");
    partitionContainer.innerHTML = `<div class="scrap-partition">
    <div id="scrap-company-name">기업명 </div>
    <div id="scrap-task-name">직무 </div>
</div>`;
    targetContainer.appendChild(partitionContainer);
};

const makeScrapListContainer = function () {
    const scrapList = document.createElement("div");
    scrapList.classList.add("scrap-list-container");
    targetContainer.appendChild(scrapList);
};

const makeScrapPagingContainer = function () {
    const pageContainer = document.createElement("div");
    pageContainer.classList.add("scrapPaging-container");
    targetContainer.appendChild(pageContainer);
};

const scrapBtnHandler = function () {
    targetContainer.innerHTML = "";
    makePartionContainer();
    getScrapData();
    makeScrapListContainer();
    makeScrapPagingContainer();
};

const init = function () {
    scrapBtn.addEventListener("click", scrapBtnHandler);
};

if (scrapBtn) init();
