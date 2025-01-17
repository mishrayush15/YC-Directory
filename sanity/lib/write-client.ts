import 'server-only'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation. If set to true then sanity will revalidate the data every 60 sec, till that time it will cache the data
    token
});

if(!writeClient.config().token){
    throw new Error("Write token not found !")
}
