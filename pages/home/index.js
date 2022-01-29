import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import Head from "next/head"
import { Container } from "../../components/StyledContent"
import { SITENAME } from "../api/constants"

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Home - {SITENAME}</title>
      </Head>
      <div className="min-h-screen">
        <Container>
          {posts.map((post) => (
            <div key={post.filePath} className='mt-12 first:mt-0'>
              <Link
                href={`/article/${post.filePath.replace(/\.mdx?$/, '')}`}
              >
                <a className='text-2xl font-bold text-blue-600 hover:underline'>{post.data.title}</a>
              </Link>
              <div className='mt-3'>{post.data.description}</div>
            </div>
          ))}
        </Container>
      </div>
    </>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}