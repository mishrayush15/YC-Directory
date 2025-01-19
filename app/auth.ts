import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"


type GitHubProfile = {
    id: string;
    login: string;
    bio?: string;
};

type SignInUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type JWTToken = {
    id?: string;
    email?: string;
    name?: string;
    image?: string;
    [key: string]: unknown; 
};

type Session = {
    id: string;
    user: {
        name: string;
        email: string;
        image: string;
    };
};
// @ts-expect-error 'there is a version error in NextAuth'
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, profile }: {
            user: SignInUser;
            profile?: GitHubProfile;
        }) {
            const existinguser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

            if (!existinguser) {
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || ""
                })
            };

            return true;
        },

        //setting up custom JWT with value = id of the user created and stored in sanity
        async jwt({ token, account, profile }: {
            token: JWTToken;
            account?: unknown;
            profile?: GitHubProfile;
        }) {
            if (account && profile) {
                const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

                token.id = user?._id
            };

            return token;
        },

        async session({ session, token }: {
            session: Session;
            token: JWTToken;
        }) {
            Object.assign(session, { id: token.id });
            return session;
        }
    }
})