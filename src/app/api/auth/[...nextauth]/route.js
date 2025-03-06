import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/models/users";
import { connectMongoDB } from "@/lib/db/connectMongoDB";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email } = user;
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email });

                    if (!userExists) {
                        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                fullName: name,
                                email,
                            }),
                        });

                        if (!res.ok) {
                            console.error("Failed to create user");
                            return false;
                        }
                    }

                    else {
                        console.log("User already exists");
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }

            return true;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };