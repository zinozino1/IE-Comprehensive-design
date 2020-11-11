import userModel from "../models/user";
import routes from "../routes";
import documentModel from "../models/document";

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
        body: { key },
        user: { id },
    } = req;
    try {
        const document = await documentModel.findOne({ key });
        const currentUser = await userModel.findById(id);
        const func = function (v) {
            if (v.key === key) {
                return true;
            }
        };

        if (currentUser.scrap.length === 0 || !currentUser.scrap.some(func)) {
            currentUser.scrap.push(document);
            currentUser.save();
        } else {
            res.send({ msg: "이미 스크랩한 자소서 입니다." });
        }
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};
