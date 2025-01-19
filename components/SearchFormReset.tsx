    'use client'

    import { X } from "lucide-react";
    import Link from "next/link";

    //as when we used the reset button with a reset function in the SearchForm component which is a server side component, it was showing an error as it can render a client side component that was our reset button on a server componenet. Hence to fix this we have created another client component that only exports the resetting funtionality

    export default function SearchFormReset() {

        const reset = () => {
            const form = document.querySelector('.search-form') as HTMLFormElement;

            if(form) form.reset();
        }

        return (
            <button type='reset' onClick={reset}>
                <Link href="/" className="search-btn text-white">
                    <X className="size-5"/>
                </Link>
                
            </button>
        )
    }