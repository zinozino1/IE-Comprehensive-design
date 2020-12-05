const analysisBtn = document.querySelector("#anal-myDoc");

const analBtnHandler = function () {};

const init = function () {
    analysisBtn.addEventListener("cilck", analBtnHandler);
};

if (analysisBtn) init();

const tmpMyAnalDatas = {
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
            num: 3,
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
            importance: 4,
        },
        {
            text:
                "차 정기공연을 위해서 작곡은 물론, 홍보영상 및 뮤직비디오제작, 무대연출까지 기획하였고, 다른 음악동아리들과의 차별성을 바탕으로 주기적으로 홍보영상을 배포 하였습니다.^0^2016년 학과에서 마음 맞는 9명의 친구들과 함께 창작음악 동아리를 창립하였고, ‘친구가 만든 노래를 친구가 부른다’는 슬로건으로 활동을 시작하였습니다.^1^8개월간 준비한 첫 정기공연에는 약 80명의 관객을 유치하여 괜찮은 성과를 내었습니다.",
            importance: 5,
        },
    ],
    pointKeyword: [
        { text: "기획 하였고" },
        { text: "무대 기획" },
        { text: "음악 동아리" },
    ],
};
