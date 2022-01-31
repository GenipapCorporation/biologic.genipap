import { SearchIcon } from "@heroicons/react/outline";
import {useState} from 'react'
import {useRouter} from 'next/router'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

export default function Search ({action = '/search'}) {
   const router = useRouter()
   const [query, setQuery] = useState('')

   const handleParam = setValue => e => setValue(e.target.value)

   const handleSubmit = preventDefault(() => {
     router.push({
       pathname: action,
       query: {q: query},
     })
   })

   return (
     <form onSubmit={handleSubmit} className={`gap-2 bg-white px-2 py-2 focus-within:ring-2 rounded-lg overflow-hidden border items-center w-full flex`}>
       <SearchIcon className="h-5 w-5 flex-1" />
       <input
         type='text'
         name='q'
         value={query}
         onChange={handleParam(setQuery)}
         placeholder="Search Genipap Biologic"
         aria-label='Search'
         className="block bg-transparent flex-[11] outline-none font-light"
       />
     </form>
   )
}