import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique:true,
            required: true
        },

    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;