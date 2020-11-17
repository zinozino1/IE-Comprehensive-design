import mongoose from "mongoose";

const myDocumentSchema = new mongoose.Schema({
    title: String,
    question: String,
    answer: String,
    author: String,
    createdAt: Object,
    RealDate: Date,
});

const myDocumentModel = mongoose.model("myDocument", myDocumentSchema);
export default myDocumentModel;
