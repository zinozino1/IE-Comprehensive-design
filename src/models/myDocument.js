import mongoose from "mongoose";

const myDocumentSchema = new mongoose.Schema({
    title: String,
    question: String,
    answer: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const myDocumentModel = mongoose.model("myDocument", myDocumentSchema);
export default myDocumentModel;
