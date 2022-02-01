import Head from "next/head";
import Link from "next/link";
import path from "path";
import { Container } from "../components/StyledContent";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline"
import Search from "../components/Search";

const Links = [
  {
    text: "About Genipap Biologic",
    uri: "/e/About_Genipap_Biologic"
  },
  {
    text: "Submit an article",
    uri: "https://github.com/GenipapCorporation/biologic.genipap/new/main/articles/"
  },
  {
    text: "Creating a new page",
    uri: "https://genipapcorporation.github.io/biologic.genipap/"
  }
];

export default function Index() {
  return (
    <>
      <Head>
        <title>Genipap Biologic</title>
      </Head>
      <Container>
        <div className="h-[70vh]">
          <div className="pt-32">
            <div className="flex gap-1 items-center max-w-max mx-auto">
              <div className="h-16 md:h-24 w-16 md:w-24 relative">
                <Image src={`/favicon.webp`} layout="fill" objectFit="cover" />
              </div>
              <div className="text-teal-700 font-bold font-serif italic text-6xl md:text-8xl">Biologic</div>
            </div>
            {/* <form className="flex mt-12 mx-auto gap-2 border px-2 py-2 pr-0 focus-within:ring-2 max-w-lg items-center" action="/search/" method="GET">
              <SearchIcon className="w-6 h-6 flex-1" />
              <input placeholder="Search Genipap Biologic" className="flex-[11] outline-none" name="q" />
            </form> */}
            <div className="mt-12 max-w-xl mx-auto">
              <Search />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
