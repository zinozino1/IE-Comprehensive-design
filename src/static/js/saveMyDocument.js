const analSaveBtn = document.querySelector("#anal-saveBtn");

const saveInDB = async function (data) {
    function getQueryStringObject() {
        let a = window.location.search.substr(1).split("&");
        if (a === "") return {};
        let b = {};
        for (let i = 0; i < a.length; ++i) {
            let p = a[i].split("=", 2);
            if (p.length === 1) b[p[0]] = "";
            else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    }

    let qs = getQueryStringObject();

    const { title, question, answer, id } = qs;

    const queryString = window.location.href.split("?title=")[1];
    console.log(queryString);
    if (queryString) {
        console.log("쿼리있음"); // url에 쿼리스트링 붙여야함...
        await fetch(
            `http://localhost:4000/api/getSaveMyDocument?title=${data.title}&question=${data.question}&answer=${data.answer}&id=${id}`,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
            },
        )
            .then((res) => {
                if (res.status === 404 || res.status === 400) {
                    console.log(res.status);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        console.log("쿼리없음");
        await fetch("http://localhost:4000/api/saveMyDocument", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 404 || res.status === 400) {
                    console.log(res.status);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    analSaveBtn.style.background = "#16d200";
    analSaveBtn.style.transition = "0.5s";
    analSaveBtn.innerText = "저장완료!";
    setTimeout(() => {
        analSaveBtn.style.background = "#1369ea";
        analSaveBtn.innerText = "저장";
    }, 2000);
};

const saveBtnHandler = function (e) {
    const inputTitle = document.querySelector("#anal-input-title");
    const inputQuestion = document.querySelector("#anal-req");
    const inputAnswer = document.querySelector("#anal-res");
    const inputData = {
        title: inputTitle.value,
        question: inputQuestion.value,
        answer: inputAnswer.value,
    };
    saveInDB(inputData);
};

const init = function () {
    analSaveBtn.addEventListener("click", saveBtnHandler);
};

if (analSaveBtn) init();
