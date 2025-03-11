import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import Post from "@/lib/models/posts";
import User from "@/lib/models/users";


// Handler function to process the request based on the method
export async function handler(request) {
    const method = request.method;

    switch (method) {
        case 'GET':
            return handleGET(request);
        case 'POST':
            return handlePOST(request);
        case 'DELETE':
            return handleDELETE(request);
        default:
            return NextResponse.json(
                { message: `Method ${method} Not Allowed` },
                { status: 405 }
            );
    }
}

async function handleGET(request) {
    try {
        await connectMongoDB();
        const posts = await Post.find().populate('author', 'fullName email');
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

async function handlePOST(request) {
    try {
        await connectMongoDB();
        const { title, content, authorId, userImage } = await request.json();

        if (!title || !content || !authorId || !userImage) {
            return NextResponse.json(
                { message: "Missing title, content, or author" },
                { status: 400 }
            );
        }

        const authorExists = await User.findById(authorId);
        if (!authorExists) {
            return NextResponse.json(
                { message: "Author not found" },
                { status: 404 }
            );
        }

        const newPost = await Post.create({
            title,
            content,
            author: authorId,
            userImage
        });

        return NextResponse.json(
            { message: 'Post created successfully', post: newPost },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

async function handleDELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const userId = url.searchParams.get("userId");

        if (!id) {
            return NextResponse.json(
                { message: "Post ID not found" },
                { status: 400 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { message: "User ID required" },
                { status: 401 }
            );
        }

        await connectMongoDB();

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        if (post.author.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized: Only the owner can delete this post" },
                { status: 403 }
            );
        }

        await Post.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Post deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export const GET = handleGET;
export const POST = handlePOST;
export const DELETE = handleDELETE;