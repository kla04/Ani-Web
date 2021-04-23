import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/ani.module.css'
import axios from 'axios'
import aniAuth from '../components/aniAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'

const URL = `${config.URL}/animes`
const fetcher = url => axios.get(url).then(res => res.data)
const showAnimes = (token) => {

    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>
    const [day, setDay] = useState('ALL')
    const printAnimes = (animes) => {
        
        let newanime = (day === 'ALL') ? animes : animes.filter((item)=> item.day === day)
        
        console.log('Animes:', animes)
    
        if (animes && animes.length){
            
            return (newanime.map((anime, index) =>
            (
          
             <li key={index} className={styles.listItem}>
            Title : {(anime) ? anime.title : '-'} <br></br>
            <img src={`http://localhost:8080/files/${anime.id}.jpg`} width={200} height={250} />
            Studios : {(anime) ? anime.studios : '-'} <br></br>
            Episodes : {(anime) ? anime.eps : '-'} <br></br>
            Source : {(anime) ? anime.source : '-'} <br></br>
            Rating : {(anime) ? anime.rating : '-'} <br></br>
            Genres : {(anime) ? anime.genres : '-'} <br></br>
            </li> 
            
           )
            ))

        }
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
                <div>
                <button onClick={()=>setDay("ALL")} className={`${styles.button} ${styles.btnAdd}`}>ALL</button>
                <button onClick={()=>setDay("Monday")} className={`${styles.button} ${styles.btnAdd}`}>Monday</button>
                <button onClick={()=>setDay("Tuesday")} className={`${styles.button} ${styles.btnAdd}`}>Tuesday</button>
                <button onClick={()=>setDay("Wednesday")} className={`${styles.button} ${styles.btnAdd}`}>Wednesday</button>
                <button onClick={()=>setDay("Thursday")} className={`${styles.button} ${styles.btnAdd}`}>Thursday</button>
                <button onClick={()=>setDay("Friday")} className={`${styles.button} ${styles.btnAdd}`}>Friday</button>
                <button onClick={()=>setDay("Saturday")} className={`${styles.button} ${styles.btnAdd}`}>Saturday</button>
                <button onClick={()=>setDay("Sunday")} className={`${styles.button} ${styles.btnAdd}`}>Sunday</button>
                </div>
               
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
