import { connectDB } from "@/lib/dbConnect";
import User from "@/models/users";
import { connect } from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // you can also name it "Credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                }
                catch (error) {
                    console.log("Error", error)
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/signup",
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
