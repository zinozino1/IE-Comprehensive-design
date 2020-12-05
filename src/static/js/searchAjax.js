const taskSearchBtn = document.querySelector("#taskSearch-btn");
const taskSelect = document.querySelector("#task-select");
const taskSearchForm = document.querySelector("#taskSearch-form");

const questionSearchBtn = document.querySelector("#questionSearch-btn");
const questionSelect = document.querySelector("#question-select");
const questionSearchForm = document.querySelector("#questionSearch-form");

const keywordSearchBtn = document.querySelector("#keywordSearch-btn");
const keywordSearchInput = document.querySelector("#keywordSearch-input");

const resultContainer = document.querySelector("#js-search-result");

let currentPage = 1;
let currentKeyword = "";
let searchMode = "";

const paintingKeyword = function (keyword, element) {
    //const paintingTarget = document.querySelector("#newDoc-answer-desc");
    let regex = new RegExp(keyword, "g");

    let wholeString = element.innerHTML;
    wholeString = wholeString.replace(
        regex,
        `<span style="background : #ff874b">${keyword}</span>`,
    );
    element.innerHTML = wholeString;
};

const scrapHandler = async function (e) {
    e.stopPropagation();
    const key = this.parentNode.parentNode.firstChild.innerHTML;

    this.style.background = "#16d200";
    this.style.transition = "0.4s";
    setTimeout(() => {
        this.style.background = "#fff";
    }, 1000);
    await fetch("http://localhost:4000/api/scrapDocument", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({ key, searchMode }),
    })
        .then((res) => {
            if (res.status === 404 || res.status === 400) {
                console.log(res.status);
            } else {
                return res.json();
            }
        })
        .then((json) => {
            if (json) {
                alert(json.msg);
                this.style.background = "#fff";
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const pagingData = function (result, curr) {
    if (result[0].length) {
        console.log("직무별 검색");
        resultContainer.innerHTML = "";
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

            resultContainer.appendChild(newDocContainer);
        }
        const newCol = document.querySelectorAll("#new-col");
        newCol.forEach(function (v) {
            const scrapBtn = document.createElement("button");
            scrapBtn.id = "scrap-btn";
            scrapBtn.innerHTML = `<i class="far fa-file-alt"></i>`;
            scrapBtn.addEventListener("click", scrapHandler);
            v.appendChild(scrapBtn);
        });
    } else {
        console.log("문항별 검색");
        resultContainer.innerHTML = "";
        for (let i = curr * 10 - 10; i <= curr * 10; i++) {
            const newDocContainer = document.createElement("div");
            newDocContainer.className = "new-document";

            newDocContainer.addEventListener("click", function (e) {
                e.stopPropagation();
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
                    newDocDesc.innerHTML += `<div id="newDoc-question"><div><span id="newDoc-question-string">문항</span>  <p id="newDoc-question-desc">${result[i].questionString}</p></div></div><div id="newDoc-answer"><div><span id="newDoc-task-string">답변</span> <p id="newDoc-answer-desc">${result[i].answer}</p></div></div>`;
                    newDocContainer.appendChild(newDocDesc);
                    if (searchMode === "keyword") {
                        paintingKeyword(currentKeyword, newDocDesc);
                    }
                }
            });
            if (!result[i]) break;
            if (result[i].taskString === "-") {
                switch (result[i].task) {
                    case `1`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span>| 경영 / 사무 / 영업 / 마케팅 </span></div></div> `;
                        break;
                    case `2`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | IT / 전산 / 네트워크 / DB </span></div></div>`;
                        break;
                    case `3`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | 생산 / 제조 / 플랜트 / 공정 </span></div></div>`;
                        break;
                    case `4`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | 건설 / 건축 / 시공</span></div></div> `;
                        break;
                    case `5`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | 유통 / 무역</span></div></div> `;
                        break;
                    case `6`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | R&D</span></div> </div>`;
                        break;
                    case `7`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | 전기/전자(설계, 제어) </span></div></div>`;
                        break;
                    case `8`:
                        newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                        visibility: hidden; position: absolute; left:-9999px;">${
                            result[i].key
                        }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                            i + 1
                        }</span><span id="company-string"> ${
                            result[i].company
                        }</span></div> <div id="task-col"><span> | 기타</span> </div></div>`;
                        break;
                    default:
                        break;
                }
            } else {
                newDocContainer.innerHTML += `<div id="key" style="opacity: 0;
                visibility: hidden; position: absolute; left:-9999px;">${
                    result[i].key
                }</div><div id="new-col"><div id="company-col"><span id="company-num">${
                    i + 1
                }</span><span id="company-string"> ${
                    result[i].company
                }</span></div> <div id="task-col"><span id="task-string">| ${
                    result[i].taskString
                }</span></div></div> `;
            }

            resultContainer.appendChild(newDocContainer);
        }
        const newCol = document.querySelectorAll("#new-col");
        newCol.forEach(function (v) {
            const scrapBtn = document.createElement("button");
            scrapBtn.id = "scrap-btn";
            scrapBtn.innerHTML = `<i class="far fa-file-alt"></i>`;
            scrapBtn.addEventListener("click", scrapHandler);
            v.appendChild(scrapBtn);
        });
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
    const currentPageNum = document.querySelector(
        `#${CSS.escape(currentPage)}`,
    );
    currentPageNum.style.background = "#555";
    currentPageNum.style.border = "1px solid black";
    currentPageNum.style.fontWeight = "600";
    currentPageNum.style.color = "#fff";

    console.log(currentPageNum);
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
};

const dataHandler = function (result) {
    paging(result);
    pagingData(result, 1);
};

const noneOfSearch = function () {
    resultContainer.innerHTML = "검색 결과가 없습니다.";
    const pages = document.querySelector(".paging-container");
    if (pages) {
        pages.innerHTML = "";
        const blankContainer = document.querySelector(".blank-container");
        blankContainer.style.display = "block";
    }
};

const taskSearchHandler = async function (event) {
    searchMode = "task";
    currentPage = 1;
    let resultArr = [];
    const searchReq = {
        task: taskSelect.value,
        // question: questionSelect.value,
    };
    if (searchReq.task === "") {
        noneOfSearch();
    } else {
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
            })
            .catch((error) => {
                console.log(error);
            });

        dataHandler(resultArr);
    }
};

const questionSearchHandler = async function (event) {
    searchMode = "question";
    currentPage = 1;
    const searchReq = {
        question: questionSelect.value,
    };
    if (searchReq.question === "") {
        noneOfSearch();
    } else {
        await fetch("http://localhost:4000/document/questionSearch", {
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
                resultContainer.innerHTML = "";

                paging(json.result);
                pagingData(json.result, 1);
            })

            .catch((error) => {
                console.log(error);
            });
    }
};

const keywordSearchHandler = async function () {
    searchMode = "keyword";
    currentPage = 1;
    const searchReq = {
        keyword: keywordSearchInput.value,
    };
    currentKeyword = searchReq.keyword;
    if (searchReq.keyword === "") {
        noneOfSearch();
    } else {
        await fetch("http://localhost:4000/document/keywordSearch", {
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
                if (json.result.length === 0) {
                    noneOfSearch();
                } else {
                    resultContainer.innerHTML = "";
                    paging(json.result);
                    pagingData(json.result, 1);
                }
            })

            .catch((error) => {
                console.log(error);
            });
    }
};

const btnDesignClosure = function (type) {
    const toggle = type;
    return function (e) {
        if (toggle === "task") {
            taskSearchBtn.style.background = "#ffee55";
            questionSearchBtn.style.background = "white";
            keywordSearchBtn.style.background = "white";
        } else if (toggle === "question") {
            questionSearchBtn.style.background = "#ffee55";
            taskSearchBtn.style.background = "white";
            keywordSearchBtn.style.background = "white";
        } else {
            questionSearchBtn.style.background = "white";
            taskSearchBtn.style.background = "white";
            keywordSearchBtn.style.background = "#ffee55";
        }
    };
};

const init = function () {
    taskSearchBtn.addEventListener("click", taskSearchHandler);
    taskSearchBtn.addEventListener("click", btnDesignClosure("task"));
    taskSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    questionSearchBtn.addEventListener("click", questionSearchHandler);
    questionSearchBtn.addEventListener("click", btnDesignClosure("question"));
    questionSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    keywordSearchBtn.addEventListener("click", keywordSearchHandler);
    keywordSearchBtn.addEventListener("click", btnDesignClosure("keyword"));
};

if (taskSearchForm) init();
