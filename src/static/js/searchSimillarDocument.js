const searchBtn = document.querySelector("#anal-search");
const analysisTopContainer = document.querySelector(".anal-top");
const inputContainer = document.querySelector(".analysis-input");
const loaderContainer = document.querySelector("#loader");

const loader = function () {
    loaderContainer.innerHTML += "loading...";

    loaderContainer.style.display = "block";
};

const tmpAnalData = {
    result: [
        {
            _id: 111,
            key: "1621",
            index: "425",
            indexString: "W425",
            company: "한국서부발전(주)",
            task: "8",
            taskString: "산업안전",
            question: "9",
            questionString:
                "7. *[Action & Result] 구성원간의 갈등을 해소하기 위해 어떤 노력을 하셨으며, 그에 따른 결과는 무엇이었는지 구체적으로 제시해 주십시오.",
            answer:
                "[평범한 듯 특별한]저는, 감정싸움으로 까지 번지게 될 이유가 없다고 생각하여, 모두의 부담을 덜어 줄 수 있는 아이디어를 제공하는 것이 문제 해결의 좋은 방안이라 판단했습니다.그리하여, 모든 소대원들에게 '평소에 생활을 통해 교통 업무에 가장 알맞은 사람이 누구인가' 라는 투표를 제안해 보았고, 이 제안은 모두가 수긍 할 수 있도록 공정하게 진행되었습니다. 그 결과, 소대원 전원의 투표 및 소대장님의 의견을 종합하여 대원을 선발하게 되었고, 잘 마무리 할 수 있었습니다.물론, 조직에 큰 변화를 주도한 것은 아니나, 가장 빠르고 간단하며, 합리적인 방법으로 필요시 마찰을 위해 노력하는 자세를 배웠다고 생각하며, 조직 내에서 마찰이 발생하였을 때에도 빠르게 대처할 수 있을 것이라 생각됩니다.",
        },
        {
            _id: 222,
            key: "1437",
            index: "381",
            indexString: "W381",
            company: "엔테크서비스(주)",
            task: "8",
            taskString: "QA·CS강사·수퍼바이저",
            question: "1",
            questionString: "2. NHN Technology Services 주식회사 지원동기",
            answer:
                "2015년 10월부터 매주 수요일에 있는 Harvard Business Review Korea잡지를 읽고 발제하는 자리에 참석하여 제조,물류,생산,금융,IT,헬스케어 등 각기 다른 직종에서 근무하고 계신 실무진들과 스마트, 커넥티드 제품의 혁신을 분석하고 그러한 변화가 기업들의 전략과 사업운영에 미치는 영향에 대하여 토론했습니다. 그 토론에서 저는 발전하는 제 4의 물결 속에서 지속적인 고객지향 서비스를 실현하려면 품질관리분야가 앞으로 굉장히 중요할 것이라는 확신을 했습니다. 마침 네이버의 커넥티드 제품과 서비스 시작에 따라 Naver의 웹 서비스 및 테스팅을 지원하고 있는 NHN Technology Services사에서 단순 테스팅이 아닌 다양한 테스팅 시나리오와 사용자 요구분석을 동일선상에서 실현하고자 지원했습니다.",
        },
    ],
};

const showResultDocument = function (result) {};

const splitView = function () {
    const similarDocContainer = document.createElement("div");
    const inputTitle = document.querySelector("#anal-input-title");
    const question = document.querySelector("#anal-req");
    const answer = document.querySelector("#anal-res");

    similarDocContainer.classList.add("simillar-doc-container");
    similarDocContainer.style.border = "1px solid black";
    similarDocContainer.innerHTML = "";
    similarDocContainer.classList.add("analysis-newContainer-init");

    inputTitle.classList.add("analysis-traverse-animation-init");
    question.classList.add("analysis-traverse-animation-init");
    answer.classList.add("analysis-traverse-animation-init");

    analysisTopContainer.appendChild(similarDocContainer);

    setTimeout(() => {
        inputTitle.classList.add("analysis-traverse-animation");
        question.classList.add("analysis-traverse-animation");
        answer.classList.add("analysis-traverse-animation");
        similarDocContainer.classList.add("analysis-traverse-animation");
    }, 30);
};

const fetchData = async function (data) {
    // 파이썬 클라우드 서버로 보내야함
    await fetch("http://localhost:4000/api/searchSimillarDocument", {
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
            data,
        }),
    })
        .then(async (res) => {
            console.log(res.status);
            loader();

            return res.json();
        })
        .then(async (json) => {
            // 파이썬 서버로부터 온 데이터 로직 처리
            setTimeout(() => {
                loaderContainer.style.display = "none";
                splitView();

                showResultDocument(tmpAnalData);
            }, 2000);
        })

        .catch((error) => {
            console.log(error);
        });
};

const searchBtnHandler = function (e) {
    const inputTitle = document.querySelector("#anal-input-title");
    const inputQuestion = document.querySelector("#anal-req");
    const inputAnswer = document.querySelector("#anal-res");
    const inputData = {
        title: inputTitle.value,
        question: inputQuestion.value,
        answer: inputAnswer.value,
    };
    fetchData(inputData);
};

const init = function () {
    searchBtn.addEventListener("click", searchBtnHandler);
};

if (searchBtn) init();
