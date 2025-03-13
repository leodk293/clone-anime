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
            if (account.provider !== "google") {
                return true;
            }

            const { name, email, image } = user;

            try {
                await connectMongoDB();
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    if (existingUser.fullName !== name || existingUser.image !== image) {
                        await User.findByIdAndUpdate(existingUser._id, {
                            fullName: name,
                            image
                        });
                    }
                } else {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fullName: name,
                            email,
                            image
                        }),
                    });
                    if (!res.ok) {
                        throw new Error("Failed to create user in the database");
                    }
                }
                return true;
            } catch (error) {
                console.error("Authentication error:", error);
                return false;
            }
        },

        async session({ session }) {
            if (session.user?.email) {
                try {
                    await connectMongoDB();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        session.user.id = dbUser._id.toString();
                    }
                } catch (error) {
                    console.error("Session error:", error);
                }
            }
            return session;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };