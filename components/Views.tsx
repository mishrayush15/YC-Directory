import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from 'next/server'

export default async function Views({id} : {id : string}){

    //we are using withConfig to change the useCdn setting in the nextconfig so that we can use the PPR featureto make the views dynamic
    const {views : totalViews} = await client.withConfig({
        useCdn : false
    }).fetch(STARTUP_VIEWS_QUERY, {id});

    //using after from next js as it makes the fetching and updating of views in the background that makes sure that the webpage is not disturbed and the views can be updated while in the background
    after( async () => await writeClient.patch(id).set({views : totalViews + 1}).commit());

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping/>
            </div>

            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    )
}