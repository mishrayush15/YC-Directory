import { client } from "@/sanity/lib/client";
import { USER_STARTUP_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";


export default async function UserStartups({id} : {id : string}){


    const startups = await client.fetch(USER_STARTUP_QUERY, {id})

    return (
        <>
        {startups.length>0 ? startups.map((startup : StartupTypeCard)=>(
            <StartupCard key={startup._id} post={startup}/>
        )):<p className="no-result">
            No posts yet!
            </p>}
        </>
    )
}

