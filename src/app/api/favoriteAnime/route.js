import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import FavoriteAnime from "@/lib/models/favoriteAnimes";
import User from "@/lib/models/users";

export const POST = async (request) => {
    try {
        const { animeId, userId } = await request.json();

        await connectMongoDB();
        const userExists = await User.findById(userId);
        if (!userExists) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!animeId || !userId) {
            return NextResponse.json({ message: "Anime ID and User ID are required" }, { status: 400 });
        }

        const isAnimeExists = await FavoriteAnime.findOne({ animeId: animeId, userId: userId });
        if (isAnimeExists) {
            return NextResponse.json({ message: "Anime already exists in favorites" }, { status: 409 });
        }
        const newFavoriteAnime = await FavoriteAnime.create({
            animeId,
            userId
        });
        return NextResponse.json({ message: "Anime successfully added to your favorites", favoriteAnime: newFavoriteAnime }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating favorite anime:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const GET = async (request) => {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ message: "User ID required" }, { status: 400 });
        }
        await connectMongoDB();
        const favoriteAnimes = await FavoriteAnime.find({ userId: userId });
        return NextResponse.json(favoriteAnimes);
    }
    catch (error) {
        console.error("Error fetching favorite animes:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const DELETE = async (request) => {
    try {
        const url = new URL(request.url);
        const animeId = url.searchParams.get("animeId");
        const userId = url.searchParams.get("userId");
        if (!animeId || !userId) {
            return NextResponse.json({ message: "Anime ID and User ID are required" }, { status: 400 });
        }
        await connectMongoDB();
        const favoriteAnime = await FavoriteAnime.findOneAndDelete({ animeId: animeId, userId: userId });
        if (!favoriteAnime) {
            return NextResponse.json({ message: "Anime not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Anime deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("Error deleting favorite anime:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}