import path from "path";
import documentModel from "../models/document";

const { PythonShell } = require("python-shell");

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
        for (let i = 0; i < target.length; i++) {
            const tmpArr = documents.filter(function (item) {
                const innerKey = target[i];
                return item.indexString === innerKey;
            });
            wholeArr.push(tmpArr);
        }

        res.send({ result: wholeArr });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const postQuestionSearch = async (req, res) => {
    console.log(req.body);
    try {
        const documents = await documentModel
            .find()
            .where("question")
            .equals(`${req.body.question}`);
        res.send({ result: documents });
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

export const getSelect = (req, res) => {
    res.render("select");
};
export const postSelect = (req, res) => {};

export const getAnalysis = (req, res) => {
    res.render("analysis");
};
export const postAnalysis = (req, res) => {
    console.log(req.body);
    const { body } = req;
    let options = {
        mode: "text",
        scriptPath: path.join(__dirname, "../analysis/"),
        args: [JSON.stringify({ body })],
        encoding: "utf8",
    };

    PythonShell.run("test.py", options, function (err, data) {
        res.status(200).json({ data: JSON.parse(data), success: true });
        const result = JSON.parse(data);
        // console.log(result);
        // console.log(result.title);

        res.end();
    });
};
