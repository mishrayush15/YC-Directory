import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';


export default function SearchForm( { query } : { query?: string } ){

    

    return (
        //we can use <Form> component of next js which is extending the <form> component from react-19 to make stuffs that are required to be client side rendered due to interactivity, render on the server side (https://nextjs.org/docs/app/api-reference/components/form)

        // "Instead of writing a lot of code to handle form submissions, updating the URL, showing a loading state, and making everything fast, the <Form> component does it all for you automatically"

        <Form action="/" scroll={false} className='search-form'>
            <input
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups'
            />

            <div className='flex gap-2'>
                {query && <SearchFormReset/>}
                <button type='submit' className='search-btn text-white'>
                    <Search className='size-5'/>
                </button>
            </div>
        </Form>
    )
}