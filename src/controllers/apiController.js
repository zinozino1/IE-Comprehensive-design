import userModel from "../models/user";
import routes from "../routes";
import documentModel from "../models/document";
import myDocumentModel from "../models/myDocument";

export const saveUser = async (req, res) => {
    console.log(req.body);
    const {
        body: { email, nickName },
        user: { id },
    } = req;
    try {
        const user = await userModel.findOneAndUpdate(
            { _id: id },
            { email, nickName },
        );
        console.log(user);
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const searchUser = async (req, res) => {
    console.log(req.body);
    const {
        body: { userId },
    } = req;
    try {
        const user = await userModel.findById(userId);
        res.send({ user });
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const scrapDocument = async (req, res) => {
    console.log(req.body);
    const {
        body: { key, searchMode },
        user: { id },
    } = req;
    console.log(searchMode);
    try {
        const currentUser = await userModel.findById(id);
        const compare = function (v) {
            if (v.key === key) {
                return true;
            }
        };
        if (searchMode === "question" || searchMode === "keyword") {
            const document = await documentModel.findOne({ key });

            if (
                currentUser.scrap.length === 0 ||
                !currentUser.scrap.some(compare)
            ) {
                currentUser.scrap.push(document);
                currentUser.save();
            } else {
                res.send({ msg: "이미 스크랩한 자소서 입니다." });
            }
        } else if (searchMode === "task") {
            if (
                currentUser.scrap.length === 0 ||
                !currentUser.scrap.some(compare)
            ) {
                const tmpDocument = await documentModel.findOne({ key });
                const targetIndex = tmpDocument.index;
                const documents = await documentModel
                    .find()
                    .where("index")
                    .equals(targetIndex);
                documents.forEach((item) => {
                    currentUser.scrap.push(item);
                });
                currentUser.save();
            } else {
                res.send({ msg: "이미 스크랩한 자소서 입니다." });
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const saveMyDocument = async (req, res) => {
    console.log(req.body);
    const { title, question, answer } = req.body;
    const { id } = req.user;
    const now = new Date();
    console.log(now);
    const data = { title, question, answer, author: id, createdAt: now };
    try {
        await myDocumentModel.create(data);
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const searchSimillarDocument = (req, res) => {
    console.log("similtar");
    res.send({});
};

export const analysisMyDocument = (req, res) => {
    console.log("anal");
    res.end();
};
