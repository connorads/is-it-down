import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Result from '../components/result'
import TextForm from '../components/textform'
import getDomainUrl from '../lib/domainurl'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface HomeProps {
  u: string
}

const defaultDomain = "connoradams.co.uk";

const Home: NextPage<HomeProps> = ({ u }) => {
  let url = u;
  if (url) {
    try {
      url = getDomainUrl(url);
    } catch (error) {
      url = `https://${defaultDomain}`
    }
  }

  const router = useRouter()
  useEffect(() => { if (!url) router.push(`/?u=${defaultDomain}`) })

  const handleSubmit = (text: string) => {
    router.push(`/?u=${text}`).then(() => router.reload())
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Is it down?</title>
        <meta name="description" content="Is it down? Or is it just you?" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <Image alt="Is it down logo" src="/icon.png" width={192} height={192}></Image>
        <h1 className={styles.title}>
          So ... <a href="https://isitdown.vercel.app/">Is it down?</a>
        </h1>

        <p className={styles.description}>
          Or is it just you?
        </p>

        <TextForm defaultValue={u} handleSubmit={handleSubmit} />

        <div className={styles.grid}>
          <a href={url} className={styles.card}>
            <h2>{url}</h2>
            <Result url={url}></Result>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>

        <a href="https://github.com/connorads/is-it-down">Made with 🍵 by @connorads
          <span className={styles.logo}>

            <Image
              alt="Is it down? GitHub Stars badge"
              src="https://img.shields.io/github/stars/connorads/is-it-down?style=social"
              width={76} height={20}
            ></Image>
          </span>
        </a>

      </footer>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  let u = query.u as string;
  return { u };
}

export default Home
