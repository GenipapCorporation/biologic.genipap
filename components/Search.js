import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function SearchComp() {

  const { query, pathname } = useRouter()
  return (
    <>
      <form className={`gap-2 bg-white px-2 py-2 focus-within:ring-2 items-center w-full ${pathname === "/" ? "hidden" : "flex"}`} action="/search/" method="GET">
        <SearchIcon className="h-5 w-5 flex-1" />
        <input className="block bg-transparent flex-[11] outline-none" type={`text`} name="q" placeholder={query.q !== undefined ? query.q : "Search Genipap Biologic"} />
      </form>
    </>
  )
}