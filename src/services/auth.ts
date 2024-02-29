import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/services/prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (user) {
                const authedUser = await prisma.user.auth(user)
                token = { ...authedUser }
            }

            return token
        },

        session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                session.user = { ...token }
            }
            return session
        },
    },
}
