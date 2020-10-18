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
export const postTaskSearch = async (req, res) => {
    console.log(req.body);
    try {
        const documents = await documentModel
            .find()
            .where("task")
            .equals(`${req.body.task}`);
        // const newArr = [
        //     ...documents.map(function (item) {
        //         return item.indexString;
        //     }),
        // ];
        const wholeArr = [];

        const target = [];
        let key = documents[0].indexString;
        target.push(key);
        for (let i = 0; i < documents.length; i++) {
            if (documents[i].indexString !== key) {
                target.push(documents[i].indexString);
                key = documents[i].indexString;
            }
        }
        // console.log(target);
        for (let i = 0; i < target.length; i++) {
            const tmpArr = documents.filter(function (item) {
                const innerKey = target[i];
                return item.indexString === innerKey;
            });
            wholeArr.push(tmpArr);
        }
        // for (let i = 0; i < wholeArr[0].length; i++) {
        //     console.log(wholeArr[0][i]);
        // }
        console.log(wholeArr.length);
        res.send({ result: wholeArr });
        // .where("question")
        // .equals(`${req.body.question}`);

        // console.log(documents);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
    res.end();
};

export const postQuestionSearch = (req, res) => {};

export const getSelect = (req, res) => {
    res.render("select");
};
export const postSelect = (req, res) => {};

export const getAnalysis = (req, res) => {
    res.render("analysis");
};
export const postAnalysis = (req, res) => {};
