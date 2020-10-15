export const getMain = (req, res) => {
    res.render("main");
};

export const getHome = (req, res) => {
    res.render("home");
};

export const getLogin = (req, res) => {
    res.render("login");
};
export const postLogin = (req, res) => {};

export const getJoin = (req, res) => {
    res.render("join");
};
export const postJoin = (req, res) => {};
