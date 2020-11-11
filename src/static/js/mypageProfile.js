const profileEditBtn = document.querySelector("#profile-edit");
const targetContainer = document.querySelector(".mypage-articles");
let curreuntUserEmail = "";
let currentUserNickName = "";

const saveUser = function () {
    const saveProfileForm = document.querySelector("#profile-form");
    const saveBtn = document.querySelector("#profile-saveBtn");
    const inputEmail = document.querySelector("#user-email");
    const inputNickName = document.querySelector("#user-nickName");

    saveBtn.addEventListener("click", async (e) => {
        await fetch("http://localhost:4000/api/saveUser", {
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
                email: inputEmail.value,
                nickName: inputNickName.value,
            }),
        })
            .then((res) => {
                console.log(res.status);
                e.target.innerText = "저장완료!";
                e.target.style.background = "#fae206";
                e.target.style.color = "#f8fafc";
                e.target.style.transition = "0.2s";
            })

            .catch((error) => {
                console.log(error);
            });
    });
};

const paintEditContainer = function (email, nickName) {
    targetContainer.innerHTML = `<div id="profile-edit-container">
    <form id="profile-form">
        <div id="user-email-container">
        <div>
            <label for="user-email">email</label>
        </div>
            <input type="text" id="user-email" value="${email}" />
        </div>
        <div id="user-nickName-container">
        <div>
            <label for="user-nickName">닉네임</label>
        </div><input
                type="text"
                id="user-nickName"
                value="${nickName}"
            />
        </div>
        
    </form>
    <div id="profile-saveBtn-container">
            <button id="profile-saveBtn">저장</button>
    </div>
</div>`;
};

const getCurrentUser = async function () {
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
                user: { email, nickName },
            } = json;
            curreuntUserEmail = email;
            currentUserNickName = nickName;
            paintEditContainer(email, nickName);
            saveUser();
        })
        .catch((error) => {
            console.log(error);
        });
};

const editBtnHandler = function () {
    targetContainer.innerHTML = "";
    getCurrentUser();
};

const init = function () {
    profileEditBtn.addEventListener("click", editBtnHandler);
    getCurrentUser();
    paintEditContainer(curreuntUserEmail, currentUserNickName);
};

if (profileEditBtn) init();
