import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/std.module.css'
import axios from 'axios'
import aniAuth from '../components/aniAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'

const URL = `${config.URL}/animes`
const fetcher = url => axios.get(url).then(res => res.data)
const showAnimes = (token) => {

    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>

    const printAnimes = (animes) => {
        console.log('Animes:', animes)
        if (animes && animes.length)
            return (animes.map((anime, index) =>
            (<li key={index} className={styles.listItem}>
               Title : {(anime) ? anime.title : '-'} <br></br>
               <img src={`http://localhost:8080/files/${anime.id}.jpg`} width={200} height={250} />
               Studios : {(anime) ? anime.studios : '-'} <br></br>
               Episodes : {(anime) ? anime.eps : '-'} <br></br> 
               Rating : {(anime) ? anime.rating : '-'} <br></br> 
               Genres : {(anime) ? anime.genres : '-'} <br></br> 
            </li>)
            ))
        else {
            return (<h2>No animes</h2>)
        }
      }
    return (
        <Layout>
            <Head>
                <title>Animes</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <ul className={styles.list}>
                    {printAnimes(data.list)}
                </ul>
                
            </div>
        </Layout>
    )
}

export default aniAuth(showAnimes)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
