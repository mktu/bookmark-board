import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div className='bg-blue'>
          Start
        </div>
        <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
      </p>
        <h4 className="text-lg leading-6 font-medium text-gray-900">Mobile notifications</h4>
      </main>

      <footer className={styles.footer}>
        test
      </footer>
    </div>
  )
}
