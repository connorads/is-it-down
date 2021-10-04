import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Is it down?</title>
        <meta name="description" content="Is it down? Or is it just me?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://isitdown.vercel.app/">Is it down?</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
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

export default Home
