import documentModel from "../models/document";

export const getEdit = (req, res) => {
    res.render("edit");
};
export const postEdit = (req, res) => {};

export const getAdd = (req, res) => {};
export const postAdd = (req, res) => {};

export const getSearch = (req, res) => {
    res.render("search");
};
export const postSearch = async (req, res) => {
    console.log(req.body);
    try {
        const document = await documentModel
            .find()
            .where("task")
            .equals(`${req.body.task}`)
            .where("question")
            .equals(`${req.body.question}`);
        console.log(document);
    } catch (error) {
        console.log(error);
    }
    res.end();
};

export const getSelect = (req, res) => {
    res.render("select");
};
export const postSelect = (req, res) => {};

export const getAnalysis = (req, res) => {
    res.render("analysis");
};
export const postAnalysis = (req, res) => {};
