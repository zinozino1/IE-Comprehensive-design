const myDocBtn = document.querySelector("#my-resume");
const targetMyDocContainer = document.querySelector(".mypage-articles");

let myDocCurrentPage = 1;

const myDocPagingData = function (result, curr) {
    const myDocListContainer = document.querySelector(".myDoc-list-container");
    myDocListContainer.innerHTML = "";
    for (let i = curr * 10 - 10; i <= curr * 10; i++) {
        const newDocContainer = document.createElement("div");
        newDocContainer.className = "new-document";

        newDocContainer.addEventListener("click", function (e) {
            e.stopPropagation();
            if (newDocContainer.id === "clicked") {
                newDocContainer.id = "";

                newDocContainer.removeChild(
                    newDocContainer.firstChild.nextElementSibling,
                );
            } else {
                newDocContainer.id = "clicked";
                const newDocDesc = document.createElement("div");
                newDocDesc.className = "document-desc";

                newDocDesc.addEventListener("click", function (event) {
                    event.stopPropagation();
                });
                newDocDesc.innerHTML += `<div id="newDoc-question"><div><span id="newDoc-question-string">문항</span>  <p id="newDoc-question-desc">${result[i].question}</p></div></div><div id="newDoc-answer"><div><span id="newDoc-task-string">답변</span> <p id="newDoc-answer-desc">${result[i].answer}</p></div></div>`;
                newDocContainer.appendChild(newDocDesc);
                // if (searchMode === "keyword") {
                //     paintingKeyword(currentKeyword, newDocDesc);
                // }
            }
        });
        if (!result[i]) break;

        newDocContainer.innerHTML += `<div id="new-col"><div id="myDoc-title-col"><span id="myDoc-num">${
            i + 1
        }</span><span id="myDoc-title-string"> ${
            result[i].title
        }</span></div> <div id="myDoc-createdAt-col"><span id="myDoc-createdAt-string"> ${
            result[i].createdAt.year
        }.${result[i].createdAt.month}.${result[i].createdAt.day} ${
            result[i].createdAt.hour === 0 ? "00" : result[i].createdAt.hour
        }:${
            result[i].createdAt.min < 10
                ? `0${result[i].createdAt.min}`
                : result[i].createdAt.min
        }</span></div><div><a id="analysis-from-mypage" href="http://localhost:4000/document/analysis?title=${
            result[i].title
        }&question=${result[i].question}&answer=${result[i].answer}&id=${
            result[i]._id
        }"><i class="far fa-file-alt"></i></a></div></div> `;

        myDocListContainer.appendChild(newDocContainer);
    }
};

const myDocPaging = function (result) {
    const dataPerPage = 10;
    let pageCount = 5;

    const totalPage = Math.ceil(result.length / 10);
    const pageGroup = Math.ceil(myDocCurrentPage / pageCount);

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
    const pageContainer = document.querySelector(".myDoc-paging-container");

    pageContainer.innerHTML = html;
    const pages = document.querySelectorAll(".myDoc-paging-container a");

    const currentPageNum = document.querySelector(
        `#${CSS.escape(myDocCurrentPage)}`,
    );
    currentPageNum.style.background = "#555";
    currentPageNum.style.border = "1px solid black";
    currentPageNum.style.fontWeight = "600";
    currentPageNum.style.color = "#fff";

    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener("click", function (e) {
            if (pages[i].id === "scrapPrev") {
                myDocCurrentPage = prev;
            } else if (pages[i].id === "scrapNext") {
                myDocCurrentPage = next;
            } else {
                myDocCurrentPage = parseInt(pages[i].id);
            }

            myDocPagingData(result, myDocCurrentPage);
            myDocPaging(result);
        });
    }
};

const paintMyDocumentContainer = function (result) {
    myDocPaging(result);
    myDocPagingData(result, 1);
};

const sortingResult = function (result) {
    result.sort((a, b) => new Date(b.RealDate) - new Date(a.RealDate));
    return result;
};

const getMyDocument = async function () {
    const userId = window.location.href.split("/mypage/")[1];
    console.log(userId);
    await fetch("http://localhost:4000/api/searchMyDocument", {
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
            paintMyDocumentContainer(sortingResult(json));
        })
        .catch((error) => {
            console.log(error);
        });
};

const makeMyDocPartionContainer = function () {
    const partitionContainer = document.createElement("div");
    partitionContainer.classList.add("myDoc-partial-container");
    partitionContainer.innerHTML = `<div class="myDoc-partition">
    <div id="myDoc-title">제목 </div>
    <div id="myDoc-createdAt">수정일자 </div>
    <div id="myDoc-analysis-btn">분석 </div>
</div>`;
    targetMyDocContainer.appendChild(partitionContainer);
};

const makeMyDocListContainer = function () {
    const myDocList = document.createElement("div");
    myDocList.classList.add("myDoc-list-container");
    targetMyDocContainer.appendChild(myDocList);
};

const makeMyDocPagingContainer = function () {
    const pageContainer = document.createElement("div");
    pageContainer.classList.add("myDoc-paging-container");
    targetMyDocContainer.appendChild(pageContainer);
};

const myDocBtnHandler = function (e) {
    targetMyDocContainer.innerHTML = "";
    makeMyDocPartionContainer();
    getMyDocument();
    makeMyDocListContainer();
    makeMyDocPagingContainer();
};

const init = function () {
    myDocBtn.addEventListener("click", myDocBtnHandler);
};

if (myDocBtn) init();
