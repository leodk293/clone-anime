import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { NextResponse } from "next/server";
import User from "@/lib/models/users";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log(body);
        const { fullName, email } = body;
        await connectMongoDB();
        await User.create({ fullName, email });
        console.log("user created")
        return NextResponse.json({ message: "User Registered" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to register user" }, { status: 500 });
    }
}