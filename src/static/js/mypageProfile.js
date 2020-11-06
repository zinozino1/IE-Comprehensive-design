const profileEditBtn = document.querySelector("#profile-edit");
const targetContainer = document.querySelector(".mypage-articles");

const saveUser = function () {
    const saveProfileForm = document.querySelector("#profile-form");
    const saveBtn = document.querySelector("#profile-saveBtn");
    const inputEmail = document.querySelector("#user-email");
    const inputNickName = document.querySelector("#user-nickName");

    saveBtn.addEventListener("click", async (e) => {
        console.log(1111);
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
            body: JSON.stringify({
                email: inputEmail.value,
                nickName: inputNickName.value,
            }),
        })
            .then((res) => {
                console.log(res.status);
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
            <label for="user-email">email</label
            ><input type="text" id="user-email" value="${email}" />
        </div>
        <div id="user-nickName-container">
            <label for="user-nickName">ninkname</label
            ><input
                type="text"
                id="user-nickName"
                value="${nickName}"
            />
        </div>
        
    </form>
    <div>
            <button id="profile-saveBtn">Save</button>
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
            paintEditContainer(email, nickName);
            saveUser();
        })
        .catch((error) => {
            console.log(error);
        });
};

const btnHandler = function () {
    getCurrentUser();
};

const init = function () {
    profileEditBtn.addEventListener("click", btnHandler);
};

if (profileEditBtn) init();
