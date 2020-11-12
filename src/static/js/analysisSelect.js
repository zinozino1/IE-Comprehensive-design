const startBtn = document.querySelector(".analysis-btn");
const analysisContainer = document.querySelector(".analysis-container");

const startBtnHandler = function (e) {
    const partitionContainer = document.createElement("div");
    partitionContainer.classList.add("analysis-partition-container");
    partitionContainer.innerHTML = `<a href="/document/analysis"><div id="analysis-new">새로 작성하기</div></a>
<a href="#">
    <div id="analysis-exist">자소서 불러오기</div>
</a>`;
    analysisContainer.removeChild(document.querySelector("#anal-anchor"));
    analysisContainer.appendChild(partitionContainer);
};

const init = function () {
    startBtn.addEventListener("click", startBtnHandler);
};

if (startBtn) init();
