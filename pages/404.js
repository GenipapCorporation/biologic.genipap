import Head from "next/head";
import { SITENAME } from "./api/constants";
import { Container } from "../components/StyledContent";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { useRouter } from "next/router"

const errorLinks = [
  {
    title: "Creating a new page",
    desc: "Everything you need to know on how to create an article on Genipap Biologic.",
    uri: "https://genipapcorporation.github.io/biologic.genipap"
  }
]

export default function Redirect404() {
  return (
    <>
      <Head>
        <title>Page doesn't exist - {SITENAME}</title>
      </Head>
      <div className="min-h-[60vh]">
        <Container>
          <div className="text-3xl text-red-500 font-bold">Page doesn't exist</div>
          <div className="mt-12">
            <div className="font-light">The topic you are searching for doesn't exist. But you can create a page on this topic. Read the following to know more:</div>
            {errorLinks.map((link) => (
              <div className="mt-6">
                <Link href={`${link.uri}`}>
                  <a className="font-bold text-xl block text-blue-600 hover:underline w-max">{link.title}</a>
                </Link>
                <div className="mt-1 font-light">{link.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  )
}