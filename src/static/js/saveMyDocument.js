const analSaveBtn = document.querySelector("#anal-saveBtn");
const inputTitle = document.querySelector("#anal-input-title");
const inputQuestion = document.querySelector("#anal-req");
const inputAnswer = document.querySelector("#anal-res");

const saveInDB = async function (data) {
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
};

const saveBtnHandler = function (e) {
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
