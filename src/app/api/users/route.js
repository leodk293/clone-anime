import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { NextResponse } from "next/server";
import User from "@/lib/models/users";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log(body);
        const { fullName, email, image } = body;
        await connectMongoDB();
        const isUserExits = await User.findOne({ email })
        if (!isUserExits) {
            await User.create({ fullName, email, image });
            console.log("user created")
            return NextResponse.json({ message: "User Registered" }, { status: 201 });
        }
        else {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to register user" }, { status: 500 });
    }
}