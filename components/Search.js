import { SearchIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
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
     <form onSubmit={handleSubmit} className={`bg-white focus-within:ring-2 rounded-lg overflow-hidden border items-stretch w-full flex`}>
       <input
         type='text'
         name='q'
         value={query}
         onChange={handleParam(setQuery)}
         placeholder="Search Genipap Biologic"
         aria-label='Search'
         className="py-2 block bg-transparent flex-[11] outline-none pl-4"
       />
       <button type="submit" className="text-sm bg-blue-500 text-white flex-[2] grid place-items-center">
         <SearchIcon className="h-5 w-5" />
       </button>
     </form>
   )
}