const simillarSearchBtn = document.querySelector("#anal-search");
const myDocAnalBtn = document.querySelector("#anal-myDoc");

const analysisTopContainer = document.querySelector(".anal-top");
const inputContainer = document.querySelector(".analysis-input");
const loaderContainer = document.querySelector("#loader");
const resultContainer = document.createElement("div");

let mode = "none";
let firstAnalysis = true;

const unloader = function () {
    loaderContainer.innerHTML = "";
    loaderContainer.style.display = "none";
};

const loader = function () {
    loaderContainer.innerHTML = "loading...";

    loaderContainer.style.display = "block";
};

const tmpMyAnalData = {
    wordFrequency: [
        {
            text: "동아리",
            num: 7,
        },
        {
            text: "공연",
            num: 7,
        },
        {
            text: "열정",
            num: 6,
        },
        {
            text: "여행",
            num: 8,
        },
        {
            text: "안녕",
            num: 8,
        },
        {
            text: "하세요",
            num: 7,
        },
    ],
    pointSentence: [
        {
            text:
                "그래서 노래와 더불어 뮤직비디오 상영과 무대연출까지 기획해야 할 필요성을 느꼈고, 다음연도 회장을 맡아 새롭게 조직을 개편하여 뮤직비디오제작, 무대 기획 인원을 새로 선출해 총 21명의 중규모 동아리로 탈바꿈 하였습니다.",
            order: 4,
        },
        {
            text:
                "차 정기공연을 위해서 작곡은 물론, 홍보영상 및 뮤직비디오제작, 무대연출까지 기획하였고, 다른 음악동아리들과의 차별성을 바탕으로 주기적으로 홍보영상을 배포 하였습니다.^0^2016년 학과에서 마음 맞는 9명의 친구들과 함께 창작음악 동아리를 창립하였고, ‘친구가 만든 노래를 친구가 부른다’는 슬로건으로 활동을 시작하였습니다.^1^8개월간 준비한 첫 정기공연에는 약 80명의 관객을 유치하여 괜찮은 성과를 내었습니다.",
            order: 3,
        },
        {
            text:
                "차 정기공연을 위해서 작곡은 물론, 홍보영상 및 뮤직비디오제작, 무대연출까지 기획하였고, 다른 음악동아리들과의 차별성을 바탕으로 주기적으로 홍보영상을 배포 하였습니다.^0^2016년 학과에서 마음 맞는 9명의 친구들과 함께 창작음악 동아리를 창립하였고, ‘친구가 만든 노래를 친구가 부른다’는 슬로건으로 활동을 시작하였습니다.^1^8개월간 준비한 첫 정기공연에는 약 80명의 관객을 유치하여 괜찮은 성과를 내었습니다.",
            order: 5,
        },
        {
            text:
                "차 정기공연을 위해서 작곡은 물론, 홍보영상 및 뮤직비디오제작, 무대연출까지 기획하였고, 다른 음악동아리들과의 차별성을 바탕으로 주기적으로 홍보영상을 배포 하였습니다.^0^2016년 학과에서 마음 맞는 9명의 친구들과 함께 창작음악 동아리를 창립하였고, ‘친구가 만든 노래를 친구가 부른다’는 슬로건으로 활동을 시작하였습니다.^1^8개월간 준비한 첫 정기공연에는 약 80명의 관객을 유치하여 괜찮은 성과를 내었습니다.",
            order: 1,
        },
        {
            text:
                "차 정기공연을 위해서 작곡은 물론, 홍보영상 및 뮤직비디오제작, 무대연출까지 기획하였고, 다른 음악동아리들과의 차별성을 바탕으로 주기적으로 홍보영상을 배포 하였습니다.^0^2016년 학과에서 마음 맞는 9명의 친구들과 함께 창작음악 동아리를 창립하였고, ‘친구가 만든 노래를 친구가 부른다’는 슬로건으로 활동을 시작하였습니다.^1^8개월간 준비한 첫 정기공연에는 약 80명의 관객을 유치하여 괜찮은 성과를 내었습니다.",
            order: 2,
        },
    ],
    pointKeyword: [
        { text: "기획 하였고" },
        { text: "무대 기획" },
        { text: "음악 동아리" },
    ],
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
            similarity: 90,
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
            similarity: 93,
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
            similarity: 88,
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
            similarity: 76,
        },
    ],
};

const showResultDocument = function (result) {};

const splitViewClosure = function () {
    let status = "none";

    return function () {
        if (status === "none") {
            const inputTitle = document.querySelector("#anal-input-title");
            const question = document.querySelector("#anal-req");
            const answer = document.querySelector("#anal-res");

            resultContainer.classList.add("simillar-doc-container");

            resultContainer.classList.add("analysis-newContainer-init");

            inputTitle.classList.add("analysis-traverse-animation-init");
            question.classList.add("analysis-traverse-animation-init");
            answer.classList.add("analysis-traverse-animation-init");

            analysisTopContainer.appendChild(resultContainer);

            setTimeout(() => {
                inputTitle.classList.add("analysis-traverse-animation");
                question.classList.add("analysis-traverse-animation");
                answer.classList.add("analysis-traverse-animation");
                resultContainer.classList.add("analysis-traverse-animation");
            }, 30);

            status = "split";
        } else {
            resultContainer.parentNode.removeChild(resultContainer);
            status = "none";
        }
    };
};

const split = splitViewClosure();

const makeSimillarResult = function (data) {
    resultContainer.innerHTML = "";
    resultContainer.innerHTML = `<div id="simillar-partition">
    유사 자소서 조회 결과
</div><div id="simillar-inner-container">
</div>`;
    const list = document.createElement("div");
    list.id = "simillar-list";
    data.forEach((v, i) => {
        const item = document.createElement("div");
        item.id = "simillar-item";

        const numbering = document.createElement("div");
        numbering.id = "simillar-item-number";
        numbering.innerText = i + 1;

        const company = document.createElement("div");
        company.id = "simillar-item-company";
        company.innerText = v.company;
        const task = document.createElement("div");
        task.id = "simillar-item-task";
        task.innerText = v.taskString;
        const question = document.createElement("div");
        question.id = "simillar-item-question";
        question.innerText = v.questionString;
        const answer = document.createElement("div");
        answer.id = "simillar-item-answer";
        answer.innerText = v.answer;

        const similarity = document.createElement("div");
        similarity.id = "simillar-item-similarity";
        similarity.innerHTML = `<div class="flex-wrapper">
        <div class="single-chart">
          <svg viewBox="0 0 36 36" class="circular-chart green">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
              stroke-dasharray="${v.similarity}, 100"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">${v.similarity}%</text>
          </svg>
        </div>
        </div>`;

        const companySpan = document.createElement("span");
        companySpan.id = "simillar-item-company-span";
        companySpan.innerText = "회사명";
        const taskSpan = document.createElement("span");
        taskSpan.id = "simillar-item-task-span";
        taskSpan.innerText = "직무";
        const questionSpan = document.createElement("span");
        questionSpan.id = "simillar-item-question-span";
        questionSpan.innerText = "문항";
        const answerSpan = document.createElement("span");
        answerSpan.id = "simillar-item-answer-span";
        answerSpan.innerText = "답변";
        const similaritySpan = document.createElement("span");
        similaritySpan.id = "simillar-item-similarity-span";
        similaritySpan.innerText = "유사도";

        item.appendChild(numbering);
        item.appendChild(similaritySpan);
        item.appendChild(similarity);
        item.appendChild(companySpan);
        item.appendChild(company);
        item.appendChild(taskSpan);
        item.appendChild(task);
        item.appendChild(questionSpan);
        item.appendChild(question);
        item.appendChild(answerSpan);
        item.appendChild(answer);

        list.appendChild(item);
    });
    const container = document.querySelector("#simillar-inner-container");
    container.appendChild(list);
};

const makeMyDocResult = function (json) {
    const wordFrequency = Array.from(json.wordFrequency);
    const pointSentence = Array.from(json.pointSentence);
    const pointKeyword = Array.from(json.pointKeyword);

    resultContainer.innerHTML = "";
    resultContainer.innerHTML = `<div class="scrap-partition">
    <div id="scrap-company-name">내 자소서 분석 </div>
    
</div><div id="simillar-inner-container">
<div id="word-frequency">
    <h2>단어 빈도수</h2>
    
</div>
<div id="point-sentence">
    <h2>핵심 문장</h2>
    
</div>
<div id="point-keyword">
    <h2>핵심 키워드</h2>
    
</div>
</div>`;

    const wordFrequencyContainer = document.querySelector("#word-frequency");
    const pointSentenceContainer = document.querySelector("#point-sentence");
    const pointKeywordContainer = document.querySelector("#point-keyword");

    wordFrequencyContainer.innerHTML += `<div class="skills">
    <ul class="lines">
      <li class="line l--0">
        <span class="line__label title">
          0
        </span> 
      </li>
      <li class="line l--25">
        <span class="line__label">
          3
        </span>
      </li>
      <li class="line l--50">
        <span class="line__label">
          5
        </span>
      </li>
      <li class="line l--75">
        <span class="line__label">
          7
        </span>
      </li>
      <li class="line l--100">
        <span class="line__label">
          9
        </span>
      </li>
    </ul>
    <div class="charts">
    <div class="chart chart--dev">
      
      <ul class="chart--horiz">
        
      </ul>
    </div>
    </div>`;

    const skills = document.querySelector(".skills");
    skills.style.height = `${wordFrequency.length * 50}px`;

    wordFrequency.forEach((v, i) => {
        const liContainer = document.querySelector(".chart--horiz");
        const item = document.createElement("li");
        item.classList.add("chart__bar");
        item.style.width = `${v.num * 12.2}%`;
        item.innerHTML = `<span class="chart__label">
        ${v.text}
      </span>`;
        liContainer.appendChild(item);
    });
    const compare = (key) => (a, b) => a[key] - b[key];
    const sortedPointSentence = pointSentence.sort(compare("order"));

    sortedPointSentence.forEach((v, i) => {
        const item = document.createElement("div");
        item.id = "pointSentence-item-container";
        item.innerHTML = ` <span id="order">${v.order}</span> <span id="sentence">"${v.text}"</span>`;
        pointSentenceContainer.appendChild(item);
    });

    pointKeyword.forEach((v, i) => {
        const item = document.createElement("div");
        item.id = "pointKeyword-item-container";
        item.innerHTML = `<span id="keyword">"${v.text}"</span>`;
        pointKeywordContainer.appendChild(item);
    });
};

const branchData = function (json, route) {
    // 나중에 ajax 통신하면 setTimeout 없어면 댐

    loaderContainer.style.display = "none";

    if (mode === "none") {
        // 초기상태 지정
        split();
    }
    mode = route === "searchSimillarDocument" ? "simillar" : "myDoc";

    if (mode === "simillar") {
        makeSimillarResult(json);
    } else if (mode === "myDoc") {
        makeMyDocResult(json);
    }

    // showResultDocument(tmpAnalData);
};

const analysis = async function (data, route) {
    console.log("분석시작");
    // http://52.78.211.1:5000/analysis
    console.log(route);
    if (route === "searchSimillarDocument") {
        await fetch(`http://52.78.211.1:5000/analysis`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        })
            .then((res) => {
                console.log(res.status);

                return res.json();
            })
            .then((json) => {
                branchData(json, route);
                console.log(json);
            })

            .catch((error) => {
                console.log(error);
            });
    } else {
        // 내자소서 분석 서버 url 필요
        setTimeout(() => {
            branchData(tmpMyAnalData, route);
        }, 1000);

        // await fetch(`http://52.78.211.1:5000/analysis`, {
        //     method: "POST",
        //     mode: "cors",
        //     cache: "no-cache",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     redirect: "follow",
        //     referrer: "no-referrer",
        //     body: JSON.stringify(data),
        // })
        //     .then((res) => {
        //         console.log(res.status);

        //         return res.json();
        //     })
        //     .then((json) => {
        //         branchData(tmpMyAnalData, route);
        //         console.log(json);
        //     })

        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
};

const analysisReady = async function (data, route) {
    console.log("분석 준비중...");

    const answerData = { answer: data.answer };

    loader();
    analysis(answerData, route);
};

const btnHandler = function (e) {
    const inputTitle = document.querySelector("#anal-input-title");
    const inputQuestion = document.querySelector("#anal-req");
    const inputAnswer = document.querySelector("#anal-res");
    const inputData = {
        title: `${inputTitle.value}`,
        question: `${inputQuestion.value}`,
        answer: `${inputAnswer.value}`,
    };

    if (
        inputData.title === "" ||
        inputData.question === "" ||
        inputData.answer === ""
    ) {
        alert("빈칸을 채워주세요!");
        return;
    }

    if (e.target.id === "anal-search") {
        analysisReady(inputData, "searchSimillarDocument");
    } else {
        analysisReady(inputData, "analysisMyDocument");
    }
};

const init = function () {
    mode = "none";
    simillarSearchBtn.addEventListener("click", btnHandler);
    myDocAnalBtn.addEventListener("click", btnHandler);
};

if (simillarSearchBtn) init();
