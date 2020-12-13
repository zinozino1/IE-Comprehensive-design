import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () =>
    console.log("✅ Connected to DB on : 52.78.211.1:27017/clover");
const handleError = () => console.log("❌Error");

db.once("open", handleOpen);
db.on("error", handleError);
