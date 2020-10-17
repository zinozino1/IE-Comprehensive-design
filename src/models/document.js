import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    index: String,
    indexString: String,
    company: String,
    task: String,
    question: String,
    answer: String,
    scrapedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const documentModel = mongoose.model("document", documentSchema);
export default documentModel;
