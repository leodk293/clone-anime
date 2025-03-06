import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import Post from "@/lib/models/posts";
import User from "@/lib/models/users";