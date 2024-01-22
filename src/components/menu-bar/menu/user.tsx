import Button from '@/ui/Button'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

const User = () => {
    const { data: session } = useSession()

    if (session) {
        if (!session.user) return null

        if (!session.user?.name || !session.user?.image) return null

        return (
            <div
                className={`flex flex-row items-center flex-wrap ml-1 px-2 py-0.5`}
            >
                {session.user ? (
                    <>
                        <div className={`mr-2`}>{session.user.name}</div>
                        <Image
                            src={session.user.image}
                            alt="user"
                            width={30}
                            height={30}
                            className={`rounded-full border-primary-dark border-2`}
                        />
                        <div
                            onClick={() => signOut()}
                            className={`flex justify-center items-center h-8 w-8 rounded-full border-primary border-2 hover:bg-primary text-text-contrastText ml-2 cursor-pointer`}
                        >
                            <span className={`icon-[mdi--logout]`} />
                        </div>
                    </>
                ) : null}
            </div>
        )
    }

    return (
        <Button outline onClick={() => signIn()}>
            Admin access
        </Button>
    )
}

export default User
