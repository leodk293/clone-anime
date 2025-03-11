import Post from "@/lib/models/posts";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { message: "Post ID is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const post = await Post.findById(id).populate('author', 'fullName email');

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}


export const PUT = async (request, { params }) => {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { message: "Post ID is required" },
                { status: 400 }
            );
        }

        const { title, content, userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 401 }
            );
        }

        // Validate title & content (optional fields)
        if (title && title.trim() === "") {
            return NextResponse.json(
                { message: "Title cannot be empty" },
                { status: 400 }
            );
        }

        if (content && content.trim() === "") {
            return NextResponse.json(
                { message: "Content cannot be empty" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Update post only if user is the owner
        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { message: "No update data provided" },
                { status: 400 }
            );
        }

        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, author: userId }, // Ensures only owner can update
            updateData,
            { new: true }
        ).populate('author', 'fullName email');

        if (!updatedPost) {
            return NextResponse.json(
                { message: "Unauthorized or post not found" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
};
