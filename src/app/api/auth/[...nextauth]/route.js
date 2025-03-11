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
                const { name, email, image } = user;
                const isUserExits = await User.findOne({ email })
                if (!isUserExits) {
                    try {
                        await connectMongoDB();
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
                            console.error("Failed to create user");
                            return false;
                        }

                        return true;
                    } catch (error) {
                        console.log(error);
                        return false;
                    }

                }
                else {
                    // Update the user's information if necessary
                    await connectMongoDB();
                    await User.findByIdAndUpdate(isUserExits._id, {
                        fullName: name,
                        image
                    });
                    return true;
                }

            }

            return true;
        },

        async session({ session, user, token }) {
            // Include the user's MongoDB ID in the session object
            if (session.user) {
                await connectMongoDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.id = dbUser._id.toString(); // Add the user ID to the session
                }
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };