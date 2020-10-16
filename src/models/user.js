import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    nickName: String,
    googleId: Number,
    kakaoId: Number,
    scrap: [{}],
    myDocument: [{}],
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const userModel = mongoose.model("user", userSchema);
export default userModel;
