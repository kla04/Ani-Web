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
const editAnimes = ({ token }) => {

    const [anime, setAnime] = useState('')
    const [title, setTitle] = useState('')
    const [studios,setStudios] = useState('')
    const [eps, setEps] = useState(0)
    const [rating, setRating] = useState('')
    const [genres, setGenres] = useState('')
    const [day, setDay] = useState('')

    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>

    const printAnimes = (animes) => {
        console.log('Animes:', animes)
        if (animes && animes.length)
            return (animes.map((anime, index) =>
            (<li key={index} className={styles.listItem}>
                Title : {(anime) ? anime.title : '-'} <br></br>
                Studios : {(anime) ? anime.studios : '-'} <br></br>
                Episodes : {(anime) ? anime.eps : '-'} <br></br>
                Rating : {(anime) ? anime.rating : '-'} <br></br>
                Genres : {(anime) ? anime.genres : '-'} <br></br>
                Day : {(anime) ? anime.day : '-'}
                <button onClick={() => updateAnime(anime.id)} className={`${styles.button} ${styles.btnEdit}`}>Update</button>
                <button onClick={() => deleteAnime(anime.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (<h2>No animes</h2>)
        }
    }

    const addAnime = async (title,studios,eps,rating,genres) => {
        const result = await axios.post(URL, { title,studios,eps,rating,genres })
        console.log(result.data)
        mutate(URL)
    }
  
    const deleteAnime = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        mutate(URL)
    }
     const updateAnime = async (id) => {
        const result = await axios.put(`${URL}/${id}`,{
            title,
            studios,
            eps,
            rating,
            genres,
            day
        })
        console.log('anime id update: ', result.data)
        mutate(URL)
    }

    return (
        <Layout>
            <Head>
                <title>animes</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                
                <ul className={styles.list}>
                    {printAnimes(data.list)}
                </ul>
                <h1>Add anime</h1>
                <div className={styles.list}>
                    Title : <input type="text" onChange={(e) => setTitle(e.target.value)} className={styles.textInput} />
                    Studios : <input type="text" onChange={(e) => setStudios(e.target.value)} className={styles.textInput} />
                    Episodes : <input type="number" onChange={(e) => setEps(e.target.value)} className={styles.textInput} />
                    Rating : <input type="text" onChange={(e) => setRating(e.target.value)} className={styles.textInput} />
                    Genres : <input type="text" onChange={(e) => setGenres(e.target.value)} className={styles.textInput} />
                    Day : <input type="text" onChange={(e) => setDay(e.target.value)} className={styles.textInput} />
                    <button onClick={() => addAnime(title,studios,eps,rating,genres)} className={`${styles.button} ${styles.btnAdd}`}>Add new anime</button>
                </div>

            </div>
        </Layout>
    )
}

export default aniAuth(editAnimes)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
