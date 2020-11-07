import userModel from "../models/user";
import routes from "../routes";

export const saveUser = (req, res) => {
    console.log(req.body);
    try {
        // 여기서부터 하면 댐 11.7
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
