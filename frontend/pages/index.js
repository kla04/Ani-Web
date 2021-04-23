import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/ani.module.css'
import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Home({ token }) {
  const fadeImages = [
    'http://localhost:8080/files/1.jpg',
    'http://localhost:8080/files/2.jpg',
    'http://localhost:8080/files/3.jpg',
    'http://localhost:8080/files/4.jpg',
    'http://localhost:8080/files/5.jpg'
  ]

  const sliceShow = () => {
      return (
        <li className={styles.listSlice}>
        <Fade >
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[0]}   />
            </div>
            <h2>Higehiro</h2>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[1]} />
            </div>
            <h2>To Your Eternity</h2>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[2]} />
            </div>
            <h2>Fruits Basket</h2>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[3]} />
            </div>
            <h2>Osamake</h2>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[4]} />
            </div>
            <h2>Zombie Land Saga Revenge</h2>
          </div>
        </Fade>
      </li>
      )
  }
  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <h1>Home page</h1>
        <h2>Welcome to the anime website!</h2>
        <ul className={styles.list}>
          {sliceShow()}
        </ul>
      </div>
      
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
