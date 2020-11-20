const routes = {
    // global
    main: "/",
    home: "/home",
    login: "/login",
    join: "/join",
    logout: "/logout",

    // user
    mypage: (id) => {
        if (id) return `/mypage/${id}`;
        else return `/mypage/:id`;
    },

    // document
    edit: "/edit",
    newDoc: "/newDoc",
    add: "/add",
    search: "/search",
    taskSearch: "/taskSearch",
    questionSearch: "/questionSearch",
    keywordSearch: "/keywordSearch",
    select: "/select",
    analysis: (id) => {
        if (id) return `/${id}/analysis`;
        else return "/analysis";
    },

    // social login
    google: "/auth/google",
    googleCallback: "/auth/google/callback",
    kakao: "/auth/kakao",
    kakaoCallback: "/auth/kakao/callback",

    // api
    searchUser: "/searchUser",
    saveUser: "/saveUser",
    searchMyDocument: "/searchMyDocument",
    scrapDocument: "/scrapDocument",
    saveMyDocument: "/saveMyDocument",
    getSaveMyDocument: "/getSaveMyDocument",
    searchSimillarDocument: "/searchSimillarDocument",
    analysisMyDocument: "/analysisMyDocument",
};

export default routes;
