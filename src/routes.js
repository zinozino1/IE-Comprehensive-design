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
};

export default routes;
