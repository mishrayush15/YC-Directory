import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({searchParams} : {
  searchParams : Promise<{query?: string}>
}){

  const query = (await searchParams).query;

  const params = {search : query || null};



  //as we have set the useCdn to false to make the updation LIVE, therefore we are using this format to fetch data
  const { data: posts } = await sanityFetch({query : STARTUP_QUERY, params})


  return (
    <>
    
      <section className="pink_container header-section">

        <h1 className="heading">Pitch, Vote & Grow</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get Noticed in Virtual Competiton.
        </p>

        <SearchForm query={query}/>
        
      </section>

      <section className="section_container startup-cards-section">

        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post : StartupTypeCard)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found!</p>
          )}
        </ul>

      </section>

      {/* importing this to use the LIVE feature of sanity */}
      <SanityLive/>
      
    </>
  )
}