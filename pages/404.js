import Head from "next/head";
import { SITENAME } from "./api/constants";
import { Container } from "../components/StyledContent";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

const errorLinks = [
  {
    title: "Creating a new page",
    desc: "Everything you need to know on how to create an article on Genipap Biologic.",
    uri: "/Creating_a_new_page"
  }
]

export default function Redirect404() {
  return (
    <>
      <Head>
        <title>Page doesn't exist - {SITENAME}</title>
      </Head>
      <Container>
        <div className="text-3xl text-red-500 font-bold">Page doesn't exist</div>
        <div className="mt-12">
          <div>The topic you are searching for doesn't exist. But you can create a page on this topic. Read the following to know more:</div>
          {errorLinks.map((link) => (
            <div className="mt-6">
              <Link href={`/e${link.uri}`}>
                <a className="font-bold text-xl block text-blue-600 hover:underline w-max">{link.title}</a>
              </Link>
              <div className="mt-1">{link.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}