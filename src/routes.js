const routes = {
    // global
    main: "/",
    home: "/home",
    login: "/login",
    join: "/join",

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
    select: "/select",
    analysis: (id) => {
        if (id) return `/${id}/analysis`;
        else return "/analysis";
    },
};

export default routes;
