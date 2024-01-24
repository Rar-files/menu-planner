import { Role } from '@prisma/client'

declare module 'next-auth' {
    interface User {
        id: string
        role?: Role
        name: string
        email: string
        image: string
    }

    interface Session extends DefaultSession {
        user?: User
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role?: Role
        name: string
        email: string
        image: string
    }
}
