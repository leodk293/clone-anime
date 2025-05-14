import mongoose, { Schema, models } from "mongoose";

const favoriteAnimeSchema = new Schema(
    {
        animeId: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


    },
    { timestamps: true }
);

const FavoriteAnime = models.FavoriteAnime || mongoose.model("FavoriteAnime", favoriteAnimeSchema);

export default FavoriteAnime;