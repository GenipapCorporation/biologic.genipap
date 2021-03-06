import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/global.css";
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/11.0.0/css/fabric.min.css"
        />
      </Head>
      <Layout>
        <NextNprogress
          color="#29D"
          startPosition={0.1}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ easing: 'ease', speed: 500 }}
          className="absolute top-16 left-0 right-0"
        />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp;