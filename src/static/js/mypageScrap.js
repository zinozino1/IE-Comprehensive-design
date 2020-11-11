const scrapBtn = document.querySelector("#resume-scrap");
const targetContainer = document.querySelector(".mypage-articles");

const getUserInfo = async function () {
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
            scrap.forEach((v) => {
                console.log(v.company);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

const scrapBtnHandler = function () {
    targetContainer.innerHTML = "";
    getUserInfo();
};

const init = function () {
    scrapBtn.addEventListener("click", scrapBtnHandler);
};

if (scrapBtn) init();
