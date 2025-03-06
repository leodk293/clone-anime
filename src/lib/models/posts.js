import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;