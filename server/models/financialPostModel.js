import mongoose from "mongoose";
const financialPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: [{ type: String }],
    docs : [{ type: String }],
}, { timestamps: true });
const FinancialPost = mongoose.model('FinancialPost', financialPostSchema);
export default FinancialPost;
