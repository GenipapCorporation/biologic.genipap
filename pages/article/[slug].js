import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import mdxLink from '../../components/mdxLink'
import { Container } from '../../components/StyledContent'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import { SITENAME, TAGLINE } from '../api/constants'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkSlug from 'remark-slug'
import { LinkIcon, PencilIcon, ShareIcon, ClipboardCopyIcon, BookOpenIcon, XCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useRouter } from 'next/router'

const heading = (Tag) => (props) => {
  if (!props.id) return <Tag {...props} />

  return (
    <Tag {...props}>
      {props.children}
      <a href={`#${props.id}`} className='no-underline text-slate-300 hover:text-slate-600 float-right pt-2'><LinkIcon className='h-6 w-6' /></a>
    </Tag>
  )
}

const components = {
  a: mdxLink,
  TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
}

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthMLA = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const date = new Date();

export default function PostPage({ source, frontMatter }) {

  const fileName = frontMatter.title.replace(/ /g, '_');

  const functionalLinks = [
    {
      icon: <PencilIcon className='w-5 h-5' />,
      text: "Edit",
      uri: `https://github.com/GenipapCorporation/biologic.genipap/edit/main/articles/${fileName}.mdx`,
    },
  ];

  const uriCite = `https://biologic.genipap.tk${useRouter().asPath}`;


  const cite = [
    {
      type: "APA",
      desc: `${SITENAME} contributors. (${date.getFullYear()}, ${month[date.getMonth()]} ${date.getDate()}). ${frontMatter.title}. In ${SITENAME}, ${TAGLINE}. Retrieved ${date.getHours()}:${date.getMinutes()}, ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, from ${uriCite}`
    },
    {
      type: "MLA Manual",
      desc: `${SITENAME} contributors. "${frontMatter.title}." ${SITENAME}, ${TAGLINE}. ${SITENAME}, ${TAGLINE}, ${date.getDate()} ${monthMLA[date.getMonth()]}. ${date.getFullYear()}. Web. ${date.getDate()} ${monthMLA[date.getMonth()]}. ${date.getFullYear()}.`
    },
    {
      type: "MHRA",
      desc: `${SITENAME} contributors, '${frontMatter.title}', ${SITENAME}, ${TAGLINE}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC, <${uriCite}> [accessed ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}]`
    },
    {
      type: "Chicago",
      desc: `${SITENAME} contributors, "${frontMatter.title}," ${SITENAME}, ${TAGLINE}, ${uriCite} (accessed ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}). `
    },
    {
      type: "CBE/CSE",
      desc: `${SITENAME} contributors. ${frontMatter.title}  [Internet]. ${SITENAME}, ${TAGLINE}; ${date.getFullYear()} ${monthMLA[date.getMonth()]} ${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC [cited ${date.getFullYear()} ${monthMLA[date.getMonth()]} ${date.getDate()}]. Available from: ${uriCite}. `,
    },
    {
      type: "Bluebook",
      desc: `${frontMatter.title}, ${uriCite} (last visited ${monthMLA[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}).`
    },
    {
      type: "AMA",
      desc: `${SITENAME} contributors. ${frontMatter.title}. ${SITENAME}, ${TAGLINE}. ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC. Available at: ${uriCite}. Accessed ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}.`
    }
  ];

  const [showCopyValue, setShowCopyValue] = useState('Copy link');
  const [showCiteCont, setShowCiteCont] = useState(false);

  const copy = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setShowCopyValue('Copied');
    setTimeout(() => {
      setShowCopyValue('Copy link')
    }, 2000);
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} - {SITENAME}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn" crossorigin="anonymous"></link>
      </Head>
      <Container>
        <div className='text-5xl md:text-6xl font-bold'>
          {frontMatter.title}
        </div>
        <div className='text-neutral-700 italic mt-6 mb-6 text-lg'>{frontMatter.description}</div>
        <div className='flex gap-1'>
          {functionalLinks.map((item) => (
            <Link href={item.uri}>
              <a className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8'>
                {item.icon}
                <div>{item.text}</div>
              </a>
            </Link>
          ))}
          <button className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8' onClick={copy}>
            <ClipboardCopyIcon className='w-5 h-5' />
            <div>{showCopyValue}</div>
          </button>
          <button className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8' onClick={() => setShowCiteCont(true)}>
            <BookOpenIcon className='w-5 h-5' />
            <div>Cite</div>
          </button>
        </div>
        <div className='prose mt-16 font-serif md:prose-lg prose-blue'>
          <MDXRemote {...source} components={components} />
        </div>
        <div className='flex gap-1 mt-16 pt-6 border-t'>
          {functionalLinks.map((item) => (
            <Link href={item.uri}>
              <a className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8'>
                {item.icon}
                <div>{item.text}</div>
              </a>
            </Link>
          ))}
          <button className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8' onClick={copy}>
            <ClipboardCopyIcon className='w-5 h-5' />
            <div>{showCopyValue}</div>
          </button>
          <button className='flex-1 bg-gray-100 items-center justify-center flex gap-2 h-8' onClick={() => setShowCiteCont(true)}>
            <BookOpenIcon className='w-5 h-5' />
            <div>Cite</div>
          </button>
        </div>
      </Container>
      { showCiteCont && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 grid place-items-center'>
        <div className='p-6 pt-0 max-w-xl shadow-2xl shadow-black bg-white max-h-[75vh] overflow-y-scroll'>
          <div className='flex justify-end sticky top-0 bg-white h-12 items-center'>
            <button onClick={() => setShowCiteCont(false)}>
              <XCircleIcon className='w-6 h-6' />
            </button>
          </div>
          {cite.map((citer) => (
            <>
              <div className='mt-6 text-lg font-bold'>{citer.type} style</div>
              <div className='mt-3 text-sm select-all'>{citer.desc}</div>
            </>
          ))}
        </div>
      </div> }
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkMath, remarkSlug],
      rehypePlugins: [rehypeKatex],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
