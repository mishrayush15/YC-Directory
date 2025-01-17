

import Image from "next/image";
import Link from "next/link";
import { auth, signOut, signIn } from "../app/auth";

export default async function Navbar(){

    const session = await auth()

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={144} height={30}></Image>
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session.user?(
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({
                                    redirectTo : "/"
                                })
                            }}>
                                <button type="submit">
                                    Logout
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (

                        // new nextjs feature that let's you do server actions in a client component
                        <form action={async()=>{
                            "use server"
                            await signIn('github')
                            }}>
                                <button type="submit">
                                Login
                                </button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    )
}